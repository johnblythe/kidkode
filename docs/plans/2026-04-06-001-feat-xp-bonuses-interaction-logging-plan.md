---
title: "feat: First-attempt bonus, interaction logging, comeback bonus"
type: feat
status: completed
date: 2026-04-06
---

# feat: First-attempt bonus, interaction logging, comeback bonus

## Overview

Add three XP/engagement features: (1) 1.5x XP for first-attempt lesson completion, (2) granular interaction event logging for future secret badges, (3) tiered XP comeback bonus for returning after 3+ days away. This is Batch 2 of the progression system work (issue #36).

## Problem Frame

Kids need incentives beyond streak pressure. First-attempt bonus rewards focus. Comeback bonus prevents guilt when parents control screen time. Interaction logging is a data-first investment — we can't retroactively detect secret badge conditions ("Heroic Win", "Curious Mind") without capturing the raw events now.

## Requirements Trace

- R1. First completion of a lesson awards 1.5x base XP; "FIRST TRY!" callout on unlock screen
- R2. `attempts` column in `lesson_progress` is incremented on each completion
- R3. New `interaction_events` table captures: wrong answers (which question, what picked), boss HP at each answer, time per section, time per question, lesson revisits, section replays
- R4. Interaction logging is async/non-blocking — never slows the lesson experience
- R5. Comeback bonus tiers: 3d = 1.25x, 7d = 1.5x, 14d+ = 2x base XP on first lesson completion after absence
- R6. "Welcome Back!" banner on dashboard when returning after 3+ days
- R7. Interaction data is not parent-visible yet — pure data collection

## Scope Boundaries

- Secret badges are NOT built — only the data foundation
- No parent dashboard changes (R7)
- No changes to existing streak logic — comeback bonus is additive, not a replacement
- No client-side analytics/telemetry library — just server action writes
- Bonus XP stacking: first-attempt and comeback bonuses are independent. Each is a separate `xp_transactions` entry with its own reason, so they stack additively against the base XP

## Context & Research

### Relevant Code and Patterns

- `lib/progress.ts:175-252` — `completeLesson()` orchestrates upsert → award_xp → updateStreak → unlockNext → badges
- `lib/progress.ts:254-281` — `updateStreak()` reads `last_session_date`, updates to today
- `lib/types.ts:183-191` — `LessonProgress` type (already has `attempts: number`)
- `lib/types.ts:222-227` — `LessonCompletionResult` return type
- `components/UnlockScreen.tsx` — staged animation cards (XP, Level, Streak, Score Tier, Badges)
- `app/page.tsx:132-157` — `UnlockBanner` component pattern for dashboard conditional banners
- `app/lesson/[slug]/page.tsx:137-160` — `handleQuizComplete` calls `completeLesson()` via `startTransition`
- `app/actions/progress.ts` — thin server action wrappers over `lib/progress.ts`
- `supabase/migrations/004_fixes.sql` — `award_xp` function with idempotency via partial unique indexes
- `supabase/migrations/001_init.sql:34-47` — `lesson_progress` schema (`attempts INT DEFAULT 0` — never incremented)

### Institutional Learnings

- **Non-fatal side-effects** (`docs/solutions/best-practices/non-fatal-side-effects-in-transaction-paths-2026-04-06.md`): All bonus XP and event logging must be wrapped in individual try/catch blocks. Never add to `Promise.all` with critical writes. The `user_badges` table absence crash is the cautionary tale.
- **startTransition + Server Actions** (`docs/solutions/runtime-errors/server-action-starttransition-infinite-rerender.md`): Never use `startTransition` with Server Actions inside `useEffect`. The lesson player already follows the safe pattern — don't regress. New event logging calls must use plain async with `cancelled` flag.
- **Singleton mutation** (`docs/solutions/runtime-errors/default-object-singleton-mutation.md`): If defining default bonus config objects at module scope, use factory functions (already established by `makeEmptyProfile()`).

## Key Technical Decisions

- **Separate XP transactions for bonuses**: Use distinct `reason` values (`"first_attempt_bonus"`, `"comeback_bonus"`) rather than inflating the base `"lesson_complete"` amount. This preserves base XP idempotency, makes bonuses independently trackable, and simplifies future analytics. Each bonus is idempotent via the existing partial unique indexes.
- **Pre-read pattern for bonus detection**: Read current `lesson_progress.attempts` and `character_stats.last_session_date` at the top of `completeLesson()` before any writes. These two reads can be parallelized. This avoids race conditions with `updateStreak()` which updates `last_session_date` to today.
- **Comeback bonus is per-absence, not per-session**: Only the first lesson completed after 3+ days away gets the comeback bonus. This happens naturally because `updateStreak()` sets `last_session_date = today` during the same `completeLesson()` call — subsequent completions see 0 days away.
- **Interaction events as fire-and-forget server actions**: Client calls server action, doesn't await for UI flow. Server wraps insert in try/catch. No client-side batching in v1 — keep it simple with per-event writes.
- **Generic event table with JSONB metadata**: Single `interaction_events` table with `event_type` enum + `metadata JSONB` rather than separate tables per event type. Flexible for future secret badge queries.

## Open Questions

### Resolved During Planning

- **Should bonuses stack?** Yes — they're independent multipliers recorded as separate transactions. A 100 XP lesson with both first-attempt and 7-day comeback: 100 (base) + 50 (first attempt) + 50 (comeback) = 200 XP total.
- **When does "first attempt" count?** At completion time. If `lesson_progress.attempts === 0` before incrementing, it's the first attempt. Replaying a completed lesson doesn't get the bonus (attempts > 0).
- **Comeback bonus scope?** First lesson completion after absence only (not all lessons in a session).

### Deferred to Implementation

- **Client-side event batching**: May be needed later if per-event writes cause performance issues. Start with simple per-event calls and measure.
- **Exact metadata shape per event type**: The TypeScript type will define the union, but exact field names will be finalized during implementation based on what's easily accessible in each component.
- **Score overwrite on replay**: The existing `completeLesson()` upsert overwrites `score` and `completed_at` on replay. A kid who replays and scores lower loses their high score. Now that `attempts` makes replays a tracked concept, a `GREATEST(OLD.score, NEW.score)` trigger may be warranted — but that's a separate concern from this batch.
- **Comeback: `last_session_date` vs `last_active_at`**: A kid who visits daily but doesn't complete a lesson for a week would get a comeback bonus. This is intentional — the comeback rewards returning to *completion*, not just visiting. `last_session_date` is the correct signal.

## Implementation Units

- [ ] **Unit 1: Migration 006 — interaction_events table**

**Goal:** Create the `interaction_events` table for granular kid interaction logging.

**Requirements:** R3, R7

**Dependencies:** None

**Files:**
- Create: `supabase/migrations/006_interaction_events.sql`

**Approach:**
- Table: `interaction_events` with columns: `id UUID PK`, `user_id UUID FK`, `lesson_slug TEXT`, `event_type TEXT CHECK(event_type IN ('wrong_answer', 'boss_hp_snapshot', 'section_time', 'question_time', 'lesson_revisit', 'section_replay'))`, `metadata JSONB`, `created_at TIMESTAMPTZ`
- Index on `(user_id, event_type)` for future badge queries
- Index on `(user_id, lesson_slug)` for per-lesson event lookup
- No RLS — same pattern as all other tables
- Apply via: `psql postgresql://postgres:postgres@localhost:55122/postgres -f supabase/migrations/006_interaction_events.sql`

**Patterns to follow:**
- `supabase/migrations/005_badges.sql` — same header comment style, naming convention
- `supabase/migrations/001_init.sql` — index and FK patterns

**Test expectation:** none — pure DDL, verified by successful migration application

**Verification:**
- Table exists and accepts inserts
- Indexes exist on `(user_id, event_type)` and `(user_id, lesson_slug)`

---

- [ ] **Unit 2: First-attempt bonus server logic**

**Goal:** Award 1.5x XP on first lesson completion. Increment `attempts` on every completion.

**Requirements:** R1, R2

**Dependencies:** None (uses existing schema — `attempts` column already exists)

**Files:**
- Modify: `lib/progress.ts`
- Modify: `lib/types.ts`
- Modify: `app/actions/progress.ts`
- Test: `tests/progress.test.ts` (or inline verification)

**Approach:**
- At top of `completeLesson()`, read current `lesson_progress` row for `(userId, slug)` to get current `attempts` value
- Determine `isFirstAttempt = !currentRow || currentRow.attempts === 0`
- Include `attempts: (currentRow?.attempts ?? 0) + 1` in the lesson_progress upsert
- After the existing `award_xp` call (not in the same `Promise.all`), if `isFirstAttempt`:
  - Calculate `bonusXp = Math.floor(xp * 0.5)` (the extra 50% — base is already awarded)
  - Call `award_xp(userId, bonusXp, "first_attempt_bonus", slug)` — idempotent via existing indexes
  - Wrap in try/catch (non-fatal side-effect pattern)
- Extend `LessonCompletionResult` with `isFirstAttempt?: boolean` and `bonusXp?: number`
- Update `completeLesson()` return to include these fields
- Update server action wrapper signature in `app/actions/progress.ts` (return type already inferred)

**Patterns to follow:**
- Non-fatal side-effect isolation pattern (`docs/solutions/best-practices/non-fatal-side-effects-in-transaction-paths-2026-04-06.md`)
- Existing `checkAndAwardBadges` try/catch pattern in `completeLesson()`

**Test scenarios:**
- Happy path: complete a lesson for the first time (attempts=0) → `isFirstAttempt=true`, bonus XP awarded, attempts becomes 1
- Happy path: verify bonus amount is `Math.floor(baseXp * 0.5)` for various base XP values (50→25, 100→50, 75→37)
- Edge case: replay a completed lesson (attempts>0) → `isFirstAttempt=false`, no bonus XP, attempts incremented
- Edge case: bonus XP transaction is idempotent — calling completeLesson twice for same slug doesn't double-award
- Error path: bonus XP award fails (e.g., DB error) → lesson still completes successfully, `isFirstAttempt` still true in result but `bonusXp` may be 0

**Verification:**
- `xp_transactions` has a row with reason `"first_attempt_bonus"` after first completion
- `lesson_progress.attempts` is 1 after first completion, 2 after second
- `LessonCompletionResult` includes `isFirstAttempt` and `bonusXp` fields

---

- [ ] **Unit 3: Comeback bonus server logic**

**Goal:** Detect days since last session and award tiered XP bonus on first lesson completion after 3+ day absence.

**Requirements:** R5

**Dependencies:** None (uses existing `character_stats.last_session_date` column)

**Files:**
- Modify: `lib/progress.ts`
- Modify: `lib/types.ts`

**Approach:**
- At top of `completeLesson()`, read `character_stats.last_session_date` for the user (can be parallelized with the Unit 2 lesson_progress read)
- Calculate `daysAway` from `last_session_date` to today
- Determine comeback tier: `daysAway >= 14 → 2.0`, `>= 7 → 1.5`, `>= 3 → 1.25`, else `null`
- If comeback tier exists, after the bonus XP award (Unit 2):
  - Calculate `comebackBonusXp = Math.floor(xp * (multiplier - 1))` (just the extra portion)
  - Call `award_xp(userId, comebackBonusXp, "comeback_bonus", slug)` — idempotent per lesson
  - Wrap in try/catch (non-fatal)
- Extend `LessonCompletionResult` with `comebackBonus?: { daysAway: number; multiplier: number; bonusXp: number }`
- Natural one-time behavior: `updateStreak()` sets `last_session_date = today`, so the next `completeLesson()` in the same session sees 0 days away
- Extend `PlayerProfile` with `daysAway?: number` for dashboard use (set in `loadDashboard`). If `last_session_date` is null (new user, no prior session), set `daysAway` to 0 — no comeback bonus for first-ever session

**Patterns to follow:**
- Same non-fatal try/catch pattern as Unit 2
- `updateStreak()` date comparison pattern for days-away calculation

**Test scenarios:**
- Happy path: 3 days away → multiplier 1.25x, base 100 XP → 25 bonus XP (reason: comeback_bonus)
- Happy path: 7 days away → multiplier 1.5x, base 100 XP → 50 bonus XP
- Happy path: 14+ days away → multiplier 2.0x, base 100 XP → 100 bonus XP
- Happy path: first-attempt + comeback stack → base 100 + 50 (first attempt) + 50 (comeback 7d) = 200 XP total
- Edge case: 2 days away → no comeback bonus
- Edge case: `last_session_date` is null (brand new user, first ever lesson) → no comeback bonus (no prior session to return from)
- Edge case: second lesson in same session → `last_session_date` already updated to today → no duplicate comeback bonus
- Error path: comeback bonus XP award fails → lesson still completes, comeback info still in result

**Verification:**
- `xp_transactions` has row with reason `"comeback_bonus"` when comeback triggers
- Comeback bonus fires only once per absence (second lesson same session gets no bonus)
- `LessonCompletionResult.comebackBonus` populated with correct tier info

---

- [ ] **Unit 4: Interaction event logging infrastructure**

**Goal:** Create server-side event logging module and server actions for fire-and-forget interaction capture.

**Requirements:** R3, R4, R7

**Dependencies:** Unit 1 (interaction_events table must exist)

**Files:**
- Create: `lib/events.ts`
- Create: `app/actions/events.ts`

**Approach:**
- `lib/events.ts`:
  - Define `InteractionEventType` union type matching the CHECK constraint event types
  - Define metadata type per event (discriminated union or loose JSONB — start loose)
  - `logInteractionEvent(userId, lessonSlug, eventType, metadata)` function: single insert, wrapped in try/catch, returns void (never throws)
  - `logInteractionEvents(events[])` bulk variant: single multi-row insert for efficiency when flushing multiple events at section end
- `app/actions/events.ts`:
  - `"use server"` wrapper for `logInteractionEvent` and `logInteractionEvents`
  - Same thin delegation pattern as `app/actions/progress.ts`
- All writes are non-fatal — the function catches errors internally and logs to console.error

**Patterns to follow:**
- `app/actions/progress.ts` — thin server action wrapper pattern
- `lib/badges.ts` — module structure with exported functions
- Non-fatal side-effect pattern from docs/solutions

**Test scenarios:**
- Happy path: log a `wrong_answer` event with metadata `{ questionIndex: 2, selectedOption: "B", correctOption: "C" }` → row inserted in `interaction_events`
- Happy path: log a `boss_hp_snapshot` event with metadata `{ bossHp: 3, playerHp: 1, questionIndex: 4 }` → row inserted
- Happy path: bulk insert 5 events via `logInteractionEvents` → all 5 rows created
- Error path: table doesn't exist (migration not applied) → function returns without throwing, console.error logged
- Error path: malformed metadata → insert fails gracefully, no crash propagation

**Verification:**
- Events appear in `interaction_events` table after server action calls
- Lesson completion flow is unaffected when event logging is called alongside it

---

- [ ] **Unit 5: Client-side interaction logging calls**

**Goal:** Wire up interaction event capture in quiz, boss battle, and interactive exercise components.

**Requirements:** R3, R4

**Dependencies:** Unit 4 (server actions must exist)

**Files:**
- Modify: `components/QuizSection.tsx`
- Modify: `components/BossBattleSection.tsx`
- Modify: `components/InteractiveExercise.tsx`
- Modify: `app/lesson/[slug]/page.tsx`

**Approach:**
- **userId threading**: QuizSection, BossBattleSection, and InteractiveExercise currently don't receive `userId` as a prop. Add `userId: string` and `lessonSlug: string` props to each component (threaded from lesson player page which already has both). Alternatively, centralize logging in the lesson player by passing event callbacks down instead of having components call server actions directly.
- **Wrong answers**: In QuizSection and BossBattleSection, when a wrong answer is selected, fire `logInteractionEvent(userId, slug, "wrong_answer", { questionIndex, selectedOption, correctOption })`
- **Boss HP snapshots**: In BossBattleSection, after each answer (right or wrong), fire `logInteractionEvent(userId, slug, "boss_hp_snapshot", { bossHp, playerHp, questionIndex, wasCorrect })`
- **Section time**: Track `Date.now()` at section start in the lesson player. On section complete, fire `logInteractionEvent(userId, slug, "section_time", { sectionIndex, sectionType, durationMs })`
- **Question time**: Track per-question start time in quiz/boss components. On answer, include `durationMs` in the event metadata
- **Lesson revisits**: In lesson player, if loading a lesson that's already `completed`, fire `logInteractionEvent(userId, slug, "lesson_revisit", {})`
- **Section replays**: If navigating to a section with index < current progress, fire `logInteractionEvent(userId, slug, "section_replay", { sectionIndex })`
- All calls are fire-and-forget: call the server action but don't await it in the UI flow. Use plain async IIFE pattern (NOT startTransition).
- userId comes from `useActiveUser()` hook, already available in all these components

**Patterns to follow:**
- Plain async call pattern (not startTransition) per the infinite re-render solution doc
- Fire-and-forget pattern from existing `updateLessonProgress` debounced calls

**Test scenarios:**
- Happy path: answer a quiz question wrong → `wrong_answer` event logged with correct metadata
- Happy path: complete a boss battle → multiple `boss_hp_snapshot` events logged throughout the fight
- Happy path: complete a section → `section_time` event logged with duration
- Edge case: very fast section completion (< 1 second) → event still logged with small duration
- Edge case: lesson revisit detection only fires for `completed` lessons, not `in_progress`
- Integration: complete a full lesson → multiple interaction events created without slowing the completion flow

**Verification:**
- Playing through a lesson creates interaction_events rows for each supported event type
- Lesson UX timing is unaffected (events are fire-and-forget)
- No console errors from event logging during normal gameplay

---

- [ ] **Unit 6: UnlockScreen bonus callouts**

**Goal:** Show "FIRST TRY!" and comeback bonus cards on the unlock screen when earned.

**Requirements:** R1 (callout), R5 (visual)

**Dependencies:** Units 2, 3 (server returns bonus data)

**Files:**
- Modify: `components/UnlockScreen.tsx`
- Modify: `app/lesson/[slug]/page.tsx`

**Approach:**
- Extend `UnlockScreenProps` with `isFirstAttempt?: boolean`, `bonusXp?: number`, `comebackBonus?: { daysAway: number; multiplier: number; bonusXp: number }`
- In lesson page `handleQuizComplete`, pass new fields from `LessonCompletionResult` to `unlockData`
- Update `xpEarned` in `unlockData` to total XP (base + all bonuses). The XP counter animates to the grand total for maximum "wow" factor. Bonus cards show the breakdown of what contributed (e.g., "+50 FIRST TRY!", "+50 COMEBACK!") so the kid understands where the extra came from
- **"FIRST TRY!" card**: New stat card after Score Tier, before Badges. Gold accent, spring animation with next sequential delay. Shows "FIRST TRY!" label + "+{bonusXp} XP" value. Play `sfx("level-up")` or similar celebratory sound.
- **Comeback bonus card**: If comeback bonus exists, show "WELCOME BACK!" card with tier info and bonus XP. Fire/warm accent color. Include days-away context ("7 days → 1.5x").
- Both cards use the same `rpg-card` + spring animation pattern as existing stat cards

**Patterns to follow:**
- Existing stat card pattern in UnlockScreen (lines 148-235): `motion.div` with `initial/animate`, sequential delay, `rpg-card` class
- Responsive: `px-6 py-4`, `text-sm` labels

**Test scenarios:**
- Happy path: first-attempt completion → "FIRST TRY!" card visible with bonus XP amount, celebratory SFX
- Happy path: comeback completion (7 days away) → "WELCOME BACK!" card with "1.5x" indicator and bonus XP
- Happy path: both bonuses earned → both cards appear in sequence
- Edge case: neither bonus → no extra cards, existing layout unchanged
- Edge case: comeback bonus earned but not first attempt → only comeback card shows

**Verification:**
- Visual: unlock screen shows bonus cards with correct amounts when earned
- Audio: celebratory SFX plays for bonus cards
- Layout: cards fit cleanly between Score Tier and Badges sections

---

- [ ] **Unit 7: Dashboard "Welcome Back!" banner**

**Goal:** Show a "Welcome Back!" banner on the dashboard when the kid returns after 3+ days.

**Requirements:** R6

**Dependencies:** Unit 3 (`PlayerProfile.daysAway` field)

**Files:**
- Modify: `app/page.tsx`
- Modify: `lib/progress.ts` (loadDashboard to populate daysAway)

**Approach:**
- In `loadDashboard()`, after `getProfile()`, compute `daysAway` from `profile.lastSessionDate` vs today. Attach to profile as `daysAway`.
- In dashboard page, render a `ComebackBanner` component above the lesson list when `profile.daysAway >= 3`
- Banner style: warm gradient (fire-orange/gold), similar structure to `UnlockBanner` but distinct
- Gate on `profile.role === "child"` — parents don't play lessons, showing them "earn 2x XP!" is misleading
- Show tier info: "Welcome back! You've been away {N} days — earn {multiplier}x XP on your next lesson!"
- Banner disappears on the next dashboard load after lesson completion (since `completeLesson()` calls `updateStreak()` which sets `last_session_date` to today, `daysAway` will recompute to 0)
- No server action call from the banner — it's purely presentational based on profile data

**Patterns to follow:**
- `UnlockBanner` component pattern at `app/page.tsx:132-157`
- Framer motion `initial/animate` transitions
- Responsive text: `text-sm sm:text-base`

**Test scenarios:**
- Happy path: return after 7 days → banner shows with "1.5x" multiplier info
- Happy path: return after 14+ days → banner shows with "2x" multiplier info
- Edge case: return after 2 days → no banner
- Edge case: complete a lesson, return to dashboard → banner gone (last_session_date is now today)
- Edge case: brand new user (no last_session_date) → no banner
- Edge case: parent account returning after 7 days → no banner (role guard)

**Verification:**
- Visual: banner renders above lesson list with correct tier info
- Banner is gone after completing a lesson and returning to dashboard

## System-Wide Impact

- **Interaction graph:** `completeLesson()` gains two new `award_xp` calls (first-attempt, comeback) — both are independently idempotent and non-fatal. `handleQuizComplete` passes new data through to `UnlockScreen`. Dashboard reads `daysAway` from profile.
- **Error propagation:** All new XP awards and event logging are wrapped in try/catch. A failure in any bonus or logging path must never crash lesson completion. This matches the established pattern from the badge crash incident.
- **State lifecycle risks:** The `attempts` increment and bonus XP award could theoretically race if `completeLesson()` is called twice rapidly for the same lesson — but `award_xp` idempotency prevents double-awarding, and the `attempts` value may be off by one in the race case (acceptable).
- **API surface parity:** `LessonCompletionResult` gains optional fields (`isFirstAttempt`, `bonusXp`, `comebackBonus`). Backward-compatible — existing consumers see `undefined` for new fields.
- **Unchanged invariants:** Existing XP award (`lesson_complete` reason), streak logic, badge checks, unlock flow — all unchanged. The new code adds parallel side-effect paths, not modifications to the critical path.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Event logging inserts slow down lesson experience | Fire-and-forget pattern — client doesn't await. Server wraps in try/catch. No impact on critical path. |
| Migration 006 not applied in an environment | Event logging function degrades silently (try/catch). Bonus XP uses existing tables — no migration dependency. |
| `attempts` column race on rapid re-completion | `award_xp` idempotency prevents double bonus. Worst case: attempts count is slightly off, which has no user-facing consequence. |
| Comeback bonus race: two concurrent completions both see stale `last_session_date` | Each awards a different lesson's comeback bonus — `award_xp` dedupes on `(user_id, lesson_slug, "comeback_bonus")`. Two different lessons getting comeback bonus in the same return is acceptable and unlikely (sequential lesson flow). |
| Comeback bonus calculated wrong due to timezone | Use ISO date string comparison (same pattern as `updateStreak()`). Both use `new Date().toISOString().split("T")[0]` — consistent. |

## Sources & References

- Related issue: #36
- Key files: `lib/progress.ts`, `lib/types.ts`, `components/UnlockScreen.tsx`, `app/page.tsx`
- Learnings: `docs/solutions/best-practices/non-fatal-side-effects-in-transaction-paths-2026-04-06.md`
- Learnings: `docs/solutions/runtime-errors/server-action-starttransition-infinite-rerender.md`
