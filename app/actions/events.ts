"use server";

// Server Actions must be direct async function declarations — re-exports are not allowed.
// These wrappers satisfy Next.js while delegating to lib/events.ts.

import {
  logInteractionEvent as _logInteractionEvent,
  logInteractionEvents as _logInteractionEvents,
} from "@/lib/events";
import type { InteractionEvent, InteractionEventType } from "@/lib/events";

export async function logInteractionEvent(
  userId: string,
  lessonSlug: string,
  eventType: InteractionEventType,
  metadata: Record<string, unknown> = {}
): Promise<void> {
  return _logInteractionEvent(userId, lessonSlug, eventType, metadata);
}

export async function logInteractionEvents(
  events: InteractionEvent[]
): Promise<void> {
  return _logInteractionEvents(events);
}
