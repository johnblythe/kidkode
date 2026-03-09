"use client";

import { useState, useEffect } from "react";
import { STORAGE_KEYS } from "@/lib/progress-client";

interface ActiveUser {
  userId: string | null;
  email: string | null;
  mounted: boolean; // false until after hydration — gate auth-dependent UI on this
  signIn: (userId: string, email: string) => void;
  signOut: () => void;
}

// Centralizes kidkode:activeUserId / kidkode:activeEmail localStorage reads.
// Reads ONLY inside useEffect (SSR safety — localStorage is unavailable server-side).
// Always check `mounted` before rendering auth-dependent UI to prevent flash.
export function useActiveUser(): ActiveUser {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUserId(localStorage.getItem(STORAGE_KEYS.activeUserId));
    setEmail(localStorage.getItem(STORAGE_KEYS.activeEmail));
    setMounted(true);
  }, []);

  function signIn(id: string, em: string) {
    localStorage.setItem(STORAGE_KEYS.activeUserId, id);
    localStorage.setItem(STORAGE_KEYS.activeEmail, em);
    setUserId(id);
    setEmail(em);
  }

  function signOut() {
    localStorage.removeItem(STORAGE_KEYS.activeUserId);
    localStorage.removeItem(STORAGE_KEYS.activeEmail);
    localStorage.removeItem(STORAGE_KEYS.legacyProgress);
    setUserId(null);
    setEmail(null);
  }

  return { userId, email, mounted, signIn, signOut };
}
