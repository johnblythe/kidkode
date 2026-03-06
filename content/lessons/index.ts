import gitSavePoints from "./01-git-save-points";
import gitBranches from "./02-git-branches";
import { Lesson } from "@/lib/types";

export const lessons: Lesson[] = [
  gitSavePoints,
  gitBranches,
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonByOrder(order: number): Lesson | undefined {
  return lessons.find((l) => l.order === order);
}

export function getNextLesson(currentSlug: string): Lesson | undefined {
  const current = getLessonBySlug(currentSlug);
  if (!current) return undefined;
  return getLessonByOrder(current.order + 1);
}
