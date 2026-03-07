"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TypeCommandInteractiveStep } from "@/lib/types";
import { useAudio } from "@/lib/audio/AudioContext";

interface TypeCommandStepProps {
  step: TypeCommandInteractiveStep;
  onStepComplete: () => void;
}

export default function TypeCommandStep({ step, onStepComplete }: TypeCommandStepProps) {
  const { sfx } = useAudio();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ type: "prompt" | "input" | "output"; text: string }>>([
    { type: "prompt", text: step.data.prompt },
  ]);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const checkAnswer = (value: string) => {
    const trimmed = value.trim();
    const solution = step.solution.trim();
    const caseSensitive = step.data.caseSensitive ?? false;

    const normalize = (s: string) => (caseSensitive ? s : s.toLowerCase());

    if (normalize(trimmed) === normalize(solution)) return true;

    if (step.data.acceptAlternatives) {
      return step.data.acceptAlternatives.some(
        (alt) => normalize(trimmed) === normalize(alt.trim())
      );
    }

    return false;
  };

  const handleSubmit = () => {
    if (!input.trim() || result === "correct") return;

    const isCorrect = checkAnswer(input);

    setHistory((prev) => [
      ...prev,
      { type: "input", text: input },
      ...(isCorrect && step.data.expectedOutput
        ? [{ type: "output" as const, text: step.data.expectedOutput }]
        : []),
      ...(isCorrect
        ? [{ type: "output" as const, text: "✓ Command accepted!" }]
        : [{ type: "output" as const, text: "✗ Command not recognized. Try again." }]),
    ]);

    setResult(isCorrect ? "correct" : "wrong");
    sfx(isCorrect ? "correct-ding" : "wrong-buzz");
    setInput("");

    if (isCorrect) {
      setTimeout(onStepComplete, 1200);
    } else {
      setTimeout(() => {
        setResult(null);
        setHistory((prev) => [...prev, { type: "prompt", text: step.data.prompt }]);
      }, 800);
    }
  };

  return (
    <div>
      <p className="text-base sm:text-lg text-slate-200 mb-4 sm:mb-6">{step.instruction}</p>

      {/* Terminal window */}
      <div className="rounded-lg overflow-hidden border border-slate-700 mb-4 sm:mb-6">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 border-b border-slate-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-fire-red/70" />
            <div className="w-3 h-3 rounded-full bg-gold/70" />
            <div className="w-3 h-3 rounded-full bg-hp-green/70" />
          </div>
          <span className="text-xs text-slate-400 font-mono ml-2">terminal</span>
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="bg-[#0d1117] p-3 sm:p-4 font-mono text-sm min-h-[120px] max-h-[240px] overflow-y-auto"
        >
          {history.map((line, i) => (
            <div key={i} className="mb-1">
              {line.type === "prompt" && (
                <span className="text-hp-green-bright">
                  <span className="text-mana-blue-bright">quest</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-xp-purple-bright">~</span>
                  <span className="text-slate-500">$ </span>
                  <span className="text-slate-400">{line.text}</span>
                </span>
              )}
              {line.type === "input" && (
                <span>
                  <span className="text-mana-blue-bright">quest</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-xp-purple-bright">~</span>
                  <span className="text-slate-500">$ </span>
                  <span className="text-hp-green-bright">{line.text}</span>
                </span>
              )}
              {line.type === "output" && (
                <span className={
                  line.text.startsWith("✓") ? "text-hp-green-bright" :
                  line.text.startsWith("✗") ? "text-fire-red" :
                  "text-slate-300"
                }>
                  {line.text}
                </span>
              )}
            </div>
          ))}

          {/* Input line */}
          {result !== "correct" && (
            <div className="flex items-center">
              <span className="text-mana-blue-bright">quest</span>
              <span className="text-slate-500">:</span>
              <span className="text-xp-purple-bright">~</span>
              <span className="text-slate-500">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="flex-1 bg-transparent text-hp-green-bright outline-none font-mono text-sm caret-hp-green-bright"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          )}
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
            Command executed successfully!
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
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-shadow"
          >
            Run Command
          </motion.button>
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
