"use server";

// Server Actions must be direct async function declarations — re-exports are not allowed.
// These wrappers satisfy Next.js while delegating to lib/progress.ts.

import {
  getProfile as _getProfile,
  updateLessonProgress as _updateLessonProgress,
  completeLesson as _completeLesson,
  checkAndUnlockNextLesson as _checkAndUnlockNextLesson,
  loadDashboard as _loadDashboard,
} from "@/lib/progress";
import type { LessonProgressPatch, LessonCompletionResult, PlayerProfile } from "@/lib/types";

export async function getProfile(userId: string): Promise<PlayerProfile | null> {
  return _getProfile(userId);
}

export async function updateLessonProgress(
  userId: string,
  slug: string,
  patch: LessonProgressPatch
): Promise<void> {
  return _updateLessonProgress(userId, slug, patch);
}

export async function completeLesson(
  userId: string,
  slug: string,
  score: number,
  xp: number
): Promise<LessonCompletionResult> {
  return _completeLesson(userId, slug, score, xp);
}

export async function checkAndUnlockNextLesson(userId: string): Promise<void> {
  return _checkAndUnlockNextLesson(userId);
}

export async function loadDashboard(userId: string): Promise<PlayerProfile | null> {
  return _loadDashboard(userId);
}
