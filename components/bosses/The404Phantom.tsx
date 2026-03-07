"use client";

import { motion } from "framer-motion";
import type { BossSpriteProps } from "./MergeConflictHydra";

export default function The404Phantom({ state }: BossSpriteProps) {
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
        className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ethereal glow */}
        <defs>
          <radialGradient id="phantomGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="chainGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Background ethereal aura */}
        <circle cx="100" cy="90" r="80" fill="url(#phantomGlow)" />

        {/* Wispy outer edges — jagged dissolving strokes */}
        <path
          d="M60 45 Q55 38 62 32 Q58 28 65 25"
          stroke="#a78bfa"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M140 45 Q145 38 138 32 Q142 28 135 25"
          stroke="#a78bfa"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M55 65 Q48 60 52 52 Q46 48 50 42"
          stroke="#c4b5fd"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />
        <path
          d="M145 65 Q152 60 148 52 Q154 48 150 42"
          stroke="#c4b5fd"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* Main ghost body — translucent layered shapes */}
        <path
          d="M65 55 Q60 40 75 30 Q90 20 100 20 Q110 20 125 30 Q140 40 135 55 L140 120 Q135 135 130 150 Q135 160 125 165 Q115 158 110 168 Q105 158 100 168 Q95 158 90 168 Q85 158 75 165 Q65 160 70 150 Q65 135 60 120 Z"
          fill="url(#bodyGrad)"
          stroke="#818cf8"
          strokeWidth="1.5"
          opacity="0.85"
        />

        {/* Inner body layer for depth */}
        <path
          d="M72 58 Q68 45 80 36 Q92 27 100 27 Q108 27 120 36 Q132 45 128 58 L132 115 Q128 128 124 142 Q128 150 120 154 Q112 148 106 155 Q100 148 94 155 Q88 148 80 154 Q72 150 76 142 Q72 128 68 115 Z"
          fill="#6366f1"
          opacity="0.25"
        />

        {/* Ghostly shimmer streaks on body */}
        <path
          d="M85 50 Q88 70 86 90"
          stroke="#c4b5fd"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />
        <path
          d="M115 50 Q112 70 114 90"
          stroke="#c4b5fd"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />
        <path
          d="M100 35 Q100 55 100 80"
          stroke="#a78bfa"
          strokeWidth="0.8"
          fill="none"
          opacity="0.2"
          strokeLinecap="round"
        />

        {/* Hollow glowing eyes */}
        <circle cx="85" cy="60" r="10" fill="url(#eyeGlow)" />
        <circle cx="115" cy="60" r="10" fill="url(#eyeGlow)" />
        {/* Eye sockets — dark hollow centers */}
        <ellipse cx="85" cy="60" rx="6" ry="7" fill="#1e1b4b" />
        <ellipse cx="115" cy="60" rx="6" ry="7" fill="#1e1b4b" />
        {/* Inner eye glow pinpoints */}
        <circle cx="85" cy="59" r="2.5" fill="#c4b5fd" opacity="0.9" />
        <circle cx="115" cy="59" r="2.5" fill="#c4b5fd" opacity="0.9" />
        {/* Tiny bright pupils */}
        <circle cx="86" cy="58" r="1" fill="#e0e7ff" />
        <circle cx="116" cy="58" r="1" fill="#e0e7ff" />

        {/* Ghostly mouth — thin wavy line */}
        <path
          d="M90 78 Q95 82 100 78 Q105 74 110 78"
          stroke="#a78bfa"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />

        {/* "404" text on body */}
        <text
          x="100"
          y="110"
          fontSize="22"
          fontFamily="monospace"
          fontWeight="bold"
          fill="#c4b5fd"
          textAnchor="middle"
          opacity="0.8"
        >
          404
        </text>
        {/* Glowing outline for the 404 text */}
        <text
          x="100"
          y="110"
          fontSize="22"
          fontFamily="monospace"
          fontWeight="bold"
          fill="none"
          stroke="#818cf8"
          strokeWidth="0.5"
          textAnchor="middle"
          opacity="0.4"
        >
          404
        </text>

        {/* Left broken chain */}
        <ellipse
          cx="38"
          cy="95"
          rx="8"
          ry="5"
          stroke="url(#chainGrad)"
          strokeWidth="2.5"
          fill="none"
          transform="rotate(-20 38 95)"
        />
        <ellipse
          cx="28"
          cy="102"
          rx="8"
          ry="5"
          stroke="url(#chainGrad)"
          strokeWidth="2.5"
          fill="none"
          transform="rotate(-20 28 102)"
        />
        {/* Broken link gap — left side */}
        <line
          x1="44"
          y1="92"
          x2="48"
          y2="88"
          stroke="#94a3b8"
          strokeWidth="1.5"
          opacity="0.6"
          strokeLinecap="round"
        />
        <line
          x1="46"
          y1="96"
          x2="50"
          y2="93"
          stroke="#94a3b8"
          strokeWidth="1"
          opacity="0.4"
          strokeLinecap="round"
        />

        {/* Right broken chain */}
        <ellipse
          cx="162"
          cy="95"
          rx="8"
          ry="5"
          stroke="url(#chainGrad)"
          strokeWidth="2.5"
          fill="none"
          transform="rotate(20 162 95)"
        />
        <ellipse
          cx="172"
          cy="102"
          rx="8"
          ry="5"
          stroke="url(#chainGrad)"
          strokeWidth="2.5"
          fill="none"
          transform="rotate(20 172 102)"
        />
        {/* Broken link gap — right side */}
        <line
          x1="156"
          y1="92"
          x2="152"
          y2="88"
          stroke="#94a3b8"
          strokeWidth="1.5"
          opacity="0.6"
          strokeLinecap="round"
        />
        <line
          x1="154"
          y1="96"
          x2="150"
          y2="93"
          stroke="#94a3b8"
          strokeWidth="1"
          opacity="0.4"
          strokeLinecap="round"
        />

        {/* Floating particles / dissolving wisps around the phantom */}
        <circle cx="50" cy="50" r="2" fill="#a78bfa" opacity="0.3" />
        <circle cx="150" cy="50" r="1.5" fill="#818cf8" opacity="0.25" />
        <circle cx="45" cy="130" r="1.5" fill="#c4b5fd" opacity="0.2" />
        <circle cx="155" cy="130" r="2" fill="#a78bfa" opacity="0.2" />
        <circle cx="65" cy="170" r="1" fill="#818cf8" opacity="0.3" />
        <circle cx="135" cy="170" r="1.5" fill="#c4b5fd" opacity="0.25" />
        <circle cx="100" cy="175" r="1" fill="#a78bfa" opacity="0.2" />
        <circle cx="42" cy="75" r="1.5" fill="#6366f1" opacity="0.35" />
        <circle cx="158" cy="75" r="1" fill="#6366f1" opacity="0.3" />

        {/* Extra wispy dissolving edges at bottom */}
        <path
          d="M70 155 Q68 165 72 175 Q70 180 65 185"
          stroke="#a78bfa"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
          strokeLinecap="round"
        />
        <path
          d="M100 162 Q98 172 102 180 Q100 185 98 190"
          stroke="#818cf8"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
          strokeLinecap="round"
        />
        <path
          d="M130 155 Q132 165 128 175 Q130 180 135 185"
          stroke="#a78bfa"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
          strokeLinecap="round"
        />

        {/* Semi-transparent overlay shapes for ghostly depth */}
        <ellipse cx="95" cy="80" rx="15" ry="25" fill="#818cf8" opacity="0.07" />
        <ellipse cx="108" cy="85" rx="12" ry="20" fill="#a78bfa" opacity="0.05" />
        <ellipse cx="100" cy="130" rx="20" ry="10" fill="#c4b5fd" opacity="0.06" />
      </svg>
    </motion.div>
  );
}
