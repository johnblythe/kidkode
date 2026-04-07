---
title: "Server Action Error Handling: Silent Failures, Fire-and-Forget, and Log Severity"
date: 2026-04-07
category: docs/solutions/best-practices
module: server-actions
problem_type: best_practice
component: service_object
severity: high
applies_when:
  - A server action has a multi-stage fetch (advanced query with column fallback)
  - A Promise.all contains three or more reads added to incrementally over time
  - A client component calls a server action and updates local state before awaiting
  - A log message describes a missing config entry or unmapped key
  - Code indexes into a typed const map using a runtime key inside a try/catch
tags:
  - error-handling
  - server-actions
  - silent-failure
  - nextjs
  - supabase
  - rollback
  - logging
related_components:
  - frontend_stimulus
  - database
---

# Server Action Error Handling: Silent Failures, Fire-and-Forget, and Log Severity

## Context

PR #45 (`feat/avatar-class-evolution-titles`) review surfaced six error handling gaps in Next.js server actions backed by Supabase. No production failures — found in code review before merge. The issues cluster into four generalizable patterns that recur naturally as server actions grow more complex:

1. Fallback query errors that are never checked
2. Parallel pre-read errors that are partially checked (some branches missing)
3. Optimistic UI updates backed by fire-and-forget mutations with no rollback
4. `console.warn` used for config/code bugs that require source edits to fix

These patterns are extensions of the isolation and safe-direction patterns documented in
`non-fatal-side-effects-in-transaction-paths-2026-04-06.md` and
`pre-read-pattern-before-transactional-writes-2026-04-07.md` — this doc adds
the logging discipline and return-contract layer those docs do not cover.

## Guidance

### Pattern 1 — Every query result must have an error check, including fallbacks

Multi-stage fetches (try advanced query, fall back to simpler) often have the fallback
error check omitted. The fallback path feels "safe" because it was written to recover
from something — but it can fail independently for unrelated reasons (network, RLS, auth).

**Rule**: every `.data` / `.error` from a Supabase call must be followed by an error
check before `.data` is used, including the fallback leg.

```ts
// WRONG — fallback error silently swallowed
const statsBasic = await supabase.from("character_stats").select("total_xp, ...").maybeSingle();
statsData = statsBasic.data ? { ...statsBasic.data, active_title: null } : null;

// CORRECT
const statsBasic = await supabase.from("character_stats").select("total_xp, ...").maybeSingle();
if (statsBasic.error) {
  console.error("[getProfile] fallback stats fetch also failed — profile will show zero stats:", statsBasic.error.message);
}
statsData = statsBasic.data ? { ...statsBasic.data, active_title: null } : null;
```

The same rule applies to every leg of a `Promise.all`. Adding a third pre-read to an
existing `Promise.all` requires adding a third error check — do not leave any leg unchecked:

```ts
const [existingProgressResult, statsPreResult, userPreResult] = await Promise.all([...]);

if (existingProgressResult.error) {
  console.error("[completeLesson] attempts pre-read failed — assuming non-first attempt:", existingProgressResult.error.message);
}
if (statsPreResult.error) {
  console.error("[completeLesson] stats pre-read failed — comeback bonus skipped:", statsPreResult.error.message);
}
if (userPreResult.error) {
  // EASY TO MISS: third branch added later — must also have its error check
  console.error("[completeLesson] hero_class pre-read failed — evolution detection skipped:", userPreResult.error.message);
}
```

---

### Pattern 2 — Fire-and-forget mutations require explicit rollback on failure

Optimistic UI updates must be paired with rollback logic whenever the underlying server
action can fail. Calling `void fn()` discards the result and makes rollback impossible.

**Rule**: never call a mutation server action with `void` if the UI has already been
updated optimistically. Always `await` the result, check it, and restore prior state
on failure.

The server action must return a typed discriminated union so the caller can branch:

```ts
// WRONG — void return hides success/failure from caller
export async function setActiveTitle(userId: string, title: string): Promise<void>

// CORRECT — caller can distinguish success from failure
export async function setActiveTitle(
  userId: string,
  title: string
): Promise<{ ok: true } | { ok: false; reason: string }> {
  // ... validation and DB write ...
  if (error) {
    console.error("[setActiveTitle] DB update failed:", error.message);
    return { ok: false, reason: error.message };
  }
  return { ok: true };
}
```

Client side — capture the pre-update value BEFORE the optimistic update, then use it
in the rollback:

```ts
async function handleTitleCycle() {
  const { availableTitles, activeTitle } = profile; // capture current title before update
  const nextTitle = availableTitles[(currentIdx + 1) % availableTitles.length];

  // Optimistic update
  setProfile((prev) => prev ? { ...prev, activeTitle: nextTitle } : prev);

  // Persist — roll back on failure
  const result = await setActiveTitle(userId, nextTitle);
  if (!result.ok) {
    console.error("[handleTitleCycle] title persist failed — rolling back:", result.reason);
    setProfile((prev) => prev ? { ...prev, activeTitle } : prev); // restore `activeTitle`
  }
}
```

---

### Pattern 3 — Config/code bugs must use `console.error`, not `console.warn`

`console.warn` is for transient or expected conditions: optional data missing, degraded-but-
functional states, deprecation notices. It is not for conditions that require a source code
change to fix.

**Rule**: if the only resolution is editing a source file, use `console.error`. Include
the specific file and the action required so the next developer has a starting point.

```ts
// WRONG — easy to miss, no actionable guidance
console.warn(`No titles configured for realm ${realmSlug}`);

// CORRECT — visible, actionable, points to the fix location
console.error(
  `[checkAndAwardBadges] REALM_TITLES missing entry for slug "${realmSlug}" — ` +
  `title not awarded. Add this slug to lib/classes.ts REALM_TITLES.`
);
```

---

### Pattern 4 — Guard config lookups to prevent buried TypeErrors

Unguarded indexing into a const map (`CONFIG[key]`) throws `TypeError: Cannot read
properties of undefined` when the key is absent. Inside a try/catch, the root cause
is replaced by a generic error message and the missing key is lost.

**Rule**: always null-check config map lookups. Log with the missing key and fix
location, then skip or return a safe default rather than throwing.

```ts
// WRONG — throws TypeError, root cause buried by outer try/catch
const badges = toInsert.map((r) => ({
  slug: r.badge_slug,
  name: REALM_BADGES[r.realm_id].name,  // TypeError if realmId not in map
  icon: REALM_BADGES[r.realm_id].icon,
}));

// CORRECT — missing key caught explicitly, logged actionably, entry skipped
const badges = toInsert.flatMap((r) => {
  const meta = REALM_BADGES[r.realm_id as RealmId];
  if (!meta) {
    console.error(
      `[checkAndAwardBadges] REALM_BADGES missing entry for realm_id ${r.realm_id} ` +
      `— Add to lib/badge-config.ts.`
    );
    return [];
  }
  return [{ slug: r.badge_slug, name: meta.name, icon: meta.icon }];
});
```

## Why This Matters

**Unlogged fallback errors** produce silent zero-state: the user sees blank stats or an
empty lesson list with no error visible anywhere. Debugging starts from the wrong end —
"why is the profile empty?" instead of "DB retry failed with RLS error at 14:32."

**Fire-and-forget with optimistic UI** causes ghost state: the UI shows a change that
did not persist. The user earns a title, taps to set it, sees it update — then next
login it is gone. In a gamification context, earned state (titles, badges, level) must
be reliable; silent reversion erodes trust.

**`warn` for code bugs** lets config gaps survive development. Developers filter out
warnings habitually. An error demands attention. A missing config entry is not a data
state — it is a gap that requires a commit to fix.

**Buried TypeErrors** obscure root cause. The outer catch logs "badge check failed" —
correct but not helpful. The actual problem (a realm added to the DB without a matching
`REALM_BADGES` entry) goes unfound until a second developer traces the stack manually.

## When to Apply

| Pattern | Apply when |
|---------|-----------|
| 1 — Every query has an error check | Multi-stage fetch exists; new read added to existing Promise.all |
| 2 — No fire-and-forget mutations | Server action returns `void`; caller uses optimistic UI |
| 3 — error vs warn for code bugs | Log describes missing config, unrecognized ID, or unmapped key |
| 4 — Guard config lookups | Runtime key into `Record<K, V>` or typed const map, especially inside try/catch |

## Examples

All four patterns appeared together in PR #45. Affected files:
- `lib/progress.ts` — Patterns 1 and 2 (fallback checks, parallel read checks, `setActiveTitle` return type)
- `app/page.tsx` — Pattern 2 (optimistic rollback handler)
- `lib/badges.ts` — Patterns 3 and 4 (warn→error, guarded config lookup)
- `app/actions/progress.ts` — Pattern 2 (wrapper updated to match new return type)

## Related

- `docs/solutions/best-practices/non-fatal-side-effects-in-transaction-paths-2026-04-06.md` — isolation pattern this doc extends with logging discipline
- `docs/solutions/best-practices/pre-read-pattern-before-transactional-writes-2026-04-07.md` — safe-direction defaults this doc extends with error log requirements
- PR #45 — where these patterns were found and fixed
- `lib/badge-config.ts` — the config map that must stay in sync when new realms are added
