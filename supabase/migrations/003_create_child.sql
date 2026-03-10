-- ============================================================
-- KidKode — DB Functions: create_child
-- ============================================================
-- Atomic child account creation: inserts users + character_stats
-- + first lesson_progress row in a single transaction.
-- Calling via supabase.rpc() guarantees atomicity — no partial state.
-- ============================================================

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
  -- Normalize email
  INSERT INTO public.users (email, hero_name, hero_class, role, parent_id)
  VALUES (LOWER(TRIM(p_email)), p_hero_name, p_hero_class, 'child', p_parent_id)
  RETURNING id INTO new_user_id;

  INSERT INTO public.character_stats (user_id)
  VALUES (new_user_id);

  INSERT INTO public.lesson_progress (user_id, lesson_slug, status)
  VALUES (new_user_id, p_lesson_slug, 'available');

  RETURN new_user_id;
END;
$$;
