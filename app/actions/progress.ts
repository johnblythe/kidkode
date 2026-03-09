"use server";

// Re-export server-side progress functions as Server Actions.
// Client components import from here — not from lib/progress.ts directly.

export {
  getProfile,
  updateLessonProgress,
  completeLesson,
  checkAndUnlockNextLesson,
  loadDashboard,
} from "@/lib/progress";
