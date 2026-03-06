---
title: "Module-level default object returned by reference causes singleton mutation"
category: runtime-errors
tags: [javascript, typescript, singleton, mutation, reference-vs-value, react]
module: lib/progress
symptoms:
  - "Default profile has unexpected data from previous interactions"
  - "Profile state persists across page navigations without localStorage"
  - "Works on first load, breaks on subsequent calls"
severity: P2
date_solved: "2026-03-05"
related_prs: ["#12"]
---

# Module-level default object returned by reference causes singleton mutation

## Problem

`lib/progress.ts` defined a module-level `DEFAULT_PROFILE` object and returned it **by reference** from multiple code paths. Any caller mutating the returned object (e.g., `profile.lessons[slug] = ...`) mutated the singleton for ALL subsequent callers.

```typescript
// BROKEN
const DEFAULT_PROFILE: PlayerProfile = {
  name: "Adventurer",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  totalLessonsCompleted: 0,
  unlockedToday: false,
  lessons: {},
};

export function getProfile(): PlayerProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE; // returns reference!
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_PROFILE; // same reference!
  try {
    return JSON.parse(raw) as PlayerProfile;
  } catch {
    return DEFAULT_PROFILE; // same reference!
  }
}
```

Works fine on first load because the singleton is clean. Breaks on subsequent calls because a previous caller already mutated it.

## Symptoms

- Profile data appears "sticky" across page navigations
- Default profile has unexpected lesson entries
- Works on first load, breaks on subsequent interactions
- SSR vs client behavior differs (SSR always returns `DEFAULT_PROFILE`, so the server-side singleton accumulates mutations across requests)

## Solution

Spread the default on every return, explicitly re-creating nested mutable fields:

```typescript
// FIXED
export function getProfile(): PlayerProfile {
  if (typeof window === "undefined") return { ...DEFAULT_PROFILE, lessons: {} };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...DEFAULT_PROFILE, lessons: {} };
  try {
    return JSON.parse(raw) as PlayerProfile;
  } catch {
    console.warn("Corrupted progress data, resetting profile");
    return { ...DEFAULT_PROFILE, lessons: {} };
  }
}
```

`lessons: {}` must be explicitly spread because `{ ...DEFAULT_PROFILE }` shallow-copies the `lessons` reference -- all "defaults" would share the same `lessons` object.

## Key Insight

In JavaScript, `const obj = { ... }` at module scope creates ONE object. Returning it from a function gives the caller a reference to that same object. Shallow spread (`{ ...obj }`) fixes primitives but nested objects (like `lessons: {}`) still share references. You need to explicitly re-create nested mutable fields.

## Prevention

- **Never return module-level objects directly** -- always spread.
- **Nested objects need explicit new instances** for each mutable field.
- **`Object.freeze()` on module-level defaults** catches mutations at runtime (throws in strict mode).
- **Factory function pattern** eliminates the problem entirely:
  ```typescript
  const createDefault = (): PlayerProfile => ({ ...DEFAULT_PROFILE, lessons: {} });
  ```
