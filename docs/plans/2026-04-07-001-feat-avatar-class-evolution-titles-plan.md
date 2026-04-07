---
title: "feat: Avatar upgrades, class evolution, name titles"
type: feat
status: completed
date: 2026-04-07
---

# feat: Avatar upgrades, class evolution, name titles

## Overview

Add a cosmetic identity layer tied to level milestones and realm completion: (1) avatar display uses the kid's actual hero class emoji (currently hardcoded 🧙), with visual tier upgrades at level thresholds; (2) hero class evolves at level milestones with a celebratory UnlockScreen card; (3) kids earn a realm title suffix on dashboard after completing each realm, with tap-to-cycle selection.

## Problem Frame

The kid picks a hero class at onboarding (wizard, knight, elf, ninja, hero, merfolk) but the dashboard avatar ignores it — everyone sees 🧙. There's no visual reward for leveling up or completing realms beyond the XP number ticking up. This batch closes that gap with earned cosmetics that reinforce identity without requiring purchases.

Philosophy: earn freedom progressively. Cosmetics should feel earned, not purchased. Realm titles are earned trophies; class evolution is a milestone reward.

## Requirements Trace

- R1. Dashboard avatar shows kid's actual hero class emoji, not a hardcoded wizard
- R2. Avatar has 3 visual tiers (tier 1 = base, tier 2 = L5+, tier 3 = L10+) expressed as border/glow intensity on the avatar card
- R3. Class evolves at L5 and L10 — new class name shown on dashboard and announced on UnlockScreen
- R4. Each of the 6 realms grants a title suffix on completion; kid can cycle through earned titles on the dashboard
- R5. Active title persisted to DB and auto-set to the newly earned title when a realm badge is awarded
- R6. Class evolution detection is non-fatal — never blocks lesson completion
- R7. `CHARACTER_CLASSES` extracted to `lib/` to eliminate duplication across `onboard/` and `parent/`

## Scope Boundaries

- No pixel art assets — emoji-based only in this batch; art upgrade is a future concern
- No purchase or unlock mechanism — all cosmetics are earned, never bought
- No parent-visible title/evolution UI in this batch — parent dashboard unchanged
- Title cycling is tap-to-advance (circular), not a full picker modal
- No second class branch or class-change mechanic — evolution is linear per class
- No sound effect additions — reuse existing `sfx()` calls; new sounds are separate work

## Context & Research

### Relevant Code and Patterns

- `lib/types.ts:248` — `HeroClass` union type; `PlayerProfile.heroClass` currently typed `string`
- `supabase/migrations/001_init.sql` — `users.hero_class TEXT CHECK(...)` with 6 values
- `character_stats` schema — `total_xp, current_level, streak_days, last_active_at, last_session_date` — no title or evolution fields
- `app/page.tsx:43–111` — `PlayerHeader` component; avatar slot hardcodes 🧙, ignores `profile.heroClass`
- `app/onboard/page.tsx:10–17` — class emoji/label map (duplicated)
- `app/parent/page.tsx:12` — same class emoji/label map (duplicated)
- `lib/types.ts:251–285` — `XP_PER_LEVEL` array + `calculateLevel()` — level thresholds live here
- `lib/progress.ts` — `completeLesson()` orchestration; pre-read block at top extends to new columns
- `lib/badges.ts` — `checkAndAwardBadges()` — realm completion detection; title auto-set hooks here
- `components/UnlockScreen.tsx` — animated stat cards; `motion.div` + `rpg-card` + sequential delay pattern
- `content/realms.ts` — 6 realm definitions with slugs: `apprentices-tower`, `scribes-library`, `frontend-realm`, `backend-dungeons`, `artificers-workshop`, `grand-quest`

### Institutional Learnings

- **Non-fatal side-effects** (`docs/solutions/best-practices/non-fatal-side-effects-in-transaction-paths-2026-04-06.md`): All evolution detection and title-set calls added to `completeLesson()` must be individually wrapped in `try/catch`. Never add them to `Promise.all` with critical writes. Migration-gated columns (new `active_title`) are especially dangerous — migration may not be applied in all environments.
- **Pre-read pattern** (`docs/solutions/best-practices/pre-read-pattern-before-transactional-writes-2026-04-07.md`): Level pre-read for evolution threshold detection must extend the existing `Promise.all` pre-read block at the top of `completeLesson()`, before any writes.
- **AnimatePresence counter key** (`docs/solutions/ui-bugs/animate-presence-boolean-toggle-no-retrigger.md`): Evolution card on UnlockScreen must use a counter key, not a boolean, if it can fire on back-to-back completions.
- **Data state vs VFX timing** (`docs/solutions/ui-bugs/boss-battle-hp-desynced-from-answer-flash.md`): Update `currentClass` / `currentTitle` state immediately; put fanfare into the delay only.

## Key Technical Decisions

- **Evolved class is computed, not stored**: `getEvolvedClassName(heroClass, level)` derives the display name at render time from `hero_class` (stored) + `current_level` (stored). No new DB column — avoids a migration and a write on every level-up.
- **Avatar tier is computed from level**: `getAvatarTier(level)` → 1/2/3. Applied as CSS class (`avatar-tier-1/2/3`) — border width and glow color change per tier. No DB storage.
- **Active title requires storage**: `active_title TEXT` on `character_stats` (nullable). Computed titles could drift if realm data changes; persisting the active choice is safer and enables future picker UI.
- **Title auto-set on badge award**: `checkAndAwardBadges()` already detects realm completion and inserts `user_badges`. Extend it to also `UPDATE character_stats SET active_title = <new title>` non-fatally — natural home, no new call site.
- **Title cycle via server action**: Tapping the title on the dashboard calls a new `setActiveTitle(userId, title)` server action — thin wrapper over a single UPDATE. Optimistic UI update on the client.
- **`CHARACTER_CLASSES` extracted to `lib/classes.ts`**: Needed by both server-side badge/title logic and client-side rendering. Single source of truth.

## Open Questions

### Resolved During Planning

- **Store evolved class?** No — computed from existing `hero_class` + `current_level`. Zero migration risk.
- **Title storage location?** `character_stats` (not `users`) — `character_stats` is the mutable progression table; `users` holds identity. Consistent with streak, level, XP.
- **Realm structure ready?** Yes — issue #41 closed; `content/realms.ts` has all 6 realms.
- **Level thresholds for evolution?** Two tiers: first evolution at L5, second at L10. Matches the existing 15-level ladder without too-early or too-late payoffs. Defined as constants in `lib/classes.ts`.

### Deferred to Implementation

- **Evolved class names**: All six classes resolved:
  - Wizard: L5→Mage, L10→Archmage
  - Knight: L5→Warrior, L10→Paladin
  - Elf: L5→Ranger, L10→Sylvan Sage
  - Ninja: L5→Shinobi, L10→Shadow Master
  - Hero: L5→Champion, L10→Legend
  - Merfolk: L5→Tide Caller, L10→Sea Sovereign
- **Exact CSS for tier glow**: Avatar tier border/glow values (`avatar-tier-2`, `avatar-tier-3`) are design decisions — implementer uses existing `xp-purple`, `gold-accent` tokens.
- **Title text per realm**: Implementer defines in `lib/classes.ts` alongside realm slugs from `content/realms.ts`. Issue lists examples: "Git Guardian", "Terminal Sage", "Database Oracle".

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

```
lib/classes.ts (new)
  CHARACTER_CLASSES[]       ← extracted from onboard + parent pages
  CLASS_EVOLUTIONS{}        ← { heroClass: [{ level: 5, name }, { level: 10, name }] }
  REALM_TITLES{}            ← { realmSlug: "Title Suffix" }
  getAvatarTier(level)      → 1 | 2 | 3
  getEvolvedClassName(...)  → display string
  getAvailableTitles(badges[]) → string[]

character_stats (DB)
  + active_title TEXT       ← new column (migration 007)

PlayerProfile (type)
  heroClass: HeroClass      ← tighten from string
  avatarTier: 1|2|3         ← computed, added to profile
  evolvedClassName: string  ← computed, added to profile
  activeTitle?: string      ← from character_stats.active_title
  availableTitles: string[] ← derived from user_badges at load time

completeLesson() flow
  pre-read: [...existing, + current_level]  ← add to existing Promise.all (not currently fetched)
  [... writes: award_xp (returns void — no level data), updateStreak ...]
  post-write stats SELECT: already exists, provides newLevel (current_level after writes)
  checkEvolution(preLevelForEvolution, newLevel) → non-fatal, returns classEvolved?
  LessonCompletionResult += classEvolved?: { from, to }, newTitle?: string

checkAndAwardBadges()
  existing: insert user_badges
  new (non-fatal): UPDATE character_stats SET active_title = REALM_TITLES[realmSlug]

UnlockScreen
  + classEvolved card (after Level card, before Score Tier)

PlayerHeader (dashboard)
  avatar: emoji from CHARACTER_CLASSES[heroClass] + tier CSS
  title: activeTitle displayed below hero name, tap cycles
```

## Implementation Units

- [x] **Unit 1: `lib/classes.ts` — shared class/title constants and helpers**

**Goal:** Single source of truth for all hero class metadata, evolution tiers, realm titles, and derived display helpers.

**Requirements:** R3, R4, R7

**Dependencies:** None

**Files:**
- Create: `lib/classes.ts`
- Modify: `app/onboard/page.tsx` (import from lib instead of inline array)
- Modify: `app/parent/page.tsx` (import from lib instead of inline array)
- Test: `tests/classes.test.ts`

**Approach:**
- Export `CHARACTER_CLASSES` array matching current inline definitions (emoji, label, value per class)
- Export `CLASS_EVOLUTIONS` — keyed by `HeroClass`, each entry is an ordered array of `{ level: number, name: string }` thresholds
- Export `REALM_TITLES` — keyed by realm slug (matching `content/realms.ts`), value is title suffix string
- Export `getAvatarTier(level: number): 1 | 2 | 3` — level < 5 = 1, level < 10 = 2, else 3
- Export `getEvolvedClassName(heroClass: HeroClass, level: number): string` — returns current evolution name or base class label if no threshold crossed
- Export `getAvailableTitles(badges: { slug: string }[]): string[]` — accepts `EarnedBadge[]` shape (field is `slug`, not `badge_slug`); maps to `REALM_TITLES` values, filters missing. **Note: `REALM_TITLES` must be typed `Record<string, string>` keyed by realm slug strings (e.g. `'apprentices-tower'`), NOT by `RealmId` numeric values — do not follow the `REALM_BADGES` pattern which uses numeric keys.**
- `getEvolvedClassName` must handle an unrecognized `heroClass` gracefully — return the base class label string, not `undefined`, if the class is not found in `CLASS_EVOLUTIONS`. Never throw or return `undefined`.
- Update `app/onboard/page.tsx` and `app/parent/page.tsx` to import from `lib/classes.ts`; behavior unchanged

**Patterns to follow:**
- `lib/types.ts:251–267` — `XP_PER_LEVEL` constant array pattern
- `content/realms.ts` — realm slug naming conventions to match in `REALM_TITLES` keys (string slugs, not numeric IDs)

**Test scenarios:**
- Happy path: `getAvatarTier(1)` → 1; `getAvatarTier(4)` → 1; `getAvatarTier(5)` → 2; `getAvatarTier(9)` → 2; `getAvatarTier(10)` → 3; `getAvatarTier(15)` → 3
- Happy path: `getEvolvedClassName("wizard", 4)` → base wizard label; `getEvolvedClassName("wizard", 5)` → "Archmage"; `getEvolvedClassName("wizard", 10)` → second evolution name
- Happy path: `REALM_TITLES['apprentices-tower']` returns a non-undefined string
- Happy path: `getAvailableTitles([{ slug: "apprentices-tower" }])` → array with that realm's title
- Edge case: `getAvailableTitles([])` → empty array
- Edge case: `getAvailableTitles([{ slug: "unknown-realm" }])` → empty array (no crash)
- Edge case: `getEvolvedClassName("wizard", 0)` → base label (no negative or null tier)
- Edge case: `getEvolvedClassName("unknownclass" as HeroClass, 5)` → returns a non-undefined string (safe fallback, no crash)

**Verification:**
- Onboard and parent pages render class options identically after refactor
- All helper functions return correct values for boundary levels (4, 5, 9, 10)

---

- [x] **Unit 2: Migration 007 — `active_title` column**

**Goal:** Persist the kid's active realm title to DB.

**Requirements:** R5

**Dependencies:** None

**Files:**
- Create: `supabase/migrations/007_active_title.sql`

**Approach:**
- `ALTER TABLE character_stats ADD COLUMN IF NOT EXISTS active_title TEXT DEFAULT NULL`
- No backfill needed — existing users get `NULL`, which renders as "no title" on dashboard
- Register in `supabase_migrations.schema_migrations` after applying
- Apply via: `psql postgresql://postgres:postgres@localhost:55122/postgres -f supabase/migrations/007_active_title.sql`

**Patterns to follow:**
- `supabase/migrations/005_badges.sql` — header comment style, `IF NOT EXISTS` pattern

**Test expectation:** none — pure DDL; verified by successful migration application and column existence check

**Verification:**
- Column `active_title TEXT` exists on `character_stats`
- Existing rows have `NULL` for `active_title`
- `UPDATE character_stats SET active_title = 'Git Guardian' WHERE user_id = ...` succeeds

---

- [x] **Unit 3: Extend `PlayerProfile` + `loadDashboard`**

**Goal:** Surface avatar tier, evolved class name, active title, and available titles in the profile type used by dashboard and lesson page.

**Requirements:** R1, R2, R3, R4, R5

**Dependencies:** Units 1, 2

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/progress.ts` (rowsToProfile / loadDashboard)
- Test: `tests/progress.test.ts`

**Approach:**
- Tighten `PlayerProfile.heroClass` from `string` to `HeroClass`
- Add to `PlayerProfile`: `avatarTier: 1 | 2 | 3`, `evolvedClassName: string`, `activeTitle: string | null`, `availableTitles: string[]`
- In `rowsToProfile`, compute `avatarTier` and `evolvedClassName` using helpers from `lib/classes.ts`. `badgeRows` is already in scope here — pass them to `getAvailableTitles()` to populate `availableTitles` (do NOT add a duplicate badge fetch in `loadDashboard`).
- The SELECT in `getProfile` must be extended to include `active_title` from `character_stats`. A try/catch alone is insufficient — if the column is not in the SELECT, `stats.active_title` will always be `undefined` regardless of DB state. Wrap the SELECT extension itself in a try/catch so a missing column (migration not yet applied) silently returns `null` rather than crashing.
- Add a runtime `HeroClass` type guard in `rowsToProfile` when mapping `user.hero_class` (typed `string` from DB): validate against the known values array and fall back to `'wizard'` if unrecognized. Do not use a blind `as HeroClass` cast.
- `makeEmptyProfile` sets `heroClass: 'wizard'` — this is fine; ensure it uses the `HeroClass` type annotation after tightening.

**Patterns to follow:**
- Existing `daysAway` computation pattern in `loadDashboard` (added in PR #44) — same shape: read → compute → attach to profile
- Pre-read non-fatal pattern for migration-gated columns

**Test scenarios:**
- Happy path: level 5 kid → `avatarTier === 2`, `evolvedClassName` reflects first evolution
- Happy path: kid with 2 realm badges → `availableTitles.length === 2`
- Happy path: `activeTitle` returns the stored value from `character_stats.active_title`
- Edge case: `active_title` column missing (migration not applied) → `activeTitle === null`, no crash
- Edge case: `heroClass` value not in `HeroClass` union (legacy data) → safe fallback to base label

**Verification:**
- `PlayerProfile` fields present and correctly typed
- Dashboard renders with correct avatar tier and title for a test user

---

- [x] **Unit 4: Fix `PlayerHeader` avatar + title display**

**Goal:** Dashboard profile card shows kid's actual hero class emoji with tier-based visual treatment and active realm title.

**Requirements:** R1, R2, R4

**Dependencies:** Unit 3

**Files:**
- Modify: `app/page.tsx` (`PlayerHeader` component, lines 43–111)

**Approach:**
- Replace hardcoded `🧙` with `CHARACTER_CLASSES.find(c => c.value === profile.heroClass)?.emoji ?? '🧙'`
- Apply `avatar-tier-{profile.avatarTier}` CSS class to the avatar container — tier 1 = current default border, tier 2 = brighter border, tier 3 = gold glow
- Add `avatar-tier-1/2/3` utility classes to `globals.css` (or use Tailwind inline — whichever matches existing patterns)
- Below the hero name, show `profile.evolvedClassName` as a subtitle line (replaces or supplements raw class label)
- If `profile.activeTitle` exists, render it as a tappable badge next to the hero name — clicking advances to the next available title (circular, calls `setActiveTitle` server action)
- Optimistic UI: update local state immediately on tap, server action runs in background (fire-and-forget)
- If `profile.availableTitles.length <= 1`, title is not tappable (no cycling needed)

**Patterns to follow:**
- `ComebackBanner` in `app/page.tsx` — inline component definition pattern
- `app/page.tsx:440–441` — conditional render with `profile.role === "child"` guard (title display is child-only)
- Fire-and-forget server action pattern from `app/lesson/[slug]/page.tsx` (plain async, no `startTransition`)

**Test scenarios:**
- Happy path: knight kid at L1 → sees 🪖 with tier-1 border styling
- Happy path: wizard kid at L5 → sees 🧙 with tier-2 border, "Archmage" subtitle
- Happy path: kid with 1 realm title → title badge shown, tapping cycles (wraps back if only 1, no-op)
- Happy path: kid with 2+ titles → tap cycles forward through `availableTitles`
- Edge case: `heroClass` missing from `CHARACTER_CLASSES` map → falls back to 🧙, no crash
- Edge case: `activeTitle === null` → no title badge rendered, no empty string shown
- Edge case: parent account → no title badge (role guard)

**Verification:**
- Avatar emoji matches kid's chosen class
- Tier-2 and tier-3 kids have visually distinct avatar card treatment
- Title tap cycles to next title and persists after page reload

---

- [x] **Unit 5: `setActiveTitle` server action**

**Goal:** Persist the kid's active title choice via a server action.

**Requirements:** R4, R5

**Dependencies:** Unit 2

**Files:**
- Modify: `app/actions/progress.ts`
- Modify: `lib/progress.ts`
- Test: `tests/progress.test.ts`

**Approach:**
- Add `setActiveTitle(userId: string, title: string): Promise<void>` to `lib/progress.ts` — single `UPDATE character_stats SET active_title = $title WHERE user_id = $userId`
- Validate `title` against the user's earned titles: fetch `user_badges` for `userId` inside the server function, call `getAvailableTitles(badges)`, check that `title` is in the result. If not in the user's earned titles, no-op with `console.warn`. Do NOT validate against `Object.values(REALM_TITLES)` alone — a title must be earned, not just be a valid title string.
- Add thin server action wrapper in `app/actions/progress.ts` with `"use server"` directive
- Client calls fire-and-forget (no await in UI path)

**Patterns to follow:**
- `app/actions/events.ts` — thin `"use server"` delegation pattern
- Existing single-row UPDATE patterns in `lib/progress.ts`

**Test scenarios:**
- Happy path: valid earned title → `character_stats.active_title` updated in DB
- Edge case: title is a valid `REALM_TITLES` value but not earned by the user → no-op, no DB write, console.warn logged
- Edge case: title not in user's available titles → no-op, no DB write, console.warn logged
- Edge case: empty string title → no-op
- Error path: DB update fails → function returns without throwing, error logged

**Verification:**
- `character_stats.active_title` reflects the new value after calling `setActiveTitle`
- Invalid titles are rejected without DB writes

---

- [x] **Unit 6: Class evolution detection in `completeLesson()`**

**Goal:** Detect when a lesson completion causes the player's level to cross an evolution threshold, surface it in `LessonCompletionResult`.

**Requirements:** R3, R6

**Dependencies:** Unit 1

**Files:**
- Modify: `lib/progress.ts`
- Modify: `lib/types.ts`
- Test: `tests/progress.test.ts`

**Approach:**
- **Pre-read**: `current_level` is NOT currently fetched in the existing `Promise.all` pre-read block (which selects only `last_session_date` from `character_stats`). Add `current_level` to that SELECT. Store as `preLevelForEvolution`. This is the baseline before any writes.
- **Post-write level source**: `award_xp` RPC returns void — it does NOT return the new level. The new level is available from the existing post-write `character_stats` SELECT that already runs at the end of `completeLesson()`. Use that result's `current_level` as `newLevel`. Do NOT attempt to read level from `award_xp`'s return value.
- Compute `oldEvolution = getEvolvedClassName(heroClass, preLevelForEvolution)` and `newEvolution = getEvolvedClassName(heroClass, newLevel)`.
- If `oldEvolution !== newEvolution`, set `classEvolved = { from: oldEvolution, to: newEvolution }` in the result.
- Entire detection block wrapped in its own try/catch — on failure, `classEvolved` is omitted, lesson completes normally.
- Extend `LessonCompletionResult` with `classEvolved?: { from: string; to: string }`.

**Patterns to follow:**
- Existing `firstAttemptBonus` detection in `completeLesson()` — same pre-read + post-write compare shape
- Non-fatal side-effect pattern from `docs/solutions/best-practices/non-fatal-side-effects-in-transaction-paths-2026-04-06.md`

**Test scenarios:**
- Happy path: lesson completion takes player from L4 to L5 → `classEvolved` populated with correct from/to names
- Happy path: lesson completion within same tier (L5→L6) → `classEvolved` is undefined
- Happy path: both first-attempt bonus and class evolution in same completion → both fields present in result
- Edge case: second evolution (L9→L10) → `classEvolved` reflects the second threshold
- Edge case: pre-read of current_level fails → `classEvolved` omitted, lesson completes, no crash
- Error path: evolution detection throws → caught, `classEvolved` undefined in result

**Verification:**
- `LessonCompletionResult.classEvolved` populated when level crosses L5 or L10
- Lesson completion succeeds regardless of evolution detection failures

---

- [x] **Unit 7: UnlockScreen class evolution card**

**Goal:** Show a celebration card on the unlock screen when the kid's class evolves.

**Requirements:** R3

**Dependencies:** Units 1, 6

**Files:**
- Modify: `components/UnlockScreen.tsx`
- Modify: `app/lesson/[slug]/page.tsx` (pass `classEvolved` through to `unlockData`)

**Approach:**
- Extend `UnlockScreenProps` with `classEvolved?: { from: string; to: string }`
- Pass `classEvolved` from `LessonCompletionResult` through `handleQuizComplete` → `unlockData` → `UnlockScreen`
- New card slots after the Level card. Level is currently at delay `0.15`, Streak at `0.3`, Score Tier at `0.45`. Inserting the evolution card between Level and Streak shifts all subsequent hardcoded delays by `+0.15`. **Audit and renumber every hardcoded delay in `UnlockScreen.tsx` after insertion.** The badge delay formula also references `bonusCardCount` — extend it to include `classEvolved ? 1 : 0` to prevent badge cards overlapping with other bonus cards.
- Card content: shows "EVOLVED!" label, `from → to` display, purple/gold accent.
- Use counter key on the card's `AnimatePresence` wrapper (per `animate-presence-boolean-toggle-no-retrigger` learning).
- Also extend `UnlockScreenProps` and `LessonCompletionResult` with `newTitle?: string` — pass through from `checkAndAwardBadges` (via the badge result) when a realm badge auto-sets a new title. Show a "NEW TITLE!" card on the UnlockScreen when `newTitle` is present so the kid knows their title changed before returning to the dashboard.
- Play existing `sfx("level-up")` or equivalent on card reveal — reuse, don't add new SFX.

**Patterns to follow:**
- First-attempt bonus card in `UnlockScreen.tsx` — same `rpg-card` + `motion.div` + spring animation pattern
- Counter key pattern from `docs/solutions/ui-bugs/animate-presence-boolean-toggle-no-retrigger.md`

**Test scenarios:**
- Happy path: `classEvolved` present → "EVOLVED!" card appears between Level and Score Tier cards
- Happy path: `from → to` text shows both names correctly
- Edge case: `classEvolved` absent → no extra card, existing layout unchanged
- Edge case: back-to-back completions (replay immediately after evolution) → animation re-fires correctly via counter key

**Verification:**
- Visual: evolution card animates in at correct sequence position
- Evolution card absent on normal completions with no threshold crossing
- Layout intact with all bonus cards present simultaneously (first attempt + comeback + evolution)

---

- [x] **Unit 8: Auto-set title on realm badge award**

**Goal:** When a realm badge is awarded, automatically set `active_title` to the newly earned realm's title.

**Requirements:** R5

**Dependencies:** Units 1, 2

**Files:**
- Modify: `lib/badges.ts`
- Test: `tests/badges.test.ts`

**Approach:**
- In `checkAndAwardBadges()`, after inserting a new `user_badges` row, the loop variable is `realmId` (numeric `RealmId` 1–6). To get the slug, call `realms.find(r => r.id === realmId)?.slug` — this is the string slug that matches `REALM_TITLES` keys. Then call `REALM_TITLES[slug]` to get the title string.
- Attempt `UPDATE character_stats SET active_title = <titleString>` — wrapped in its own try/catch (non-fatal).
- Only fires when a badge is newly inserted (not on repeat calls for already-earned badge).
- If `slug` is undefined or not in `REALM_TITLES`, log `console.warn` and skip the DB write — do not throw.
- Return the `newTitle` string from `checkAndAwardBadges()` (add to its return type) so `completeLesson()` can include it in `LessonCompletionResult` for the UnlockScreen (see Unit 7).

**Patterns to follow:**
- Existing badge insert + try/catch pattern in `lib/badges.ts`
- Non-fatal side-effect isolation from `docs/solutions/best-practices/non-fatal-side-effects-in-transaction-paths-2026-04-06.md`

**Test scenarios:**
- Happy path: first time completing a realm → `character_stats.active_title` updated to that realm's title; `newTitle` returned from function
- Happy path: completing a second realm → `active_title` updated to the new realm's title (overwrite previous); new `newTitle` returned
- Edge case: `realmId` has no matching realm in `content/realms.ts` → no DB write, no crash, console.warn
- Edge case: realm slug not in `REALM_TITLES` → no DB write, no crash, console.warn
- Edge case: badge already previously earned (repeat call) → title update skipped, `newTitle` is undefined
- Error path: title UPDATE fails → badge still inserted successfully, no crash propagation

**Verification:**
- `character_stats.active_title` matches the latest earned realm title after lesson completion
- Badge award succeeds even when title update is unavailable
- `newTitle` flows through to `LessonCompletionResult` and appears on UnlockScreen when realm is earned

## System-Wide Impact

- **Interaction graph:** `completeLesson()` gains pre-read extension + evolution detection (non-fatal). `checkAndAwardBadges()` gains title auto-set (non-fatal). `loadDashboard()` gains avatar tier, evolved name, title fields. `PlayerHeader` gains avatar + title rendering.
- **Error propagation:** All new logic (evolution detection, title auto-set, title cycle) is non-fatal. No new failure mode can block lesson completion or badge award.
- **State lifecycle risks:** Title auto-set on badge award overwrites previous title — intentional (latest realm = active). Kid can correct via cycle on dashboard. No irreversible state.
- **API surface parity:** `LessonCompletionResult` gains optional `classEvolved`. `PlayerProfile` gains `avatarTier`, `evolvedClassName`, `activeTitle`, `availableTitles`. Both are backward-compatible additions (new optional fields).
- **Unchanged invariants:** XP award, streak, badge insert, lesson unlock flow — all unchanged. New code adds parallel cosmetic side-effects only.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| `active_title` column absent from SELECT if migration not applied | SELECT in `getProfile` must include `active_title`; wrap in try/catch so missing column returns `null` not a crash. |
| `CHARACTER_CLASSES` refactor breaks onboard/parent class selection | Unit 1 is a pure extraction — behavior identical, just imported from lib. Verified by test scenarios. |
| Evolution detection uses wrong level source | `award_xp` RPC returns void. New level must come from the post-write `character_stats` SELECT, not from RPC return value. Explicitly documented in Unit 6. |
| `REALM_TITLES` keyed by number instead of string slug | Must be `Record<string, string>` keyed by realm slug. Documented explicitly in Unit 1. Distinct from `REALM_BADGES` which uses numeric `RealmId`. |
| Title auto-overwrite discards kid's explicit choice silently | `newTitle` now surfaces on UnlockScreen via Unit 7 so the kid sees the change before returning to dashboard. |
| `getAvailableTitles` badge field mismatch | Function signature uses `{ slug: string }[]` matching `EarnedBadge` type — not `{ badge_slug: string }[]`. Documented in Unit 1. |
| `heroClass` type blind cast introduces runtime 'undefined' | Runtime type guard in `rowsToProfile` validates against known values, falls back to `'wizard'`. Documented in Unit 3. |
| Emoji rendering differs across devices/OS versions | Acceptable — all existing emoji use follows same pattern. Not a regression. |

## Sources & References

- Related issue: #37
- Key files: `lib/types.ts`, `lib/progress.ts`, `lib/badges.ts`, `app/page.tsx`, `components/UnlockScreen.tsx`
- Learnings: `docs/solutions/best-practices/non-fatal-side-effects-in-transaction-paths-2026-04-06.md`
- Learnings: `docs/solutions/best-practices/pre-read-pattern-before-transactional-writes-2026-04-07.md`
- Learnings: `docs/solutions/ui-bugs/animate-presence-boolean-toggle-no-retrigger.md`
