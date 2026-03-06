"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const transitions = [
  "fade",
  "slide-left",
  "slide-up",
  "typewriter",
  "pop",
  "swoosh",
  "page-flip",
] as const;

type TransitionType = (typeof transitions)[number];

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

function TransitionDemo({ type }: { type: TransitionType }) {
  const [step, setStep] = useState(0);
  const variants = animationVariants[type];

  return (
    <div className="rpg-card p-4">
      <h3 className="text-sm font-bold text-gold mb-3 uppercase tracking-wider">
        {type}
      </h3>
      <div
        className="relative overflow-hidden rounded-lg bg-void min-h-[120px] flex items-center justify-center"
        style={type === "page-flip" ? { perspective: 800 } : undefined}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={
              type === "swoosh"
                ? { type: "spring", stiffness: 300, damping: 30 }
                : { duration: 0.5, ease: "easeInOut" }
            }
            className="p-4 text-center"
          >
            <p className="text-slate-200 text-sm">
              Slide {step + 1}
            </p>
            <p className="text-gold-dim text-xs mt-1">
              {type} transition
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={() => setStep((s) => s + 1)}
        className="mt-3 px-4 py-1.5 bg-void-lighter border border-gold-dim/30 text-gold-dim text-xs rounded hover:border-gold hover:text-gold transition-colors w-full"
      >
        Next &rarr;
      </button>
    </div>
  );
}

export default function TransitionsPlayground() {
  return (
    <div className="min-h-screen bg-dungeon p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/playground"
          className="text-sm text-gold-dim hover:text-gold transition-colors"
        >
          &larr; Back to Playground
        </Link>
        <h1
          className="text-3xl font-black text-gold mt-4 mb-2"
          style={{ textShadow: "0 0 20px rgba(251,191,36,0.4)" }}
        >
          Slide Transitions
        </h1>
        <p className="text-slate-400 mb-8">
          All 7 slide transition types side-by-side. Click &quot;Next&quot; to trigger each.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {transitions.map((t) => (
            <TransitionDemo key={t} type={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
