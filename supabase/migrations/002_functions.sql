-- ============================================================
-- KidKode — DB Functions: award_xp
-- ============================================================
-- XP award using threshold array to match lib/types.ts XP_PER_LEVEL.
-- ⚠ IMPORTANT: Keep in sync with lib/types.ts XP_PER_LEVEL array manually.
-- Thresholds: [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200]
-- ============================================================

CREATE OR REPLACE FUNCTION public.award_xp(
  p_user_id   UUID,
  p_amount    INT,
  p_reason    TEXT,
  p_lesson    TEXT DEFAULT NULL
) RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Idempotency: skip if this exact transaction already exists.
  -- Uses two partial unique indexes (NULL-safe — see migration 001).
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

  -- Atomic UPDATE — no separate SELECT (avoids read-then-write race under concurrent calls).
  -- Mirror lib/types.ts XP_PER_LEVEL threshold array.
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
