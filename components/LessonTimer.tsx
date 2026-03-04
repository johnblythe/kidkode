"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/lib/audio/AudioContext";

interface LessonTimerProps {
  targetMinutes: number;
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type TimerPhase = "on-track" | "approaching" | "over-time";

function getPhase(elapsed: number, target: number): TimerPhase {
  const ratio = elapsed / target;
  if (ratio > 1) return "over-time";
  if (ratio >= 0.7) return "approaching";
  return "on-track";
}

const phaseColors: Record<TimerPhase, { text: string; glow: string; bg: string }> = {
  "on-track": {
    text: "text-hp-green",
    glow: "rgba(34, 197, 94, 0.4)",
    bg: "bg-hp-green/10",
  },
  approaching: {
    text: "text-gold",
    glow: "rgba(251, 191, 36, 0.4)",
    bg: "bg-gold/10",
  },
  "over-time": {
    text: "text-fire-red",
    glow: "rgba(239, 68, 68, 0.4)",
    bg: "bg-fire-red/10",
  },
};

export default function LessonTimer({ targetMinutes }: LessonTimerProps) {
  const { sfx } = useAudio();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isVisibleRef = useRef(true);
  const warningFiredRef = useRef(false);

  const targetSeconds = targetMinutes * 60;
  const phase = getPhase(elapsedSeconds, targetSeconds);
  const colors = phaseColors[phase];

  // Whether we're in the last 20% approaching target (pulse zone)
  const ratio = elapsedSeconds / targetSeconds;
  const shouldPulse = ratio >= 0.8 && ratio <= 1;

  // Fire timer warning SFX once when entering pulse zone
  useEffect(() => {
    if (shouldPulse && !warningFiredRef.current) {
      warningFiredRef.current = true;
      sfx("timer-warning");
    }
  }, [shouldPulse, sfx]);

  const startTimer = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start on mount, pause on visibility change
  useEffect(() => {
    startTimer();

    const handleVisibility = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
        stopTimer();
      } else {
        isVisibleRef.current = true;
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [startTimer, stopTimer]);

  return (
    <motion.div
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors duration-500 ${colors.bg} ${
        phase === "on-track"
          ? "border-hp-green/20"
          : phase === "approaching"
          ? "border-gold/20"
          : "border-fire-red/20"
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: shouldPulse
          ? [
              `0 0 4px ${colors.glow}`,
              `0 0 12px ${colors.glow}`,
              `0 0 4px ${colors.glow}`,
            ]
          : `0 0 0px transparent`,
      }}
      transition={
        shouldPulse
          ? { boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }
          : { duration: 0.3 }
      }
    >
      {/* Hourglass icon */}
      <AnimatePresence mode="wait">
        <motion.span
          key={phase}
          className="text-sm select-none"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden
        >
          {phase === "over-time" ? "\u{231B}" : "\u{23F3}"}
        </motion.span>
      </AnimatePresence>

      {/* Time display */}
      <span
        className={`text-xs font-mono font-bold tracking-wide ${colors.text} transition-colors duration-500`}
      >
        {formatTime(elapsedSeconds)}
        <span className="text-slate-500 mx-0.5">/</span>
        <span className="text-slate-500">{formatTime(targetSeconds)}</span>
      </span>
    </motion.div>
  );
}
