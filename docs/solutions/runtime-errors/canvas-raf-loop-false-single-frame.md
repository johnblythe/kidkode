---
title: "Canvas useCanvas hook with loop=false only renders single frame"
category: runtime-errors
tags: [canvas, requestAnimationFrame, react-hooks, animation, nextjs]
module: components/CanvasParticles
symptoms:
  - "One-shot canvas effects (confetti) flash and disappear"
  - "loop=false causes single frame render"
  - "Looping effects work fine"
severity: P1
date_solved: "2026-03-05"
related_prs: ["#12"]
---

# Canvas `useCanvas` hook with `loop=false` only renders single frame

## Problem

In a Next.js app using a custom `useCanvas` React hook for HTML5 Canvas animations, setting `loop=false` (for one-shot effects like confetti) caused only a **single frame** to render. Particles would flash and disappear instantly.

## Symptoms

- Canvas confetti/one-shot effects render one frame then stop
- Looping effects (background particles) work fine
- No errors in console

## Root Cause

The original `useCanvas` hook had two separate code paths:

```typescript
// BROKEN -- original implementation
if (loop) {
  const tick = (time: number) => {
    onFrame(ctx, dt);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
} else {
  // Only runs ONCE -- no animation loop at all!
  onFrame(ctx, 0.016);
}
```

When `loop=false`, it called `onFrame` exactly once and stopped. One-shot effects like confetti need to animate through their lifecycle (particles spawn, move, fade, die) -- they just don't **repeat** after all particles are gone. "One-shot" does not equal "one frame".

## Solution

Rewrite `useCanvas` to **always** run `requestAnimationFrame`. The consumer controls when to stop by returning `false` from `onFrame`:

```typescript
// FIXED -- lib/hooks/useCanvas.ts
export function useCanvas(
  onFrame: (ctx: CanvasRenderingContext2D, dt: number) => boolean | void,
): RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef(0);
  const onFrameRef = useRef(onFrame);
  const lastTimeRef = useRef(0);

  useEffect(() => { onFrameRef.current = onFrame; }, [onFrame]);

  const tick = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) { console.warn("useCanvas: failed to get 2d context"); return; }

    const dt = lastTimeRef.current
      ? Math.min((time - lastTimeRef.current) / 1000, 0.1) // clamp dt
      : 0.016;
    lastTimeRef.current = time;

    const shouldContinue = onFrameRef.current(ctx, dt);
    if (shouldContinue !== false) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return canvasRef;
}
```

Consumer usage:

```typescript
// In CanvasParticles.tsx
const onFrame = useCallback((ctx, dt): boolean | void => {
  // update and draw particles...
  particles = particles.filter(p => p.life > 0);

  // Stop the loop when all particles are dead (one-shot effect)
  if (!loop && particles.length === 0) return false;
}, [effect, loop]);
```

## Key Insight

The abstraction boundary was wrong. `loop` vs `no-loop` is not about whether to use `requestAnimationFrame` -- it is about whether to restart after completion. The hook should always animate; the consumer decides when animation is "done."

## Prevention

- Animation hooks should always use rAF internally -- the frame callback controls lifecycle
- Test one-shot effects visually (confetti, explosions) -- unit tests won't catch "renders but too briefly"
- Clamp `dt` to prevent huge jumps after tab-switch (we use `Math.min(dt, 0.1)`)
