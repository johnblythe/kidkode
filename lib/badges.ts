// Realm badge award logic — server-only (uses supabase service client).
// For static badge metadata, see lib/badge-config.ts.

import { supabase } from "@/lib/supabase";
import { lessons } from "@/content/lessons";
import { realms } from "@/content/realms";
import type { EarnedBadge, RealmId } from "@/lib/types";
import { REALM_BADGES } from "@/lib/badge-config";

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

/**
 * Called after completeLesson(). Checks which realm badges the user has now
 * earned and inserts any missing ones. Returns slugs of newly awarded badges.
 */
export async function checkAndAwardBadges(
  userId: string,
  completedSlugs: Set<string>
): Promise<{ slug: string; name: string; icon: string }[]> {
  const byRealm = lessonsByRealm();

  // Find realms where every lesson is completed
  const completedRealmIds: RealmId[] = [];
  for (const [realmId, slugs] of byRealm) {
    if (slugs.every((s) => completedSlugs.has(s))) {
      completedRealmIds.push(realmId);
    }
  }

  if (completedRealmIds.length === 0) return [];

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

  if (toInsert.length === 0) return [];

  const { error } = await supabase.from("user_badges").insert(toInsert);
  if (error) throw new Error(error.message);

  return toInsert.map((r) => ({
    slug: r.badge_slug,
    name: REALM_BADGES[r.realm_id as RealmId].name,
    icon: REALM_BADGES[r.realm_id as RealmId].icon,
  }));
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

  return data.map((row) => {
    const realmId = row.realm_id as RealmId;
    const badge = REALM_BADGES[realmId];
    return {
      slug: row.badge_slug,
      realmId,
      name: badge.name,
      icon: badge.icon,
      description: badge.description,
      earnedAt: row.earned_at,
    };
  });
}
