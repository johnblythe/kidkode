-- ============================================================
-- KidKode — Migration 006: Interaction Events
-- ============================================================
-- Granular kid interaction logging for future secret badge queries.
-- Data is captured async/non-blocking — never on the critical lesson path.
-- Not parent-visible in v1 — pure data foundation.
-- ============================================================

CREATE TABLE public.interaction_events (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_slug TEXT        NOT NULL,
  event_type  TEXT        NOT NULL CHECK (event_type IN (
                            'wrong_answer',
                            'boss_hp_snapshot',
                            'section_time',
                            'question_time',
                            'lesson_revisit',
                            'section_replay'
                          )),
  metadata    JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- For future badge queries: "how many wrong answers did this user get?"
CREATE INDEX idx_interaction_events_user_type
  ON public.interaction_events(user_id, event_type);

-- For per-lesson event lookup: "all events for this user in this lesson"
CREATE INDEX idx_interaction_events_user_lesson
  ON public.interaction_events(user_id, lesson_slug);
