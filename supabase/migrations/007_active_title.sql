-- ============================================================
-- KidKode — Migration 007: active_title on character_stats
-- ============================================================
-- Persists the kid's chosen realm title suffix.
-- Nullable — existing users get NULL (renders as "no title" on dashboard).
-- Auto-set by checkAndAwardBadges() when a realm badge is earned.
-- Kid can cycle through earned titles from the dashboard.
-- ============================================================

ALTER TABLE public.character_stats
  ADD COLUMN IF NOT EXISTS active_title TEXT DEFAULT NULL;

-- Register in migration tracking
INSERT INTO supabase_migrations.schema_migrations (version, name, statements)
VALUES ('007', '007_active_title', ARRAY[
  'ALTER TABLE public.character_stats ADD COLUMN IF NOT EXISTS active_title TEXT DEFAULT NULL'
])
ON CONFLICT (version) DO NOTHING;
