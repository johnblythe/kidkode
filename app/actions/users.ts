"use server";

import { supabase } from "@/lib/supabase";
import { getProfile, makeEmptyProfile } from "@/lib/progress";
import { REALM_BADGES } from "@/lib/badge-config";
import type { EarnedBadge } from "@/lib/types";
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
// listChildren — two queries total (users+stats+progress joined, then badges batch)
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
  if (!data || data.length === 0) return [];

  // Batch-fetch all badges in one query rather than N per-child round trips
  const childIds = data.map((c) => c.id);
  const badgesByChild = new Map<string, EarnedBadge[]>();
  try {
    const { data: badgeRows, error: badgeError } = await supabase
      .from("user_badges")
      .select("user_id, badge_slug, realm_id, earned_at")
      .in("user_id", childIds)
      .order("realm_id", { ascending: true });

    if (badgeError) {
      console.error("[listChildren] badge fetch failed — continuing with empty badges:", badgeError.message);
    } else {
      for (const row of badgeRows ?? []) {
        const realmId = row.realm_id as import("@/lib/types").RealmId;
        const meta = REALM_BADGES[realmId];
        const badge: EarnedBadge = {
          slug: row.badge_slug,
          realmId,
          name: meta.name,
          icon: meta.icon,
          description: meta.description,
          earnedAt: row.earned_at,
        };
        const list = badgesByChild.get(row.user_id) ?? [];
        list.push(badge);
        badgesByChild.set(row.user_id, list);
      }
    }
  } catch (err) {
    console.error("[listChildren] badge fetch threw — continuing with empty badges:", err);
  }

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
      badges: badgesByChild.get(child.id) ?? [],
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

// ============================================================
// resetLessonProgress — parent resets a child's lesson to retake
// ============================================================

export async function resetLessonProgress(
  parentId: string,
  childId: string,
  lessonSlug: string
): Promise<void> {
  // Verify ownership
  const { data: child } = await supabase
    .from("users")
    .select("parent_id")
    .eq("id", childId)
    .maybeSingle();

  if (!child || child.parent_id !== parentId) {
    throw new Error("UNAUTHORIZED");
  }

  // Get current progress to know how much XP to claw back
  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("xp_earned, status")
    .eq("user_id", childId)
    .eq("lesson_slug", lessonSlug)
    .maybeSingle();

  if (!progress) return;

  // Delete + re-insert (the prevent_completed_downgrade trigger blocks
  // UPDATE from "completed" → anything else, so we bypass via delete/insert)
  const { error: deleteError } = await supabase
    .from("lesson_progress")
    .delete()
    .eq("user_id", childId)
    .eq("lesson_slug", lessonSlug);

  if (deleteError) throw new Error(deleteError.message);

  const { error: insertError } = await supabase
    .from("lesson_progress")
    .insert({
      user_id: childId,
      lesson_slug: lessonSlug,
      status: "available",
    });

  if (insertError) throw new Error(insertError.message);

  // Subtract XP if lesson was completed
  if (progress.status === "completed" && progress.xp_earned > 0) {
    const { error: xpError } = await supabase.rpc("award_xp", {
      p_user_id: childId,
      p_amount: -progress.xp_earned,
      p_reason: "lesson_reset",
      p_lesson: lessonSlug,
    });
    if (xpError) console.error("XP clawback failed:", xpError.message);
  }
}
