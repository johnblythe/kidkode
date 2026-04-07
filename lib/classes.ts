// Shared hero class metadata, evolution tiers, and realm title constants.
// Single source of truth — imported by client components (onboard, parent, dashboard)
// and server logic (badge/title award, evolution detection).

import type { HeroClass } from "@/lib/types";

// ============================================================
// Character classes — matches DB CHECK constraint in migration 001
// ============================================================

export const CHARACTER_CLASSES: { emoji: string; label: string; value: HeroClass }[] = [
  { emoji: "🧙", label: "Wizard",  value: "wizard" },
  { emoji: "🪖", label: "Knight",  value: "knight" },
  { emoji: "🧝", label: "Elf",     value: "elf" },
  { emoji: "🥷", label: "Ninja",   value: "ninja" },
  { emoji: "🦸", label: "Hero",    value: "hero" },
  { emoji: "🧜", label: "Merfolk", value: "merfolk" },
];

// ============================================================
// Class evolutions — ordered thresholds per hero class
// First evolution at L5, second at L10
// ============================================================

export const CLASS_EVOLUTIONS: Record<HeroClass, Array<{ level: number; name: string }>> = {
  wizard:  [{ level: 5, name: "Mage" },       { level: 10, name: "Archmage" }],
  knight:  [{ level: 5, name: "Warrior" },    { level: 10, name: "Paladin" }],
  elf:     [{ level: 5, name: "Ranger" },     { level: 10, name: "Sylvan Sage" }],
  ninja:   [{ level: 5, name: "Shinobi" },    { level: 10, name: "Shadow Master" }],
  hero:    [{ level: 5, name: "Champion" },   { level: 10, name: "Legend" }],
  merfolk: [{ level: 5, name: "Tide Caller" }, { level: 10, name: "Sea Sovereign" }],
};

// ============================================================
// Realm titles — keyed by realm slug (string), NOT by numeric RealmId
// Must match slugs in content/realms.ts
// ============================================================

export const REALM_TITLES: Record<string, string> = {
  "apprentices-tower":   "Tower Initiate",
  "scribes-library":     "Code Scribe",
  "frontend-realm":      "Web Weaver",
  "backend-dungeons":    "Database Oracle",
  "artificers-workshop": "Terminal Sage",
  "grand-quest":         "Grand Champion",
};

// ============================================================
// Helpers
// ============================================================

/**
 * Returns the avatar tier (1/2/3) based on current level.
 * Tier 1: < 5, Tier 2: 5–9, Tier 3: 10+
 */
export function getAvatarTier(level: number): 1 | 2 | 3 {
  if (level >= 10) return 3;
  if (level >= 5) return 2;
  return 1;
}

/**
 * Returns the display name for the hero's current evolution at the given level.
 * Falls back to the base class label if no threshold is crossed or class is unknown.
 * Never returns undefined or throws.
 */
export function getEvolvedClassName(heroClass: HeroClass, level: number): string {
  const evolutions = CLASS_EVOLUTIONS[heroClass];
  if (!evolutions) {
    // Unknown heroClass — return base label from CHARACTER_CLASSES, or class string as fallback
    return CHARACTER_CLASSES.find((c) => c.value === heroClass)?.label ?? String(heroClass);
  }

  // Walk thresholds in reverse so the highest crossed threshold wins
  for (let i = evolutions.length - 1; i >= 0; i--) {
    if (level >= evolutions[i].level) {
      return evolutions[i].name;
    }
  }

  // No threshold crossed — return base class label
  return CHARACTER_CLASSES.find((c) => c.value === heroClass)?.label ?? String(heroClass);
}

/**
 * Returns the realm title strings available to a player based on their earned badges.
 * Accepts the EarnedBadge shape (slug field, not badge_slug).
 * Filters out slugs not found in REALM_TITLES.
 */
// NOTE: badge.slug is expected to equal the realm's slug (set in checkAndAwardBadges → user_badges.badge_slug).
// REALM_TITLES is keyed by realm slug. If non-realm badges are added in future,
// this lookup will silently return no title for them — that is intentional.
export function getAvailableTitles(badges: { slug: string }[]): string[] {
  const titles: string[] = [];
  for (const badge of badges) {
    const title = REALM_TITLES[badge.slug];
    if (title !== undefined) {
      titles.push(title);
    }
  }
  return titles;
}
