---
title: "Non-fatal side-effects must be isolated from critical transaction paths"
date: 2026-04-06
category: docs/solutions/best-practices
module: lesson completion / badge award / profile enrichment
problem_type: best_practice
component: service_object
severity: high
applies_when:
  - Adding a new feature call (badges, analytics, enrichment) inside an existing critical write path
  - Using Promise.all where some branches are non-critical side-effects
  - The new feature depends on a migration that may not yet be applied in all environments
tags:
  - error-handling
  - try-catch
  - promise-all
  - badge
  - completion
  - non-fatal
  - transaction-safety
  - n-plus-one
related_components:
  - database
  - background_job
---

# Non-fatal side-effects must be isolated from critical transaction paths

## Context

When `checkAndAwardBadges()` was added to `completeLesson()` via `Promise.all`, it became a fatal dependency of the lesson-completion transaction. When the `user_badges` table was absent (migration 005 not applied) or a network error occurred, the badge check threw — propagating out of `completeLesson()` even though every critical write (lesson progress, XP, streak) had already succeeded. Children saw an error screen instead of the unlock celebration despite their lesson being recorded correctly.

The same `Promise.all` anti-pattern appeared in `listChildren()`: one `getBadgesForUser(child.id)` call per child, so one child's badge error crashed the entire parent dashboard and returned zero children.

## Guidance

**Wrap every non-critical side-effect in its own try/catch.** A side-effect is non-critical if the caller can succeed and return a meaningful result without it.

```typescript
// BEFORE — badge failure crashes lesson completion
const [statsResult, newBadges] = await Promise.all([
  supabase.from("character_stats").select(...).maybeSingle(),
  checkAndAwardBadges(userId, completedSlugs),  // ← throws = entire Promise.all rejects
]);

// AFTER — badge failure is logged but non-fatal
let newBadges: NewlyAwardedBadge[] = [];
try {
  newBadges = await checkAndAwardBadges(userId, completedSlugs);
} catch (err) {
  console.error("[completeLesson] badge check failed — lesson completion still succeeds:", err);
  // do not rethrow
}
const statsResult = await supabase.from("character_stats").select(...).maybeSingle();
```

Same pattern for profile enrichment:

```typescript
// Non-critical enrichment — failure degrades gracefully, not crashes
let badges: EarnedBadge[] = [];
try {
  badges = await getBadgesForUser(userId);
} catch (err) {
  console.error("[getProfile] badge fetch failed — returning empty badges:", err);
}
```

**For fan-out fetches (one query per item), batch instead:**

```typescript
// BEFORE — N round trips, one child's error crashes all via Promise.all
return Promise.all(
  data.map(async (child) => ({
    ...child,
    badges: await getBadgesForUser(child.id),
  }))
);

// AFTER — single round trip, JS-side distribution, graceful degradation
const childIds = data.map((c) => c.id);
const badgesByChild = new Map<string, EarnedBadge[]>();
try {
  const { data: rows, error } = await supabase
    .from("user_badges")
    .select("user_id, badge_slug, realm_id, earned_at")
    .in("user_id", childIds);
  if (!error) {
    for (const row of rows ?? []) {
      const list = badgesByChild.get(row.user_id) ?? [];
      list.push(/* map row to EarnedBadge */);
      badgesByChild.set(row.user_id, list);
    }
  }
} catch (err) {
  console.error("[listChildren] batch badge fetch failed — continuing without badges:", err);
}
return data.map((child) => ({ ...child, badges: badgesByChild.get(child.id) ?? [] }));
```

## Why This Matters

`Promise.all` rejects as soon as **any** promise rejects — there is no way to make one branch "optional" without wrapping it separately. Any `await sideEffect()` inside a critical function is a hidden fatal dependency. When the side-effect depends on a migration that may not be applied (or a table that may not exist in dev/staging), it will pass all local tests and fail in production — exactly when it matters most.

The batch query approach eliminates two problems at once: N+1 latency and the all-or-nothing failure of `Promise.all` over per-item fetches.

## When to Apply

- Before adding any `await` inside a critical function (lesson completion, payment, auth), ask: "if this throws, should the entire operation fail?" If no, wrap it.
- Any feature that introduces a new DB table (migration-gated) should have its callers wrapped defensively from day one — the migration will inevitably be unapplied somewhere.
- Any `Promise.all` that mixes critical writes with enrichment/analytics calls is a smell — split them.

## Examples

**Recognizing the pattern at review time:**

```typescript
// ⚠ Smell: critical path + side-effect in same Promise.all
const [xpResult] = await Promise.all([
  supabase.rpc("award_xp", { ... }),         // critical
  sendAnalyticsEvent("lesson_complete", ...), // non-critical
]);

// ✓ Better: side-effect wrapped separately
await supabase.rpc("award_xp", { ... });
try {
  await sendAnalyticsEvent("lesson_complete", ...);
} catch (e) {
  console.error("[completeLesson] analytics failed:", e);
}
```

**Naming convention to make intent visible in review:**

```typescript
// non-critical enrichment — failure degrades to empty badges, never crashes
let badges: EarnedBadge[] = [];
try { badges = await getBadgesForUser(userId); } catch { /* log and continue */ }
```

## Related

- `supabase/migrations/005_badges.sql` — the migration whose absence triggered this discovery
- `lib/progress.ts` — `completeLesson()` and `getProfile()` apply this pattern
- `app/actions/users.ts` — `listChildren()` batch fix
