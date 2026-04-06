"use client";

import type { QuizTier } from "@/lib/types";

interface QuizTierBadgeProps {
  tier: QuizTier;
  size?: "sm" | "md";
}

const TIER_CONFIG: Record<
  NonNullable<QuizTier>,
  { icon: string; label: string; className: string }
> = {
  gold:   { icon: "🥇", label: "Gold",   className: "text-gold" },
  silver: { icon: "🥈", label: "Silver", className: "text-slate-300" },
  bronze: { icon: "🥉", label: "Bronze", className: "text-fire-orange" },
};

export default function QuizTierBadge({ tier, size = "sm" }: QuizTierBadgeProps) {
  if (!tier) return null;
  const config = TIER_CONFIG[tier];
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${config.className} ${size === "md" ? "text-base" : "text-xs"}`}
      title={`${config.label} tier`}
    >
      <span>{config.icon}</span>
      {size === "md" && <span className="font-semibold">{config.label}</span>}
    </span>
  );
}
