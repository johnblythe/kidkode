"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SlideSection } from "@/lib/types";
import { useAudio } from "@/lib/audio/AudioContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface SlideViewerProps {
  section: SlideSection;
  onComplete: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const animationVariants: Record<string, { initial: any; animate: any; exit: any }> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "slide-left": {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
  },
  typewriter: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  pop: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  swoosh: {
    initial: { opacity: 0, x: 120, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -120, scale: 0.95 },
  },
  "page-flip": {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 },
  },
};

const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function renderContent(text: string): React.ReactNode {
  // Split by code blocks and bold markers, convert to spans
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-gold-bright font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="bg-void-lighter text-xp-purple-bright px-1.5 py-0.5 rounded text-sm font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part === "\n") {
      return <br key={i} />;
    }
    return <span key={i}>{part}</span>;
  });
}

function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setDisplayed(text.slice(0, idx));
      if (idx >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  if (done) {
    return <>{renderContent(text)}</>;
  }
  return <span className="text-slate-200">{displayed}<span className="animate-pulse text-gold">|</span></span>;
}

export default function SlideViewer({ section, onComplete }: SlideViewerProps) {
  const { sfx } = useAudio();
  const reducedMotion = useReducedMotion();
  const [currentFrame, setCurrentFrame] = useState(0);
  const frames = section.frames;
  const frame = frames[currentFrame];
  const isLast = currentFrame === frames.length - 1;
  const anim = frame.animation || "fade";
  const variants = reducedMotion
    ? reducedVariants
    : (animationVariants[anim] || animationVariants.fade);

  const goNext = useCallback(() => {
    sfx("slide-whoosh");
    if (isLast) {
      onComplete();
    } else {
      setCurrentFrame((prev) => prev + 1);
    }
  }, [isLast, onComplete, sfx]);

  // auto-advance if frame has a duration
  useEffect(() => {
    if (frame.duration && frame.duration > 0 && !isLast) {
      const timer = setTimeout(goNext, frame.duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [frame.duration, isLast, goNext, currentFrame]);

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      {/* Slide card */}
      <div
        className="w-full min-h-[400px] relative"
        style={anim === "page-flip" ? { perspective: 1200 } : undefined}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFrame}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={
              anim === "swoosh" && !reducedMotion
                ? { type: "spring", stiffness: 300, damping: 30 }
                : { duration: 0.5, ease: "easeInOut" }
            }
            className="rpg-card p-8 glow-gold w-full"
          >
            {/* Title */}
            <h2 className="text-2xl font-bold text-gold mb-6 text-glow-gold">
              {frame.title}
            </h2>

            {/* Content */}
            <div className="text-lg leading-relaxed text-slate-200 mb-6">
              {anim === "typewriter" ? (
                <TypewriterText text={frame.content} />
              ) : (
                renderContent(frame.content)
              )}
            </div>

            {/* Visual */}
            {frame.visual && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="bg-void rounded-lg border border-xp-purple-dim/30 p-4 font-mono text-sm text-xp-purple-bright whitespace-pre overflow-x-auto glow-purple"
              >
                {frame.visual}
              </motion.div>
            )}

            {/* Narrator notes */}
            {frame.notes && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 text-sm italic text-gold-dim"
              >
                {frame.notes}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex items-center gap-2 mt-6 mb-4">
        {frames.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentFrame(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentFrame
                ? "bg-gold scale-125 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                : i < currentFrame
                ? "bg-gold-dim"
                : "bg-void-lighter border border-gold-dim/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Next / Continue button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={goNext}
        className="mt-2 px-8 py-3 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg text-lg shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-shadow"
      >
        {isLast ? "Continue →" : "Next →"}
      </motion.button>
    </div>
  );
}
