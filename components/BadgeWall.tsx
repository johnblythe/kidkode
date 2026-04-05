"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { realms } from "@/content/realms";
import { lessons } from "@/content/lessons";
import { REALM_BADGES } from "@/lib/badge-config";
import type { EarnedBadge, RealmId } from "@/lib/types";

interface BadgeWallProps {
  badges: EarnedBadge[];
  // Completed lesson slugs — used to compute per-realm progress
  completedSlugs: Set<string>;
}

// Tailwind accent color classes by realm ID
const REALM_ACCENT: Record<RealmId, { glow: string; border: string; text: string; bg: string }> = {
  1: { glow: "shadow-emerald-500/40", border: "border-emerald-500/60", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  2: { glow: "shadow-amber-500/40",   border: "border-amber-500/60",   text: "text-amber-400",   bg: "bg-amber-500/10" },
  3: { glow: "shadow-sky-500/40",     border: "border-sky-500/60",     text: "text-sky-400",     bg: "bg-sky-500/10" },
  4: { glow: "shadow-violet-500/40",  border: "border-violet-500/60",  text: "text-violet-400",  bg: "bg-violet-500/10" },
  5: { glow: "shadow-rose-500/40",    border: "border-rose-500/60",    text: "text-rose-400",    bg: "bg-rose-500/10" },
  6: { glow: "shadow-yellow-500/40",  border: "border-yellow-500/60",  text: "text-yellow-400",  bg: "bg-yellow-500/10" },
};

interface BadgeSlotProps {
  realmId: RealmId;
  earned: EarnedBadge | undefined;
  completedCount: number;
  totalCount: number;
}

function BadgeSlot({ realmId, earned, completedCount, totalCount }: BadgeSlotProps) {
  const [open, setOpen] = useState(false);
  const realm = realms.find((r) => r.id === realmId)!;
  const badgeMeta = REALM_BADGES[realmId];
  const accent = REALM_ACCENT[realmId];

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={earned ? `${badgeMeta.name} badge (earned)` : `${realm.name} badge (locked)`}
        className={`
          w-14 h-14 sm:w-16 sm:h-16 rounded-xl border flex items-center justify-center text-2xl sm:text-3xl
          transition-all duration-200
          ${earned
            ? `${accent.border} ${accent.bg} shadow-lg ${accent.glow} hover:scale-110`
            : "border-locked/40 bg-locked/10 opacity-50 hover:opacity-70"
          }
        `}
      >
        {earned ? (
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {realm.icon}
          </motion.span>
        ) : (
          <span className="text-locked-text/50">{realm.icon}</span>
        )}
      </button>

      {/* Progress label */}
      <div className={`mt-1.5 text-[10px] font-semibold text-center leading-tight ${earned ? accent.text : "text-locked-text/50"}`}>
        {earned ? "✓" : `${completedCount}/${totalCount}`}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <div
              className="fixed inset-0 z-20"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -4 }}
              transition={{ duration: 0.18 }}
              className={`
                absolute bottom-full mb-2 z-30 w-52 rounded-xl border p-3
                bg-void-lighter shadow-xl text-left
                ${earned ? accent.border : "border-locked/30"}
              `}
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              {earned ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{realm.icon}</span>
                    <span className={`font-bold text-sm ${accent.text}`}>{badgeMeta.name}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{badgeMeta.description}</p>
                  <p className="text-[10px] text-locked-text">
                    Earned {new Date(earned.earnedAt).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl opacity-50">{realm.icon}</span>
                    <span className="font-bold text-sm text-locked-text">{realm.name}</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Complete {totalCount - completedCount} more lesson{totalCount - completedCount !== 1 ? "s" : ""} to earn this badge
                  </p>
                  <div className="mt-2 h-1.5 rounded-full bg-locked/30 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-locked/60 transition-all"
                      style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                    />
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BadgeWall({ badges, completedSlugs }: BadgeWallProps) {
  const earnedMap = new Map(badges.map((b) => [b.realmId, b]));
  const earnedCount = badges.length;

  // Count completed lessons per realm
  const realmIds: RealmId[] = [1, 2, 3, 4, 5, 6];
  const lessonsByRealm = new Map<RealmId, string[]>();
  for (const lesson of lessons) {
    const existing = lessonsByRealm.get(lesson.realm) ?? [];
    existing.push(lesson.slug);
    lessonsByRealm.set(lesson.realm, existing);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.4 }}
      className="rpg-card p-4 mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-[family-name:var(--font-pixel)] text-xp-purple-bright uppercase tracking-widest">
          Realm Badges
        </h2>
        <span className="text-xs text-locked-text">{earnedCount} of 6 earned</span>
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-6 gap-2 sm:gap-3 justify-items-center">
        {realmIds.map((realmId, idx) => {
          const realmLessons = lessonsByRealm.get(realmId) ?? [];
          const completedCount = realmLessons.filter((s) => completedSlugs.has(s)).length;
          return (
            <motion.div
              key={realmId}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.06, duration: 0.3 }}
            >
              <BadgeSlot
                realmId={realmId}
                earned={earnedMap.get(realmId)}
                completedCount={completedCount}
                totalCount={realmLessons.length}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Motivational footer */}
      {earnedCount === 0 && (
        <p className="text-center text-xs text-locked-text/60 mt-3">
          Complete lessons to earn badges!
        </p>
      )}
    </motion.div>
  );
}
