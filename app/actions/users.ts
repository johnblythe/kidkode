"use server";

import { supabase } from "@/lib/supabase";
import { getProfile, makeEmptyProfile } from "@/lib/progress";
import { calculateLevel } from "@/lib/types";
import type {
  PlayerProfile,
  LessonProgress,
  LookupResult,
  HeroClass,
} from "@/lib/types";
import { lessons } from "@/content/lessons";

// ============================================================
// lookupUser — email → profile (discriminated union return)
// ============================================================

export async function lookupUser(rawEmail: string): Promise<LookupResult> {
  const email = rawEmail.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) throw new Error("INVALID_EMAIL");

  const { data, error } = await supabase
    .from("users")
    .select("id, email, hero_name, hero_class, role")
    .eq("email", email)
    .maybeSingle(); // returns null (not error) when not found

  if (error) throw new Error(error.message);
  if (!data) return { found: false };

  const profile = await getProfile(data.id);
  if (!profile) return { found: false };

  return {
    found: true,
    profile,
    session: {
      userId: data.id,
      email: data.email,
      role: data.role as "parent" | "child",
    },
  };
}

// ============================================================
// createUser — new parent or child (onboarding)
// ============================================================

export async function createUser(input: {
  email: string;
  heroName: string;
  heroClass: HeroClass;
  role: "parent" | "child";
}): Promise<PlayerProfile> {
  const email = input.email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) throw new Error("INVALID_EMAIL");
  const heroName = input.heroName.trim();
  if (!heroName || heroName.length > 20) throw new Error("INVALID_HERO_NAME");

  const firstLesson = [...lessons].sort((a, b) => a.order - b.order)[0];
  if (!firstLesson) throw new Error("No lessons defined");

  // Atomic via create_parent() DB function (handles both roles via p_role param).
  const { data: newUserId, error } = await supabase.rpc("create_parent", {
    p_email: email,
    p_hero_name: heroName,
    p_hero_class: input.heroClass,
    p_lesson_slug: firstLesson.slug,
    p_role: input.role,
  });

  if (error) {
    if (error.code === "23505") throw new Error("EMAIL_EXISTS");
    throw new Error(error.message);
  }

  const profile = await getProfile(newUserId as string);
  return profile ?? makeEmptyProfile(newUserId as string, email);
}

// ============================================================
// createChild — atomic via create_child() DB function (migration 003)
// ============================================================

export async function createChild(
  parentId: string,
  input: {
    email: string;
    heroName: string;
    heroClass: HeroClass;
  }
): Promise<PlayerProfile> {
  const firstLesson = [...lessons].sort((a, b) => a.order - b.order)[0];
  if (!firstLesson) throw new Error("No lessons defined");

  const email = input.email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) throw new Error("INVALID_EMAIL");
  const heroName = input.heroName.trim();
  if (!heroName || heroName.length > 20) throw new Error("INVALID_HERO_NAME");

  const { data: childId, error } = await supabase.rpc("create_child", {
    p_parent_id: parentId,
    p_email: email,
    p_hero_name: heroName,
    p_hero_class: input.heroClass,
    p_lesson_slug: firstLesson.slug,
  });

  if (error) {
    if (error.code === "23505") throw new Error("EMAIL_EXISTS");
    throw new Error(error.message);
  }

  const profile = await getProfile(childId as string);
  return profile ?? makeEmptyProfile(childId as string, input.email);
}

// ============================================================
// listChildren — single query (no N+1)
// ============================================================

export async function listChildren(parentId: string): Promise<PlayerProfile[]> {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      id, email, hero_name, hero_class, role,
      character_stats ( total_xp, current_level, streak_days, last_active_at ),
      lesson_progress ( lesson_slug, status, score, xp_earned, attempts, section_index, completed_at )
    `
    )
    .eq("parent_id", parentId)
    .eq("role", "child");

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data.map((child) => {
    const stats = Array.isArray(child.character_stats)
      ? child.character_stats[0]
      : child.character_stats;
    const lessonRows = Array.isArray(child.lesson_progress)
      ? child.lesson_progress
      : [];

    const totalXp = stats?.total_xp ?? 0;
    const lessonsMap: Record<string, LessonProgress> = {};
    for (const row of lessonRows) {
      lessonsMap[row.lesson_slug] = {
        slug: row.lesson_slug,
        status: row.status as LessonProgress["status"],
        quizScore: row.score ?? undefined,
        xpEarned: row.xp_earned,
        attempts: row.attempts,
        sectionProgress: row.section_index,
        completedAt: row.completed_at ?? undefined,
      };
    }
    const completed = lessonRows.filter((r) => r.status === "completed").length;
    const levelInfo = calculateLevel(totalXp);

    return {
      id: child.id,
      email: child.email,
      name: child.hero_name,
      heroClass: child.hero_class,
      role: "child" as const,
      level: stats?.current_level ?? 1,
      xp: levelInfo.xp,
      xpToNextLevel: levelInfo.xpToNextLevel,
      streak: stats?.streak_days ?? 0,
      totalLessonsCompleted: completed,
      unlockedToday: false,
      lessons: lessonsMap,
    };
  });
}

// ============================================================
// getChildProfileForParent — ownership-checked child profile read
// ============================================================

export async function getChildProfileForParent(
  parentId: string,
  childId: string
): Promise<PlayerProfile | null> {
  // Verify parentId actually owns childId before returning data
  const { data } = await supabase
    .from("users")
    .select("parent_id")
    .eq("id", childId)
    .maybeSingle();

  if (!data || data.parent_id !== parentId) {
    throw new Error("UNAUTHORIZED");
  }
  return getProfile(childId);
}

// ============================================================
// forceUnlockLesson — parent override (no time gate)
// ============================================================

export async function forceUnlockLesson(
  parentId: string,
  childId: string
): Promise<void> {
  // Verify caller is the child's parent before modifying
  const { data: child } = await supabase
    .from("users")
    .select("parent_id")
    .eq("id", childId)
    .maybeSingle();

  if (!child || child.parent_id !== parentId) {
    throw new Error("UNAUTHORIZED");
  }
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  // Find the highest completed lesson
  const { data: progressRows } = await supabase
    .from("lesson_progress")
    .select("lesson_slug, status")
    .eq("user_id", childId);

  if (!progressRows) return;

  const completedSlugs = new Set(
    progressRows.filter((r) => r.status === "completed").map((r) => r.lesson_slug)
  );

  // Find highest completed index
  let highestCompletedIdx = -1;
  for (let i = sortedLessons.length - 1; i >= 0; i--) {
    if (completedSlugs.has(sortedLessons[i].slug)) {
      highestCompletedIdx = i;
      break;
    }
  }

  if (highestCompletedIdx === -1 || highestCompletedIdx === sortedLessons.length - 1) return;

  const nextLesson = sortedLessons[highestCompletedIdx + 1];

  const { error } = await supabase.from("lesson_progress").upsert(
    { user_id: childId, lesson_slug: nextLesson.slug, status: "available" },
    { onConflict: "user_id,lesson_slug" }
  );
  if (error) throw new Error(error.message);
}
