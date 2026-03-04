"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getLessonBySlug } from "@/content/lessons";
import {
  getLessonProgress,
  updateLessonProgress,
  completeLesson,
} from "@/lib/progress";
import type { Lesson, LessonSection } from "@/lib/types";
import LessonTimer from "@/components/LessonTimer";
import SlideViewer from "@/components/SlideViewer";
import ReadingSectionComponent from "@/components/ReadingSection";
import InteractiveExercise from "@/components/InteractiveExercise";
import QuizSection from "@/components/QuizSection";
import UnlockScreen from "@/components/UnlockScreen";

function sectionLabel(section: LessonSection): string {
  switch (section.type) {
    case "slides":
      return "Intro";
    case "reading":
      return "Reading";
    case "interactive":
      return "Practice";
    case "quiz":
      return "Quiz";
  }
}

export default function LessonPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showUnlock, setShowUnlock] = useState(false);
  const [unlockData, setUnlockData] = useState({ xpEarned: 0, newLevel: 1, streak: 0 });
  const [notFound, setNotFound] = useState(false);

  // Load lesson and restore progress
  useEffect(() => {
    const found = getLessonBySlug(slug);
    if (!found) {
      setNotFound(true);
      return;
    }
    setLesson(found);

    // Restore section progress
    const progress = getLessonProgress(slug);
    if (progress.sectionProgress > 0 && progress.status !== "completed") {
      setCurrentSection(progress.sectionProgress);
    }

    // Mark as in-progress
    updateLessonProgress(slug, { status: "in-progress" });
  }, [slug]);

  // Save section progress on change
  useEffect(() => {
    if (lesson && currentSection > 0) {
      updateLessonProgress(slug, { sectionProgress: currentSection });
    }
  }, [currentSection, lesson, slug]);

  const handleSectionComplete = useCallback(() => {
    if (!lesson) return;
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [lesson, currentSection]);

  const handleQuizComplete = useCallback(
    (score: number) => {
      if (!lesson) return;
      const profile = completeLesson(slug, score, lesson.xpReward);
      setUnlockData({
        xpEarned: lesson.xpReward,
        newLevel: profile.level,
        streak: profile.streak,
      });
      setShowUnlock(true);
    },
    [lesson, slug]
  );

  // Not found
  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-gold mb-4">Quest Not Found</h1>
        <p className="text-slate-400 mb-6">This lesson doesn&apos;t exist yet.</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-gold/10 border border-gold/30 text-gold rounded-lg hover:bg-gold/20 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Loading
  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Unlock screen
  if (showUnlock) {
    return (
      <UnlockScreen
        xpEarned={unlockData.xpEarned}
        newLevel={unlockData.newLevel}
        streak={unlockData.streak}
      />
    );
  }

  const section = lesson.sections[currentSection];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-void/90 backdrop-blur-sm border-b border-gold-dim/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Back button */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1 text-sm text-slate-400 hover:text-gold transition-colors shrink-0"
          >
            <span className="text-lg">{"←"}</span>
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          {/* Lesson title */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">{lesson.icon}</span>
            <h1 className="text-sm font-bold text-gold truncate">{lesson.title}</h1>
          </div>

          {/* Lesson timer */}
          <div className="shrink-0 hidden sm:block">
            <LessonTimer targetMinutes={lesson.estimatedMinutes} />
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-1 ml-auto shrink-0">
            {lesson.sections.map((sec, i) => (
              <div key={i} className="flex items-center">
                <button
                  onClick={() => i <= currentSection && setCurrentSection(i)}
                  className={`relative group`}
                  disabled={i > currentSection}
                  title={sectionLabel(sec)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i < currentSection
                        ? "bg-hp-green/20 border border-hp-green/50 text-hp-green-bright"
                        : i === currentSection
                        ? "bg-gold/20 border-2 border-gold text-gold shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                        : "bg-void-lighter border border-gold-dim/20 text-slate-500"
                    }`}
                  >
                    {i < currentSection ? (
                      <span>&#10003;</span>
                    ) : (
                      i + 1
                    )}
                  </div>
                  {/* Tooltip */}
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {sectionLabel(sec)}
                  </span>
                </button>
                {/* Connector line */}
                {i < lesson.sections.length - 1 && (
                  <div
                    className={`w-4 h-0.5 ${
                      i < currentSection ? "bg-hp-green/50" : "bg-void-lighter"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Full-width progress bar */}
        <div className="h-1 bg-void-lighter">
          <motion.div
            className="h-full bg-gradient-to-r from-xp-purple to-gold"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentSection + 1) / lesson.sections.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </header>

      {/* Section content */}
      <main className="flex-1 px-4 py-8 flex items-start justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {section.type === "slides" && (
              <SlideViewer section={section} onComplete={handleSectionComplete} />
            )}
            {section.type === "reading" && (
              <ReadingSectionComponent
                section={section}
                onComplete={handleSectionComplete}
              />
            )}
            {section.type === "interactive" && (
              <InteractiveExercise
                section={section}
                onComplete={handleSectionComplete}
              />
            )}
            {section.type === "quiz" && (
              <QuizSection section={section} onComplete={handleQuizComplete} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-gold-dim/10 py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <span>
            Section {currentSection + 1} of {lesson.sections.length}
          </span>
          <span>{lesson.estimatedMinutes} min lesson</span>
        </div>
      </footer>
    </div>
  );
}
