"use client";

import { motion } from "framer-motion";
import type { BossSpriteProps } from "./MergeConflictHydra";

export default function PermissionDeniedGolem({ state }: BossSpriteProps) {
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
        {/* === HEAD === */}
        {/* Head - blocky stone shape */}
        <path
          d="M75 45 L80 25 L120 25 L125 45 L130 55 L70 55 Z"
          fill="#6b7280"
          stroke="#4b5563"
          strokeWidth="2"
        />
        {/* Head top craggy edge */}
        <path
          d="M80 25 L85 20 L95 28 L105 18 L115 26 L120 25"
          fill="#6b7280"
          stroke="#4b5563"
          strokeWidth="1.5"
        />
        {/* Forehead crack */}
        <path
          d="M100 25 L97 32 L102 36 L98 42"
          stroke="#374151"
          strokeWidth="1"
          fill="none"
        />

        {/* Glowing red eyes */}
        <circle cx="88" cy="38" r="5" fill="#dc2626" opacity="0.9" />
        <circle cx="88" cy="38" r="2.5" fill="#fbbf24" opacity="0.8" />
        <circle cx="112" cy="38" r="5" fill="#dc2626" opacity="0.9" />
        <circle cx="112" cy="38" r="2.5" fill="#fbbf24" opacity="0.8" />
        {/* Eye glow halos */}
        <circle cx="88" cy="38" r="7" fill="#dc2626" opacity="0.15" />
        <circle cx="112" cy="38" r="7" fill="#dc2626" opacity="0.15" />

        {/* Mouth - grim stone line */}
        <path
          d="M85 48 L90 50 L95 47 L100 51 L105 47 L110 50 L115 48"
          stroke="#374151"
          strokeWidth="1.5"
          fill="none"
        />

        {/* === NECK === */}
        <rect x="88" y="55" width="24" height="10" fill="#78716c" stroke="#57534e" strokeWidth="1" />

        {/* === TORSO === */}
        {/* Main body - broad stone chest */}
        <path
          d="M55 65 L60 60 L140 60 L145 65 L150 120 L145 140 L55 140 L50 120 Z"
          fill="#9ca3af"
          stroke="#6b7280"
          strokeWidth="2"
        />
        {/* Chest stone layers */}
        <path d="M60 75 L140 75" stroke="#6b7280" strokeWidth="1" opacity="0.5" />
        <path d="M55 95 L145 95" stroke="#6b7280" strokeWidth="1" opacity="0.5" />
        <path d="M58 115 L142 115" stroke="#6b7280" strokeWidth="1" opacity="0.5" />

        {/* Chest cracks */}
        <path d="M75 65 L78 80 L73 90" stroke="#4b5563" strokeWidth="1" fill="none" />
        <path d="M130 68 L125 82 L128 95" stroke="#4b5563" strokeWidth="1" fill="none" />

        {/* === KEYHOLE on chest === */}
        {/* Lock plate background */}
        <rect x="85" y="80" width="30" height="35" rx="4" fill="#78716c" stroke="#57534e" strokeWidth="2" />
        {/* Keyhole circle */}
        <circle cx="100" cy="92" r="6" fill="#1f2937" stroke="#374151" strokeWidth="1.5" />
        {/* Keyhole slot */}
        <path d="M97 95 L100 110 L103 95" fill="#1f2937" stroke="#374151" strokeWidth="1" />
        {/* Lock glow */}
        <circle cx="100" cy="92" r="8" fill="#dc2626" opacity="0.1" />

        {/* === "403" etched on right shoulder/arm === */}
        <text
          x="130"
          y="82"
          fontSize="11"
          fill="#ef4444"
          fontFamily="monospace"
          fontWeight="bold"
          opacity="0.7"
          transform="rotate(12, 130, 82)"
        >
          403
        </text>

        {/* === LEFT ARM === */}
        {/* Upper arm */}
        <path
          d="M55 65 L40 70 L30 90 L35 95 L45 80 L50 75"
          fill="#78716c"
          stroke="#57534e"
          strokeWidth="2"
        />
        {/* Forearm */}
        <path
          d="M30 90 L20 115 L18 125 L30 130 L35 120 L35 95"
          fill="#a1887f"
          stroke="#78716c"
          strokeWidth="2"
        />
        {/* Left fist */}
        <path
          d="M18 125 L15 135 L22 140 L32 138 L30 130"
          fill="#8d6e63"
          stroke="#6d4c41"
          strokeWidth="1.5"
        />
        {/* Arm crack */}
        <path d="M35 85 L28 100 L32 108" stroke="#57534e" strokeWidth="1" fill="none" />

        {/* === RIGHT ARM === */}
        {/* Upper arm */}
        <path
          d="M145 65 L160 70 L170 90 L165 95 L155 80 L150 75"
          fill="#78716c"
          stroke="#57534e"
          strokeWidth="2"
        />
        {/* Forearm */}
        <path
          d="M170 90 L180 115 L182 125 L170 130 L165 120 L165 95"
          fill="#a1887f"
          stroke="#78716c"
          strokeWidth="2"
        />
        {/* Right fist */}
        <path
          d="M182 125 L185 135 L178 140 L168 138 L170 130"
          fill="#8d6e63"
          stroke="#6d4c41"
          strokeWidth="1.5"
        />
        {/* Arm crack */}
        <path d="M165 85 L172 100 L168 108" stroke="#57534e" strokeWidth="1" fill="none" />

        {/* === LEGS === */}
        {/* Left leg */}
        <path
          d="M65 140 L60 165 L55 180 L75 185 L80 175 L78 140"
          fill="#6b7280"
          stroke="#4b5563"
          strokeWidth="2"
        />
        {/* Left leg crack */}
        <path d="M70 145 L65 158 L68 168" stroke="#374151" strokeWidth="1" fill="none" />

        {/* Right leg */}
        <path
          d="M122 140 L125 165 L130 180 L148 185 L145 175 L140 140"
          fill="#6b7280"
          stroke="#4b5563"
          strokeWidth="2"
        />
        {/* Right leg crack */}
        <path d="M132 148 L136 160 L133 170" stroke="#374151" strokeWidth="1" fill="none" />

        {/* Left foot */}
        <path
          d="M55 180 L48 188 L78 192 L80 185 L75 185"
          fill="#57534e"
          stroke="#374151"
          strokeWidth="1.5"
        />
        {/* Right foot */}
        <path
          d="M130 180 L125 188 L155 192 L152 185 L148 185"
          fill="#57534e"
          stroke="#374151"
          strokeWidth="1.5"
        />

        {/* === STONE TEXTURE / DETAIL === */}
        {/* Small pebble details on body */}
        <circle cx="70" cy="85" r="2" fill="#78716c" stroke="#57534e" strokeWidth="0.5" />
        <circle cx="135" cy="100" r="1.5" fill="#78716c" stroke="#57534e" strokeWidth="0.5" />
        <circle cx="65" cy="108" r="1.8" fill="#78716c" stroke="#57534e" strokeWidth="0.5" />
        <circle cx="140" cy="125" r="2" fill="#78716c" stroke="#57534e" strokeWidth="0.5" />

        {/* Rune marks on belly */}
        <text
          x="70"
          y="130"
          fontSize="8"
          fill="#ef4444"
          fontFamily="monospace"
          opacity="0.4"
        >
          DENY
        </text>

        {/* Small shield/lock emblem on left shoulder */}
        <path
          d="M48 72 L42 68 L36 72 L36 80 L42 84 L48 80 Z"
          fill="#57534e"
          stroke="#78716c"
          strokeWidth="1"
        />
        <circle cx="42" cy="76" r="2" fill="#374151" />
      </svg>
    </motion.div>
  );
}
