-- ============================================================
-- KidKode — Migration 004: Critical Bug Fixes
-- ============================================================
-- Fixes:
--   1. award_xp: ON CONFLICT ON CONSTRAINT fails for partial indexes —
--      replace with index inference syntax.
--   2. create_parent: atomic parent account creation (mirrors create_child).
--   3. prevent_completed_downgrade: trigger blocks lesson_progress regressions.
-- ============================================================


-- ------------------------------------------------------------
-- 1. Fix award_xp: use index inference, not CONSTRAINT name.
--    ON CONFLICT ON CONSTRAINT only works for named UNIQUE constraints
--    declared in CREATE TABLE. Partial unique indexes (created with
--    CREATE UNIQUE INDEX ... WHERE ...) are indexes, not constraints.
--    The correct form for partial indexes is inference:
--      ON CONFLICT (cols) WHERE predicate DO NOTHING
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.award_xp(
  p_user_id   UUID,
  p_amount    INT,
  p_reason    TEXT,
  p_lesson    TEXT DEFAULT NULL
) RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Idempotency guard via partial unique indexes (NULL-safe).
  -- Index inference syntax required — partial indexes are not named constraints.
  IF p_lesson IS NOT NULL THEN
    INSERT INTO public.xp_transactions (user_id, amount, reason, lesson_slug)
    VALUES (p_user_id, p_amount, p_reason, p_lesson)
    ON CONFLICT (user_id, lesson_slug, reason)
    WHERE lesson_slug IS NOT NULL
    DO NOTHING;
  ELSE
    INSERT INTO public.xp_transactions (user_id, amount, reason, lesson_slug)
    VALUES (p_user_id, p_amount, p_reason, NULL)
    ON CONFLICT (user_id, reason)
    WHERE lesson_slug IS NULL
    DO NOTHING;
  END IF;

  IF NOT FOUND THEN
    RETURN; -- duplicate transaction, skip XP update
  END IF;

  -- Atomic UPDATE — no separate SELECT (avoids read-then-write race).
  -- ⚠ IMPORTANT: Keep in sync with lib/types.ts XP_PER_LEVEL array manually.
  -- Thresholds: [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200]
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


-- ------------------------------------------------------------
-- 2. create_parent — atomic parent account creation.
--    Mirrors create_child: inserts users + character_stats +
--    first lesson_progress in one transaction via plpgsql.
--    Replaces the 3-step client-side sequence in createUser().
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.create_parent(
  p_email       TEXT,
  p_hero_name   TEXT,
  p_hero_class  TEXT,
  p_lesson_slug TEXT,
  p_role        TEXT DEFAULT 'parent'
) RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  new_user_id UUID;
BEGIN
  INSERT INTO public.users (email, hero_name, hero_class, role)
  VALUES (LOWER(TRIM(p_email)), p_hero_name, p_hero_class, p_role)
  RETURNING id INTO new_user_id;

  INSERT INTO public.character_stats (user_id)
  VALUES (new_user_id);

  INSERT INTO public.lesson_progress (user_id, lesson_slug, status)
  VALUES (new_user_id, p_lesson_slug, 'available');

  RETURN new_user_id;
END;
$$;


-- ------------------------------------------------------------
-- 3. Prevent lesson_progress status regressions.
--    Once a row reaches 'completed', no write may downgrade it.
--    This guards against updateLessonProgress({ status: "in_progress" })
--    being called after lesson completion (e.g. on lesson re-entry).
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.prevent_completed_downgrade()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.status = 'completed' AND NEW.status != 'completed' THEN
    NEW.status = 'completed'; -- silently preserve completed state
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_lesson_progress_no_downgrade
  BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.prevent_completed_downgrade();
