"use client";

import { useState } from "react";
import Link from "next/link";
import CanvasParticles from "@/components/CanvasParticles";

type Effect = "confetti" | "sparkle" | "stars";

export default function ParticlesPlayground() {
  const [effect, setEffect] = useState<Effect>("confetti");
  const [count, setCount] = useState(80);
  const [loop, setLoop] = useState(false);
  const [key, setKey] = useState(0);

  const restart = () => setKey((k) => k + 1);

  return (
    <div className="min-h-screen bg-dungeon p-8">
      <div className="max-w-4xl mx-auto">
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
          Canvas Particles
        </h1>
        <p className="text-slate-400 mb-8">
          Test the canvas particle system with different effects and settings
        </p>

        {/* Controls */}
        <div className="rpg-card p-6 mb-6 flex flex-wrap gap-6 items-end">
          <div>
            <label className="block text-xs text-gold-dim uppercase tracking-wider mb-2 font-bold">
              Effect
            </label>
            <div className="flex gap-2">
              {(["confetti", "sparkle", "stars"] as Effect[]).map((e) => (
                <button
                  key={e}
                  onClick={() => { setEffect(e); restart(); }}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    effect === e
                      ? "bg-gold/20 border border-gold text-gold"
                      : "bg-void-lighter border border-locked text-slate-400 hover:border-gold-dim"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gold-dim uppercase tracking-wider mb-2 font-bold">
              Count: {count}
            </label>
            <input
              type="range"
              min={10}
              max={200}
              value={count}
              onChange={(e) => { setCount(Number(e.target.value)); restart(); }}
              className="w-40"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={loop}
                onChange={(e) => { setLoop(e.target.checked); restart(); }}
                className="accent-gold"
              />
              <span className="text-sm text-slate-300">Loop</span>
            </label>
          </div>

          <button
            onClick={restart}
            className="px-6 py-2 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg text-sm"
          >
            Restart
          </button>
        </div>

        {/* Canvas area */}
        <div className="rpg-card relative overflow-hidden" style={{ height: 500 }}>
          <CanvasParticles
            key={key}
            effect={effect}
            count={count}
            loop={loop}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-slate-500 text-sm uppercase tracking-widest">
              {effect} &middot; {count} particles {loop ? "(looping)" : "(one-shot)"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
