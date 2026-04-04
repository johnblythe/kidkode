"use client";

import BossShell from "./BossShell";
import type { BossSpriteProps } from "./BossShell";

const SHAPES = [
  // Spiky orb
  (color: string) => (
    <g key="spiky-orb">
      <circle cx="100" cy="90" r="45" fill={color} opacity="0.9" />
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = 100 + Math.cos(angle) * 45;
        const y1 = 90 + Math.sin(angle) * 45;
        const x2 = 100 + Math.cos(angle) * 65;
        const y2 = 90 + Math.sin(angle) * 65;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        );
      })}
    </g>
  ),
  // Blocky golem shape
  (color: string) => (
    <g key="blocky">
      <rect x="70" y="60" width="60" height="70" rx="8" fill={color} opacity="0.9" />
      <rect x="60" y="80" width="20" height="40" rx="4" fill={color} opacity="0.7" />
      <rect x="120" y="80" width="20" height="40" rx="4" fill={color} opacity="0.7" />
    </g>
  ),
  // Ghost/wisp shape
  (color: string) => (
    <g key="wisp">
      <ellipse cx="100" cy="70" rx="40" ry="35" fill={color} opacity="0.85" />
      <path
        d={`M60 70 Q60 140 70 140 Q80 120 90 140 Q100 120 110 140 Q120 120 130 140 Q140 140 140 70`}
        fill={color}
        opacity="0.7"
      />
    </g>
  ),
];

function hashString(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

const PALETTE = [
  "#7c3aed", // violet
  "#dc2626", // red
  "#059669", // emerald
  "#d97706", // amber
  "#0891b2", // cyan
  "#be185d", // pink
  "#4f46e5", // indigo
  "#ea580c", // orange
];

export default function GenericBoss({ state }: BossSpriteProps) {
  // Use a stable hash of the component's key (from React) or fallback
  // Since we don't have the boss name here, use a random-ish but stable default
  const hash = hashString("generic");
  const shapeIndex = hash % SHAPES.length;
  const colorIndex = hash % PALETTE.length;
  const color = PALETTE[colorIndex];
  const shape = SHAPES[shapeIndex];

  return (
    <BossShell state={state}>
      <svg
        viewBox="0 0 200 200"
        className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {shape(color)}

        {/* Eyes — universal */}
        <circle cx="88" cy="82" r="6" fill="#fbbf24" />
        <circle cx="88" cy="82" r="3" fill="#0a0a1a" />
        <circle cx="112" cy="82" r="6" fill="#fbbf24" />
        <circle cx="112" cy="82" r="3" fill="#0a0a1a" />

        {/* Mouth */}
        <path d="M88 98 Q100 106 112 98" stroke="#ef4444" strokeWidth="2" fill="none" />
      </svg>
    </BossShell>
  );
}
