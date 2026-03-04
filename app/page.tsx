"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { lessons } from "@/content/lessons";
import {
  getProfile,
  resetDailyUnlock,
  updateLessonProgress,
  hasCustomName,
} from "@/lib/progress";
import type { PlayerProfile, LessonProgress } from "@/lib/types";
import HeroNameSetup from "@/components/HeroNameSetup";
import VolumeToggle from "@/components/VolumeToggle";
import { useAudio } from "@/lib/audio/AudioContext";

// ============================================
// Sub-components
// ============================================

function XpBar({ xp, xpToNextLevel }: { xp: number; xpToNextLevel: number }) {
  const pct = Math.min((xp / xpToNextLevel) * 100, 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-xp-purple-bright font-semibold">
          {xp} / {xpToNextLevel} XP
        </span>
        <span className="text-locked-text">Next Level</span>
      </div>
      <div className="xp-bar-track h-3">
        <motion.div
          className="xp-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
}

function PlayerHeader({ profile }: { profile: PlayerProfile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rpg-card p-6 mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Avatar & Name */}
        <div className="flex items-center gap-3 flex-1">
          <div className="w-14 h-14 rounded-lg bg-void-lighter border border-xp-purple-dim flex items-center justify-center text-3xl">
            <span className="float">🧙</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gold font-[family-name:var(--font-pixel)] text-glow-gold">
              {profile.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="level-badge">LVL {profile.level}</span>
              {profile.streak > 0 && (
                <span className="flex items-center gap-1 text-sm text-fire-orange">
                  <span className="streak-fire">🔥</span>
                  {profile.streak} day streak
                </span>
              )}
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="sm:w-64">
          <XpBar xp={profile.xp} xpToNextLevel={profile.xpToNextLevel} />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-xp-purple-dim/20">
        <StatBox
          label="Quests Done"
          value={profile.totalLessonsCompleted}
          color="text-hp-green"
        />
        <StatBox
          label="Total XP"
          value={profile.xp}
          color="text-xp-purple-bright"
        />
        <StatBox
          label="Level"
          value={profile.level}
          color="text-gold"
        />
      </div>
    </motion.div>
  );
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="text-center">
      <div className={`text-lg font-bold ${color}`}>{value}</div>
      <div className="text-xs text-locked-text uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

function UnlockBanner({ unlocked }: { unlocked: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className={`mb-8 p-4 rounded-lg text-center text-sm font-semibold tracking-wide uppercase ${
        unlocked
          ? "bg-hp-green/10 border border-hp-green/30 text-hp-green glow-green"
          : "bg-xp-purple/10 border border-xp-purple-dim/30 text-xp-purple-bright"
      }`}
    >
      {unlocked ? (
        <span className="flex items-center justify-center gap-2">
          <span>⚔️</span> Coding Unlocked — Build Something Epic Today{" "}
          <span>⚔️</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <span>📜</span> Complete a Lesson to Unlock Coding Powers{" "}
          <span>📜</span>
        </span>
      )}
    </motion.div>
  );
}

function LessonNode({
  lesson,
  progress,
  index,
  isLast,
}: {
  lesson: (typeof lessons)[0];
  progress: LessonProgress;
  index: number;
  isLast: boolean;
}) {
  const router = useRouter();
  const { sfx } = useAudio();
  const isCompleted = progress.status === "completed";
  const isAvailable = progress.status === "available";
  const isInProgress = progress.status === "in-progress";
  const isLocked = progress.status === "locked";
  const isClickable = isAvailable || isInProgress || isCompleted;

  function handleClick() {
    if (isClickable) {
      sfx("button-click");
      router.push(`/lesson/${lesson.slug}`);
    }
  }

  // Card style
  let cardClass = "rpg-card p-4 sm:p-5 flex gap-4 items-start relative";
  if (isCompleted) cardClass += " rpg-card-completed";
  else if (isAvailable || isInProgress) cardClass += " rpg-card-available pulse-available";
  else cardClass += " rpg-card-locked";

  // Status icon
  let statusIcon: React.ReactNode;
  if (isCompleted) {
    statusIcon = (
      <div className="w-8 h-8 rounded-full bg-hp-green/20 border border-hp-green flex items-center justify-center text-hp-green text-sm font-bold">
        ✓
      </div>
    );
  } else if (isAvailable || isInProgress) {
    statusIcon = (
      <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-lg">
        {lesson.icon}
      </div>
    );
  } else {
    statusIcon = (
      <div className="w-8 h-8 rounded-full bg-locked/30 border border-locked flex items-center justify-center text-locked-text text-sm">
        🔒
      </div>
    );
  }

  // Connector line between nodes
  let lineClass = "quest-line";
  if (isCompleted) lineClass = "quest-line quest-line-completed";
  else if (isLocked) lineClass = "quest-line quest-line-locked";

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
    >
      <div className="flex gap-4">
        {/* Left: node + connector */}
        <div className="flex flex-col items-center">
          {/* Node dot */}
          <div
            className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
              isCompleted
                ? "bg-hp-green border-hp-green glow-green"
                : isAvailable || isInProgress
                ? "bg-gold border-gold glow-gold"
                : "bg-locked border-locked"
            }`}
          />
          {/* Connector line */}
          {!isLast && <div className={`flex-1 min-h-6 ${lineClass}`} />}
        </div>

        {/* Right: card */}
        <div
          className={`${cardClass} mb-3 flex-1 ${isClickable ? "cursor-pointer" : "cursor-not-allowed"}`}
          onClick={handleClick}
          role={isClickable ? "button" : undefined}
          tabIndex={isClickable ? 0 : undefined}
          onKeyDown={(e) => {
            if (isClickable && (e.key === "Enter" || e.key === " ")) {
              handleClick();
            }
          }}
        >
          {/* Icon */}
          {statusIcon}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className={`font-bold text-base ${
                  isCompleted
                    ? "text-hp-green"
                    : isAvailable || isInProgress
                    ? "text-gold"
                    : "text-locked-text"
                }`}
              >
                {lesson.title}
              </h3>
              {isInProgress && (
                <span className="text-xs bg-mana-blue/20 text-mana-blue-bright border border-mana-blue-dim px-2 py-0.5 rounded">
                  In Progress
                </span>
              )}
            </div>
            <p
              className={`text-sm mt-1 ${
                isLocked ? "text-locked-text/60" : "text-slate-400"
              }`}
            >
              {lesson.description}
            </p>

            {/* Meta: XP + time */}
            <div className="flex items-center gap-4 mt-2 text-xs">
              <span
                className={`flex items-center gap-1 ${
                  isLocked ? "text-locked-text/40" : "text-xp-purple-bright"
                }`}
              >
                <span>✦</span> {lesson.xpReward} XP
              </span>
              <span
                className={`flex items-center gap-1 ${
                  isLocked ? "text-locked-text/40" : "text-mana-blue-bright"
                }`}
              >
                <span>⏱</span> ~{lesson.estimatedMinutes} min
              </span>
              {isCompleted && progress.quizScore !== undefined && (
                <span className="flex items-center gap-1 text-hp-green">
                  <span>🎯</span> {progress.quizScore}% score
                </span>
              )}
            </div>
          </div>

          {/* Arrow for clickable */}
          {isClickable && !isCompleted && (
            <div className="text-gold text-lg self-center flex-shrink-0 ml-2">
              →
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Main Page
// ============================================

export default function DashboardPage() {
  const { playBGM } = useAudio();
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [needsName, setNeedsName] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if player has set a custom name
    const named = hasCustomName();
    setNeedsName(!named);

    // If they haven't named themselves yet, don't load the full dashboard
    if (!named) return;

    loadDashboard();
  }, []);

  function loadDashboard() {
    // Reset daily unlock if it's a new day
    resetDailyUnlock();

    // Load profile
    let currentProfile = getProfile();

    // Initialize first lesson as "available" if no progress exists
    const firstLesson = lessons.find((l) => l.order === 1);
    if (firstLesson) {
      const hasAnyProgress = Object.keys(currentProfile.lessons).length > 0;
      if (!hasAnyProgress) {
        currentProfile = updateLessonProgress(firstLesson.slug, {
          status: "available",
        });
      }
    }

    // Auto-unlock next lesson after completed ones
    const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);
    for (let i = 0; i < sortedLessons.length; i++) {
      const lesson = sortedLessons[i];
      const lp = currentProfile.lessons[lesson.slug];
      if (lp?.status === "completed" && i + 1 < sortedLessons.length) {
        const nextLesson = sortedLessons[i + 1];
        const nextLp = currentProfile.lessons[nextLesson.slug];
        if (!nextLp || nextLp.status === "locked") {
          currentProfile = updateLessonProgress(nextLesson.slug, {
            status: "available",
          });
        }
      }
    }

    setProfile(currentProfile);
    playBGM("dashboard");
  }

  function handleNameSetupComplete() {
    setNeedsName(false);
    loadDashboard();
  }

  // Still determining whether name setup is needed
  if (needsName === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="text-4xl"
        >
          ⚔️
        </motion.div>
      </div>
    );
  }

  // Show hero name setup for first-run
  if (needsName) {
    return <HeroNameSetup onComplete={handleNameSetupComplete} />;
  }

  // Dashboard loading
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="text-4xl"
        >
          ⚔️
        </motion.div>
      </div>
    );
  }

  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-pixel)] text-gold text-glow-gold tracking-wider">
            KidKode
          </h1>
          <VolumeToggle />
        </div>
        <p className="text-sm text-xp-purple-bright mt-2 tracking-widest uppercase">
          Level Up Your Coding Skills
        </p>
      </motion.div>

      {/* Player Header */}
      <PlayerHeader profile={profile} />

      {/* Unlock Banner */}
      <UnlockBanner unlocked={profile.unlockedToday} />

      {/* Quest Map Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-xp-purple-dim to-transparent" />
        <h2 className="text-sm font-[family-name:var(--font-pixel)] text-xp-purple-bright uppercase tracking-widest">
          Quest Map
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-xp-purple-dim to-transparent" />
      </motion.div>

      {/* Lesson Nodes */}
      <div className="ml-2">
        {sortedLessons.map((lesson, idx) => {
          const progress: LessonProgress = profile.lessons[lesson.slug] || {
            slug: lesson.slug,
            status: "locked",
            attempts: 0,
            sectionProgress: 0,
          };

          return (
            <LessonNode
              key={lesson.slug}
              lesson={lesson}
              progress={progress}
              index={idx}
              isLast={idx === sortedLessons.length - 1}
            />
          );
        })}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center text-xs text-locked-text"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-xp-purple-dim/30 to-transparent mb-4" />
        <div className="flex items-center justify-center gap-4">
          <span>More quests coming soon... ⚔️</span>
          <button
            onClick={() => {
              if (window.confirm("Reset all progress? This cannot be undone.")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="text-locked-text/50 hover:text-fire-red transition-colors"
          >
            Reset Progress
          </button>
        </div>
      </motion.footer>
    </main>
  );
}
