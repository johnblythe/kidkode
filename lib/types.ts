// ============================================
// KidKode - Lesson & Progress Types
// ============================================

export interface SlideFrame {
  title: string;
  content: string; // markdown
  visual?: string; // ASCII art or SVG reference
  animation?: "fade" | "slide-left" | "slide-up" | "typewriter" | "pop";
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

export interface InteractiveStep {
  instruction: string;
  type: "drag-drop" | "type-command" | "multiple-choice" | "fill-blank" | "sequence";
  data: Record<string, unknown>;
  hint?: string;
  solution: unknown;
}

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
  status: "locked" | "available" | "in-progress" | "completed";
  completedAt?: string; // ISO date
  quizScore?: number;
  xpEarned?: number;
  attempts: number;
  sectionProgress: number; // index of current section
}

export interface PlayerProfile {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  lastSessionDate?: string;
  totalLessonsCompleted: number;
  unlockedToday: boolean;
  lessons: Record<string, LessonProgress>;
}

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
