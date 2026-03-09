---
title: "Tier 3: Supabase DB, Identity, Parent Dashboard, Real Unlock"
type: feat
date: 2026-03-09
deepened: 2026-03-09
issues: [21, 22, 23, 24]
---

# Tier 3: Supabase DB, Identity, Parent Dashboard, Real Unlock

## Enhancement Summary

**Deepened:** 2026-03-09 · 12 parallel research, review, and skills agents

### Critical Fixes Required Before Implementation

1. **`UNIQUE` on `xp_transactions` is broken for NULL `lesson_slug`** — PostgreSQL treats `NULL != NULL`; `streak_bonus` events will double-insert silently. Replace with two partial unique indexes.
2. **`server-only` package not installed** — `lib/supabase.ts` has no import guard; service role key could leak into client bundle. `npm install server-only`, add `import 'server-only'` as first line.
3. **`createChild()` is not atomic** — try/catch doesn't roll back committed rows; use a `create_child()` plpgsql DB function (migration 003).
4. **`hero_class` CHECK constraint covers 3 values; HeroNameSetup offers 6** — expand to `('wizard','knight','elf','ninja','hero','merfolk')`.
5. **`in-progress` rename touches 5 callsites, not 4** — `app/lesson/[slug]/page.tsx:64` writes `status: "in-progress"` and is missing from the plan's modified-files list.
6. **`award_xp()` has a read-then-write race** — collapse `SELECT total_xp + p_amount` + `UPDATE` into a single atomic `UPDATE ... SET total_xp = total_xp + p_amount`.
7. **Missing FK indexes** — `users.parent_id`, `lesson_progress.user_id`, `xp_transactions.user_id` are unindexed.

### Key Architectural Improvements

- Add `import 'server-only'` to `lib/supabase.ts` (build-time guard, not runtime)
- Split `lib/progress.ts` into server module (Supabase queries) + `lib/progress-client.ts` (localStorage reads) — `"use client"` removal is a prerequisite, not a Phase 3 step
- Use `useTransition` + `startTransition` for Server Action calls from `useEffect` (pending state, no UI blocking)
- Introduce `UserSession` type separate from `PlayerProfile` (email is a login credential, not a game stat)
- `lookupUser` should return `LookupResult` discriminated union, not `PlayerProfile | null`
- Use `useActiveUser` hook to centralize `kidkode:activeUserId` / `kidkode:activeEmail` localStorage reads with `mounted` flag (prevents SSR hydration mismatch)
- Sign Out: use `localStorage.removeItem('kidkode:activeUserId')` — NOT `localStorage.clear()` (clears audio prefs)

### Simplification Options (Evaluated)

The simplicity review surfaced options to flatten `character_stats` into `users` and drop `xp_transactions`. **Decision: keep the plan as-is.** The `character_stats` separation keeps game stats queryable independently. The `xp_transactions` idempotency via UNIQUE is the correct fix for the double-XP problem at any scale. The NULL UNIQUE constraint bug (Finding 1 above) must be fixed regardless.

---

## Overview

Replace localStorage-only persistence with Supabase, add email-based identity (no passwords, no magic links — email IS the identity), build a parent progress dashboard, and implement a real lesson unlock mechanism.

**Current state:** 100% client-side. All progress in a single JSON blob at `localStorage["kidkode_progress"]`. One kid per browser, no parent visibility, unlock is cosmetic only.

**Target state:** Each family member enters their email to "log in." The system looks up their profile, determines whether they're a parent or child, and loads their data. Progress persists in Supabase across devices. Parents see all kids' progress. Lesson unlocks are server-enforced.

**Auth model (simplified):** No Supabase Auth, no magic links, no JWT, no middleware. Email = identity. Parents create child accounts from the parent dashboard. A child enters their email, the app looks up their profile, done. `activeEmail` stored in `localStorage`. All DB queries run via Server Actions using the service role key — RLS not needed for a private family app.

---

## Decisions Made

| Decision | Choice |
|---|---|
| Auth model | Email-as-identity only. No Supabase Auth. No passwords. No magic links. |
| Level formula | Threshold array (`lib/types.ts:171`) stays authoritative. DB `award_xp()` updated to match. |
| No child selected (new device) | Redirect to `/parent` — parent explicitly picks a child |
| Lesson replay | Allowed. XP not re-awarded if already completed. |
| `lesson_progress.status` | Underscore: `in_progress` (not `in-progress`) — `lib/types.ts:137` updated |
| RLS | Intentionally disabled for private family app; service role key used in all Server Actions |
| `character_stats` | Separate table (not flattened into `users`) — keeps game stats independently queryable |
| `xp_transactions` | Keep for idempotency; fix NULL UNIQUE bug with partial indexes |
| `hero_class` CHECK | Expand to all 6 UI classes: `('wizard','knight','elf','ninja','hero','merfolk')` |
| localStorage keys | Colon-namespaced: `kidkode:activeUserId`, `kidkode:activeEmail` (matches AudioManager convention) |
| `lookupUser` return | Discriminated union `LookupResult = {found:true;profile} | {found:false}` — not `null` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Remove entirely** — no client-side Supabase calls planned; anon key unused |
| `createChild` atomicity | plpgsql DB function `create_child()` (migration 003) — not try/catch in Server Action |

---

## Acceptance Criteria

### #21 — Database Backend

- [ ] All lesson progress reads/writes go through Supabase (not localStorage)
- [ ] `lib/progress.ts` functions become `async` wrappers over Supabase queries
- [ ] Progress persists across devices and browsers
- [ ] `lesson_progress.status` uses underscore enum: `locked | available | in_progress | completed`
- [ ] `lib/types.ts:137` updated to match (`in-progress` → `in_progress`)
- [ ] Audio preferences (`kidkode:audio:muted`, `kidkode:audio:volume`) stay in localStorage (device preference — intentional)
- [ ] "Reset Progress" footer button (`app/page.tsx:481-490`) replaced with "Sign Out" (clears `activeEmail` from localStorage, redirects to `/login`)
- [ ] `tmp/` added to `.gitignore`

### #23 — Identity + Multi-Kid Support

- [ ] `/login` page: email input only. Submit → lookup in `users` table → if found, load profile; if not found, run onboarding
- [ ] Onboarding (new parent): HeroNameSetup asks name, class, and "I'm a parent / I'm a kid" — if parent, role set to `parent`
- [ ] `activeEmail` and `activeUserId` stored in `localStorage` — persists across page loads, cleared on sign-out
- [ ] Parent creates all child accounts from `/parent` dashboard: enters kid's email + hero name + class → inserts `users` row with `role='child'` and `parent_id` pointing to parent
- [ ] `hasCustomName()` gate in `app/page.tsx:329` replaced with: check `localStorage.activeEmail` → if missing, redirect to `/login`
- [ ] `characterClass` persisted for all users (currently lost at `HeroNameSetup.tsx:103`)
- [ ] `createChild()` Server Action atomically inserts `users` row + `character_stats` row + first `lesson_progress` row (`status='available'`, lesson `order=1`)
- [ ] Child-switcher in dashboard header (visible to parent only): shows avatar + name for each child; clicking sets `activeUserId` in `localStorage`

### #22 — Parent Dashboard

- [ ] `/parent` route exists, accessible only when `activeEmail` belongs to a `role='parent'` user
- [ ] Lists all children with: hero name, class, level, XP, streak, last active, lessons completed
- [ ] Clicking a child navigates to `/parent/[childId]` — lesson-by-lesson progress grid
- [ ] "Add child" on `/parent`: form (email + hero name + class) → calls `createChild()` → child appears in list
- [ ] "Unlock next lesson" button on `/parent/[childId]` → `forceUnlockLesson(childId)` Server Action
- [ ] "Back to [ChildName]'s Dashboard" link → sets `activeUserId` to that child, redirects to `/`

### #24 — Real Unlock Mechanism

- [ ] Unlock gate enforced server-side via `checkAndUnlockNextLesson(userId)` Server Action
- [ ] Time gate: **same-calendar-day reset** — one new lesson available per calendar day (generous for kids who play in the evening)
- [ ] `checkAndUnlockNextLesson` called on every dashboard load (cheap: single DB query)
- [ ] Parent can force-unlock next lesson from `/parent/[childId]` at any time
- [ ] Missing `lesson_progress` rows treated as `locked`

---

## Schema

```sql
-- supabase/migrations/001_init.sql

-- All users: parents and children in one table
CREATE TABLE public.users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  hero_name   TEXT NOT NULL,
  hero_class  TEXT NOT NULL DEFAULT 'wizard'
              CHECK (hero_class IN ('wizard', 'knight', 'elf', 'ninja', 'hero', 'merfolk')),
  role        TEXT NOT NULL DEFAULT 'child'
              CHECK (role IN ('parent', 'child')),
  parent_id   UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Character stats per user
CREATE TABLE public.character_stats (
  user_id        UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  total_xp       INT NOT NULL DEFAULT 0,
  current_level  INT NOT NULL DEFAULT 1,
  streak_days    INT NOT NULL DEFAULT 0,
  last_active_at TIMESTAMPTZ,
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- Lesson progress per user
CREATE TABLE public.lesson_progress (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_slug   TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'locked'
                CHECK (status IN ('locked', 'available', 'in_progress', 'completed')),
  xp_earned     INT NOT NULL DEFAULT 0,
  score         INT,
  attempts      INT NOT NULL DEFAULT 0,
  section_index INT NOT NULL DEFAULT 0,
  completed_at  TIMESTAMPTZ,
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_slug)
);

-- XP transaction log
CREATE TABLE public.xp_transactions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount      INT NOT NULL CHECK (amount > 0),
  reason      TEXT NOT NULL,  -- 'lesson_complete' | 'boss_defeat' | 'streak_bonus'
  lesson_slug TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
  -- NOTE: UNIQUE constraint replaced with two partial indexes below (NULL safety)
);

-- FK indexes (Postgres does NOT auto-index FK columns on referencing tables)
CREATE INDEX idx_users_parent_id ON public.users (parent_id);
CREATE INDEX idx_lesson_progress_user_id ON public.lesson_progress (user_id);
CREATE INDEX idx_xp_transactions_user_id ON public.xp_transactions (user_id);

-- XP idempotency: TWO partial indexes instead of one UNIQUE — required because
-- NULL != NULL in Postgres UNIQUE constraints; naive UNIQUE(user_id,lesson_slug,reason)
-- silently fails for streak_bonus rows where lesson_slug IS NULL
CREATE UNIQUE INDEX uq_xp_with_lesson
  ON public.xp_transactions (user_id, lesson_slug, reason)
  WHERE lesson_slug IS NOT NULL;
CREATE UNIQUE INDEX uq_xp_no_lesson
  ON public.xp_transactions (user_id, reason)
  WHERE lesson_slug IS NULL;

-- Auto-update triggers for updated_at columns
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_lesson_progress_updated_at
  BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_character_stats_updated_at
  BEFORE UPDATE ON public.character_stats
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

```sql
-- supabase/migrations/002_functions.sql

-- XP award using threshold array to match lib/types.ts:171
-- Thresholds: [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200]
CREATE OR REPLACE FUNCTION public.award_xp(
  p_user_id   UUID,
  p_amount    INT,
  p_reason    TEXT,
  p_lesson    TEXT DEFAULT NULL
) RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Idempotency: skip if this exact transaction already exists
  -- Uses two partial unique indexes (lesson_slug nullable safety — see migration 001)
  INSERT INTO public.xp_transactions (user_id, amount, reason, lesson_slug)
  VALUES (p_user_id, p_amount, p_reason, p_lesson)
  ON CONFLICT ON CONSTRAINT uq_xp_with_lesson DO NOTHING;

  IF p_lesson IS NULL THEN
    INSERT INTO public.xp_transactions (user_id, amount, reason, lesson_slug)
    VALUES (p_user_id, p_amount, p_reason, NULL)
    ON CONFLICT ON CONSTRAINT uq_xp_no_lesson DO NOTHING;
  END IF;

  IF NOT FOUND THEN
    RETURN;  -- duplicate, skip level recalc
  END IF;

  -- Atomic UPDATE (no read-then-write race — avoids XP loss under concurrent calls)
  -- Mirror lib/types.ts XP_PER_LEVEL threshold array — keep in sync manually
  UPDATE public.character_stats SET
    total_xp      = total_xp + p_amount,
    current_level = CASE
      WHEN total_xp + p_amount >= 3200 THEN 10
      WHEN total_xp + p_amount >= 2500 THEN 9
      WHEN total_xp + p_amount >= 1900 THEN 8
      WHEN total_xp + p_amount >= 1400 THEN 7
      WHEN total_xp + p_amount >= 1000 THEN 6
      WHEN total_xp + p_amount >= 700  THEN 5
      WHEN total_xp + p_amount >= 450  THEN 4
      WHEN total_xp + p_amount >= 250  THEN 3
      WHEN total_xp + p_amount >= 100  THEN 2
      ELSE 1
    END,
    last_active_at = now(),
    updated_at     = now()
  WHERE user_id = p_user_id;
END;
$$;
```

---

## File Map

```
New files:
  lib/supabase.ts                    Single Supabase client (service role, server-only)
                                     ⚠ FIRST LINE: `import 'server-only'` — prevents client bundle leak
  lib/progress-client.ts             localStorage reads split from lib/progress.ts (device-local)
  lib/hooks/useActiveUser.ts         Centralizes kidkode:activeUserId / kidkode:activeEmail reads
                                     with mounted flag (SSR hydration safety)
  lib/types.ts (new exports)         UserSession type {userId,email,role}; LookupResult discriminated union;
                                     LessonCompletionResult {level,streak}; LessonProgressPatch (narrowed)
  app/login/page.tsx                 Email input → lookup or onboard
  app/onboard/page.tsx               New parent/child onboarding (HeroNameSetup + role select)
                                     ⚠ MISSING FROM ORIGINAL PLAN — needed for /login → /onboard?email= redirect
  app/parent/page.tsx                Parent dashboard — all kids ("use client")
  app/parent/[childId]/page.tsx      Per-child lesson breakdown ("use client")
  app/actions/progress.ts            completeLesson, updateProgress, checkAndUnlockNextLesson
  app/actions/users.ts               lookupUser (returns LookupResult), upsertUser, createChild,
                                     listChildren, forceUnlockLesson
  supabase/migrations/001_init.sql   Schema + FK indexes + partial unique indexes + updated_at triggers
  supabase/migrations/002_functions.sql  award_xp() DB function (atomic UPDATE, fixed race)
  supabase/migrations/003_create_child.sql  create_child() plpgsql function (atomic 3-row insert)

Modified files:
  lib/progress.ts                    Remove "use client"; all functions → async Supabase queries;
                                     factory fn makeEmptyProfile(userId) for not-found fallback
  lib/types.ts                       in-progress → in_progress; add id/role to PlayerProfile;
                                     new: UserSession, LookupResult, LessonCompletionResult, LessonProgressPatch
  app/page.tsx                       useActiveUser() hook replaces hasCustomName(); async reads;
                                     Sign Out uses removeItem not clear()
  app/layout.tsx                     No provider changes needed (no JWT context)
  app/lesson/[slug]/page.tsx         ⚠ ADD TO MODIFIED FILES: line 64 writes status:"in-progress" → fix;
                                     await all 3 progress callsites; pass activeUserId
  components/HeroNameSetup.tsx       Persist characterClass; accept onSave callback (parent or localStorage)
  .gitignore                         Add tmp/
  package.json                       Add: @supabase/supabase-js, server-only
```

---

## Implementation Phases

### Phase 1: Supabase Setup + Schema

1. `npm install @supabase/supabase-js server-only`
2. Create `lib/supabase.ts`:
   - **First line must be `import 'server-only'`** (build-time guard — prevents service role key from leaking into client bundle)
   - Single `createClient()` with `auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }`
   - Use `process.env.SUPABASE_SERVICE_ROLE_KEY` (never `NEXT_PUBLIC_` prefix)
   - Add runtime guard: `if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set")`
3. Create migrations: `001_init.sql` (schema + FK indexes + partial unique indexes + updated_at triggers) + `002_functions.sql` (`award_xp()` atomic) + `003_create_child.sql` (`create_child()` function)
4. Run `supabase init` + `supabase start`; apply migrations locally
5. Add env vars to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `SUPABASE_SERVICE_ROLE_KEY=...` (**no** `NEXT_PUBLIC_SUPABASE_ANON_KEY` — no client-side Supabase calls planned)
6. Add `tmp/` to `.gitignore`

#### `create_child()` migration (003_create_child.sql)
```sql
CREATE OR REPLACE FUNCTION public.create_child(
  p_parent_id   UUID,
  p_email       TEXT,
  p_hero_name   TEXT,
  p_hero_class  TEXT,
  p_lesson_slug TEXT
) RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  new_user_id UUID;
BEGIN
  INSERT INTO public.users (email, hero_name, hero_class, role, parent_id)
  VALUES (LOWER(TRIM(p_email)), p_hero_name, p_hero_class, 'child', p_parent_id)
  RETURNING id INTO new_user_id;

  INSERT INTO public.character_stats (user_id) VALUES (new_user_id);

  INSERT INTO public.lesson_progress (user_id, lesson_slug, status)
  VALUES (new_user_id, p_lesson_slug, 'available');

  RETURN new_user_id;
END;
$$;
```
Call via `supabase.rpc('create_child', { p_parent_id, p_email, ... })` — all 3 inserts are atomic.

### Phase 2: Email Identity + Onboarding (#23)

**Pre-requisite:** Remove `"use client"` from `lib/progress.ts` BEFORE this phase (in the same commit as Phase 1 schema). `HeroNameSetup` imports `getProfile`/`saveProfile` from it — must be resolved simultaneously, not incrementally.

1. Create `app/login/page.tsx` — single email input; on submit calls `lookupUser(email)` Server Action
   - `lookupUser` returns `LookupResult` discriminated union: `{found:true, profile, session}` or `{found:false}`
   - Found → set `localStorage.setItem('kidkode:activeUserId', id)` + `kidkode:activeEmail`, redirect to `/`
   - Not found → redirect to `/onboard?email=...`
2. Create `app/onboard/page.tsx` — reads `email` from query string; renders HeroNameSetup + role toggle; calls `createUser()` on submit
3. Update `HeroNameSetup` to accept `email` prop and `onSave(userData)` callback; add "I'm a parent / I'm a kid" toggle; save to DB via `createUser()` Server Action (normalize email: `email.trim().toLowerCase()`)
4. Create `lib/hooks/useActiveUser.ts`:
   ```typescript
   // Read localStorage ONLY inside useEffect (SSR safety)
   // Returns { userId, email, mounted, signIn, signOut }
   // mounted flag: don't render auth-dependent UI until true
   ```
5. Replace `hasCustomName()` gate in `app/page.tsx:329` using `useActiveUser()`:
   ```typescript
   const { userId, mounted } = useActiveUser()
   // inside useEffect: if (!userId) router.push('/login')
   ```
6. Replace "Reset Progress" button with "Sign Out":
   - `localStorage.removeItem('kidkode:activeUserId')` (NOT `localStorage.clear()` — preserves audio prefs)
   - `localStorage.removeItem('kidkode:activeEmail')`
   - `router.push('/login')`
7. Create `app/actions/users.ts`: `lookupUser` (returns `LookupResult`), `createUser`, `createChild` (calls `create_child()` RPC), `listChildren` (single nested Supabase select — no N+1)

### Phase 3: Progress Migration (#21)

1. Update `lib/types.ts`:
   - `in-progress` → `in_progress` — **grep all 5 callsites before rename**:
     - `lib/types.ts:137` (type definition)
     - `lib/progress.ts` (3× string literals)
     - `app/lesson/[slug]/page.tsx:64` (writes `status: "in-progress"` — ⚠ missing from original plan)
   - Add `id: string`, `role: 'parent' | 'child'` to `PlayerProfile` (not `email` — use `UserSession` for that)
   - Add `UserSession`, `LookupResult`, `LessonCompletionResult {level:number, streak:number}`, `LessonProgressPatch = Pick<LessonProgress, 'sectionIndex' | 'status'>`
2. Rewrite `lib/progress.ts` as async (no `"use client"` directive):
   - `getProfile(userId)` → `SELECT users JOIN character_stats WHERE user_id = $1`; use `.maybeSingle()` not `.single()`
   - **Not-found fallback must use factory function** `makeEmptyProfile(userId)` — never a module-level default object (prevents singleton mutation in server memory across concurrent requests)
   - `updateLessonProgress(userId, slug, patch: LessonProgressPatch)` → `UPSERT lesson_progress`
   - **Explicit `sectionProgress` → `section_index` mapping** in all DB read/write paths — document in code comment
   - `completeLesson(userId, slug, score, xp)` → upsert + call `award_xp()` RPC; skip XP if already `completed`; return `LessonCompletionResult`
3. Update `app/lesson/[slug]/page.tsx`:
   - Fix `status: "in-progress"` at line 64 → `"in_progress"`
   - Read `userId` from `localStorage.getItem('kidkode:activeUserId')` inside useEffect
   - Use `useTransition` + `startTransition` for Server Action calls in useEffect (pending state)
   - For fire-and-forget `updateLessonProgress` at lines 64/70: add `.catch(console.error)` — bare `void` swallows real errors
   - For `completeLesson` at line 93: `await` and read `{level, streak}` from returned `LessonCompletionResult`
4. Update `app/page.tsx`:
   - `await loadDashboard(userId)` — parallel structure:
     ```typescript
     await checkAndUnlockNextLesson(userId)  // must complete first (writes unlock state)
     const [profile, lessonRows] = await Promise.all([getProfile(userId), getLessonProgressAll(userId)])
     ```
5. Clear localStorage after confirmed DB load:
   - `localStorage.removeItem('kidkode_progress')` (not `localStorage.clear()`)
   - Only clear if DB SELECT confirms at least one lesson_progress row exists for this user

### Phase 4: Parent Dashboard (#22)

**Both parent pages must be `"use client"`** — they need `useActiveUser()` to read `kidkode:activeUserId` from localStorage. Without `"use client"`, they render server-side with no session data.

1. Create `app/parent/page.tsx`:
   - `"use client"` at top
   - Use `useActiveUser()` → read userId; inside useEffect verify `role === 'parent'` from DB → if not, `router.push('/')`
   - Show child cards: `listChildren(parentId)` — single nested Supabase select (no N+1)
2. Create `app/parent/[childId]/page.tsx`:
   - `"use client"` at top
   - Lesson progress grid + "Unlock next lesson" button → calls `forceUnlockLesson(childId)`
   - "Back to [ChildName]'s Dashboard" → sets `kidkode:activeUserId` to childId, redirects to `/`
3. Add child-switcher to dashboard header: visible only when `role='parent'`; avatar row of children
4. "Add child" form on `/parent`:
   - email + hero name + class → `createChild()` Server Action → calls `create_child()` RPC (atomic)
   - Normalize email: `email.trim().toLowerCase()` before passing to Server Action

### Phase 5: Real Unlock Mechanism (#24)

1. Create `checkAndUnlockNextLesson(userId)` Server Action:
   - Find highest `completed` lesson by order
   - Check if `completed_at` date ≠ today (calendar-day gate)
   - If today ≠ last completion date → set next lesson `status='available'`
   - If same day → leave locked (parent can override)
2. Call `checkAndUnlockNextLesson` in `loadDashboard()` on every page load
3. Create `forceUnlockLesson(childId)` Server Action (parent-only) — skips time gate
4. Remove client-side unlock logic from `app/page.tsx:349-362`

---

## ERD

```mermaid
erDiagram
  users {
    uuid id PK
    text email UK
    text hero_name
    text hero_class
    text role
    uuid parent_id FK
    timestamptz created_at
  }
  character_stats {
    uuid user_id PK_FK
    int total_xp
    int current_level
    int streak_days
    timestamptz last_active_at
  }
  lesson_progress {
    uuid id PK
    uuid user_id FK
    text lesson_slug
    text status
    int xp_earned
    int score
    int attempts
    int section_index
    timestamptz completed_at
  }
  xp_transactions {
    uuid id PK
    uuid user_id FK
    int amount
    text reason
    text lesson_slug
    timestamptz created_at
  }

  users ||--o{ users : "parent_id (children)"
  users ||--|| character_stats : "user_id"
  users ||--o{ lesson_progress : "user_id"
  users ||--o{ xp_transactions : "user_id"
```

---

## Dependencies & Risks

| Risk | Mitigation |
|---|---|
| No auth = any email can access any profile | Acceptable for private family app of ~5 people |
| `kidkode_progress` localStorage data lost on migration | Clear it post-first-DB-load; data is resumable since kids haven't gone far |
| `award_xp()` double-invocation (network retry) | `UNIQUE(user_id, lesson_slug, reason)` on `xp_transactions` + `ON CONFLICT DO NOTHING` |
| `lib/types.ts` XP thresholds and DB `award_xp()` must stay in sync | Keep thresholds as constants in `lib/types.ts`; DB function mirrors them as CASE statement |
| `createChild()` must be atomic | Use a single Server Action that inserts `users` + `character_stats` + first `lesson_progress` in sequence; wrap in try/catch for partial failure |
| Parent accessing `/parent` — children also have parent's `activeEmail` in shared device | `/parent` checks `role` from DB, not just localStorage. Child email → role='child' → blocked. |
| `lib/progress.ts` has `"use client"` at line 1 | Remove the directive when rewriting as async; split into `lib/progress.ts` (server/Supabase) + `lib/progress-client.ts` (localStorage). Must happen in Phase 1 commit, not Phase 3. |
| `characterClass` mismatch — FIXED | Expand `CHECK` to `('wizard','knight','elf','ninja','hero','merfolk')` in `001_init.sql`. Remove defunct `'apprentice'`/`'coder'` values. |
| `localStorage` key naming — FIXED | Use `kidkode:activeUserId` and `kidkode:activeEmail` (colon-namespaced, matching AudioManager). |
| `status: "in-progress"` rename — 5 callsites | Grep before rename. 5 files: `lib/types.ts:137`, `lib/progress.ts` (3×), `app/lesson/[slug]/page.tsx:64`. The lesson page callsite writes an invalid status to DB if not fixed — blocks deployment. |
| `UNIQUE(user_id, lesson_slug, reason)` broken for NULL — FIXED | Replaced with two partial unique indexes in migration 001. `award_xp()` updated to route ON CONFLICT to the right index. |
| `award_xp()` read-then-write race — FIXED | Collapsed into single atomic `UPDATE ... SET total_xp = total_xp + p_amount`. |
| `createChild()` atomicity — FIXED | Moved to `create_child()` plpgsql function (migration 003). Called via `supabase.rpc()`. |
| Missing FK indexes — FIXED | `idx_users_parent_id`, `idx_lesson_progress_user_id`, `idx_xp_transactions_user_id` added to migration 001. |
| `server-only` not installed | Run `npm install server-only`. Add `import 'server-only'` as first line of `lib/supabase.ts`. Without this, Next.js won't catch accidental client imports at build time. |
| `streak_days` never updated | `award_xp()` does not update `streak_days`. Streak logic currently lives in `lib/progress.ts:108-122`. Must be moved to `completeLesson` Server Action or a separate DB function before Phase 3 ships. |
| `sectionProgress` → `section_index` mapping | localStorage field `sectionProgress` maps to DB column `section_index`. Mapping must be explicit in the DB read/write layer. If missed, in-progress lessons silently reset to section 0 on resume. |
| `app/onboard/page.tsx` missing from file map — FIXED | Added to file map. Needed for `/login → /onboard?email=...` redirect for new users. |
| `app/parent/page.tsx` needs `"use client"` | Both parent pages render server-side without `"use client"`. They can't read localStorage for userId without the directive. Added to Phase 4. |
| `useTransition` for Server Actions in useEffect | Wrap Server Action calls in `startTransition(async () => {...})` to get pending state without blocking UI. Bare `void` swallows errors; `.catch(console.error)` minimum for fire-and-forget. |
| `mounted` flag pattern for localStorage reads | `useActiveUser` hook must return `mounted` flag; don't render auth-dependent UI until `mounted === true` (prevents SSR flash of logged-out state). |
| `forceUnlockLesson` has no role check | Any caller who knows a childId can unlock. For family app this is Low severity — accepted. |

---

## Environment Variables Needed

```bash
# .env.local (never commit)
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
# ⚠ No NEXT_PUBLIC_SUPABASE_ANON_KEY — no client-side Supabase calls planned
# Having a NEXT_PUBLIC_ Supabase key creates a footgun: easy to confuse with service role key
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>  # server-only — used in all Server Actions
                                               # never use NEXT_PUBLIC_ prefix on this key
```

Note: Supabase new projects (after Nov 2025) use `sb_publishable_...` / `sb_secret_...` key formats instead of the legacy JWT format. The `createClient()` call is identical — just update the env var values.

---

## Post-Deploy Verification Queries

Run these in Supabase SQL editor after first migration:

```sql
-- 1. No orphaned character_stats rows
SELECT u.id, u.email FROM public.users u
LEFT JOIN public.character_stats cs ON cs.user_id = u.id
WHERE cs.user_id IS NULL;
-- Expected: 0 rows

-- 2. No double XP for streak_bonus (validates partial unique index fix)
SELECT user_id, reason, COUNT(*) FROM public.xp_transactions
WHERE lesson_slug IS NULL
GROUP BY user_id, reason HAVING COUNT(*) > 1;
-- Expected: 0 rows

-- 3. No invalid status values (validates in_progress rename)
SELECT DISTINCT status FROM public.lesson_progress;
-- Expected: only 'locked','available','in_progress','completed' — no 'in-progress'

-- 4. No hero_class values outside the allowed set
SELECT DISTINCT hero_class FROM public.users;
-- Expected: only values in ('wizard','knight','elf','ninja','hero','merfolk')

-- 5. No lesson_progress rows with section_index=0 for in_progress lessons
-- (validates sectionProgress mapping survived the migration)
SELECT user_id, lesson_slug, section_index FROM public.lesson_progress
WHERE status = 'in_progress' AND section_index = 0;
-- Expected: 0 rows (if any user was mid-lesson before migration)
```

## Rollback Plan

1. Schema rollback (before user data): `DROP TABLE IF EXISTS xp_transactions, lesson_progress, character_stats CASCADE; DROP TABLE IF EXISTS users CASCADE; DROP FUNCTION IF EXISTS award_xp, create_child;`
2. Application rollback: revert `lib/progress.ts` to localStorage functions; revert `lib/types.ts:137` to `"in-progress"`; revert `app/page.tsx` gate to `hasCustomName()`
3. localStorage data: not recoverable after clear — acceptable per plan's risk table

## References

- Issues: #21, #22, #23, #24
- Current progress module: `lib/progress.ts:1-175`
- Current types: `lib/types.ts:135-187`
- Identity gate (to replace): `app/page.tsx:320-329`
- Unlock logic (to server-ify): `app/page.tsx:338-362`
- Reset Progress button (to replace): `app/page.tsx:481-490`
- Lesson progress write callsites: `app/lesson/[slug]/page.tsx:64,70,93`
- Lost characterClass bug: `components/HeroNameSetup.tsx:103`
- Supabase docs: https://supabase.com/docs/reference/javascript
