---
title: Adding New Lessons and Interactive Step Types
category: feature-patterns
tags: [lessons, interactive-steps, boss-sprites, content-authoring]
module: content/lessons, components
created: 2026-03-07
issues: ["#16", "#17", "#18", "#19", "#20"]
pr: "#31"
---

# Adding New Lessons and Interactive Step Types

## Context

Tier 2 added 5 lessons (3-7), 2 new interactive step types (TypeCommandStep, FillBlankStep), and 5 boss SVG sprites. This documents the pattern for future tiers.

## Adding a New Interactive Step Type

### 1. Define the type in `lib/types.ts`

Add a new interface extending `InteractiveStepBase` and add it to the `InteractiveStep` union:

```typescript
export interface MyNewInteractiveStep extends InteractiveStepBase {
  type: "my-new-type";
  data: { /* step-specific fields */ };
  solution: /* step-specific solution type */;
}

export type InteractiveStep =
  | DragDropInteractiveStep
  | SequenceInteractiveStep
  | MultipleChoiceInteractiveStep
  | TypeCommandInteractiveStep
  | FillBlankInteractiveStep
  | MyNewInteractiveStep; // add here
```

### 2. Create the component

New file: `components/MyNewStep.tsx`

Required patterns:
- `"use client"` directive
- Import `useAudio` and call `sfx("correct-ding")` / `sfx("wrong-buzz")` on validation
- Call `onStepComplete()` after 1200ms delay on correct answer
- Use `useRef` for setTimeout cleanup on unmount
- Provide hint button + feedback animations matching existing steps
- RPG color tokens: `text-gold`, `text-hp-green-bright`, `text-fire-red`, `text-mana-blue-bright`
- Responsive spacing: `p-3 sm:p-4`, `mb-4 sm:mb-6`

### 3. Register in `components/InteractiveExercise.tsx`

Add import and case to `renderStep()` switch. The `default` branch has exhaustive `never` checking — TypeScript will error if you forget.

## Adding a New Lesson

### Files needed per lesson:

1. **Content**: `content/lessons/NN-slug-name.ts` — exports `const lesson: Lesson`
2. **Boss sprite**: `components/bosses/BossName.tsx` — SVG component following `MergeConflictHydra` pattern
3. **Registration**: Add imports to `content/lessons/index.ts` and `components/bosses/index.ts`

### Boss sprite pattern:

```typescript
"use client";
import { motion } from "framer-motion";
import type { BossSpriteProps } from "./MergeConflictHydra";

export default function BossName({ state }: BossSpriteProps) {
  const stateClass = state === "idle" ? "boss-idle"
    : state === "damaged" ? "boss-damaged"
    : state === "attacking" ? "boss-attacking" : "";

  return (
    <motion.div
      className={`relative ${stateClass}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={state === "dead"
        ? { scale: 0, opacity: 0, filter: "brightness(3)" }
        : { scale: 1, opacity: 1, filter: "brightness(1)" }}
      transition={state === "dead"
        ? { duration: 1, ease: "easeIn" }
        : { type: "spring", stiffness: 150, damping: 15 }}
    >
      <svg viewBox="0 0 200 200"
        className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 20-30+ SVG elements */}
      </svg>
    </motion.div>
  );
}
```

### Boss registry key must match lesson's `boss.sprite` field:

```typescript
// content/lessons/NN-slug.ts
boss: { sprite: "myBossKey", ... }

// components/bosses/index.ts
export const bossSprites = { myBossKey: MyBossComponent, ... };
```

## Review Findings (Gotchas)

### FillBlankStep validation gaps

The template `___` count, `blanks.length`, and `solution` keys must all stay in sync. TypeScript can't enforce this. Dev-mode `console.warn` catches mismatches at runtime. Always verify:
- Number of `___` in template === `blanks.length`
- Every `blank.id` has a matching key in `solution`

### Configurable labels

FillBlankStep has `data.filename` (shown in editor tab) and `data.caseSensitive`. Don't hardcode domain-specific text in reusable components.

### Timer cleanup

All setTimeout calls advancing steps must use `useRef` + cleanup effect to prevent stale callbacks on unmount:

```typescript
const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);
timerRef.current = setTimeout(onStepComplete, 1200);
```

### React 19 useRef

`useRef()` without argument errors in React 19. Always pass initial value: `useRef<T>(undefined)` or `useRef<T>(null)`.

## Execution Strategy for Bulk Lesson Creation

5 lessons were created in parallel using background agents (one per lesson). Phase 0 (shared type/component changes) completed first since it touches shared files. Phase 2 (registration) ran after all agents finished, resolving merge conflicts in index files.

Optimal pattern: **shared infrastructure first → parallel content → sequential registration**.
