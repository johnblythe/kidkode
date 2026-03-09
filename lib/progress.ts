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
} from "@/lib/types";
import { lessons } from "@/content/lessons";

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
  }>
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

  return rowsToProfile(
    userResult.data,
    statsResult.data,
    progressResult.data ?? []
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
  const { data: existing } = await supabase
    .from("lesson_progress")
    .select("status")
    .eq("user_id", userId)
    .eq("lesson_slug", slug)
    .maybeSingle();

  const alreadyCompleted = existing?.status === "completed";

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
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_slug" }
    );
  if (progressError) throw new Error(progressError.message);

  if (!alreadyCompleted) {
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
  }

  await unlockNextLesson(userId, slug);

  const { data: stats } = await supabase
    .from("character_stats")
    .select("current_level, streak_days")
    .eq("user_id", userId)
    .maybeSingle();

  return {
    level: stats?.current_level ?? 1,
    streak: stats?.streak_days ?? 0,
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

  let newStreak: number;
  if (stats.last_session_date === yesterdayStr) {
    newStreak = stats.streak_days + 1;
  } else if (!stats.last_session_date) {
    newStreak = 1;
  } else {
    newStreak = 1;
  }

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
  return getProfile(userId);
}
