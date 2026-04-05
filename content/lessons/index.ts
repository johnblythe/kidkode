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
import consoleQuest from "./realm-2/16-console-quest";
import arrays from "./realm-2/17-arrays";
import objects from "./realm-2/18-objects";

// Realm 3: The Frontend Realm
import htmlSkeleton from "./realm-3/19-html";
import cssEnchantment from "./realm-3/20-css";
import layoutGrid from "./realm-3/21-layout";
import browserJs from "./realm-3/22-browser-js";
import fanPage from "./realm-3/23-fan-page";
import formsInput from "./realm-3/24-forms";
import responsiveDesign from "./realm-3/25-responsive";

// Realm 4: The Backend Dungeons
import clientVsServer from "./realm-4/04-client-vs-server";
import json from "./realm-4/26-json";
import syncVsAsync from "./realm-4/06-sync-vs-async";
import apis from "./realm-4/27-apis";
import weatherDashboard from "./realm-4/28-weather-dashboard";
import databases from "./realm-4/05-databases";
import auth from "./realm-4/29-auth";

// Realm 5: The Artificer's Workshop
import askingAi from "./realm-5/07-asking-ai";
import claudeCode from "./realm-5/30-claude-code";
import npmPackages from "./realm-5/31-npm";

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
  consoleQuest,     // order 12 (practical)
  arrays,           // order 13
  objects,          // order 14
  htmlSkeleton,     // order 15
  cssEnchantment,   // order 16
  layoutGrid,       // order 17
  browserJs,        // order 18
  fanPage,          // order 19 (practical)
  formsInput,       // order 20
  responsiveDesign, // order 21
  clientVsServer,   // order 22
  json,             // order 23
  syncVsAsync,      // order 24
  apis,             // order 25
  weatherDashboard, // order 26 (practical)
  databases,        // order 27
  auth,             // order 28
  askingAi,         // order 29
  claudeCode,       // order 30
  npmPackages,      // order 31
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
