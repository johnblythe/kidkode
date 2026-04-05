-- ============================================================
-- KidKode — Migration 005: Realm Badges + XP Clawback Fix
-- ============================================================
-- 1. user_badges table — one row per realm badge earned
-- 2. Fix xp_transactions CHECK constraint to allow negative amounts
--    (XP clawback on lesson reset was silently failing)
-- ============================================================


-- ------------------------------------------------------------
-- 1. Fix xp_transactions CHECK: allow negative amounts for clawback
-- ------------------------------------------------------------

ALTER TABLE public.xp_transactions DROP CONSTRAINT IF EXISTS xp_transactions_amount_check;
ALTER TABLE public.xp_transactions ADD CONSTRAINT xp_transactions_amount_check CHECK (amount != 0);


-- ------------------------------------------------------------
-- 2. user_badges — earned realm badges (one row per user per realm)
-- ------------------------------------------------------------

CREATE TABLE public.user_badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  badge_slug  TEXT NOT NULL,   -- realm slug, e.g. "apprentices-tower"
  realm_id    INT  NOT NULL,   -- 1-6, matches Realm.id
  earned_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_slug)
);

CREATE INDEX idx_user_badges_user ON public.user_badges(user_id);
