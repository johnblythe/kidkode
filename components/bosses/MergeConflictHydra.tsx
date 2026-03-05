"use client";

import { motion } from "framer-motion";

export interface BossSpriteProps {
  state: "idle" | "attacking" | "damaged" | "dead";
}

export default function MergeConflictHydra({ state }: BossSpriteProps) {
  // CSS classes for idle/damaged/attacking; death handled by framer-motion animate
  const stateClass =
    state === "idle"
      ? "boss-idle"
      : state === "damaged"
      ? "boss-damaged"
      : state === "attacking"
      ? "boss-attacking"
      : "";

  return (
    <motion.div
      className={`relative ${stateClass}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={
        state === "dead"
          ? { scale: 0, opacity: 0, filter: "brightness(3)" }
          : { scale: 1, opacity: 1, filter: "brightness(1)" }
      }
      transition={
        state === "dead"
          ? { duration: 1, ease: "easeIn" }
          : { type: "spring", stiffness: 150, damping: 15 }
      }
    >
      <svg
        viewBox="0 0 200 200"
        className="w-48 h-48 md:w-64 md:h-64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body - central trunk */}
        <path
          d="M85 180 Q90 140 95 120 Q100 100 100 90 Q100 100 105 120 Q110 140 115 180"
          stroke="#7c3aed"
          strokeWidth="8"
          fill="#4c1d95"
          strokeLinecap="round"
        />

        {/* Left head branch */}
        <path
          d="M100 90 Q80 70 55 50"
          stroke="#7c3aed"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Left head */}
        <g>
          <ellipse cx="50" cy="42" rx="18" ry="14" fill="#5b21b6" stroke="#7c3aed" strokeWidth="2" />
          {/* Left eye */}
          <circle cx="44" cy="39" r="3" fill="#fbbf24" />
          <circle cx="44" cy="39" r="1.5" fill="#0a0a1a" />
          {/* Right eye */}
          <circle cx="56" cy="39" r="3" fill="#fbbf24" />
          <circle cx="56" cy="39" r="1.5" fill="#0a0a1a" />
          {/* Mouth */}
          <path d="M42 48 Q50 52 58 48" stroke="#ef4444" strokeWidth="1.5" fill="none" />
          {/* Fangs */}
          <path d="M45 48 L44 53" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M55 48 L56 53" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Center head branch */}
        <path
          d="M100 90 Q100 60 100 35"
          stroke="#7c3aed"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Center head (largest) */}
        <g>
          <ellipse cx="100" cy="25" rx="22" ry="16" fill="#5b21b6" stroke="#7c3aed" strokeWidth="2" />
          {/* Left eye */}
          <circle cx="92" cy="22" r="4" fill="#fbbf24" />
          <circle cx="92" cy="22" r="2" fill="#0a0a1a" />
          {/* Right eye */}
          <circle cx="108" cy="22" r="4" fill="#fbbf24" />
          <circle cx="108" cy="22" r="2" fill="#0a0a1a" />
          {/* Mouth */}
          <path d="M90 32 Q100 38 110 32" stroke="#ef4444" strokeWidth="2" fill="none" />
          {/* Fangs */}
          <path d="M94 32 L93 38" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
          <path d="M106 32 L107 38" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
          {/* Crown/crest */}
          <path
            d="M82 14 L88 8 L94 14 L100 6 L106 14 L112 8 L118 14"
            stroke="#fbbf24"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Right head branch */}
        <path
          d="M100 90 Q120 70 145 50"
          stroke="#7c3aed"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Right head */}
        <g>
          <ellipse cx="150" cy="42" rx="18" ry="14" fill="#5b21b6" stroke="#7c3aed" strokeWidth="2" />
          {/* Left eye */}
          <circle cx="144" cy="39" r="3" fill="#fbbf24" />
          <circle cx="144" cy="39" r="1.5" fill="#0a0a1a" />
          {/* Right eye */}
          <circle cx="156" cy="39" r="3" fill="#fbbf24" />
          <circle cx="156" cy="39" r="1.5" fill="#0a0a1a" />
          {/* Mouth */}
          <path d="M142 48 Q150 52 158 48" stroke="#ef4444" strokeWidth="1.5" fill="none" />
          {/* Fangs */}
          <path d="M145 48 L144 53" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M155 48 L156 53" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Git branch markers on necks */}
        <text x="65" y="75" fontSize="10" fill="#a855f7" fontFamily="monospace" opacity="0.6">main</text>
        <text x="115" y="75" fontSize="10" fill="#fbbf24" fontFamily="monospace" opacity="0.6">dev</text>

        {/* Conflict symbols on body */}
        <text x="88" y="115" fontSize="12" fill="#ef4444" fontFamily="monospace" opacity="0.7">{"<<<"}</text>
        <text x="88" y="130" fontSize="12" fill="#ef4444" fontFamily="monospace" opacity="0.7">{">>>"}</text>
      </svg>
    </motion.div>
  );
}
