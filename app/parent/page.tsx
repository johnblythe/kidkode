"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useActiveUser } from "@/lib/hooks/useActiveUser";
import { listChildren, createChild } from "@/app/actions/users";
import { getProfile } from "@/app/actions/progress";
import type { PlayerProfile, HeroClass } from "@/lib/types";

const CHARACTER_CLASSES: { emoji: string; label: string; value: HeroClass }[] =
  [
    { emoji: "🧙", label: "Wizard", value: "wizard" },
    { emoji: "🪖", label: "Knight", value: "knight" },
    { emoji: "🧝", label: "Elf", value: "elf" },
    { emoji: "🥷", label: "Ninja", value: "ninja" },
    { emoji: "🦸", label: "Hero", value: "hero" },
    { emoji: "🧜", label: "Merfolk", value: "merfolk" },
  ];

export default function ParentPage() {
  const router = useRouter();
  const { userId, email, mounted, signOut } = useActiveUser();
  const [children, setChildren] = useState<PlayerProfile[]>([]);
  const [showAddChild, setShowAddChild] = useState(false);
  const [childName, setChildName] = useState("");
  const [childEmail, setChildEmail] = useState("");
  const [selectedClass, setSelectedClass] = useState(0);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!mounted) return;
    if (!userId) {
      router.replace("/login");
      return;
    }
    startTransition(async () => {
      // Verify user exists and has parent role before showing dashboard
      const profile = await getProfile(userId);
      if (!profile || profile.role !== "parent") {
        router.replace("/");
        return;
      }
      const kids = await listChildren(userId);
      setChildren(kids);
    });
  }, [mounted, userId, router]);

  if (!mounted || !userId) {
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

  function handleAddChild(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = childName.trim();
    const trimmedEmail = childEmail.trim();
    if (!trimmedName || !trimmedEmail || !userId) return;
    setError("");

    startTransition(async () => {
      try {
        await createChild(userId, {
          email: trimmedEmail,
          heroName: trimmedName,
          heroClass: CHARACTER_CLASSES[selectedClass].value,
        });
        const kids = await listChildren(userId);
        setChildren(kids);
        setShowAddChild(false);
        setChildName("");
        setChildEmail("");
        setSelectedClass(0);
      } catch (err: unknown) {
        if (err instanceof Error && err.message === "EMAIL_EXISTS") {
          setError("That email already has an account.");
        } else {
          setError("Failed to add child. Please try again.");
        }
      }
    });
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-[family-name:var(--font-pixel)] text-gold text-glow-gold">
            Parent Dashboard
          </h1>
          <p className="text-xs text-locked-text mt-1">{email}</p>
        </div>
        <button
          onClick={() => {
            signOut();
            router.push("/login");
          }}
          className="text-xs text-locked-text hover:text-fire-red transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Children list */}
      <div className="space-y-3 mb-6">
        {children.length === 0 && !isPending ? (
          <div className="rpg-card p-8 text-center text-locked-text text-sm">
            No children added yet. Add your first kid below!
          </div>
        ) : (
          children.map((child) => (
            <Link key={child.id} href={`/parent/${child.id}`}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="rpg-card p-4 sm:p-5 flex items-center gap-4 cursor-pointer hover:border-gold-dim/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-void-lighter border border-xp-purple-dim flex items-center justify-center text-xl">
                  🧒
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gold text-sm">{child.name}</h3>
                    <span className="level-badge text-xs">LVL {child.level}</span>
                  </div>
                  <p className="text-xs text-locked-text mt-0.5">{child.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-xp-purple-bright">{child.xp} XP</div>
                  <div className="text-xs text-locked-text mt-0.5">
                    {child.totalLessonsCompleted} lessons
                  </div>
                </div>
                <div className="text-gold text-lg">→</div>
              </motion.div>
            </Link>
          ))
        )}
      </div>

      {/* Add child toggle */}
      {!showAddChild ? (
        <button
          onClick={() => setShowAddChild(true)}
          className="w-full py-3 rounded-xl border-2 border-dashed border-gold-dim/40 text-gold-dim hover:border-gold/60 hover:text-gold transition-all text-sm font-semibold"
        >
          + Add a Child
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rpg-card p-6"
        >
          <h3 className="text-sm font-bold text-gold mb-4">Add Child Account</h3>
          <form onSubmit={handleAddChild} className="space-y-4">
            <div>
              <label className="block text-xs text-locked-text uppercase tracking-wider mb-2">
                Child&apos;s Email
              </label>
              <input
                type="email"
                value={childEmail}
                onChange={(e) => setChildEmail(e.target.value)}
                placeholder="child@example.com"
                required
                disabled={isPending}
                className="w-full px-4 py-3 bg-void-lighter border-2 border-gold-dim rounded-lg text-gold placeholder-locked-text text-sm outline-none transition-all focus:border-gold focus:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              />
            </div>
            <div>
              <label className="block text-xs text-locked-text uppercase tracking-wider mb-2">
                Hero Name
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Enter hero name..."
                required
                maxLength={20}
                disabled={isPending}
                className="w-full px-4 py-3 bg-void-lighter border-2 border-gold-dim rounded-lg text-gold placeholder-locked-text text-sm font-[family-name:var(--font-pixel)] text-center outline-none transition-all focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs text-locked-text uppercase tracking-wider mb-2">
                Choose Class
              </label>
              <div className="flex flex-wrap gap-2 justify-center">
                {CHARACTER_CLASSES.map((cls, i) => (
                  <button
                    key={cls.value}
                    type="button"
                    onClick={() => setSelectedClass(i)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                      i === selectedClass
                        ? "bg-xp-purple-dim/50 border-2 border-xp-purple"
                        : "bg-void-lighter border border-locked hover:border-xp-purple-dim"
                    }`}
                    title={cls.label}
                  >
                    {cls.emoji}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-sm text-fire-red">{error}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowAddChild(false);
                  setError("");
                }}
                disabled={isPending}
                className="flex-1 py-2 rounded-lg border border-locked text-locked-text hover:text-gold hover:border-gold-dim transition-all text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending || !childName.trim() || !childEmail.trim()}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                  !isPending && childName.trim() && childEmail.trim()
                    ? "bg-gradient-to-r from-gold-dim to-gold text-void cursor-pointer"
                    : "bg-void-lighter border border-locked text-locked-text cursor-not-allowed"
                }`}
              >
                {isPending ? "Adding..." : "Add Child"}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </main>
  );
}
