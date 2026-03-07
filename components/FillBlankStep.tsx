"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FillBlankInteractiveStep } from "@/lib/types";
import { useAudio } from "@/lib/audio/AudioContext";

interface FillBlankStepProps {
  step: FillBlankInteractiveStep;
  onStepComplete: () => void;
}

export default function FillBlankStep({ step, onStepComplete }: FillBlankStepProps) {
  const { sfx } = useAudio();
  const blanks = step.data.blanks;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(blanks.map((b) => [b.id, ""]))
  );
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [blankResults, setBlankResults] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState(false);

  const parts = step.data.template.split("___");
  const caseSensitive = step.data.caseSensitive ?? false;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Dev-mode validation
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const blankCount = parts.length - 1;
      if (blankCount !== blanks.length) {
        console.warn(`[FillBlankStep] Template has ${blankCount} blank(s) but ${blanks.length} blank definition(s).`);
      }
      const solutionKeys = new Set(Object.keys(step.solution));
      for (const b of blanks) {
        if (!solutionKeys.has(b.id)) {
          console.warn(`[FillBlankStep] Blank "${b.id}" has no matching solution key.`);
        }
      }
    }
  }, [blanks, parts.length, step.solution]);

  if (!blanks || blanks.length === 0) {
    return (
      <div>
        <p className="text-fire-red mb-4">This exercise is misconfigured (no blanks defined).</p>
        <button
          onClick={onStepComplete}
          className="px-6 py-2.5 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg"
        >
          Skip
        </button>
      </div>
    );
  }

  const checkAnswer = () => {
    const results: Record<string, boolean> = {};
    let allCorrect = true;

    blanks.forEach((blank) => {
      const userVal = values[blank.id]?.trim() || "";
      const solution = step.solution[blank.id];

      if (solution === undefined) {
        if (process.env.NODE_ENV === "development") {
          console.error(`[FillBlankStep] Missing solution for blank "${blank.id}".`);
        }
        results[blank.id] = false;
        allCorrect = false;
        return;
      }

      const normalize = (s: string) => (caseSensitive ? s : s.toLowerCase());

      if (Array.isArray(solution)) {
        results[blank.id] = solution.some((s) => normalize(s) === normalize(userVal));
      } else {
        results[blank.id] = normalize(solution) === normalize(userVal);
      }

      if (!results[blank.id]) allCorrect = false;
    });

    setBlankResults(results);
    setResult(allCorrect ? "correct" : "wrong");
    sfx(allCorrect ? "correct-ding" : "wrong-buzz");

    if (allCorrect) {
      timerRef.current = setTimeout(onStepComplete, 1200);
    }
  };

  const retry = () => {
    setValues(Object.fromEntries(blanks.map((b) => [b.id, ""])));
    setResult(null);
    setBlankResults({});
  };

  const updateValue = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    if (result === "wrong") {
      setResult(null);
      setBlankResults({});
    }
  };

  return (
    <div>
      <p className="text-base sm:text-lg text-slate-200 mb-4 sm:mb-6">{step.instruction}</p>

      {/* Code template with blanks */}
      <div className="rounded-lg overflow-hidden border border-slate-700 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-xs text-slate-400 font-mono">{step.data.filename || "code"}</span>
        </div>
        <div className="bg-[#0d1117] p-3 sm:p-4 font-mono text-sm leading-relaxed">
          {parts.map((part, i) => (
            <span key={i}>
              <span className="text-mana-blue-bright whitespace-pre-wrap">{part}</span>
              {i < blanks.length && (
                <span className="inline-block align-middle mx-1">
                  <input
                    type="text"
                    value={values[blanks[i].id] || ""}
                    onChange={(e) => updateValue(blanks[i].id, e.target.value)}
                    placeholder={blanks[i].placeholder || "..."}
                    disabled={result === "correct"}
                    style={{ width: `${(blanks[i].width || 8) + 2}ch` }}
                    className={`bg-void/80 border-b-2 px-2 py-0.5 font-mono text-sm outline-none transition-colors text-center ${
                      result === "correct"
                        ? "border-hp-green text-hp-green-bright"
                        : blankResults[blanks[i].id] === false
                        ? "border-fire-red text-fire-red"
                        : "border-gold/50 text-gold focus:border-gold"
                    }`}
                  />
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {result === "correct" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-3 rounded-lg bg-hp-green/10 border border-hp-green/40 text-hp-green-bright text-center font-bold"
          >
            All blanks correct!
          </motion.div>
        )}
        {result === "wrong" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-3 rounded-lg bg-fire-red/10 border border-fire-red/40 text-fire-red text-center"
          >
            Some blanks are incorrect. Check the highlighted fields!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {showHint && step.hint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 rounded-lg bg-mana-blue/10 border border-mana-blue/30 text-mana-blue-bright text-sm"
        >
          Hint: {step.hint}
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        {result !== "correct" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkAnswer}
            className="px-6 py-2.5 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-shadow"
          >
            Check Answer
          </motion.button>
        )}
        {result === "wrong" && (
          <button
            onClick={retry}
            className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            Reset
          </button>
        )}
        {!showHint && step.hint && result !== "correct" && (
          <button
            onClick={() => setShowHint(true)}
            className="px-4 py-2 text-sm text-mana-blue hover:text-mana-blue-bright transition-colors"
          >
            Need a hint?
          </button>
        )}
      </div>
    </div>
  );
}
