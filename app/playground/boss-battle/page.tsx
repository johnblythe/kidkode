"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import BossBattleSection from "@/components/BossBattleSection";
import VolumeToggle from "@/components/VolumeToggle";
import { getLessonBySlug } from "@/content/lessons";
import type { QuizSection } from "@/lib/types";

function getPlaygroundData() {
  const lesson = getLessonBySlug("git-save-points");
  if (!lesson) throw new Error('Playground: lesson "git-save-points" not found');
  const boss = lesson.boss;
  if (!boss) throw new Error('Playground: lesson "git-save-points" has no boss data');
  const quizSection = lesson.sections.find(
    (s): s is QuizSection => s.type === "quiz"
  );
  if (!quizSection) throw new Error('Playground: lesson "git-save-points" has no quiz section');
  return { boss, quizSection };
}

const { boss, quizSection } = getPlaygroundData();

type Result = "victory" | "defeat" | null;

export default function BossBattlePlayground() {
  const [resetKey, setResetKey] = useState(0);
  const [result, setResult] = useState<Result>(null);

  const handleComplete = useCallback((score: number) => {
    setResult(score > 0 ? "victory" : "defeat");
  }, []);

  const handleStudyUp = useCallback(() => {
    setResult("defeat");
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setResetKey((k) => k + 1);
  }, []);

  return (
    <div className="min-h-screen bg-dungeon">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-void/90 backdrop-blur-sm border-b border-xp-purple-dim/20 px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/playground"
              className="text-sm text-gold-dim hover:text-gold transition-colors"
            >
              &larr; Playground
            </Link>
            <span className="text-slate-500">|</span>
            <h1 className="text-sm font-bold text-slate-200">
              Boss Battle: {boss.name}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <VolumeToggle />
            <button
              onClick={handleReset}
              className="px-3 py-1 text-sm rounded-lg border border-gold-dim/30 text-gold-dim hover:text-gold hover:border-gold/50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Battle area */}
      <div className="px-6 py-8">
        <BossBattleSection
          key={resetKey}
          section={quizSection}
          boss={boss}
          onComplete={handleComplete}
          onStudyUp={handleStudyUp}
        />
      </div>

      {/* Result banner */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-0 inset-x-0 z-50 p-4"
          >
            <div
              className={`max-w-3xl mx-auto rpg-card p-4 text-center ${
                result === "victory" ? "glow-green" : "glow-purple"
              }`}
            >
              <span className="text-2xl font-black block mb-1">
                {result === "victory" ? (
                  <span className="text-hp-green-bright">VICTORY!</span>
                ) : (
                  <span className="text-fire-red">DEFEATED</span>
                )}
              </span>
              <button
                onClick={handleReset}
                className="mt-2 px-4 py-1.5 text-sm rounded-lg bg-gold-dim/20 border border-gold-dim/40 text-gold hover:bg-gold-dim/30 transition-colors"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
