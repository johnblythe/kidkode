"use client";

// Client-side localStorage operations for progress.
// Keep localStorage reads here, out of lib/progress.ts (server module).

export const STORAGE_KEYS = {
  activeUserId: "kidkode:activeUserId",
  activeEmail: "kidkode:activeEmail",
  sessionExpiry: "kidkode:sessionExpiry",
  legacyProgress: "kidkode_progress", // old localStorage blob — cleared after migration
} as const;

export function getActiveUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.activeUserId);
}

export function getActiveEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.activeEmail);
}

export function setActiveUser(userId: string, email: string): void {
  localStorage.setItem(STORAGE_KEYS.activeUserId, userId);
  localStorage.setItem(STORAGE_KEYS.activeEmail, email);
  localStorage.setItem(STORAGE_KEYS.sessionExpiry, String(Date.now() + 7 * 24 * 60 * 60 * 1000));
}

export function clearActiveUser(): void {
  localStorage.removeItem(STORAGE_KEYS.activeUserId);
  localStorage.removeItem(STORAGE_KEYS.activeEmail);
  localStorage.removeItem(STORAGE_KEYS.sessionExpiry);
  // Clear legacy progress blob too; preserve audio prefs (kidkode:audio:*)
  localStorage.removeItem(STORAGE_KEYS.legacyProgress);
}

// Called after first successful DB load — clear old localStorage progress
export function clearLegacyProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.legacyProgress);
}
