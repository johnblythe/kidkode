---
title: "Infinite Re-render Loop via Server Action + startTransition in Next.js App Router"
description: "Server Actions wrapped in startTransition triggered RSC route refreshes that remounted the dynamic route component, resetting useRef guards and causing load effects to re-fire in an infinite loop."
category: "bug"
tags:
  - nextjs
  - react
  - server-actions
  - app-router
  - infinite-loop
  - use-ref
  - start-transition
  - rsc
  - memoization
module: "lesson-player"
symptoms:
  - "Rapid-fire POST requests in server logs (~18ms apart) on navigation to /lesson/[slug]"
  - "Page never finishes loading; browser tab spins indefinitely"
  - "useRef guard values reset unexpectedly between effect runs"
  - "Server Action calls multiply exponentially after initial page load"
severity: "critical"
date_solved: "2026-03-18"
---

# Infinite Re-render Loop: Server Actions + startTransition in Next.js App Router

## Symptom

Navigating to `/lesson/git-save-points` caused rapid-fire POST requests (~18ms apart) in the dev server logs. The page never settled — an infinite loop of Server Action calls.

```
POST /lesson/git-save-points 200 in 18ms
POST /lesson/git-save-points 200 in 17ms
POST /lesson/git-save-points 200 in 20ms
...hundreds more...
```

## Root Cause

A 4-step cycle:

1. `useEffect` called a Server Action (`updateLessonProgress`) inside `startTransition`
2. `startTransition` in App Router signals Next.js to treat the result as an RSC update, triggering a **route refresh**
3. The route refresh **remounted the component** — all React state and refs reset to initial values
4. On remount, `useEffect` dependencies re-evaluated as "changed" (refs were fresh), so the effect re-fired → back to step 1

### Amplifiers

- `AudioProvider` context value was an inline object literal → new reference every render → all `useAudio()` consumers re-rendered
- `useAudio()` fallback returned new function references on every call (inline `() => {}`)
- `useActiveUser` returned `signIn`/`signOut` as plain functions (no `useCallback`) → new identity each render

## What Didn't Work: useRef Guard

```ts
const loadedSlugRef = useRef<string | null>(null);

useEffect(() => {
  if (loadedSlugRef.current === slug) return; // guard
  loadedSlugRef.current = slug;
  startTransition(async () => {
    await updateLessonProgress(userId, slug, { status: "in_progress" });
  });
}, [slug, mounted, userId]);
```

**Why it fails**: `useRef` values do not survive remounts. When the RSC refresh remounts the component, `loadedSlugRef.current` resets to `null`. The guard passes, the Server Action fires again → loop continues.

## Working Fix

### Fix A: Remove startTransition from Server Action calls in useEffect

Replace `startTransition(async () => { ... })` with a plain async IIFE + `cancelled` flag:

```ts
useEffect(() => {
  if (!mounted || !userId) return;
  const found = getLessonBySlug(slug);
  if (!found) { setNotFound(true); return; }
  setLesson(found);

  let cancelled = false;
  (async () => {
    try {
      const profile = await getProfile(userId);
      if (cancelled) return;
      const lp = profile?.lessons[slug];
      if (lp && lp.sectionProgress > 0 && lp.status !== "completed") {
        setCurrentSection(lp.sectionProgress);
      }
      await updateLessonProgress(userId, slug, { status: "in_progress" });
    } catch (err) {
      if (!cancelled) console.error("[LessonPlayer] load error:", err);
    }
  })();

  return () => { cancelled = true; };
}, [slug, mounted, userId]);
```

**Why**: Without `startTransition`, the Server Action is just a network call. No RSC refresh, no remount, no loop. The `cancelled` flag handles cleanup if deps change mid-flight.

### Fix B: Memoize AudioProvider context value

```ts
const value = useMemo(
  () => ({ sfx, playBGM, stopBGM, volume, setVolume, muted, toggleMute }),
  [sfx, playBGM, stopBGM, volume, setVolume, muted, toggleMute]
);
return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
```

Plus a module-level fallback constant:

```ts
const NOOP_AUDIO: AudioContextValue = {
  sfx: () => {},
  playBGM: () => {},
  stopBGM: () => {},
  volume: 0.5,
  setVolume: () => {},
  muted: false,
  toggleMute: () => {},
};

export function useAudio(): AudioContextValue {
  return useContext(AudioCtx) ?? NOOP_AUDIO;
}
```

### Fix C: useCallback on hook functions

```ts
const signIn = useCallback((id: string, em: string) => { ... }, []);
const signOut = useCallback(() => { ... }, []);
```

## Prevention

1. **Never use `startTransition` with Server Actions inside `useEffect`** in Next.js App Router. Use plain async instead.
2. **Always `useMemo` on Context Provider `value` props** when the provider has children that depend on reference stability.
3. **Module-level constants for fallback objects** — never return inline `() => {}` from hooks.
4. **Split effects by concern** — one effect per responsibility (redirect, load, save, BGM) with minimal dependency arrays.
5. **Don't rely on `useRef` as a guard against remount-caused loops** — refs reset on remount. Use module-level `Set`s or plain async patterns instead.

## Related

- `docs/solutions/ui-bugs/animate-presence-boolean-toggle-no-retrigger.md` — another re-render-related issue
