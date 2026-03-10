---
status: complete
priority: p3
issue_id: "004"
tags: [database, data-integrity, code-review]
dependencies: []
---

# character_stats.current_level not updated by award_xp()

## Problem Statement

`award_xp()` in `supabase/migrations/002_functions.sql` atomically updates `total_xp` but does not update `current_level`. The level computation lives in TypeScript (`lib/types.ts:calculateLevel`). The `character_stats.current_level` column thus becomes stale after each XP award unless explicitly updated.

`completeLesson()` reads `current_level` from DB to return the result (after the award_xp call) — it gets the stale value unless the trigger or function updates it.

## Findings

- `supabase/migrations/002_functions.sql` — award_xp updates total_xp but not current_level
- `lib/progress.ts:205-210` — reads current_level after awarding XP
- `lib/types.ts:199-215` — calculateLevel() is the authoritative formula

## Proposed Solutions

### Option A: Update award_xp() to also compute and set current_level
```sql
-- Add to award_xp() after the UPDATE:
UPDATE character_stats
SET current_level = (
  CASE
    WHEN new_total_xp >= 3200 THEN 10
    WHEN new_total_xp >= 2500 THEN 9
    -- ... full CASE matching XP_PER_LEVEL thresholds
    ELSE 1
  END
)
WHERE user_id = p_user_id;
```

### Option B: Remove current_level column, compute client-side always
Since `calculateLevel(total_xp)` is already authoritative, `current_level` is redundant. Remove it from DB, compute in `rowsToProfile()`.
Pros: Single source of truth
Cons: Requires migration + schema change

**Recommendation:** Option A in the short term (add level update to award_xp). Option B for a future cleanup.

## Acceptance Criteria
- [ ] After award_xp runs, character_stats.current_level matches calculateLevel(total_xp).level
- [ ] completeLesson returns the correct new level
- [ ] No duplicate level computation

## Work Log
- 2026-03-09: Identified during data integrity review of PR #32
