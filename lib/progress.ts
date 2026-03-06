"use client";

import { PlayerProfile, LessonProgress, calculateLevel } from "./types";

const STORAGE_KEY = "kidkode_progress";

const DEFAULT_PROFILE: PlayerProfile = {
  name: "Adventurer",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  totalLessonsCompleted: 0,
  unlockedToday: false,
  lessons: {},
};

export function getProfile(): PlayerProfile {
  if (typeof window === "undefined") return { ...DEFAULT_PROFILE, lessons: {} };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...DEFAULT_PROFILE, lessons: {} };
  try {
    return JSON.parse(raw) as PlayerProfile;
  } catch {
    return { ...DEFAULT_PROFILE, lessons: {} };
  }
}

export function saveProfile(profile: PlayerProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function setPlayerName(name: string): PlayerProfile {
  const profile = getProfile();
  profile.name = name.trim();
  saveProfile(profile);
  return profile;
}

export function hasCustomName(): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  try {
    const profile = JSON.parse(raw) as PlayerProfile;
    return profile.name !== DEFAULT_PROFILE.name && profile.name.trim().length > 0;
  } catch {
    return false;
  }
}

export function getLessonProgress(slug: string): LessonProgress {
  const profile = getProfile();
  return (
    profile.lessons[slug] || {
      slug,
      status: "locked",
      attempts: 0,
      sectionProgress: 0,
    }
  );
}

export function updateLessonProgress(slug: string, update: Partial<LessonProgress>): PlayerProfile {
  const profile = getProfile();
  const existing = profile.lessons[slug] || {
    slug,
    status: "locked",
    attempts: 0,
    sectionProgress: 0,
  };
  profile.lessons[slug] = { ...existing, ...update };
  saveProfile(profile);
  return profile;
}

export function completeLesson(slug: string, quizScore: number, xpReward: number): PlayerProfile {
  const profile = getProfile();
  const today = new Date().toISOString().split("T")[0];

  // Update lesson
  const existing = profile.lessons[slug] || {
    slug,
    status: "locked" as const,
    attempts: 0,
    sectionProgress: 0,
  };
  profile.lessons[slug] = {
    ...existing,
    status: "completed",
    completedAt: new Date().toISOString(),
    quizScore,
    xpEarned: xpReward,
    attempts: existing.attempts + 1,
  };

  // Update XP and level
  const totalXp = profile.xp + xpReward;
  const levelInfo = calculateLevel(totalXp);
  profile.xp = totalXp;
  profile.level = levelInfo.level;
  profile.xpToNextLevel = levelInfo.xpToNextLevel;

  // Update streak
  if (profile.lastSessionDate === today) {
    // Already coded today, no streak change
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    if (profile.lastSessionDate === yesterdayStr) {
      profile.streak += 1;
    } else if (!profile.lastSessionDate) {
      profile.streak = 1;
    } else {
      profile.streak = 1; // streak broken
    }
  }

  profile.lastSessionDate = today;
  profile.totalLessonsCompleted += 1;
  profile.unlockedToday = true;

  saveProfile(profile);
  return profile;
}

export function isUnlockedToday(): boolean {
  const profile = getProfile();
  const today = new Date().toISOString().split("T")[0];
  return profile.unlockedToday && profile.lastSessionDate === today;
}

export function resetDailyUnlock(): void {
  const profile = getProfile();
  const today = new Date().toISOString().split("T")[0];
  if (profile.lastSessionDate !== today) {
    profile.unlockedToday = false;
    saveProfile(profile);
  }
}
