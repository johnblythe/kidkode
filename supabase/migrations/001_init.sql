-- ============================================================
-- KidKode — Tier 3 Initial Schema
-- ============================================================
-- All users (parents + children) in one table.
-- No Supabase Auth, no RLS — private family app, ~5 users.
-- All queries run via Server Actions with the service role key.
-- ============================================================

-- All users: parents and children
CREATE TABLE public.users (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        TEXT UNIQUE NOT NULL,
  hero_name    TEXT NOT NULL,
  hero_class   TEXT NOT NULL DEFAULT 'wizard'
               CHECK (hero_class IN ('wizard', 'knight', 'elf', 'ninja', 'hero', 'merfolk')),
  role         TEXT NOT NULL DEFAULT 'child'
               CHECK (role IN ('parent', 'child')),
  parent_id    UUID REFERENCES public.users(id) ON DELETE RESTRICT,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- Character stats per user (1:1 with users)
CREATE TABLE public.character_stats (
  user_id        UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  total_xp       INT NOT NULL DEFAULT 0,
  current_level  INT NOT NULL DEFAULT 1,
  streak_days    INT NOT NULL DEFAULT 0,
  last_active_at TIMESTAMPTZ,
  last_session_date TEXT, -- ISO date string 'YYYY-MM-DD' for streak logic
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
  section_index INT NOT NULL DEFAULT 0, -- maps to LessonProgress.sectionProgress
  completed_at  TIMESTAMPTZ,
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_slug)
);

-- XP transaction log (idempotency guard for double-XP on retry)
CREATE TABLE public.xp_transactions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount      INT NOT NULL CHECK (amount > 0),
  reason      TEXT NOT NULL, -- 'lesson_complete' | 'boss_defeat' | 'streak_bonus'
  lesson_slug TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
  -- NOTE: UNIQUE enforced via partial indexes below (NULL-safe)
);

-- ============================================================
-- Indexes
-- ============================================================

-- FK columns on referencing tables are NOT auto-indexed by Postgres
CREATE INDEX idx_users_parent_id ON public.users (parent_id);
CREATE INDEX idx_lesson_progress_user_id ON public.lesson_progress (user_id);
CREATE INDEX idx_xp_transactions_user_id ON public.xp_transactions (user_id);

-- XP idempotency: two partial unique indexes instead of one UNIQUE constraint.
-- Required because NULL != NULL in Postgres UNIQUE indexes —
-- a naive UNIQUE(user_id, lesson_slug, reason) silently fails for
-- streak_bonus rows where lesson_slug IS NULL.
CREATE UNIQUE INDEX uq_xp_with_lesson
  ON public.xp_transactions (user_id, lesson_slug, reason)
  WHERE lesson_slug IS NOT NULL;

CREATE UNIQUE INDEX uq_xp_no_lesson
  ON public.xp_transactions (user_id, reason)
  WHERE lesson_slug IS NULL;

-- ============================================================
-- Auto-update triggers for updated_at columns
-- ============================================================

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
