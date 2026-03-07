"use client";

import { motion } from "framer-motion";
import type { BossSpriteProps } from "./MergeConflictHydra";

export default function CallbackSerpent({ state }: BossSpriteProps) {
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
        {/* Main body coil — tangled loops */}
        {/* Bottom coil */}
        <path
          d="M50 170 Q30 150 50 130 Q70 110 90 130 Q110 150 90 170 Q70 190 50 170"
          stroke="#059669"
          strokeWidth="7"
          fill="#065f46"
          strokeLinecap="round"
        />
        {/* Middle tangle knot */}
        <path
          d="M90 130 Q110 110 130 120 Q150 130 140 150 Q130 170 110 160 Q90 150 90 130"
          stroke="#059669"
          strokeWidth="7"
          fill="#065f46"
          strokeLinecap="round"
        />
        {/* Upper tangle crossing */}
        <path
          d="M130 120 Q150 100 140 80 Q130 60 110 70 Q90 80 100 100 Q110 120 130 120"
          stroke="#0d9488"
          strokeWidth="7"
          fill="#115e59"
          strokeLinecap="round"
        />
        {/* Neck rising from tangle */}
        <path
          d="M110 70 Q100 50 90 35 Q85 25 80 20"
          stroke="#0d9488"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Overlapping body segment — across bottom coil */}
        <path
          d="M70 155 Q85 140 100 145 Q115 150 120 165"
          stroke="#34d399"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Overlapping body segment — across middle knot */}
        <path
          d="M105 115 Q120 125 115 140 Q110 155 95 150"
          stroke="#34d399"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Tail tip */}
        <path
          d="M50 170 Q35 180 25 185 Q18 188 14 186"
          stroke="#2dd4bf"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Tail rattle / end */}
        <path
          d="M14 186 L8 182 L14 178 L8 174"
          stroke="#2dd4bf"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Head */}
        <ellipse
          cx="78"
          cy="18"
          rx="16"
          ry="12"
          fill="#115e59"
          stroke="#0d9488"
          strokeWidth="2"
        />
        {/* Head top ridge */}
        <path
          d="M64 12 Q71 6 78 10 Q85 6 92 12"
          stroke="#34d399"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Left eye — glowing yellow-green */}
        <circle cx="72" cy="15" r="3.5" fill="#a3e635" />
        <circle cx="72" cy="15" r="1.8" fill="#0a0a1a" />
        {/* Eye glow */}
        <circle cx="72" cy="15" r="5" fill="#a3e635" opacity="0.15" />

        {/* Right eye — glowing yellow-green */}
        <circle cx="84" cy="15" r="3.5" fill="#a3e635" />
        <circle cx="84" cy="15" r="1.8" fill="#0a0a1a" />
        {/* Eye glow */}
        <circle cx="84" cy="15" r="5" fill="#a3e635" opacity="0.15" />

        {/* Mouth */}
        <path
          d="M71 24 Q78 28 85 24"
          stroke="#ef4444"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Fangs */}
        <path
          d="M74 24 L73 29"
          stroke="#e2e8f0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M82 24 L83 29"
          stroke="#e2e8f0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Forked tongue */}
        <path
          d="M78 28 Q78 34 76 38"
          stroke="#ef4444"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M78 28 Q78 34 80 38"
          stroke="#ef4444"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Scale pattern — small arrow symbols (=>) on body */}
        <text
          x="55"
          y="155"
          fontSize="7"
          fill="#34d399"
          fontFamily="monospace"
          opacity="0.6"
        >
          {"=>"}
        </text>
        <text
          x="75"
          y="145"
          fontSize="7"
          fill="#34d399"
          fontFamily="monospace"
          opacity="0.6"
        >
          {"=>"}
        </text>
        <text
          x="95"
          y="165"
          fontSize="7"
          fill="#34d399"
          fontFamily="monospace"
          opacity="0.6"
        >
          {"=>"}
        </text>
        <text
          x="115"
          y="138"
          fontSize="7"
          fill="#34d399"
          fontFamily="monospace"
          opacity="0.5"
        >
          {"=>"}
        </text>
        <text
          x="130"
          y="110"
          fontSize="7"
          fill="#2dd4bf"
          fontFamily="monospace"
          opacity="0.5"
        >
          {"=>"}
        </text>
        <text
          x="110"
          y="85"
          fontSize="7"
          fill="#2dd4bf"
          fontFamily="monospace"
          opacity="0.5"
        >
          {"=>"}
        </text>
        <text
          x="98"
          y="55"
          fontSize="6"
          fill="#2dd4bf"
          fontFamily="monospace"
          opacity="0.5"
        >
          {"=>"}
        </text>

        {/* Nested bracket symbols { { { }}} near tangles */}
        <text
          x="42"
          y="135"
          fontSize="9"
          fill="#fbbf24"
          fontFamily="monospace"
          opacity="0.5"
        >
          {"{"}
        </text>
        <text
          x="48"
          y="135"
          fontSize="9"
          fill="#fbbf24"
          fontFamily="monospace"
          opacity="0.45"
        >
          {"{"}
        </text>
        <text
          x="54"
          y="135"
          fontSize="9"
          fill="#fbbf24"
          fontFamily="monospace"
          opacity="0.4"
        >
          {"{"}
        </text>
        <text
          x="140"
          y="150"
          fontSize="9"
          fill="#fbbf24"
          fontFamily="monospace"
          opacity="0.4"
        >
          {"}"}
        </text>
        <text
          x="146"
          y="150"
          fontSize="9"
          fill="#fbbf24"
          fontFamily="monospace"
          opacity="0.45"
        >
          {"}"}
        </text>
        <text
          x="152"
          y="150"
          fontSize="9"
          fill="#fbbf24"
          fontFamily="monospace"
          opacity="0.5"
        >
          {"}"}
        </text>

        {/* Callback text near tangle center */}
        <text
          x="95"
          y="100"
          fontSize="6"
          fill="#ef4444"
          fontFamily="monospace"
          opacity="0.6"
        >
          {".then("}
        </text>
        <text
          x="60"
          y="175"
          fontSize="6"
          fill="#ef4444"
          fontFamily="monospace"
          opacity="0.5"
        >
          {".catch("}
        </text>

        {/* Body stripe details */}
        <path
          d="M55 160 Q60 155 65 160"
          stroke="#34d399"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M75 165 Q80 160 85 165"
          stroke="#34d399"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M100 140 Q105 135 110 140"
          stroke="#34d399"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M120 130 Q125 125 130 130"
          stroke="#34d399"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M135 95 Q140 90 145 95"
          stroke="#2dd4bf"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M105 75 Q108 70 112 75"
          stroke="#2dd4bf"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </motion.div>
  );
}
