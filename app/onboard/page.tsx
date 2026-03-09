"use client";

import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { createUser } from "@/app/actions/users";
import { useActiveUser } from "@/lib/hooks/useActiveUser";
import type { HeroClass } from "@/lib/types";

const CHARACTER_CLASSES: { emoji: string; label: string; value: HeroClass }[] = [
  { emoji: "🧙", label: "Wizard", value: "wizard" },
  { emoji: "🪖", label: "Knight", value: "knight" },
  { emoji: "🧝", label: "Elf", value: "elf" },
  { emoji: "🥷", label: "Ninja", value: "ninja" },
  { emoji: "🦸", label: "Hero", value: "hero" },
  { emoji: "🧜", label: "Merfolk", value: "merfolk" },
];

const MAX_NAME_LENGTH = 20;

function OnboardForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { signIn } = useActiveUser();

  const [heroName, setHeroName] = useState("");
  const [selectedClass, setSelectedClass] = useState(0);
  const [role, setRole] = useState<"child" | "parent">("child");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!email) {
    router.replace("/login");
    return null;
  }

  const trimmedName = heroName.trim();
  const canSubmit = trimmedName.length > 0 && !isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");

    startTransition(async () => {
      try {
        const profile = await createUser({
          email,
          heroName: trimmedName,
          heroClass: CHARACTER_CLASSES[selectedClass].value,
          role,
        });
        signIn(profile.id, email);
        if (role === "parent") {
          router.push("/parent");
        } else {
          router.push("/");
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.message === "EMAIL_EXISTS") {
          setError("This email already has an account. Try logging in instead.");
        } else {
          setError("Failed to create account. Please try again.");
        }
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-void px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <h1 className="text-xl font-[family-name:var(--font-pixel)] text-gold text-glow-gold">
            Create Your Hero
          </h1>
          <p className="text-xs text-locked-text mt-2">{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="rpg-card p-6 space-y-6">
          {/* Character class picker */}
          <div>
            <label className="block text-xs text-locked-text uppercase tracking-wider mb-3">
              Choose Your Class
            </label>
            <div className="flex flex-wrap justify-center gap-2">
              {CHARACTER_CLASSES.map((cls, i) => (
                <motion.button
                  key={cls.value}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedClass(i)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                    i === selectedClass
                      ? "bg-xp-purple-dim/50 border-2 border-xp-purple glow-purple"
                      : "bg-void-lighter border border-locked hover:border-xp-purple-dim"
                  }`}
                  title={cls.label}
                >
                  {cls.emoji}
                </motion.button>
              ))}
            </div>
            <p className="text-center text-xs text-xp-purple-bright mt-2">
              {CHARACTER_CLASSES[selectedClass].label}
            </p>
          </div>

          {/* Hero name */}
          <div>
            <label className="block text-xs text-locked-text uppercase tracking-wider mb-2">
              Hero Name
            </label>
            <input
              type="text"
              value={heroName}
              onChange={(e) => {
                if (e.target.value.length <= MAX_NAME_LENGTH) {
                  setHeroName(e.target.value);
                }
              }}
              placeholder="Enter your hero name..."
              maxLength={MAX_NAME_LENGTH}
              className="w-full px-4 py-3 bg-void-lighter border-2 border-gold-dim rounded-lg text-center text-gold placeholder-locked-text font-[family-name:var(--font-pixel)] text-sm tracking-wider outline-none transition-all focus:border-gold focus:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              autoComplete="off"
              disabled={isPending}
            />
          </div>

          {/* Role toggle */}
          <div>
            <label className="block text-xs text-locked-text uppercase tracking-wider mb-2">
              I am a...
            </label>
            <div className="flex gap-2">
              {(["child", "parent"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    role === r
                      ? "bg-gold/20 border-2 border-gold text-gold"
                      : "bg-void-lighter border border-locked text-locked-text hover:border-gold-dim"
                  }`}
                >
                  {r === "child" ? "🧒 Kid" : "👨 Parent"}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-fire-red">{error}</p>}

          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileHover={canSubmit ? { scale: 1.02 } : {}}
            whileTap={canSubmit ? { scale: 0.98 } : {}}
            className={`w-full py-3 rounded-xl font-[family-name:var(--font-pixel)] text-sm tracking-wider transition-all ${
              canSubmit
                ? "bg-gradient-to-r from-gold-dim via-gold to-gold-bright text-void font-black cursor-pointer"
                : "bg-void-lighter border border-locked text-locked-text cursor-not-allowed"
            }`}
          >
            {isPending ? "Creating hero..." : "Begin Quest"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default function OnboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-4xl">⚔️</span></div>}>
      <OnboardForm />
    </Suspense>
  );
}
