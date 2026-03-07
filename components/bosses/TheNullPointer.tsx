"use client";

import { motion } from "framer-motion";
import type { BossSpriteProps } from "./MergeConflictHydra";

export default function TheNullPointer({ state }: BossSpriteProps) {
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
        {/* Outer corruption edges — jagged ring */}
        <polygon
          points="100,8 115,22 135,12 138,32 158,30 152,50 172,55 160,70 178,82 162,92 172,112 154,110 158,132 140,124 135,145 120,132 108,148 100,130 92,148 80,132 65,145 60,124 42,132 46,110 28,112 38,92 22,82 40,70 28,55 48,50 42,30 62,32 65,12 85,22"
          fill="none"
          stroke="#4c1d95"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* Second jagged ring — inner */}
        <polygon
          points="100,25 112,35 127,28 128,45 145,42 140,58 155,64 145,74 158,84 145,90 152,105 138,102 140,118 126,112 122,128 112,118 104,130 100,115 96,130 88,118 78,128 74,112 60,118 62,102 48,105 55,90 42,84 55,74 45,64 60,58 55,42 72,45 73,28 88,35"
          fill="#1e1b4b"
          stroke="#312e81"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Swirling vortex — outermost ring */}
        <circle cx="100" cy="100" r="55" fill="none" stroke="#312e81" strokeWidth="2" opacity="0.5" />
        <circle cx="100" cy="100" r="48" fill="none" stroke="#4c1d95" strokeWidth="1.5" opacity="0.6" />
        <circle cx="100" cy="100" r="41" fill="none" stroke="#312e81" strokeWidth="2" opacity="0.7" />
        <circle cx="100" cy="100" r="34" fill="none" stroke="#4c1d95" strokeWidth="1.5" opacity="0.8" />
        <circle cx="100" cy="100" r="27" fill="none" stroke="#312e81" strokeWidth="2" opacity="0.85" />
        <circle cx="100" cy="100" r="20" fill="none" stroke="#1e1b4b" strokeWidth="2.5" opacity="0.9" />

        {/* Dark vortex center */}
        <circle cx="100" cy="100" r="14" fill="#0f0a2e" />
        <circle cx="100" cy="100" r="9" fill="#050214" />
        <circle cx="100" cy="100" r="4" fill="#000000" />

        {/* Spiral arms */}
        <path
          d="M100,100 Q115,85 130,80 Q145,78 150,90"
          stroke="#4c1d95"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M100,100 Q85,115 70,120 Q55,122 50,110"
          stroke="#4c1d95"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M100,100 Q115,115 120,130 Q122,145 110,150"
          stroke="#312e81"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M100,100 Q85,85 80,70 Q78,55 90,50"
          stroke="#312e81"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />

        {/* Data fragments being pulled in — binary digits */}
        <text x="145" y="50" fontSize="8" fill="#a78bfa" fontFamily="monospace" opacity="0.8">1</text>
        <text x="155" y="65" fontSize="7" fill="#c084fc" fontFamily="monospace" opacity="0.6">0</text>
        <text x="160" y="95" fontSize="9" fill="#a78bfa" fontFamily="monospace" opacity="0.7">1</text>
        <text x="150" y="125" fontSize="6" fill="#c084fc" fontFamily="monospace" opacity="0.5">0</text>
        <text x="140" y="150" fontSize="8" fill="#a78bfa" fontFamily="monospace" opacity="0.6">1</text>
        <text x="48" y="55" fontSize="7" fill="#c084fc" fontFamily="monospace" opacity="0.7">0</text>
        <text x="38" y="80" fontSize="8" fill="#a78bfa" fontFamily="monospace" opacity="0.5">1</text>
        <text x="35" y="110" fontSize="9" fill="#c084fc" fontFamily="monospace" opacity="0.8">0</text>
        <text x="45" y="140" fontSize="6" fill="#a78bfa" fontFamily="monospace" opacity="0.6">1</text>
        <text x="55" y="160" fontSize="7" fill="#c084fc" fontFamily="monospace" opacity="0.4">0</text>

        {/* "NULL" text fragments floating around the void */}
        <text x="62" y="38" fontSize="9" fill="#a78bfa" fontFamily="monospace" fontWeight="bold" opacity="0.7" transform="rotate(-20, 62, 38)">
          NULL
        </text>
        <text x="130" y="45" fontSize="7" fill="#c084fc" fontFamily="monospace" fontWeight="bold" opacity="0.5" transform="rotate(15, 130, 45)">
          NULL
        </text>
        <text x="140" y="140" fontSize="8" fill="#a78bfa" fontFamily="monospace" fontWeight="bold" opacity="0.6" transform="rotate(-10, 140, 140)">
          NULL
        </text>
        <text x="30" y="130" fontSize="7" fill="#c084fc" fontFamily="monospace" fontWeight="bold" opacity="0.4" transform="rotate(25, 30, 130)">
          NULL
        </text>
        <text x="85" y="175" fontSize="8" fill="#a78bfa" fontFamily="monospace" fontWeight="bold" opacity="0.5" transform="rotate(-5, 85, 175)">
          NULL
        </text>

        {/* Bright data sparks — small bursts being consumed */}
        <circle cx="135" cy="70" r="2" fill="#c084fc" opacity="0.9" />
        <circle cx="60" cy="72" r="1.5" fill="#a78bfa" opacity="0.8" />
        <circle cx="70" cy="145" r="2" fill="#c084fc" opacity="0.7" />
        <circle cx="130" cy="135" r="1.5" fill="#a78bfa" opacity="0.9" />
        <circle cx="100" cy="58" r="2" fill="#e9d5ff" opacity="0.6" />
        <circle cx="100" cy="142" r="1.5" fill="#e9d5ff" opacity="0.5" />
        <circle cx="58" cy="100" r="2" fill="#c084fc" opacity="0.8" />
        <circle cx="142" cy="100" r="1.5" fill="#a78bfa" opacity="0.7" />

        {/* Corruption streaks radiating from center */}
        <line x1="100" y1="86" x2="100" y2="72" stroke="#4c1d95" strokeWidth="1" opacity="0.3" />
        <line x1="114" y1="100" x2="128" y2="100" stroke="#4c1d95" strokeWidth="1" opacity="0.3" />
        <line x1="100" y1="114" x2="100" y2="128" stroke="#4c1d95" strokeWidth="1" opacity="0.3" />
        <line x1="86" y1="100" x2="72" y2="100" stroke="#4c1d95" strokeWidth="1" opacity="0.3" />
        <line x1="110" y1="90" x2="120" y2="80" stroke="#312e81" strokeWidth="1" opacity="0.25" />
        <line x1="110" y1="110" x2="120" y2="120" stroke="#312e81" strokeWidth="1" opacity="0.25" />
        <line x1="90" y1="110" x2="80" y2="120" stroke="#312e81" strokeWidth="1" opacity="0.25" />
        <line x1="90" y1="90" x2="80" y2="80" stroke="#312e81" strokeWidth="1" opacity="0.25" />

        {/* Glowing purple eye in the center of the void */}
        <circle cx="100" cy="97" r="5" fill="#7c3aed" opacity="0.8" />
        <circle cx="100" cy="97" r="3" fill="#a78bfa" opacity="0.9" />
        <circle cx="100" cy="97" r="1.5" fill="#e9d5ff" />
      </svg>
    </motion.div>
  );
}
