import gitSavePoints from "./01-git-save-points";
import gitBranches from "./02-git-branches";
import terminalBasics from "./03-terminal-basics";
import clientVsServer from "./04-client-vs-server";
import databases from "./05-databases";
import syncVsAsync from "./06-sync-vs-async";
import askingAi from "./07-asking-ai";
import { Lesson } from "@/lib/types";

export const lessons: Lesson[] = [
  gitSavePoints,
  gitBranches,
  terminalBasics,
  clientVsServer,
  databases,
  syncVsAsync,
  askingAi,
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
