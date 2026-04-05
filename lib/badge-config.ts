// Static badge metadata — no server imports, safe for client components.
// Mirrors realm definitions from content/realms.ts.

import type { RealmId } from "@/lib/types";

export const REALM_BADGES: Record<RealmId, { name: string; icon: string; description: string }> = {
  1: { name: "Tower Graduate",    icon: "🏰", description: "Completed The Apprentice's Tower" },
  2: { name: "Scribe Initiate",   icon: "📚", description: "Mastered The Scribe's Library" },
  3: { name: "Frontend Forger",   icon: "🎨", description: "Conquered The Frontend Realm" },
  4: { name: "Dungeon Diver",     icon: "⚔️", description: "Survived The Backend Dungeons" },
  5: { name: "Master Artificer",  icon: "🔧", description: "Graduated The Artificer's Workshop" },
  6: { name: "Grand Champion",    icon: "👑", description: "Completed The Grand Quest" },
};
