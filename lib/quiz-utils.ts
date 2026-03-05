import type { QuizQuestion } from "@/lib/types";

/**
 * Resolve the correct answer index for a quiz question.
 * Normalizes options (falling back to ["True","False"] for true-false questions)
 * and warns if the answer can't be matched.
 */
export function resolveCorrectIndex(question: QuizQuestion): number {
  if (typeof question.correctAnswer === "number") {
    return question.correctAnswer;
  }
  const options = question.options ?? ["True", "False"];
  const idx = options.indexOf(question.correctAnswer as string);
  if (idx === -1) {
    console.warn(
      `[quiz] correctAnswer "${question.correctAnswer}" not found in options:`,
      options
    );
  }
  return idx;
}
