// Realm badge award logic — server-only (uses supabase service client).
// For static badge metadata, see lib/badge-config.ts.

import { supabase } from "@/lib/supabase";
import { lessons } from "@/content/lessons";
import { realms } from "@/content/realms";
import type { EarnedBadge, RealmId } from "@/lib/types";
import { REALM_BADGES } from "@/lib/badge-config";
import { REALM_TITLES } from "@/lib/classes";

export { REALM_BADGES };

// Group lesson slugs by realm ID using the lessons array.
function lessonsByRealm(): Map<RealmId, string[]> {
  const map = new Map<RealmId, string[]>();
  for (const lesson of lessons) {
    const existing = map.get(lesson.realm) ?? [];
    existing.push(lesson.slug);
    map.set(lesson.realm, existing);
  }
  return map;
}

export interface BadgeAwardResult {
  badges: { slug: string; name: string; icon: string }[];
  newTitle?: string;
}

/**
 * Called after completeLesson(). Checks which realm badges the user has now
 * earned and inserts any missing ones. Returns newly awarded badges and the
 * latest auto-set realm title (if a new badge was earned).
 */
export async function checkAndAwardBadges(
  userId: string,
  completedSlugs: Set<string>
): Promise<BadgeAwardResult> {
  const byRealm = lessonsByRealm();

  // Find realms where every lesson is completed
  const completedRealmIds: RealmId[] = [];
  for (const [realmId, slugs] of byRealm) {
    if (slugs.every((s) => completedSlugs.has(s))) {
      completedRealmIds.push(realmId);
    }
  }

  if (completedRealmIds.length === 0) return { badges: [] };

  // Fetch already-earned badges to avoid duplicates
  const { data: existing, error: existingError } = await supabase
    .from("user_badges")
    .select("badge_slug")
    .eq("user_id", userId);

  if (existingError) throw new Error(`checkAndAwardBadges: existing badges fetch failed: ${existingError.message}`);

  const earnedSlugs = new Set((existing ?? []).map((r) => r.badge_slug));

  // Build rows to insert for newly completed realms
  const toInsert = completedRealmIds
    .map((realmId) => {
      const realm = realms.find((r) => r.id === realmId);
      if (!realm) return null;
      return { user_id: userId, badge_slug: realm.slug, realm_id: realmId };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null && !earnedSlugs.has(r.badge_slug));

  if (toInsert.length === 0) return { badges: [] };

  const { error } = await supabase.from("user_badges").insert(toInsert);
  if (error) throw new Error(error.message);

  // Auto-set active_title to the latest newly earned realm's title — non-fatal
  // Uses the last inserted badge to reflect the most recent realm completed
  let newTitle: string | undefined;
  const lastInserted = toInsert[toInsert.length - 1];
  try {
    const realm = realms.find((r) => r.id === lastInserted.realm_id);
    if (realm) {
      const titleString = REALM_TITLES[realm.slug];
      if (titleString !== undefined) {
        const { error: titleError } = await supabase
          .from("character_stats")
          .update({ active_title: titleString })
          .eq("user_id", userId);
        if (titleError) {
          console.error("[checkAndAwardBadges] active_title update failed:", titleError.message);
        } else {
          newTitle = titleString;
        }
      } else {
        console.error(`[checkAndAwardBadges] REALM_TITLES missing entry for slug "${realm.slug}" — title not awarded. Add this slug to lib/classes.ts REALM_TITLES.`);
      }
    } else {
      console.error(`[checkAndAwardBadges] realm not found for realmId ${lastInserted.realm_id} — badge inserted but title cannot be set. Check content/realms.ts and DB realm IDs.`);
    }
  } catch (err) {
    console.error("[checkAndAwardBadges] title auto-set threw unexpectedly:", err);
  }

  const badges = toInsert.flatMap((r) => {
    const meta = REALM_BADGES[r.realm_id as RealmId];
    if (!meta) {
      console.error(`[checkAndAwardBadges] REALM_BADGES missing entry for realm_id ${r.realm_id} — badge cannot be mapped. Add to lib/badge-config.ts.`);
      return [];
    }
    return [{ slug: r.badge_slug, name: meta.name, icon: meta.icon }];
  });

  return { badges, newTitle };
}

/**
 * Fetch all earned badges for a user. Returns an empty array if none.
 */
export async function getBadgesForUser(userId: string): Promise<EarnedBadge[]> {
  const { data, error } = await supabase
    .from("user_badges")
    .select("badge_slug, realm_id, earned_at")
    .eq("user_id", userId)
    .order("realm_id", { ascending: true });

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data.flatMap((row) => {
    const realmId = row.realm_id as RealmId;
    const badge = REALM_BADGES[realmId];
    if (!badge) {
      console.error(`[getBadgesForUser] REALM_BADGES missing entry for realm_id ${realmId} — skipping badge. Add to lib/badge-config.ts.`);
      return [];
    }
    return [{
      slug: row.badge_slug,
      realmId,
      name: badge.name,
      icon: badge.icon,
      description: badge.description,
      earnedAt: row.earned_at,
    }];
  });
}
