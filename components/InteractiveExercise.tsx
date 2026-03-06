"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { InteractiveSection, InteractiveStep, SequenceInteractiveStep, MultipleChoiceInteractiveStep } from "@/lib/types";
import DragDropStep from "@/components/DragDropStep";
import { useAudio } from "@/lib/audio/AudioContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface InteractiveExerciseProps {
  section: InteractiveSection;
  onComplete: () => void;
}

// ---------- Sequence Step ----------

interface SequenceItem {
  id: string;
  text: string;
  description: string;
}

function SequenceStep({
  step,
  onStepComplete,
}: {
  step: SequenceInteractiveStep;
  onStepComplete: () => void;
}) {
  const { sfx } = useAudio();
  const data = step.data;
  const [placed, setPlaced] = useState<SequenceItem[]>([]);
  const [remaining, setRemaining] = useState<SequenceItem[]>(() =>
    // Shuffle the items
    [...data.items].sort(() => Math.random() - 0.5)
  );
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [showHint, setShowHint] = useState(false);

  const selectItem = (item: SequenceItem) => {
    if (result === "correct") return;
    setPlaced((prev) => [...prev, item]);
    setRemaining((prev) => prev.filter((r) => r.id !== item.id));
    setResult(null);
  };

  const removeItem = (item: SequenceItem) => {
    if (result === "correct") return;
    setPlaced((prev) => prev.filter((p) => p.id !== item.id));
    setRemaining((prev) => [...prev, item]);
    setResult(null);
  };

  const checkOrder = () => {
    const isCorrect =
      placed.length === data.correctOrder.length &&
      placed.every((item, idx) => item.id === data.correctOrder[idx]);
    setResult(isCorrect ? "correct" : "wrong");
    sfx(isCorrect ? "correct-ding" : "wrong-buzz");
    if (isCorrect) {
      setTimeout(onStepComplete, 1200);
    }
  };

  const reset = () => {
    setPlaced([]);
    setRemaining([...data.items].sort(() => Math.random() - 0.5));
    setResult(null);
    setShowHint(false);
  };

  return (
    <div>
      <p className="text-lg text-slate-200 mb-6">{step.instruction}</p>

      {/* Placed area */}
      <div className="mb-6">
        <p className="text-sm text-gold-dim mb-2 uppercase tracking-wider font-bold">
          Your Order:
        </p>
        <div className="min-h-[60px] rounded-lg border-2 border-dashed border-gold-dim/30 p-3 flex flex-wrap gap-2 bg-void/50">
          <AnimatePresence>
            {placed.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="text-slate-500 text-sm"
              >
                Click items below to place them in order...
              </motion.p>
            )}
            {placed.map((item, idx) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => removeItem(item)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-sm transition-colors cursor-pointer ${
                  result === "correct"
                    ? "bg-hp-green/10 border-hp-green/50 text-hp-green-bright"
                    : result === "wrong"
                    ? "bg-fire-red/10 border-fire-red/50 text-fire-red"
                    : "bg-void-lighter border-gold-dim/40 text-slate-200 hover:border-gold"
                }`}
              >
                <span className="text-gold font-bold">{idx + 1}.</span>
                <span>{item.text}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Available items */}
      {remaining.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gold-dim mb-2 uppercase tracking-wider font-bold">
            Available Steps:
          </p>
          <div className="flex flex-wrap gap-2">
            {remaining.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => selectItem(item)}
                className="rpg-card px-4 py-3 cursor-pointer hover:border-gold transition-colors text-left"
              >
                <p className="font-mono text-sm text-slate-200">{item.text}</p>
                <p className="text-xs text-slate-400 mt-1">{item.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {result === "correct" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-3 rounded-lg bg-hp-green/10 border border-hp-green/40 text-hp-green-bright text-center font-bold"
          >
            Correct! Great job!
          </motion.div>
        )}
        {result === "wrong" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-3 rounded-lg bg-fire-red/10 border border-fire-red/40 text-fire-red text-center"
          >
            Not quite right. Try again!
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
        {placed.length === data.items.length && result !== "correct" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkOrder}
            className="px-6 py-2.5 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-shadow"
          >
            Check Order
          </motion.button>
        )}
        {result === "wrong" && (
          <button
            onClick={reset}
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

// ---------- Multiple Choice Step ----------

function MultipleChoiceStep({
  step,
  onStepComplete,
}: {
  step: MultipleChoiceInteractiveStep;
  onStepComplete: () => void;
}) {
  const { sfx } = useAudio();
  const data = step.data;
  const correctIndex = step.solution;
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = selected === correctIndex;

  const submit = () => {
    if (selected === null) return;
    setSubmitted(true);
    sfx(selected === correctIndex ? "correct-ding" : "wrong-buzz");
    if (selected === correctIndex) {
      setTimeout(onStepComplete, 1200);
    }
  };

  const retry = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div>
      <p className="text-lg text-slate-200 mb-6">{step.instruction}</p>

      <div className="space-y-3 mb-6">
        {data.options.map((option, idx) => {
          let cardStyle = "rpg-card px-5 py-4 cursor-pointer transition-all";
          if (submitted) {
            if (idx === correctIndex) {
              cardStyle += " border-hp-green/60 bg-hp-green/10 glow-green";
            } else if (idx === selected) {
              cardStyle += " border-fire-red/60 bg-fire-red/10";
            } else {
              cardStyle += " opacity-40";
            }
          } else if (idx === selected) {
            cardStyle += " border-gold bg-gold/5 glow-gold";
          } else {
            cardStyle += " hover:border-gold/50";
          }

          return (
            <motion.button
              key={idx}
              whileHover={!submitted ? { scale: 1.01 } : undefined}
              whileTap={!submitted ? { scale: 0.99 } : undefined}
              onClick={() => !submitted && setSelected(idx)}
              className={cardStyle + " w-full text-left"}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${
                    submitted && idx === correctIndex
                      ? "bg-hp-green/20 border-hp-green text-hp-green-bright"
                      : submitted && idx === selected
                      ? "bg-fire-red/20 border-fire-red text-fire-red"
                      : idx === selected
                      ? "bg-gold/20 border-gold text-gold"
                      : "bg-void border-gold-dim/30 text-gold-dim"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-slate-200 font-mono text-sm">{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {submitted && isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-lg bg-hp-green/10 border border-hp-green/40 text-hp-green-bright text-center font-bold"
          >
            Correct!
          </motion.div>
        )}
        {submitted && !isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-lg bg-fire-red/10 border border-fire-red/40 text-fire-red text-center"
          >
            Not quite. The right answer was highlighted in green.
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
        {!submitted && selected !== null && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={submit}
            className="px-6 py-2.5 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-shadow"
          >
            Submit
          </motion.button>
        )}
        {submitted && !isCorrect && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={retry}
            className="px-6 py-2.5 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg"
          >
            Try Again
          </motion.button>
        )}
        {!showHint && step.hint && !submitted && (
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

// ---------- Main Component ----------

export default function InteractiveExercise({
  section,
  onComplete,
}: InteractiveExerciseProps) {
  const reducedMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = section.steps;
  const step = steps[currentStep];

  const handleStepComplete = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

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
          {section.title}
        </h2>
        <p className="text-slate-400">{section.description}</p>
        {/* Step progress */}
        <div className="flex items-center gap-2 mt-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors duration-500 ${
                i < currentStep
                  ? "bg-hp-green"
                  : i === currentStep
                  ? "bg-gold"
                  : "bg-void-lighter"
              }`}
            />
          ))}
          <span className="text-sm text-gold-dim ml-2">
            {currentStep + 1}/{steps.length}
          </span>
        </div>
      </div>

      {/* Step content */}
      <motion.div
        className="rpg-card p-8 glow-gold"
        initial={reducedMotion ? undefined : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={reducedMotion ? undefined : { type: "spring", stiffness: 200, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {step.type === "sequence" && (
              <SequenceStep step={step} onStepComplete={handleStepComplete} />
            )}
            {step.type === "multiple-choice" && (
              <MultipleChoiceStep step={step} onStepComplete={handleStepComplete} />
            )}
            {step.type === "drag-drop" && (
              <DragDropStep
                scenario={step.data}
                onStepComplete={handleStepComplete}
              />
            )}
            {/* Fallback for unhandled types */}
            {step.type !== "sequence" && step.type !== "multiple-choice" && step.type !== "drag-drop" && (
              <div>
                <p className="text-slate-200 mb-4">{step.instruction}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStepComplete}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg"
                >
                  Continue
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
