"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizSection, BossData, QuizQuestion } from "@/lib/types";
import { bossSprites } from "@/components/bosses";
import { useAudio } from "@/lib/audio/AudioContext";

interface BossBattleProps {
  section: QuizSection;
  boss: BossData;
  onComplete: (score: number) => void;
  onStudyUp: (sectionIndex: number) => void;
}

type Phase = "intro" | "battle" | "victory" | "defeat";
type BossSpriteState = "idle" | "attacking" | "damaged" | "dead";

function HPBar({
  current,
  max,
  variant,
  label,
}: {
  current: number;
  max: number;
  variant: "boss" | "player";
  label: string;
}) {
  const pct = Math.max(0, (current / max) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <span
          className={`text-xs font-mono ${
            variant === "boss" ? "text-fire-red" : "text-hp-green-bright"
          }`}
        >
          {Math.round(current)}/{max}
        </span>
      </div>
      <div className={`hp-bar-track hp-bar-${variant}`}>
        <div className="hp-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function PlayerHearts({ current, max }: { current: number; max: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => (
        <motion.span
          key={i}
          animate={
            i >= current
              ? { scale: 0.8, opacity: 0.2 }
              : { scale: [1, 1.2, 1], opacity: 1 }
          }
          transition={
            i >= current
              ? { duration: 0.3 }
              : { duration: 0.5, delay: i * 0.1 }
          }
          className="text-2xl"
        >
          {i < current ? "\u2764\uFE0F" : "\u{1F5A4}"}
        </motion.span>
      ))}
    </div>
  );
}

function DamageNumber({ value, x }: { value: number; x?: number }) {
  return (
    <motion.div
      className="absolute top-0 left-1/2 pointer-events-none z-20 float-up-damage"
      style={{ marginLeft: x ?? 0 }}
      initial={{ opacity: 1 }}
    >
      <span className="text-3xl font-black text-fire-orange drop-shadow-lg">
        -{value}
      </span>
    </motion.div>
  );
}

function AttackButton({
  label,
  index,
  disabled,
  onSelect,
}: {
  label: string;
  index: number;
  disabled: boolean;
  onSelect: (idx: number) => void;
}) {
  const letters = ["A", "B", "C", "D"];
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.03 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      onClick={() => !disabled && onSelect(index)}
      disabled={disabled}
      className={`rpg-card px-4 py-3 text-left transition-all ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:border-gold/60 cursor-pointer"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border bg-void border-gold-dim/30 text-gold-dim shrink-0">
          {letters[index]}
        </span>
        <span className="text-slate-200 text-sm font-medium">{label}</span>
      </div>
    </motion.button>
  );
}

export default function BossBattleSection({
  section,
  boss,
  onComplete,
  onStudyUp,
}: BossBattleProps) {
  const { sfx } = useAudio();
  const [phase, setPhase] = useState<Phase>("intro");
  const [bossHp, setBossHp] = useState(boss.maxHp);
  const [playerHp, setPlayerHp] = useState(boss.playerMaxHp);
  const [currentQ, setCurrentQ] = useState(0);
  const [spriteState, setSpriteState] = useState<BossSpriteState>("idle");
  const [damageShow, setDamageShow] = useState<number | null>(null);
  const [shaking, setShaking] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<QuizQuestion[]>([]);
  const [actionLocked, setActionLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const questions = section.questions;
  const BossSprite = bossSprites[boss.sprite];

  // Intro sequence
  useEffect(() => {
    sfx("quiz-start-horn");
    const t = setTimeout(() => setPhase("battle"), 2000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const advanceOrEnd = useCallback(
    (newBossHp: number, newPlayerHp: number, wasCorrect: boolean) => {
      // Check win/lose
      if (newBossHp <= 0) {
        setSpriteState("dead");
        sfx("unlock-celebration");
        setTimeout(() => {
          const pct = Math.round(
            ((correctCount + (wasCorrect ? 1 : 0)) / questions.length) * 100
          );
          setPhase("victory");
          setTimeout(() => onComplete(pct), 1500);
        }, 1200);
        return;
      }
      if (newPlayerHp <= 0) {
        setTimeout(() => setPhase("defeat"), 800);
        return;
      }
      // Next question
      setTimeout(() => {
        setSpriteState("idle");
        if (currentQ < questions.length - 1) {
          setCurrentQ((q) => q + 1);
        } else {
          // All questions answered, boss survived — still pass with score
          const pct = Math.round(
            ((correctCount + (wasCorrect ? 1 : 0)) / questions.length) * 100
          );
          setPhase("victory");
          setTimeout(() => onComplete(pct), 1500);
        }
        setActionLocked(false);
      }, 1200);
    },
    [currentQ, questions.length, correctCount, onComplete, sfx]
  );

  const handleAttack = useCallback(
    (selectedIdx: number) => {
      if (actionLocked || phase !== "battle") return;
      setActionLocked(true);

      const question = questions[currentQ];
      const correctIdx =
        typeof question.correctAnswer === "number"
          ? question.correctAnswer
          : question.options?.indexOf(question.correctAnswer as string) ?? -1;
      const isCorrect = selectedIdx === correctIdx;

      if (isCorrect) {
        // Player attack hits boss
        sfx("correct-ding");
        setSpriteState("damaged");
        const newBossHp = Math.max(0, bossHp - boss.damagePerCorrect);
        setBossHp(newBossHp);
        setDamageShow(boss.damagePerCorrect);
        setCorrectCount((c) => c + 1);
        setTimeout(() => setDamageShow(null), 800);
        advanceOrEnd(newBossHp, playerHp, true);
      } else {
        // Fizzle → boss counterattack
        sfx("wrong-buzz");
        setTimeout(() => {
          setSpriteState("attacking");
          setShaking(true);
          const newPlayerHp = playerHp - 1;
          setPlayerHp(newPlayerHp);
          setWrongQuestions((prev) => [...prev, question]);
          setTimeout(() => setShaking(false), 300);
          advanceOrEnd(bossHp, newPlayerHp, false);
        }, 400);
      }
    },
    [
      actionLocked,
      phase,
      questions,
      currentQ,
      bossHp,
      playerHp,
      boss.damagePerCorrect,
      sfx,
      advanceOrEnd,
    ]
  );

  const randomAttackName =
    boss.attackNames[currentQ % boss.attackNames.length];

  // ── INTRO ──
  if (phase === "intro") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-3xl mx-auto text-center py-12"
      >
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          {BossSprite && <BossSprite state="idle" />}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-black text-fire-red mt-6 mb-2"
          style={{ textShadow: "0 0 20px rgba(239,68,68,0.5)" }}
        >
          {boss.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-slate-400 italic text-lg"
        >
          {boss.description}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-gold text-sm mt-4 uppercase tracking-widest font-bold"
        >
          Prepare for battle...
        </motion.p>
      </motion.div>
    );
  }

  // ── VICTORY ──
  if (phase === "victory") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-3xl mx-auto text-center py-12"
      >
        <motion.h2
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="text-5xl font-black text-gold mb-4"
          style={{ textShadow: "0 0 30px rgba(251,191,36,0.6)" }}
        >
          BOSS DEFEATED!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-hp-green-bright mb-2"
        >
          {boss.defeatText}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-slate-400"
        >
          Proceeding to quest completion...
        </motion.p>
      </motion.div>
    );
  }

  // ── DEFEAT ──
  if (phase === "defeat") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-3xl mx-auto text-center py-12"
      >
        <div className="absolute inset-0 bg-void/80 z-0" />
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black text-fire-red mb-4"
            style={{ textShadow: "0 0 30px rgba(239,68,68,0.6)" }}
          >
            YOU HAVE FALLEN...
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 mb-8 text-lg"
          >
            The {boss.name} was too powerful this time.
          </motion.p>

          {wrongQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="rpg-card p-6 mb-8 text-left max-w-md mx-auto"
            >
              <h3 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">
                Topics to Review
              </h3>
              <ul className="space-y-2">
                {wrongQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-fire-red mt-0.5 shrink-0">
                      &#10007;
                    </span>
                    <span className="text-slate-300 text-sm">
                      {q.question}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStudyUp(0)}
            className="px-8 py-3 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg text-lg shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-shadow"
          >
            Study Up!
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // ── BATTLE ──
  const question = questions[currentQ];
  const options = question.options || ["True", "False"];

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-3xl mx-auto ${shaking ? "screen-shake" : ""}`}
    >
      {/* Boss area */}
      <div className="rpg-card p-6 mb-4 glow-purple">
        {/* Boss name + HP */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-fire-red">{boss.name}</h3>
          <span className="text-xs text-slate-500 font-mono">
            Q{currentQ + 1}/{questions.length}
          </span>
        </div>

        <HPBar
          current={bossHp}
          max={boss.maxHp}
          variant="boss"
          label="Boss HP"
        />

        {/* Boss sprite */}
        <div className="flex justify-center my-6 relative">
          {BossSprite && <BossSprite state={spriteState} />}
          {/* Damage number */}
          <AnimatePresence>
            {damageShow !== null && (
              <DamageNumber key={`dmg-${currentQ}`} value={damageShow} />
            )}
          </AnimatePresence>
        </div>

        {/* Boss attack flavor text */}
        <AnimatePresence>
          {spriteState === "attacking" && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-fire-red text-sm font-bold italic"
            >
              {randomAttackName}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Question + attacks */}
      <div className="rpg-card p-6 mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-slate-100 mb-5 leading-relaxed">
              {question.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((opt, idx) => (
                <AttackButton
                  key={idx}
                  label={opt}
                  index={idx}
                  disabled={actionLocked}
                  onSelect={handleAttack}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Player HP */}
      <div className="rpg-card p-4 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Your HP
        </span>
        <PlayerHearts current={playerHp} max={boss.playerMaxHp} />
      </div>
    </div>
  );
}
