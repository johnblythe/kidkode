"use client";

import { useState, useEffect, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useActiveUser } from "@/lib/hooks/useActiveUser";
import { getChildProfileForParent, forceUnlockLesson } from "@/app/actions/users";
import { lessons } from "@/content/lessons";
import type { PlayerProfile } from "@/lib/types";

export default function ChildDetailPage() {
  const params = useParams();
  const childId = params.childId as string;
  const router = useRouter();
  const { userId, mounted } = useActiveUser();
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [isPending, startTransition] = useTransition();
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    if (!userId) {
      router.replace("/login");
      return;
    }
    startTransition(async () => {
      try {
        const p = await getChildProfileForParent(userId, childId);
        setProfile(p);
      } catch {
        // Unauthorized or not found — redirect to parent dashboard
        router.replace("/parent");
      }
    });
  }, [mounted, userId, childId, router]);

  function handleForceUnlock() {
    if (!userId) return;
    startTransition(async () => {
      await forceUnlockLesson(userId, childId);
      const p = await getChildProfileForParent(userId, childId);
      setProfile(p);
      setJustUnlocked(true);
    });
  }

  if (!mounted || !userId || !profile) {
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
  const hasCompletedAny = Object.values(profile.lessons).some(
    (l) => l.status === "completed"
  );
  const allCompleted = sortedLessons.every(
    (l) => profile.lessons[l.slug]?.status === "completed"
  );

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <button
        onClick={() => router.push("/parent")}
        className="flex items-center gap-1 text-sm text-slate-400 hover:text-gold transition-colors mb-6"
      >
        ← Back to Dashboard
      </button>

      {/* Child header */}
      <div className="rpg-card p-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-void-lighter border border-xp-purple-dim flex items-center justify-center text-2xl">
            🧒
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gold">{profile.name}</h1>
            <p className="text-xs text-locked-text">{profile.email}</p>
          </div>
          <div className="text-right">
            <div className="level-badge">LVL {profile.level}</div>
            <div className="text-xs text-xp-purple-bright mt-1">{profile.xp} XP</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-xp-purple-dim/20 text-center">
          <div>
            <div className="text-sm font-bold text-hp-green">
              {profile.totalLessonsCompleted}
            </div>
            <div className="text-xs text-locked-text">Lessons Done</div>
          </div>
          <div>
            <div className="text-sm font-bold text-fire-orange">{profile.streak}</div>
            <div className="text-xs text-locked-text">Day Streak</div>
          </div>
          <div>
            <div className="text-sm font-bold text-xp-purple-bright">{profile.xp}</div>
            <div className="text-xs text-locked-text">Total XP</div>
          </div>
        </div>
      </div>

      {/* Force unlock */}
      {hasCompletedAny && !allCompleted && (
        <div className="rpg-card p-4 mb-6 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-gold font-semibold">Force Unlock Next Lesson</p>
            <p className="text-xs text-locked-text mt-0.5">
              Skip the daily gate for your child
            </p>
          </div>
          {justUnlocked ? (
            <span className="text-xs text-hp-green font-semibold">✓ Unlocked!</span>
          ) : (
            <button
              onClick={handleForceUnlock}
              disabled={isPending}
              className="px-4 py-2 rounded-lg bg-gold/20 border border-gold/40 text-gold text-xs font-bold hover:bg-gold/30 transition-colors disabled:opacity-50"
            >
              {isPending ? "..." : "Unlock"}
            </button>
          )}
        </div>
      )}

      {/* Lesson progress */}
      <div className="space-y-2">
        <h2 className="text-xs text-locked-text uppercase tracking-wider mb-3">
          Lesson Progress
        </h2>
        {sortedLessons.map((lesson) => {
          const progress = profile.lessons[lesson.slug];
          const status = progress?.status ?? "locked";
          const isCompleted = status === "completed";
          const isAvailable = status === "available" || status === "in_progress";

          return (
            <div
              key={lesson.slug}
              className={`rpg-card p-3 flex items-center gap-3 ${
                status === "locked"
                  ? "rpg-card-locked"
                  : isCompleted
                  ? "rpg-card-completed"
                  : "rpg-card-available"
              }`}
            >
              <div className="text-lg">{lesson.icon}</div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold ${
                    isCompleted
                      ? "text-hp-green"
                      : isAvailable
                      ? "text-gold"
                      : "text-locked-text"
                  }`}
                >
                  {lesson.title}
                </p>
                {isCompleted && progress.quizScore !== undefined && (
                  <p className="text-xs text-locked-text mt-0.5">
                    Score: {progress.quizScore}% · {progress.xpEarned} XP
                  </p>
                )}
              </div>
              <div className="shrink-0">
                {isCompleted ? (
                  <span className="text-hp-green text-sm">✓</span>
                ) : isAvailable ? (
                  <span className="text-gold text-xs">In Progress</span>
                ) : (
                  <span className="text-locked-text text-xs">🔒</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
