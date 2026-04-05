import type { Realm } from "@/lib/types";

export const realms: Realm[] = [
  {
    id: 1,
    slug: "apprentices-tower",
    name: "The Apprentice's Tower",
    subtitle: "Orientation & Tools",
    icon: "🏰",
    accentColor: "emerald-500",
    unlockCondition: { type: "default" },
  },
  {
    id: 2,
    slug: "scribes-library",
    name: "The Scribe's Library",
    subtitle: "Programming Fundamentals",
    icon: "📚",
    accentColor: "amber-500",
    unlockCondition: { type: "realm-complete", realmId: 1 },
  },
  {
    id: 3,
    slug: "frontend-realm",
    name: "The Frontend Realm",
    subtitle: "Building What You See",
    icon: "🎨",
    accentColor: "sky-500",
    unlockCondition: { type: "realm-complete", realmId: 2 },
  },
  {
    id: 4,
    slug: "backend-dungeons",
    name: "The Backend Dungeons",
    subtitle: "The Invisible Kingdom",
    icon: "⚔️",
    accentColor: "violet-500",
    unlockCondition: { type: "realm-complete", realmId: 3 },
  },
  {
    id: 5,
    slug: "artificers-workshop",
    name: "The Artificer's Workshop",
    subtitle: "Real Tools & Workflows",
    icon: "🔧",
    accentColor: "rose-500",
    unlockCondition: { type: "realm-complete", realmId: 4 },
  },
  {
    id: 6,
    slug: "grand-quest",
    name: "The Grand Quest",
    subtitle: "Putting It All Together",
    icon: "👑",
    accentColor: "yellow-500",
    unlockCondition: { type: "all-realms", realmIds: [1, 2, 3, 4, 5] },
  },
];

export function getRealmById(id: number): Realm | undefined {
  return realms.find((r) => r.id === id);
}

export function getRealmBySlug(slug: string): Realm | undefined {
  return realms.find((r) => r.slug === slug);
}
