// Interaction event logging — server-only.
// All functions are non-fatal: they catch and log errors internally,
// never throwing to the caller. Lesson completion must never be blocked
// by a logging failure.

import { supabase } from "@/lib/supabase";

/**
 * Must match the CHECK constraint in supabase/migrations/006_interaction_events.sql.
 * Adding a new value requires both a DB migration and an update here.
 */
export type InteractionEventType =
  | "wrong_answer"
  | "boss_hp_snapshot"
  | "section_time"
  | "question_time"
  | "lesson_revisit"
  | "section_replay";

export interface InteractionEvent {
  userId: string;
  lessonSlug: string;
  eventType: InteractionEventType;
  metadata: Record<string, unknown>;
}

/**
 * Log a single interaction event. Fire-and-forget — never throws.
 */
export async function logInteractionEvent(
  userId: string,
  lessonSlug: string,
  eventType: InteractionEventType,
  metadata: Record<string, unknown> = {}
): Promise<void> {
  try {
    const { error } = await supabase.from("interaction_events").insert({
      user_id: userId,
      lesson_slug: lessonSlug,
      event_type: eventType,
      metadata,
    });
    if (error) {
      console.error("[logInteractionEvent] insert failed:", error.message);
    }
  } catch (err) {
    console.error("[logInteractionEvent] unexpected error:", err);
  }
}

/**
 * Bulk insert multiple interaction events. More efficient than per-event
 * calls when flushing a batch at section end. Never throws.
 */
export async function logInteractionEvents(
  events: InteractionEvent[]
): Promise<void> {
  if (events.length === 0) return;
  try {
    const rows = events.map((e) => ({
      user_id: e.userId,
      lesson_slug: e.lessonSlug,
      event_type: e.eventType,
      metadata: e.metadata,
    }));
    const { error } = await supabase.from("interaction_events").insert(rows);
    if (error) {
      console.error("[logInteractionEvents] bulk insert failed:", error.message);
    }
  } catch (err) {
    console.error("[logInteractionEvents] unexpected error:", err);
  }
}
