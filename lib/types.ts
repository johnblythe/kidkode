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
  realm: RealmId;
  estimatedMinutes: number;
  xpReward: number;
  icon: string; // emoji
  sections: LessonSection[];
  boss?: BossData;
}

// ============================================
// Realms
// ============================================

export type RealmId = 1 | 2 | 3 | 4 | 5 | 6;

export type RealmUnlockCondition =
  | { type: "default" }
  | { type: "realm-complete"; realmId: RealmId }
  | { type: "all-realms"; realmIds: readonly RealmId[] };

export interface Realm {
  id: RealmId;
  slug: string;
  name: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  unlockCondition: RealmUnlockCondition;
}

// ============================================
// Progress & RPG
// ============================================

export type QuizTier = "gold" | "silver" | "bronze" | null;

export function getQuizTier(score: number | undefined): QuizTier {
  if (score === undefined || score === null) return null;
  if (score >= 100) return "gold";   // perfect score
  if (score >= 80) return "silver";  // 4/5, 5/6, 6/7
  if (score >= 60) return "bronze";  // 3/5, 4/6, 5/7
  return null;
}

export interface EarnedBadge {
  slug: string;        // realm slug, e.g. "apprentices-tower"
  realmId: RealmId;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;    // ISO date
}

// Notification payload from completeLesson — narrower than EarnedBadge (no earnedAt/description)
export interface NewlyAwardedBadge {
  slug: string;
  name: string;
  icon: string;
}

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
  heroClass: HeroClass;
  role: "parent" | "child";
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  lastSessionDate?: string;
  daysAway?: number;
  totalLessonsCompleted: number;
  unlockedToday: boolean;
  lessons: Record<string, LessonProgress>;
  badges: EarnedBadge[];
  // Cosmetic identity fields (avatar tier, evolution, realm titles)
  avatarTier: 1 | 2 | 3;
  evolvedClassName: string;
  activeTitle: string | null;
  availableTitles: string[];
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

// Comeback multiplier tiers — 3d/7d/14d+ thresholds.
// Must stay in sync with ComebackBanner display logic in app/page.tsx.
export type ComebackMultiplier = 1.25 | 1.5 | 2.0;

export function getComebackMultiplier(daysAway: number): ComebackMultiplier | null {
  if (daysAway >= 14) return 2.0;
  if (daysAway >= 7)  return 1.5;
  if (daysAway >= 3)  return 1.25;
  return null;
}

// Return type for completeLesson Server Action
export interface LessonCompletionResult {
  level: number;
  streak: number;
  newBadges?: NewlyAwardedBadge[];
  // Presence of the object is the flag — no separate isFirstAttempt boolean needed
  firstAttemptBonus?: { bonusXp: number };
  comebackBonus?: { daysAway: number; multiplier: ComebackMultiplier; bonusXp: number };
  classEvolved?: { from: string; to: string };
  newTitle?: string;
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
  4000, // level 11
  4900, // level 12
  5900, // level 13
  7000, // level 14
  8500, // level 15
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
