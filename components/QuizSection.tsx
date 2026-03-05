"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizSection as QuizSectionType, QuizQuestion } from "@/lib/types";
import { useAudio } from "@/lib/audio/AudioContext";
import { resolveCorrectIndex } from "@/lib/quiz-utils";

interface QuizSectionProps {
  section: QuizSectionType;
  onComplete: (score: number) => void;
}

function QuestionCard({
  question,
  questionNum,
  totalQuestions,
  onAnswer,
}: {
  question: QuizQuestion;
  questionNum: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
}) {
  const { sfx } = useAudio();
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const correctIdx = resolveCorrectIndex(question);

  const isCorrect = selected === correctIdx;

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    sfx(idx === correctIdx ? "correct-ding" : "wrong-buzz");
  };

  const handleNext = () => {
    onAnswer(isCorrect);
  };

  const options = question.options || ["True", "False"];
  const isTrueFalse = question.type === "true-false";

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      {/* Question number */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gold-dim uppercase tracking-wider font-bold">
          Question {questionNum} of {totalQuestions}
        </span>
        <span className="text-xs text-xp-purple-bright font-mono px-2 py-1 bg-xp-purple/10 rounded">
          {question.type === "true-false" ? "True / False" : "Multiple Choice"}
        </span>
      </div>

      {/* Question text */}
      <h3 className="text-xl font-bold text-slate-100 mb-6 leading-relaxed">
        {question.question}
      </h3>

      {/* Options */}
      <div className={`gap-3 mb-6 ${isTrueFalse ? "grid grid-cols-2" : "flex flex-col"}`}>
        {options.map((option, idx) => {
          let style =
            "rpg-card px-5 py-4 cursor-pointer transition-all text-left w-full";
          if (revealed) {
            if (idx === correctIdx) {
              style += " border-hp-green/70 bg-hp-green/10 glow-green";
            } else if (idx === selected) {
              style += " border-fire-red/70 bg-fire-red/10";
            } else {
              style += " opacity-30";
            }
          } else {
            style += " hover:border-gold/60";
          }

          return (
            <motion.button
              key={idx}
              whileHover={!revealed ? { scale: 1.01 } : undefined}
              whileTap={!revealed ? { scale: 0.98 } : undefined}
              onClick={() => handleSelect(idx)}
              className={style}
            >
              <div className="flex items-center gap-3">
                {!isTrueFalse && (
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border shrink-0 ${
                      revealed && idx === correctIdx
                        ? "bg-hp-green/20 border-hp-green text-hp-green-bright"
                        : revealed && idx === selected
                        ? "bg-fire-red/20 border-fire-red text-fire-red"
                        : "bg-void border-gold-dim/30 text-gold-dim"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                )}
                <span
                  className={`${
                    isTrueFalse ? "text-center w-full text-lg font-bold" : ""
                  } ${
                    revealed && idx === correctIdx
                      ? "text-hp-green-bright"
                      : revealed && idx === selected
                      ? "text-fire-red"
                      : "text-slate-200"
                  }`}
                >
                  {option}
                </span>
                {revealed && idx === correctIdx && (
                  <span className="ml-auto text-hp-green-bright text-lg">&#10003;</span>
                )}
                {revealed && idx === selected && idx !== correctIdx && (
                  <span className="ml-auto text-fire-red text-lg">&#10007;</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={`p-4 rounded-lg border mb-6 ${
                isCorrect
                  ? "bg-hp-green/5 border-hp-green/30"
                  : "bg-fire-red/5 border-fire-red/30"
              }`}
            >
              <p className={`font-bold mb-1 ${isCorrect ? "text-hp-green-bright" : "text-fire-red"}`}>
                {isCorrect ? "Correct!" : "Not quite!"}
              </p>
              <p className="text-slate-300 text-sm">{question.explanation}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="px-6 py-2.5 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-shadow"
            >
              {"Next Question →"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ScoreScreen({
  score,
  total,
  passingScore,
  onPass,
  onRetry,
}: {
  score: number;
  total: number;
  passingScore: number;
  onPass: () => void;
  onRetry: () => void;
}) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= passingScore;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      {/* Score circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`w-36 h-36 rounded-full flex flex-col items-center justify-center mx-auto mb-6 border-4 ${
          passed
            ? "border-hp-green glow-green"
            : "border-fire-red"
        }`}
        style={{
          background: passed
            ? "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)",
        }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-4xl font-bold ${passed ? "text-hp-green-bright" : "text-fire-red"}`}
        >
          {percentage}%
        </motion.span>
        <span className="text-sm text-slate-400">
          {score}/{total}
        </span>
      </motion.div>

      {/* Result text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {passed ? (
          <>
            <h3 className="text-2xl font-bold text-hp-green-bright mb-2">
              Quest Passed!
            </h3>
            <p className="text-slate-400 mb-2">
              You scored {percentage}% (needed {passingScore}%)
            </p>
            {/* XP animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-xp-purple/10 border border-xp-purple/30 mb-6"
            >
              <span className="text-xp-purple-bright font-bold text-lg">+XP</span>
              <span className="text-xp-purple-bright text-sm">earned!</span>
            </motion.div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-fire-red mb-2">
              Not Quite...
            </h3>
            <p className="text-slate-400 mb-6">
              You scored {percentage}% but need {passingScore}% to pass. Review the material and try again!
            </p>
          </>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center justify-center gap-4"
      >
        {passed ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPass}
            className="px-8 py-3 bg-gradient-to-r from-hp-green-dim to-hp-green text-void font-bold rounded-lg text-lg shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow"
          >
            {"Continue →"}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="px-8 py-3 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg text-lg shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-shadow"
          >
            Try Again
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function QuizSection({ section, onComplete }: QuizSectionProps) {
  const { sfx } = useAudio();
  const [currentQ, setCurrentQ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    sfx("quiz-start-horn");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const questions = section.questions;

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const newCorrect = correct ? correctCount + 1 : correctCount;
      if (correct) setCorrectCount(newCorrect);

      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
      } else {
        // Delay score slightly so the answer explanation can register
        setCorrectCount(newCorrect);
        setTimeout(() => setShowScore(true), 300);
      }
    },
    [currentQ, correctCount, questions.length]
  );

  const handleRetry = () => {
    setCurrentQ(0);
    setCorrectCount(0);
    setShowScore(false);
  };

  const handlePass = () => {
    const percentage = Math.round((correctCount / questions.length) * 100);
    onComplete(percentage);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gold text-glow-gold mb-2">
          Knowledge Check
        </h2>
        {/* Progress bar */}
        {!showScore && (
          <div className="flex items-center gap-2 mt-3">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors duration-500 ${
                  i < currentQ
                    ? "bg-xp-purple"
                    : i === currentQ
                    ? "bg-gold"
                    : "bg-void-lighter"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="rpg-card p-8 glow-gold">
        <AnimatePresence mode="wait">
          {showScore ? (
            <ScoreScreen
              key="score"
              score={correctCount}
              total={questions.length}
              passingScore={section.passingScore}
              onPass={handlePass}
              onRetry={handleRetry}
            />
          ) : (
            <QuestionCard
              key={currentQ}
              question={questions[currentQ]}
              questionNum={currentQ + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
