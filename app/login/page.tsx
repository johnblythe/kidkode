"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { lookupUser } from "@/app/actions/users";
import { useActiveUser } from "@/lib/hooks/useActiveUser";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useActiveUser();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setError("");

    startTransition(async () => {
      try {
        const result = await lookupUser(trimmed);
        if (result.found) {
          signIn(result.session.userId, result.session.email);
          router.push("/");
        } else {
          // New user — go to onboarding
          router.push(`/onboard?email=${encodeURIComponent(trimmed)}`);
        }
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-void px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-[family-name:var(--font-pixel)] text-gold text-glow-gold">
            KidKode
          </h1>
          <p className="text-sm text-xp-purple-bright mt-2">Enter your email to begin</p>
        </div>

        <form onSubmit={handleSubmit} className="rpg-card p-6 space-y-4">
          <div>
            <label className="block text-xs text-locked-text uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="adventurer@example.com"
              className="w-full px-4 py-3 bg-void-lighter border-2 border-gold-dim rounded-lg text-gold placeholder-locked-text text-sm outline-none transition-all focus:border-gold focus:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              autoComplete="email"
              required
              disabled={isPending}
            />
          </div>

          {error && (
            <p className="text-sm text-fire-red">{error}</p>
          )}

          <motion.button
            type="submit"
            disabled={isPending || !email.trim()}
            whileHover={!isPending && email.trim() ? { scale: 1.02 } : {}}
            whileTap={!isPending && email.trim() ? { scale: 0.98 } : {}}
            className={`w-full py-3 rounded-xl font-[family-name:var(--font-pixel)] text-sm tracking-wider transition-all ${
              !isPending && email.trim()
                ? "bg-gradient-to-r from-gold-dim via-gold to-gold-bright text-void font-black cursor-pointer"
                : "bg-void-lighter border border-locked text-locked-text cursor-not-allowed"
            }`}
          >
            {isPending ? "Entering the realm..." : "Enter the Realm"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
