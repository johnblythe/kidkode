---
title: "Pre-read baseline values before transactional writes that overwrite them"
date: 2026-04-07
category: docs/solutions/best-practices
module: lesson completion / XP bonuses / streak tracking
problem_type: best_practice
component: service_object
severity: high
applies_when:
  - A function needs a "before" value to compute a bonus or delta, but that value is overwritten by a write later in the same function
  - Computing whether something is a "first attempt" when the attempt count is incremented by the same operation
  - Computing time-since-last-visit when the last-visit timestamp is updated by the same operation
  - Any conditional logic that must branch on a pre-write state
tags:
  - pre-read
  - transactional
  - promise-all
  - xp-bonus
  - first-attempt
  - comeback-bonus
  - safe-direction
  - baseline
related_components:
  - database
---

# Pre-read baseline values before transactional writes that overwrite them

## Context

`completeLesson()` in `lib/progress.ts` was extended (PR #44) to award two new XP bonuses:

1. **First-attempt bonus** (1.5x) — awarded when the player completes a lesson without any prior failed attempts.
2. **Comeback bonus** (tiered: 1.25x at 3d, 1.5x at 7d, 2x at 14d+) — awarded when the player returns after an absence.

Both computations require knowing a value *before* the function's own writes:

- First-attempt requires the current `attempts` count. The upsert later in the same function increments it.
- Comeback requires `last_session_date`. `updateStreak()` later in the same function overwrites it to today.

Reading those values *after* the writes always returns the post-write state, making first-attempt detection impossible (attempts is already 1) and comeback detection impossible (last session is already today).

## Guidance

**Parallelize all required pre-reads at the top of the function, before any writes.** Use `Promise.all` so both reads are concurrent. Apply safe-direction defaults on failure — default toward *not* awarding a bonus, not toward awarding one.

```typescript
// Pre-read before writes — both reads parallelized
const [existingProgressResult, statsPreResult] = await Promise.all([
  supabase
    .from("lesson_progress")
    .select("attempts")
    .eq("user_id", userId)
    .eq("lesson_slug", slug)
    .maybeSingle(),
  supabase
    .from("character_stats")
    .select("last_session_date")
    .eq("user_id", userId)
    .maybeSingle(),
]);

// Safe-direction defaults: on DB error, assume non-first-attempt and no comeback
const currentAttempts = existingProgressResult.error
  ? 1
  : (existingProgressResult.data?.attempts ?? 0);
const lastSessionDate = statsPreResult.error
  ? null
  : (statsPreResult.data?.last_session_date ?? null);

// ... all writes follow here (upsert, updateStreak, award XP, etc.) ...
```

Then derive the bonuses from the pre-read values, not from values fetched later:

```typescript
const isFirstAttempt = currentAttempts === 0;
const xpMultiplier = computeXpMultiplier(isFirstAttempt, lastSessionDate);
```

## Why This Matters

A function that reads, then writes, then needs the pre-write value is a classic temporal ordering bug. The database always reflects the most recent state — there is no built-in "before image" unless you read it explicitly before writing.

The safe-direction default principle is equally important. If the pre-read fails (transient network error, cold connection, etc.), the system must not award bonuses it cannot verify. Defaulting `currentAttempts = 1` (non-first-attempt) and `lastSessionDate = null` (no comeback) means a rare DB hiccup causes a missed bonus for one player once — not a systematic over-award across many sessions.

Awarding a bonus that wasn't earned is worse than missing one: it is irreversible, degrades the economy, and undermines player trust in the fairness of the system.

## When to Apply

- Any function that needs a "before" snapshot of a value it will later overwrite.
- Any bonus, delta, or conditional that must branch on pre-write state.
- Streak calculations, attempt counts, session timestamps — all are overwritten by the function that also needs them.
- Wherever the pre-reads are independent, use `Promise.all` to avoid serializing them unnecessarily.

## Examples

**Anti-pattern — reading after the write loses the baseline:**

```typescript
// WRONG: attempts is read after the upsert that increments it
await supabase.from("lesson_progress").upsert({ attempts: existingAttempts + 1 });
const { data } = await supabase.from("lesson_progress").select("attempts").maybeSingle();
const isFirstAttempt = data?.attempts === 1; // always false — it's already 1 after upsert
```

**Correct pattern — pre-read, then write:**

```typescript
// RIGHT: read attempts before the upsert
const { data: existing } = await supabase
  .from("lesson_progress")
  .select("attempts")
  .eq("user_id", userId)
  .eq("lesson_slug", slug)
  .maybeSingle();
const currentAttempts = existing?.attempts ?? 0;
const isFirstAttempt = currentAttempts === 0;

// NOW do the write
await supabase.from("lesson_progress").upsert({ attempts: currentAttempts + 1 });
```

**Safe-direction default on failure:**

```typescript
// If the pre-read errors, default toward NOT awarding the bonus
const currentAttempts = existingProgressResult.error
  ? 1   // treat as "already attempted" — safe direction
  : (existingProgressResult.data?.attempts ?? 0);
```

## Related

- `lib/progress.ts` — `completeLesson()` implements this pattern for both pre-reads
- `docs/solutions/best-practices/non-fatal-side-effects-in-transaction-paths-2026-04-06.md` — companion pattern: isolating non-critical side-effects from the same critical path
- PR #44 (`feat/xp-bonuses-interaction-logging`) — where this pattern was introduced
