---
title: "Framer-motion transform composition overwrites inline style.transform"
date: 2026-04-06
category: docs/solutions/ui-bugs
module: BadgeWall tooltip positioning
problem_type: ui_bug
component: frontend_stimulus
severity: medium
symptoms:
  - "Tooltip renders at left:50% anchor but is not shifted — appears offset right instead of centered"
  - "Inline style.transform has no visible effect; DevTools shows only framer-motion values in computed transform"
  - "Bug only manifests when framer-motion is also animating scale, y, or x on the same element"
root_cause: wrong_api
resolution_type: code_fix
tags:
  - framer-motion
  - animation
  - css-transform
  - tooltip
  - style-conflict
  - motion-div
related_components:
  - frontend_stimulus
---

# Framer-motion transform composition overwrites inline style.transform

## Problem

Framer-motion takes full ownership of the CSS `transform` property on any `motion.*` element it is animating. Setting `style={{ transform: "translateX(-50%)" }}` on a `motion.div` that also animates `scale`, `y`, or `x` is silently overwritten by framer-motion's own composed transform string — the inline style never applies.

## Symptoms

- Tooltip or absolutely-positioned element renders at wrong position despite `style.transform` being set correctly
- No console error or warning; computed `transform` in DevTools shows only framer-motion values (`scale(...)`, `translateY(...)`) with no `translateX(-50%)`
- Bug only appears when framer-motion is also animating at least one transform property on the same element; pure CSS elements are unaffected

## What Didn't Work

Keeping `style.transform` alongside framer-motion motion props. Framer-motion's `useTransform` pipeline builds a single `transform` string from its own `MotionValue` instances and writes it directly to the style attribute every frame, overwriting whatever was in `style.transform`.

## Solution

Move the centering offset into framer-motion's own `x` prop so it participates in framer-motion's composed transform string rather than competing with it.

```tsx
// BEFORE — style.transform is overwritten every frame
<motion.div
  initial={{ opacity: 0, scale: 0.85, y: -4 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.85, y: -4 }}
  style={{ left: "50%", transform: "translateX(-50%)" }}  // ← silently ignored
>

// AFTER — x participates in framer-motion's transform, left stays in style
<motion.div
  initial={{ opacity: 0, scale: 0.85, y: -4, x: "-50%" }}
  animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
  exit={{ opacity: 0, scale: 0.85, y: -4, x: "-50%" }}
  style={{ left: "50%" }}                                 // ← fine; not a transform prop
>
```

`x: "-50%"` is a valid framer-motion value (percentage strings are supported). Setting it identically in `initial`, `animate`, and `exit` keeps the centering offset constant across all animation phases.

## Why This Works

Framer-motion tracks `x`, `y`, `scale`, `rotate`, etc. as `MotionValue` instances and composes them into a single `transform` string on every animation frame via its `useTransform` pipeline. If you write to `style.transform` directly, that string is overwritten on the very next frame. By expressing the centering as `x: "-50%"`, the offset is owned and composed by framer-motion and survives every frame.

## Prevention

- **Rule:** On any `motion.*` element that animates transform-related props (`scale`, `y`, `x`, `rotate`, `skew`), never use `style.transform`. Express all transform-space positioning through framer-motion props.
- `style.transform` on a `motion.*` element that also uses any transform motion value is a code-smell worth flagging in review.
- If a static offset is needed (never changes during the animation), set it identically in `initial`, `animate`, and `exit`.

## Related Issues

- `docs/solutions/ui-bugs/animate-presence-boolean-toggle-no-retrigger.md` — different framer-motion failure mode (AnimatePresence key semantics), not related to transform conflict
- `docs/solutions/ui-bugs/boss-battle-hp-desynced-from-answer-flash.md` — framer-motion timing/state coupling issue, different root cause
