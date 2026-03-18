"use server";

import Anthropic from "@anthropic-ai/sdk";
import { getLessonBySlug } from "@/content/lessons";
import type { Lesson, LessonSection } from "@/lib/types";

const client = new Anthropic();

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

export async function chatWithTutor(
  slug: string,
  messages: ChatMessage[]
): Promise<string> {
  const lesson = getLessonBySlug(slug);
  if (!lesson) throw new Error("Lesson not found");

  const context = extractLessonContext(lesson);

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    system: SYSTEM_PROMPT + context,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  const block = response.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type");
  return block.text;
}
