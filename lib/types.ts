// ============================================
// KidKode - Lesson & Progress Types
// ============================================

import type { AnimationName } from "./slide-variants";

export interface SlideFrame {
  title: string;
  content: string; // markdown
  visual?: string; // ASCII art or SVG reference
  animation?: AnimationName;
  notes?: string; // narrator text (TTS later)
  duration?: number; // suggested seconds on this frame
}

export interface SlideSection {
  type: "slides";
  frames: SlideFrame[];
}

export interface ReadingSection {
  type: "reading";
  content: string; // markdown
  estimatedMinutes: number;
}

// Discriminated union for InteractiveStep — each type carries properly typed data
import type { DragDropScenarioStep } from "./git-branch-types";

interface InteractiveStepBase {
  instruction: string;
  hint?: string;
}

export interface DragDropInteractiveStep extends InteractiveStepBase {
  type: "drag-drop";
  data: DragDropScenarioStep;
}

export interface SequenceInteractiveStep extends InteractiveStepBase {
  type: "sequence";
  data: {
    items: Array<{ id: string; text: string; description: string }>;
    correctOrder: string[];
  };
}

export interface MultipleChoiceInteractiveStep extends InteractiveStepBase {
  type: "multiple-choice";
  data: { options: string[] };
  solution: number;
}

export interface TypeCommandInteractiveStep extends InteractiveStepBase {
  type: "type-command";
  data: {
    prompt: string;
    expectedOutput?: string;
    caseSensitive?: boolean;
    acceptAlternatives?: string[];
  };
  solution: string;
}

export interface FillBlankInteractiveStep extends InteractiveStepBase {
  type: "fill-blank";
  data: {
    /** Text template. Use ___ (triple underscore) to mark blank positions. Count must equal blanks.length. */
    template: string;
    blanks: Array<{ id: string; placeholder?: string; width?: number }>;
    filename?: string;
    caseSensitive?: boolean;
  };
  /** Keyed by blank `id`. Each value is a single accepted answer or array of alternatives. */
  solution: Record<string, string | string[]>;
}

export type InteractiveStep =
  | DragDropInteractiveStep
  | SequenceInteractiveStep
  | MultipleChoiceInteractiveStep
  | TypeCommandInteractiveStep
  | FillBlankInteractiveStep;

export interface InteractiveSection {
  type: "interactive";
  title: string;
  description: string;
  steps: InteractiveStep[];
}

export interface QuizQuestion {
  question: string;
  type: "multiple-choice" | "true-false" | "fill-blank";
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface QuizSection {
  type: "quiz";
  questions: QuizQuestion[];
  passingScore: number; // percentage 0-100
}

export type LessonSection = SlideSection | ReadingSection | InteractiveSection | QuizSection;

export interface BossData {
  name: string;
  description: string;
  sprite: string;
  maxHp: number;
  playerMaxHp: number;
  damagePerCorrect: number;
  attackNames: string[];
  defeatText: string;
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  xpReward: number;
  icon: string; // emoji
  sections: LessonSection[];
  boss?: BossData;
}

// ============================================
// Progress & RPG
// ============================================

export interface LessonProgress {
  slug: string;
  status: "locked" | "available" | "in_progress" | "completed";
  completedAt?: string; // ISO date
  quizScore?: number;
  xpEarned?: number;
  attempts: number;
  sectionProgress: number; // index of current section (maps to DB column section_index)
}

export interface PlayerProfile {
  id: string;
  email: string;
  name: string;
  heroClass: string;
  role: "parent" | "child";
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  lastSessionDate?: string;
  totalLessonsCompleted: number;
  unlockedToday: boolean;
  lessons: Record<string, LessonProgress>;
}

// Session stored in localStorage — login credentials, separate from game stats
export interface UserSession {
  userId: string;
  email: string;
  role: "parent" | "child";
}

// Return type for lookupUser — discriminated union (not PlayerProfile | null)
export type LookupResult =
  | { found: true; profile: PlayerProfile; session: UserSession }
  | { found: false };

// Return type for completeLesson Server Action
export interface LessonCompletionResult {
  level: number;
  streak: number;
}

// Narrowed patch type for updateLessonProgress — only fields safe to update mid-session
export type LessonProgressPatch = Partial<Pick<LessonProgress, "sectionProgress" | "status">>;

// Hero class names (matches DB CHECK constraint in migration 001)
export type HeroClass = "wizard" | "knight" | "elf" | "ninja" | "hero" | "merfolk";

// XP thresholds per level
export const XP_PER_LEVEL = [
  0,    // level 1
  100,  // level 2
  250,  // level 3
  450,  // level 4
  700,  // level 5
  1000, // level 6
  1400, // level 7
  1900, // level 8
  2500, // level 9
  3200, // level 10
];

export function calculateLevel(totalXp: number): { level: number; xp: number; xpToNextLevel: number } {
  let level = 1;
  for (let i = 1; i < XP_PER_LEVEL.length; i++) {
    if (totalXp >= XP_PER_LEVEL[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  const currentLevelXp = XP_PER_LEVEL[level - 1] || 0;
  const nextLevelXp = XP_PER_LEVEL[level] || XP_PER_LEVEL[XP_PER_LEVEL.length - 1] + 500;
  return {
    level,
    xp: totalXp - currentLevelXp,
    xpToNextLevel: nextLevelXp - currentLevelXp,
  };
}
