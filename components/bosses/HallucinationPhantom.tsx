"use client";

import { motion } from "framer-motion";
import type { BossSpriteProps } from "./MergeConflictHydra";

export default function HallucinationPhantom({ state }: BossSpriteProps) {
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
        {/* ===== BODY — fragmented, dissolving torso ===== */}
        {/* Main body shape */}
        <path
          d="M80 180 Q85 140 90 120 Q95 100 100 80 Q105 100 110 120 Q115 140 120 180"
          stroke="#8b5cf6"
          strokeWidth="3"
          fill="#1e1b4b"
          opacity="0.9"
        />
        {/* Body fragment — left shard */}
        <path
          d="M75 170 L82 130 L88 165 Z"
          fill="#8b5cf6"
          opacity="0.4"
        />
        {/* Body fragment — right shard */}
        <path
          d="M125 170 L118 130 L112 165 Z"
          fill="#06b6d4"
          opacity="0.4"
        />
        {/* Body fragment — center shard */}
        <path
          d="M95 150 L100 110 L105 150 Z"
          fill="#f43f5e"
          opacity="0.3"
        />

        {/* ===== HEAD — main glitchy head ===== */}
        <ellipse cx="100" cy="65" rx="28" ry="22" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2" opacity="0.95" />

        {/* Glitch offset duplicate — shifted right (holographic) */}
        <ellipse cx="103" cy="63" rx="28" ry="22" fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.35" />
        {/* Glitch offset duplicate — shifted left (holographic) */}
        <ellipse cx="97" cy="67" rx="28" ry="22" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.35" />

        {/* ===== EYES — hollow, different colors ===== */}
        {/* Left eye — rose/red */}
        <circle cx="88" cy="60" r="6" fill="#0a0a1a" stroke="#f43f5e" strokeWidth="2" />
        <circle cx="88" cy="60" r="2" fill="#f43f5e" opacity="0.8" />
        {/* Left eye glitch offset */}
        <circle cx="90" cy="59" r="6" fill="none" stroke="#f43f5e" strokeWidth="0.5" opacity="0.4" />

        {/* Right eye — cyan */}
        <circle cx="112" cy="60" r="6" fill="#0a0a1a" stroke="#06b6d4" strokeWidth="2" />
        <circle cx="112" cy="60" r="2" fill="#06b6d4" opacity="0.8" />
        {/* Right eye glitch offset */}
        <circle cx="114" cy="59" r="6" fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity="0.4" />

        {/* ===== MOUTH — jagged, glitchy ===== */}
        <path
          d="M85 75 L90 72 L95 76 L100 71 L105 76 L110 72 L115 75"
          stroke="#f59e0b"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* ===== DIGITAL CORRUPTION LINES — horizontal streaks ===== */}
        <rect x="60" y="55" width="30" height="2" fill="#f43f5e" opacity="0.5" rx="1" />
        <rect x="110" y="58" width="25" height="1.5" fill="#06b6d4" opacity="0.4" rx="1" />
        <rect x="70" y="100" width="45" height="2" fill="#8b5cf6" opacity="0.35" rx="1" />
        <rect x="95" y="130" width="30" height="1.5" fill="#22c55e" opacity="0.3" rx="1" />
        <rect x="55" y="145" width="20" height="2" fill="#f59e0b" opacity="0.3" rx="1" />
        <rect x="125" y="110" width="22" height="1.5" fill="#f43f5e" opacity="0.35" rx="1" />
        <rect x="80" y="85" width="15" height="1" fill="#06b6d4" opacity="0.4" rx="1" />

        {/* ===== STATIC / NOISE PATTERN — scattered small rectangles ===== */}
        <rect x="65" y="90" width="3" height="3" fill="#8b5cf6" opacity="0.5" />
        <rect x="130" y="95" width="4" height="2" fill="#f43f5e" opacity="0.4" />
        <rect x="75" y="120" width="2" height="4" fill="#06b6d4" opacity="0.5" />
        <rect x="120" y="140" width="3" height="3" fill="#22c55e" opacity="0.4" />
        <rect x="85" y="160" width="4" height="2" fill="#f59e0b" opacity="0.3" />
        <rect x="110" y="155" width="2" height="3" fill="#8b5cf6" opacity="0.4" />
        <rect x="60" y="130" width="3" height="2" fill="#f43f5e" opacity="0.3" />
        <rect x="135" y="125" width="2" height="4" fill="#06b6d4" opacity="0.35" />
        <rect x="90" y="175" width="3" height="2" fill="#22c55e" opacity="0.3" />
        <rect x="70" y="165" width="2" height="3" fill="#f59e0b" opacity="0.35" />
        <rect x="125" y="165" width="4" height="2" fill="#f43f5e" opacity="0.3" />
        <rect x="140" y="80" width="3" height="3" fill="#8b5cf6" opacity="0.3" />

        {/* ===== FLOATING TEXT FRAGMENTS ===== */}
        <text x="35" y="50" fontSize="8" fill="#f43f5e" fontFamily="monospace" opacity="0.6" transform="rotate(-12 35 50)">
          true?
        </text>
        <text x="145" y="45" fontSize="7" fill="#06b6d4" fontFamily="monospace" opacity="0.5" transform="rotate(8 145 45)">
          false?
        </text>
        <text x="140" y="160" fontSize="8" fill="#22c55e" fontFamily="monospace" opacity="0.5" transform="rotate(-5 140 160)">
          maybe?
        </text>
        <text x="30" y="110" fontSize="7" fill="#f59e0b" fontFamily="monospace" opacity="0.4" transform="rotate(10 30 110)">
          true?
        </text>
        <text x="155" y="100" fontSize="6" fill="#8b5cf6" fontFamily="monospace" opacity="0.45" transform="rotate(-8 155 100)">
          false?
        </text>
        <text x="40" y="160" fontSize="7" fill="#06b6d4" fontFamily="monospace" opacity="0.35" transform="rotate(6 40 160)">
          maybe?
        </text>

        {/* ===== GLITCH EFFECT — misaligned duplicate body fragments ===== */}
        {/* Offset body silhouette — left shift */}
        <path
          d="M77 180 Q82 140 87 120 Q92 100 97 80"
          stroke="#f43f5e"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
        {/* Offset body silhouette — right shift */}
        <path
          d="M123 180 Q118 140 113 120 Q108 100 103 80"
          stroke="#06b6d4"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />

        {/* ===== DISSOLVING PARTICLES — top of head ===== */}
        <circle cx="85" cy="45" r="2" fill="#8b5cf6" opacity="0.4" />
        <circle cx="95" cy="40" r="1.5" fill="#f43f5e" opacity="0.35" />
        <circle cx="108" cy="42" r="2" fill="#06b6d4" opacity="0.4" />
        <circle cx="115" cy="46" r="1.5" fill="#22c55e" opacity="0.3" />
        <circle cx="75" cy="50" r="1" fill="#f59e0b" opacity="0.35" />
        <circle cx="125" cy="52" r="1.5" fill="#f43f5e" opacity="0.3" />
        <circle cx="100" cy="38" r="1" fill="#8b5cf6" opacity="0.3" />

        {/* ===== AURA / ENERGY — wispy tendrils ===== */}
        <path
          d="M70 90 Q55 80 50 60"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />
        <path
          d="M130 90 Q145 80 150 60"
          stroke="#06b6d4"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />
        <path
          d="M75 120 Q55 115 45 100"
          stroke="#f43f5e"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
          strokeLinecap="round"
        />
        <path
          d="M125 120 Q145 115 155 100"
          stroke="#22c55e"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
          strokeLinecap="round"
        />

        {/* ===== BINARY / CODE FRAGMENTS on body ===== */}
        <text x="88" y="110" fontSize="8" fill="#8b5cf6" fontFamily="monospace" opacity="0.5">
          {"0 1 0"}
        </text>
        <text x="90" y="140" fontSize="7" fill="#06b6d4" fontFamily="monospace" opacity="0.4">
          {"{ ? }"}
        </text>
      </svg>
    </motion.div>
  );
}
