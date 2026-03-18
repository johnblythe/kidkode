"use server";

import Anthropic from "@anthropic-ai/sdk";
import { getLessonBySlug } from "@/content/lessons";
import type { Lesson } from "@/lib/types";

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function extractLessonContext(lesson: Lesson): string {
  const parts: string[] = [
    `Lesson: "${lesson.title}"`,
    `Description: ${lesson.description}`,
  ];

  for (const section of lesson.sections) {
    switch (section.type) {
      case "slides":
        for (const frame of section.frames) {
          parts.push(`- ${frame.title}: ${frame.content}`);
        }
        break;
      case "reading":
        // Truncate to avoid blowing up the context
        parts.push(`Reading: ${section.content.slice(0, 1500)}`);
        break;
      case "interactive":
        parts.push(`Practice: ${section.title} — ${section.description}`);
        for (const step of section.steps) {
          parts.push(`  Step: ${step.instruction}`);
        }
        break;
      case "quiz":
        for (const q of section.questions) {
          parts.push(`Quiz Q: ${q.question} → ${q.explanation}`);
        }
        break;
    }
  }

  return parts.join("\n");
}

const SYSTEM_PROMPT = `You are a friendly, encouraging coding tutor for kids (ages 8-14) in a fantasy RPG-themed coding academy called KidKode.

The student just completed a lesson and wants to ask questions about what they learned.

RULES:
- Only discuss the lesson topic and closely related programming/engineering concepts.
- If asked about non-programming topics (games, movies, personal questions, etc.), gently redirect: "That sounds fun! But let's keep our focus on coding — what questions do you have about what we just learned?"
- Keep responses SHORT (2-4 sentences max). Kids lose interest with walls of text.
- Use simple language. Avoid jargon unless the lesson introduced it.
- Be encouraging and positive. Use analogies kids understand (games, school, sports).
- You may use code examples but keep them tiny (3-5 lines max).
- Never produce harmful, inappropriate, or off-topic content.
- Use the RPG theme naturally (XP, quests, leveling up) but don't force it.

LESSON CONTEXT:
`;

const MAX_TURNS = 20;
const MAX_MESSAGE_LENGTH = 500;

export async function chatWithTutor(
  slug: string,
  messages: ChatMessage[]
): Promise<string> {
  const lesson = getLessonBySlug(slug);
  if (!lesson) throw new Error("Lesson not found");

  // Validate and sanitize: only trust user messages, rebuild assistant messages
  // from our own responses (client could inject fake assistant messages to bypass guardrails)
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Messages required");
  }
  if (messages.length > MAX_TURNS) {
    throw new Error("Conversation too long — start a new chat!");
  }

  const lastMsg = messages[messages.length - 1];
  if (lastMsg.role !== "user") {
    throw new Error("Last message must be from user");
  }
  if (lastMsg.content.length > MAX_MESSAGE_LENGTH) {
    throw new Error("Message too long — keep it under 500 characters!");
  }

  // Ensure strict user/assistant alternation
  for (let i = 0; i < messages.length; i++) {
    const expectedRole = i % 2 === 0 ? "user" : "assistant";
    if (messages[i].role !== expectedRole) {
      throw new Error("Invalid message sequence");
    }
  }

  if (!client) {
    throw new Error("TUTOR_UNAVAILABLE");
  }

  const context = extractLessonContext(lesson);

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: SYSTEM_PROMPT + context,
      messages: messages.map((m) => ({
        role: m.role,
        content: String(m.content).slice(0, MAX_MESSAGE_LENGTH),
      })),
    });

    const block = response.content[0];
    if (!block || block.type !== "text") {
      throw new Error("Unexpected response format");
    }
    return block.text;
  } catch (err) {
    console.error("[chatWithTutor]", slug, err);
    if (err instanceof Anthropic.RateLimitError) {
      throw new Error("RATE_LIMITED");
    }
    if (err instanceof Anthropic.AuthenticationError) {
      throw new Error("AUTH_ERROR");
    }
    throw new Error("TUTOR_UNAVAILABLE");
  }
}
