"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const playgrounds = [
  {
    title: "Boss Battle",
    description: "Test the boss battle quiz system with the Merge Conflict Hydra",
    href: "/playground/boss-battle",
    icon: "🐉",
    color: "fire-red",
  },
  {
    title: "Branch Tree",
    description: "SVG git branch tree visualization with commits, forks, and merges",
    href: "/playground/branch-tree",
    icon: "🌿",
    color: "mana-blue",
  },
];

export default function PlaygroundIndex() {
  return (
    <div className="min-h-screen bg-dungeon p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-gold-dim hover:text-gold transition-colors"
          >
            &larr; Back to Dashboard
          </Link>
          <h1
            className="text-3xl font-black text-gold mt-4"
            style={{ textShadow: "0 0 20px rgba(251,191,36,0.4)" }}
          >
            Component Playground
          </h1>
          <p className="text-slate-400 mt-2">
            Test interactive components in isolation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {playgrounds.map((pg) => (
            <Link key={pg.href} href={pg.href}>
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="rpg-card p-6 cursor-pointer glow-purple hover:border-gold/50 transition-colors h-full"
              >
                <span className="text-4xl block mb-3">{pg.icon}</span>
                <h2 className="text-lg font-bold text-slate-100 mb-1">
                  {pg.title}
                </h2>
                <p className="text-sm text-slate-400">{pg.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
