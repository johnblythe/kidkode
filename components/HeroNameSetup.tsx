"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProfile, saveProfile } from "@/lib/progress";
import { useAudio } from "@/lib/audio/AudioContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import CanvasParticles from "@/components/CanvasParticles";

const MAX_NAME_LENGTH = 20;

// Character class options for the preview sprite
const CHARACTER_CLASSES = [
  { emoji: "\u{1F9D9}", label: "Wizard" },
  { emoji: "\u{1FA96}", label: "Knight" },
  { emoji: "\u{1F9DD}", label: "Elf" },
  { emoji: "\u{1F977}", label: "Ninja" },
  { emoji: "\u{1F9B9}", label: "Hero" },
  { emoji: "\u{1F9DC}", label: "Merfolk" },
];

function SubmitFlourish({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.3 }}
    >
      {/* Central flash */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 8, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute w-20 h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.8), rgba(168,85,247,0.4), transparent)",
        }}
      />

      {/* Expanding ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        className="absolute w-32 h-32 rounded-full border-2 border-gold"
      />

      {/* Canvas confetti burst (replaces 40 framer-motion divs) */}
      <div className="absolute inset-0">
        <CanvasParticles effect="confetti" count={40} />
      </div>

      {/* "Quest Begins!" text */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, times: [0, 0.3, 0.6, 1], delay: 0.2 }}
        className="absolute"
      >
        <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-pixel)] text-gold text-glow-gold whitespace-nowrap">
          Quest Begins!
        </h2>
      </motion.div>
    </motion.div>
  );
}

function FadeComplete({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-pixel)] text-gold text-glow-gold">
        Quest Begins!
      </h2>
    </motion.div>
  );
}

interface HeroNameSetupProps {
  onComplete: () => void;
}

export default function HeroNameSetup({ onComplete }: HeroNameSetupProps) {
  const { sfx } = useAudio();
  const reducedMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState(0);
  const [phase, setPhase] = useState<"intro" | "input" | "flourish">("intro");
  const inputRef = useRef<HTMLInputElement>(null);

  // Transition from intro to input
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("input");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Auto-focus input when it appears
  useEffect(() => {
    if (phase === "input") {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const trimmedName = name.trim();
  const canSubmit = trimmedName.length > 0;
  const remaining = MAX_NAME_LENGTH - name.length;

  function handleSubmit() {
    if (!canSubmit) return;

    sfx("level-up");

    // Save name to profile
    const profile = getProfile();
    profile.name = trimmedName;
    saveProfile(profile);

    setPhase("flourish");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && canSubmit) {
      handleSubmit();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-void">
      {/* Canvas star field (replaces 50 framer-motion divs) */}
      <div className="absolute inset-0">
        <CanvasParticles effect="stars" count={50} loop />
      </div>

      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168,85,247,0.12) 0%, rgba(251,191,36,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Expanding rings on intro */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.2, 0], scale: [0, 2, 4] }}
        transition={{ duration: 2.5, delay: 0.2 }}
        className="absolute w-40 h-40 rounded-full border border-xp-purple/30"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.15, 0], scale: [0, 1.5, 3] }}
        transition={{ duration: 2.5, delay: 0.5 }}
        className="absolute w-40 h-40 rounded-full border border-gold/20"
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 w-full max-w-md">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                {"⚔️"}
              </motion.div>
              <h1 className="text-xl sm:text-2xl font-[family-name:var(--font-pixel)] text-gold text-glow-gold leading-relaxed">
                A New Adventure
                <br />
                Awaits...
              </h1>
            </motion.div>
          )}

          {phase === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Character preview */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              >
                <div className="w-24 h-24 mx-auto rounded-xl bg-void-lighter border-2 border-xp-purple-dim flex items-center justify-center text-5xl mb-2">
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {CHARACTER_CLASSES[selectedClass].emoji}
                  </motion.span>
                </div>

                {/* Class picker */}
                <div className="flex justify-center gap-2 mt-3">
                  {CHARACTER_CLASSES.map((cls, i) => (
                    <motion.button
                      key={cls.label}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedClass(i)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                        i === selectedClass
                          ? "bg-xp-purple-dim/50 border-2 border-xp-purple glow-purple"
                          : "bg-void-lighter border border-locked hover:border-xp-purple-dim"
                      }`}
                      title={cls.label}
                    >
                      {cls.emoji}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Title text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-lg sm:text-xl font-[family-name:var(--font-pixel)] text-gold text-glow-gold leading-relaxed">
                  What shall we call you,
                  <br />
                  adventurer?
                </h1>
              </motion.div>

              {/* Name input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_NAME_LENGTH) {
                        setName(e.target.value);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your hero name..."
                    maxLength={MAX_NAME_LENGTH}
                    className="w-full px-5 py-4 bg-void-lighter border-2 border-gold-dim rounded-lg text-center text-lg text-gold placeholder-locked-text font-[family-name:var(--font-pixel)] text-[14px] tracking-wider outline-none transition-all focus:border-gold focus:shadow-[0_0_20px_rgba(251,191,36,0.3),0_0_40px_rgba(251,191,36,0.1)]"
                    autoComplete="off"
                    spellCheck={false}
                  />

                  {/* Character count */}
                  <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono ${
                    remaining <= 5 ? "text-fire-orange" : "text-locked-text"
                  }`}>
                    {remaining}
                  </div>
                </div>

                {/* Live preview of the name */}
                <AnimatePresence>
                  {trimmedName && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="text-locked-text">Hero:</span>
                        <span className="text-gold font-bold">
                          {CHARACTER_CLASSES[selectedClass].emoji} {trimmedName}
                        </span>
                        <span className="text-locked-text">the {CHARACTER_CLASSES[selectedClass].label}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  whileHover={canSubmit ? { scale: 1.05 } : {}}
                  whileTap={canSubmit ? { scale: 0.95 } : {}}
                  animate={
                    canSubmit
                      ? {
                          boxShadow: [
                            "0 0 15px rgba(251,191,36,0.3), 0 0 30px rgba(251,191,36,0.1)",
                            "0 0 25px rgba(251,191,36,0.5), 0 0 50px rgba(251,191,36,0.2)",
                            "0 0 15px rgba(251,191,36,0.3), 0 0 30px rgba(251,191,36,0.1)",
                          ],
                        }
                      : {}
                  }
                  transition={canSubmit ? { duration: 2, repeat: Infinity } : {}}
                  className={`w-full py-4 rounded-xl text-base font-[family-name:var(--font-pixel)] tracking-wider transition-all ${
                    canSubmit
                      ? "bg-gradient-to-r from-gold-dim via-gold to-gold-bright text-void font-black cursor-pointer"
                      : "bg-void-lighter border border-locked text-locked-text cursor-not-allowed"
                  }`}
                >
                  {canSubmit ? "Begin Your Quest" : "Name Your Hero..."}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flourish overlay */}
        <AnimatePresence>
          {phase === "flourish" && (
            reducedMotion
              ? <FadeComplete onComplete={onComplete} />
              : <SubmitFlourish onComplete={onComplete} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
