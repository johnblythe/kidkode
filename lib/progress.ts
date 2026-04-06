// Server-side progress module — no "use client" directive.
// All functions query Supabase via the service role client.
// localStorage reads live in lib/progress-client.ts.

import { supabase } from "@/lib/supabase";
import { calculateLevel, XP_PER_LEVEL } from "@/lib/types";
import type {
  PlayerProfile,
  LessonProgress,
  LessonProgressPatch,
  LessonCompletionResult,
  EarnedBadge,
} from "@/lib/types";
import { lessons } from "@/content/lessons";
import { checkAndAwardBadges, getBadgesForUser } from "@/lib/badges";
import type { NewlyAwardedBadge } from "@/lib/types";

// Factory function — never return a module-level default object.
// Prevents singleton mutation across concurrent server requests.
export function makeEmptyProfile(userId: string, email: string): PlayerProfile {
  return {
    id: userId,
    email,
    name: "Adventurer",
    heroClass: "wizard",
    role: "child",
    level: 1,
    xp: 0,
    xpToNextLevel: XP_PER_LEVEL[1] - XP_PER_LEVEL[0],
    streak: 0,
    totalLessonsCompleted: 0,
    unlockedToday: false,
    lessons: {},
    badges: [],
  };
}

// Build a PlayerProfile from DB rows
function rowsToProfile(
  user: {
    id: string;
    email: string;
    hero_name: string;
    hero_class: string;
    role: string;
  },
  stats: {
    total_xp: number;
    current_level: number;
    streak_days: number;
    last_session_date: string | null;
    last_active_at: string | null;
  } | null,
  lessonRows: Array<{
    lesson_slug: string;
    status: string;
    score: number | null;
    xp_earned: number;
    attempts: number;
    section_index: number;
    completed_at: string | null;
  }>,
  badgeRows: EarnedBadge[]
): PlayerProfile {
  const totalXp = stats?.total_xp ?? 0;
  const levelInfo = calculateLevel(totalXp);

  const lessonsMap: Record<string, LessonProgress> = {};
  for (const row of lessonRows) {
    lessonsMap[row.lesson_slug] = {
      slug: row.lesson_slug,
      status: row.status as LessonProgress["status"],
      quizScore: row.score ?? undefined,
      xpEarned: row.xp_earned,
      attempts: row.attempts,
      sectionProgress: row.section_index, // DB section_index → client sectionProgress
      completedAt: row.completed_at ?? undefined,
    };
  }

  const totalLessonsCompleted = lessonRows.filter(
    (r) => r.status === "completed"
  ).length;

  const today = new Date().toISOString().split("T")[0];
  const completedToday = lessonRows.some(
    (r) =>
      r.status === "completed" &&
      r.completed_at &&
      r.completed_at.startsWith(today)
  );

  return {
    id: user.id,
    email: user.email,
    name: user.hero_name,
    heroClass: user.hero_class,
    role: user.role as "parent" | "child",
    level: stats?.current_level ?? 1,
    xp: levelInfo.xp,
    xpToNextLevel: levelInfo.xpToNextLevel,
    streak: stats?.streak_days ?? 0,
    lastSessionDate: stats?.last_session_date ?? undefined,
    totalLessonsCompleted,
    unlockedToday: completedToday,
    lessons: lessonsMap,
    badges: badgeRows,
  };
}

// ============================================================
// Read
// ============================================================

export async function getProfile(userId: string): Promise<PlayerProfile | null> {
  const [userResult, statsResult, progressResult] = await Promise.all([
    supabase
      .from("users")
      .select("id, email, hero_name, hero_class, role")
      .eq("id", userId)
      .maybeSingle(),
    supabase
      .from("character_stats")
      .select("total_xp, current_level, streak_days, last_session_date, last_active_at")
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("lesson_progress")
      .select("lesson_slug, status, score, xp_earned, attempts, section_index, completed_at")
      .eq("user_id", userId),
  ]);

  if (userResult.error) throw new Error(userResult.error.message);
  if (!userResult.data) return null;

  // Badge fetch is non-fatal — degrade to empty rather than crashing the profile load
  let badgeRows: EarnedBadge[] = [];
  try {
    badgeRows = await getBadgesForUser(userId);
  } catch (err) {
    console.error("[getProfile] badge fetch failed — returning empty badges:", err);
  }

  return rowsToProfile(
    userResult.data,
    statsResult.data,
    progressResult.data ?? [],
    badgeRows
  );
}

// ============================================================
// Writes
// ============================================================

export async function updateLessonProgress(
  userId: string,
  slug: string,
  patch: LessonProgressPatch
): Promise<void> {
  const dbPatch: Record<string, unknown> = {
    user_id: userId,
    lesson_slug: slug,
  };
  if (patch.status !== undefined) dbPatch.status = patch.status;
  if (patch.sectionProgress !== undefined)
    dbPatch.section_index = patch.sectionProgress;

  const { error } = await supabase
    .from("lesson_progress")
    .upsert(dbPatch, { onConflict: "user_id,lesson_slug" });
  if (error) throw new Error(error.message);
}

export async function completeLesson(
  userId: string,
  slug: string,
  score: number,
  xp: number
): Promise<LessonCompletionResult> {
  // Pre-read attempts and last_session_date in parallel before any writes.
  // Must happen before updateStreak() which sets last_session_date = today.
  const today = new Date().toISOString().split("T")[0];
  const [existingProgressResult, statsPreResult] = await Promise.all([
    supabase
      .from("lesson_progress")
      .select("attempts")
      .eq("user_id", userId)
      .eq("lesson_slug", slug)
      .maybeSingle(),
    supabase
      .from("character_stats")
      .select("last_session_date")
      .eq("user_id", userId)
      .maybeSingle(),
  ]);

  const currentAttempts = existingProgressResult.data?.attempts ?? 0;
  const isFirstAttempt = currentAttempts === 0;

  const lastSessionDate = statsPreResult.data?.last_session_date ?? null;
  const daysAway = lastSessionDate
    ? Math.floor(
        (new Date(today).getTime() - new Date(lastSessionDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;
  const comebackMultiplier =
    daysAway >= 14 ? 2.0 : daysAway >= 7 ? 1.5 : daysAway >= 3 ? 1.25 : null;

  const { error: progressError } = await supabase
    .from("lesson_progress")
    .upsert(
      {
        user_id: userId,
        lesson_slug: slug,
        status: "completed",
        score,
        xp_earned: xp,
        section_index: 0,
        attempts: currentAttempts + 1,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_slug" }
    );
  if (progressError) throw new Error(progressError.message);

  // award_xp is idempotent via partial unique indexes (migration 004).
  // No existence pre-check needed — DB rejects duplicates atomically.
  const [xpResult] = await Promise.all([
    supabase.rpc("award_xp", {
      p_user_id: userId,
      p_amount: xp,
      p_reason: "lesson_complete",
      p_lesson: slug,
    }),
    updateStreak(userId),
  ]);
  if (xpResult.error) throw new Error(xpResult.error.message);

  // First-attempt bonus: +50% XP, non-fatal side-effect
  // supabase.rpc() never throws — check .error explicitly
  let bonusXp = 0;
  if (isFirstAttempt) {
    bonusXp = Math.floor(xp * 0.5);
    const firstAttemptResult = await supabase.rpc("award_xp", {
      p_user_id: userId,
      p_amount: bonusXp,
      p_reason: "first_attempt_bonus",
      p_lesson: slug,
    });
    if (firstAttemptResult.error) {
      console.error("[completeLesson] first-attempt bonus failed — lesson completion still succeeds:", firstAttemptResult.error.message);
      bonusXp = 0;
    }
  }

  // Comeback bonus: tiered XP for returning after 3+ days, non-fatal side-effect
  let comebackBonusResult: LessonCompletionResult["comebackBonus"] | undefined;
  if (comebackMultiplier !== null) {
    const comebackBonusXp = Math.floor(xp * (comebackMultiplier - 1));
    const comebackResult = await supabase.rpc("award_xp", {
      p_user_id: userId,
      p_amount: comebackBonusXp,
      p_reason: "comeback_bonus",
      p_lesson: slug,
    });
    if (comebackResult.error) {
      console.error("[completeLesson] comeback bonus failed — lesson completion still succeeds:", comebackResult.error.message);
    } else {
      comebackBonusResult = { daysAway, multiplier: comebackMultiplier, bonusXp: comebackBonusXp };
    }
  }

  await unlockNextLesson(userId, slug);

  // Fetch updated completed slugs for badge check
  const { data: allProgress, error: progressFetchError } = await supabase
    .from("lesson_progress")
    .select("lesson_slug, status")
    .eq("user_id", userId);

  if (progressFetchError) {
    console.error("[completeLesson] progress fetch for badge check failed — skipping badge check:", progressFetchError.message);
  }

  // Badge check is non-fatal — a badge failure must not break lesson completion
  let newBadges: NewlyAwardedBadge[] = [];
  if (!progressFetchError) {
    const completedSlugs = new Set(
      (allProgress ?? [])
        .filter((r) => r.status === "completed")
        .map((r) => r.lesson_slug)
    );
    try {
      newBadges = await checkAndAwardBadges(userId, completedSlugs);
    } catch (err) {
      console.error("[completeLesson] badge check failed — lesson completion still succeeds:", err);
    }
  }

  const statsResult = await supabase
    .from("character_stats")
    .select("current_level, streak_days")
    .eq("user_id", userId)
    .maybeSingle();

  if (statsResult.error) {
    console.error("[completeLesson] stats fetch failed:", statsResult.error.message);
  }

  return {
    level: statsResult.data?.current_level ?? 1,
    streak: statsResult.data?.streak_days ?? 0,
    newBadges: newBadges.length > 0 ? newBadges : undefined,
    isFirstAttempt,
    bonusXp: isFirstAttempt ? bonusXp : undefined,
    comebackBonus: comebackBonusResult,
  };
}

async function updateStreak(userId: string): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  const { data: stats } = await supabase
    .from("character_stats")
    .select("streak_days, last_session_date")
    .eq("user_id", userId)
    .maybeSingle();

  if (!stats) return;
  if (stats.last_session_date === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const newStreak =
    stats.last_session_date === yesterdayStr ? stats.streak_days + 1 : 1;

  const { error } = await supabase
    .from("character_stats")
    .update({
      streak_days: newStreak,
      last_session_date: today,
      last_active_at: new Date().toISOString(),
    })
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
}

async function unlockNextLesson(
  userId: string,
  completedSlug: string
): Promise<void> {
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);
  const completedIdx = sortedLessons.findIndex((l) => l.slug === completedSlug);
  if (completedIdx === -1 || completedIdx === sortedLessons.length - 1) return;

  const nextLesson = sortedLessons[completedIdx + 1];

  const { data: nextProgress } = await supabase
    .from("lesson_progress")
    .select("status")
    .eq("user_id", userId)
    .eq("lesson_slug", nextLesson.slug)
    .maybeSingle();

  if (nextProgress && nextProgress.status !== "locked") return;

  const { error } = await supabase.from("lesson_progress").upsert(
    { user_id: userId, lesson_slug: nextLesson.slug, status: "available" },
    { onConflict: "user_id,lesson_slug" }
  );
  if (error) throw new Error(error.message);
}

// ============================================================
// Dashboard orchestration
// ============================================================

export async function checkAndUnlockNextLesson(userId: string): Promise<void> {
  const { data: completedRows } = await supabase
    .from("lesson_progress")
    .select("lesson_slug, completed_at")
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("completed_at", { ascending: false })
    .limit(1);

  if (!completedRows || completedRows.length === 0) return;

  const lastCompleted = completedRows[0];
  if (!lastCompleted.completed_at) return;

  const completedDate = new Date(lastCompleted.completed_at);
  const today = new Date();
  const isSameDay =
    completedDate.getUTCFullYear() === today.getUTCFullYear() &&
    completedDate.getUTCMonth() === today.getUTCMonth() &&
    completedDate.getUTCDate() === today.getUTCDate();

  if (isSameDay) return;

  await unlockNextLesson(userId, lastCompleted.lesson_slug);
}

export async function loadDashboard(
  userId: string
): Promise<PlayerProfile | null> {
  await checkAndUnlockNextLesson(userId);
  const profile = await getProfile(userId);
  if (!profile) return null;

  const today = new Date().toISOString().split("T")[0];
  const daysAway = profile.lastSessionDate
    ? Math.floor(
        (new Date(today).getTime() - new Date(profile.lastSessionDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return { ...profile, daysAway };
}
