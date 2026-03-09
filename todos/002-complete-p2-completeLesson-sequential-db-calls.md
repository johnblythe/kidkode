---
status: complete
priority: p2
issue_id: "002"
tags: [performance, database, code-review]
dependencies: []
---

# completeLesson() makes 5-7 sequential DB round trips

## Problem Statement

`completeLesson()` in `lib/progress.ts` chains 5-7 sequential database round trips:
1. SELECT existing status (TOCTOU check)
2. UPSERT lesson_progress
3. RPC award_xp (conditional)
4. SELECT streak in updateStreak()
5. UPDATE streak in updateStreak() (conditional)
6. SELECT next lesson in unlockNextLesson()
7. UPSERT next lesson in unlockNextLesson() (conditional)
8. SELECT character_stats for return value

At 5 users this is fine; at scale it creates noticeable latency on lesson completion.

## Findings

- `lib/progress.ts:160-215` — full sequential chain
- Steps 4-5 (updateStreak) and 6-7 (unlockNextLesson) are independent and can be parallelized
- Step 1 SELECT is redundant — `award_xp` has its own idempotency guard via partial unique indexes
- Step 8 SELECT can be eliminated by computing level from XP delta using `calculateLevel()`

## Proposed Solutions

### Option A: Parallelize independent work
```ts
// After the initial upsert, run streak + unlock in parallel
if (!alreadyCompleted) {
  await Promise.all([
    supabase.rpc("award_xp", { ... }),
    updateStreak(userId),
  ]);
}
await unlockNextLesson(userId, slug);
```
Reduces worst-case from 7 to 4 round trips.

### Option B: Remove redundant SELECT + compute level client-side
Drop the step-1 existence check (award_xp idempotency already handles it at DB level).
Drop the final stats SELECT — return computed level from XP delta.
Reduces to 3 round trips.

**Recommendation:** Option A is safe and impactful. Option B requires more testing of the idempotency guarantee.

## Acceptance Criteria
- [ ] completeLesson completes in ≤ 4 round trips
- [ ] No double-XP award possible (existing partial unique indexes remain)
- [ ] Tests pass

## Work Log
- 2026-03-09: Identified during performance review of PR #32
