---
title: "Replace unsafe casts with discriminated union for InteractiveStep"
category: logic-errors
tags: [typescript, discriminated-union, type-safety, refactoring]
module: lib/types
symptoms:
  - "Multiple 'as unknown as X' casts in codebase"
  - "Type errors not caught at compile time"
  - "Refactoring one variant breaks others silently"
severity: P2
date_solved: "2026-03-05"
related_prs: ["#12"]
---

# Replace unsafe casts with discriminated union for InteractiveStep

## Problem

`InteractiveStep` was typed as a loose bag with `data: Record<string, unknown>`, requiring unsafe double-casts (`as unknown as DragDropScenarioStep`) at 4+ call sites. Type errors were invisible at compile time, and refactoring any single variant could silently break others.

## Root Cause

The original type tried to cover all step variants with a single shape:

```typescript
// BEFORE -- unsafe
export interface InteractiveStep {
  instruction: string;
  type: "drag-drop" | "type-command" | "multiple-choice" | "fill-blank" | "sequence";
  data: Record<string, unknown>;  // untyped bag
  hint?: string;
  solution: unknown;              // also untyped
}
```

Every consumer had to cast through `unknown`:

```typescript
const scenario = step.data as unknown as DragDropScenarioStep; // unsafe
```

The `solution` field was vestigial -- only some variants actually use it, but every variant carried it.

## Solution

Refactor to a **discriminated union** on the `type` field. Each variant gets its own interface with correctly typed `data` (and `solution` only where applicable):

```typescript
// AFTER -- type-safe
interface InteractiveStepBase {
  instruction: string;
  hint?: string;
}

export interface DragDropInteractiveStep extends InteractiveStepBase {
  type: "drag-drop";
  data: DragDropScenarioStep;
}

export interface SequenceInteractiveStep extends InteractiveStepBase {
  type: "sequence";
  data: { items: Array<{ id: string; text: string; description: string }>; correctOrder: string[] };
}

export interface MultipleChoiceInteractiveStep extends InteractiveStepBase {
  type: "multiple-choice";
  data: { options: string[] };
  solution: number;
}

export interface TypeCommandInteractiveStep extends InteractiveStepBase {
  type: "type-command";
  data: { command: string; expectedOutput?: string };
  solution: string;
}

export interface FillBlankInteractiveStep extends InteractiveStepBase {
  type: "fill-blank";
  data: { template: string; blanks: string[] };
  solution: string[];
}

export type InteractiveStep =
  | DragDropInteractiveStep
  | SequenceInteractiveStep
  | MultipleChoiceInteractiveStep
  | TypeCommandInteractiveStep
  | FillBlankInteractiveStep;
```

Consumer code narrows via `switch` -- no casts needed:

```typescript
function renderStep(step: InteractiveStep) {
  switch (step.type) {
    case "drag-drop":
      return <DragDropStep scenario={step.data} />;       // data: DragDropScenarioStep
    case "sequence":
      return <SequenceStep items={step.data.items} />;    // data is typed
    case "multiple-choice":
      return <MCStep options={step.data.options} solution={step.solution} />;
  }
}
```

## Migration Steps

1. Define `InteractiveStepBase` with shared fields (`instruction`, `hint?`).
2. Create a typed variant interface for each `type` literal value.
3. Union them as `export type InteractiveStep = ...`.
4. Update lesson content files -- remove `as unknown as Record<string, unknown>` casts from data definitions.
5. Update consumers -- replace `as unknown as X` casts with `switch`/`if` narrowing on `step.type`.
6. Run `tsc --noEmit` to catch any missed spots.

## Key Insight

Each variant can have **different fields** -- `solution` only exists on `multiple-choice`, `type-command`, and `fill-blank`; `data` shape varies per variant. The discriminated union enforces this at compile time. The old single-interface approach forced every variant to carry every field (typed as `unknown`), defeating the type system entirely.

## Prevention

- When a type has a `type` field with string literal values, **always** use a discriminated union.
- `Record<string, unknown>` or `any` in a data field is a code smell -- type it per-variant.
- If you see `as unknown as X` casts, the type hierarchy is wrong -- fix the types, don't cast around them.
