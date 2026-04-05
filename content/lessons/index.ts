// Realm 1: The Apprentice's Tower
import adventurersMap from "./realm-1/08-adventurers-map";
import terminalBasics from "./realm-1/03-terminal-basics";
import terminalSpells from "./realm-1/09-terminal-spells";
import codeForge from "./realm-1/10-code-forge";
import gitSavePoints from "./realm-1/01-git-save-points";
import gitBranches from "./realm-1/02-git-branches";

// Realm 2: The Scribe's Library
import helloWorld from "./realm-2/11-hello-world";
import variables from "./realm-2/12-variables";
import conditions from "./realm-2/13-conditions";
import loops from "./realm-2/14-loops";
import functions from "./realm-2/15-functions";

// Realm 4: The Backend Dungeons
import clientVsServer from "./realm-4/04-client-vs-server";
import databases from "./realm-4/05-databases";
import syncVsAsync from "./realm-4/06-sync-vs-async";

// Realm 5: The Artificer's Workshop
import askingAi from "./realm-5/07-asking-ai";

import { Lesson } from "@/lib/types";

// Sorted by order — consumers rely on this for progression
export const lessons: Lesson[] = [
  adventurersMap,   // order 1
  terminalBasics,   // order 2
  terminalSpells,   // order 3
  codeForge,        // order 4
  gitSavePoints,    // order 5
  gitBranches,      // order 6
  helloWorld,       // order 7
  variables,        // order 8
  conditions,       // order 9
  loops,            // order 10
  functions,        // order 11
  clientVsServer,   // order 22
  syncVsAsync,      // order 24
  databases,        // order 27
  askingAi,         // order 29
].sort((a, b) => a.order - b.order);

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonByOrder(order: number): Lesson | undefined {
  return lessons.find((l) => l.order === order);
}

export function getNextLesson(currentSlug: string): Lesson | undefined {
  const currentIndex = lessons.findIndex((l) => l.slug === currentSlug);
  if (currentIndex === -1) return undefined;
  return lessons[currentIndex + 1];
}
