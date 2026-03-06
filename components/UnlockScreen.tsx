"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAudio } from "@/lib/audio/AudioContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import CanvasParticles from "@/components/CanvasParticles";

interface UnlockScreenProps {
  xpEarned: number;
  newLevel: number;
  streak: number;
}

function XPCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let rafId: number;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function UnlockScreen({ xpEarned, newLevel, streak }: UnlockScreenProps) {
  const { sfx, playBGM } = useAudio();
  const reducedMotion = useReducedMotion();
  const [showContent, setShowContent] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    sfx("unlock-celebration");
    playBGM("victory");
    const t1 = setTimeout(() => setShowContent(true), 300);
    const t2 = setTimeout(() => setShowStats(true), 1500);
    const t3 = setTimeout(() => setShowButton(true), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-void">
      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, rgba(251,191,36,0.05) 40%, transparent 70%)",
        }}
      />

      {/* Canvas confetti particles (replaces 30 framer-motion divs) */}
      <div className="absolute inset-0">
        <CanvasParticles effect="confetti" count={120}  />
      </div>

      {/* Radial rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.3, 0], scale: [0, 3, 5] }}
        transition={{ duration: 3, delay: 0.2 }}
        className="absolute w-40 h-40 rounded-full border-2 border-gold/30"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.2, 0], scale: [0, 2, 4] }}
        transition={{ duration: 3, delay: 0.5 }}
        className="absolute w-40 h-40 rounded-full border-2 border-xp-purple/30"
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
            >
              {/* Main title */}
              <motion.div
                animate={{
                  textShadow: [
                    "0 0 20px rgba(251,191,36,0.5), 0 0 40px rgba(251,191,36,0.2)",
                    "0 0 40px rgba(251,191,36,0.8), 0 0 80px rgba(251,191,36,0.4)",
                    "0 0 20px rgba(251,191,36,0.5), 0 0 40px rgba(251,191,36,0.2)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-2"
              >
                <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-bright to-gold">
                  QUEST
                </h1>
                <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-bright to-gold">
                  COMPLETE!
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xp-purple-bright text-lg mb-8"
              >
                Coding knowledge unlocked
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 mb-8"
            >
              {/* XP earned */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="rpg-card px-6 py-4 glow-purple flex items-center justify-between"
              >
                <span className="text-slate-400 text-sm uppercase tracking-wider">XP Earned</span>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="text-3xl font-black text-xp-purple-bright"
                    style={{
                      textShadow: "0 0 15px rgba(168,85,247,0.5)",
                    }}
                  >
                    +<XPCounter target={xpEarned} />
                  </motion.span>
                  <span className="text-xp-purple text-sm">XP</span>
                </div>
              </motion.div>

              {/* Level */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
                className="rpg-card px-6 py-4 flex items-center justify-between"
                style={{
                  boxShadow: "0 0 12px rgba(251,191,36,0.2)",
                }}
              >
                <span className="text-slate-400 text-sm uppercase tracking-wider">Level</span>
                <div className="flex items-center gap-2">
                  <span className="level-badge text-lg">{newLevel}</span>
                </div>
              </motion.div>

              {/* Streak */}
              {streak > 0 && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  className="rpg-card px-6 py-4 flex items-center justify-between"
                  style={{
                    boxShadow: "0 0 12px rgba(239,68,68,0.15)",
                  }}
                >
                  <span className="text-slate-400 text-sm uppercase tracking-wider">
                    Streak
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="streak-fire text-2xl">&#128293;</span>
                    <span className="text-fire-orange font-bold text-xl">{streak} day{streak > 1 ? "s" : ""}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(34,197,94,0.3), 0 0 40px rgba(34,197,94,0.1)",
                      "0 0 35px rgba(34,197,94,0.5), 0 0 70px rgba(34,197,94,0.2)",
                      "0 0 20px rgba(34,197,94,0.3), 0 0 40px rgba(34,197,94,0.1)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-10 py-4 bg-gradient-to-r from-hp-green-dim via-hp-green to-hp-green-bright text-void font-black rounded-xl text-xl tracking-wide"
                >
                  Time to Code!
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
