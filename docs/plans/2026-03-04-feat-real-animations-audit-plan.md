---
title: "feat: Real animations audit — sprites, CSS keyframes, canvas effects"
type: feat
date: 2026-03-04
issue: 7
---

# Real Animations Audit — Sprites, CSS Keyframes, Canvas Effects

## Overview

Polish pass across the app to upgrade animation quality. Replace framer-motion particle divs (120+ animated DOM elements) with canvas, add dynamic slide transitions, scroll-triggered reading reveals, and — critically — add `prefers-reduced-motion` support (currently zero handling).

Sprite sheets deferred — blocked on art assets. Focus on what code can improve today.

## Current Animation Inventory

| Surface | Technique | Element Count | Issue |
|---|---|---|---|
| HeroNameSetup stars | 50 framer-motion divs, infinite | 50 | Perf risk, no reduced-motion |
| HeroNameSetup flourish | 40 framer-motion divs | 40 | One-shot but heavy |
| UnlockScreen particles | 30 framer-motion divs | 30 | Should be canvas |
| BossBattle HitExplosion | 8 framer-motion divs + CSS flash | 8 | Fine — keep |
| Dashboard | 1 CSS float, 1 CSS pulse-glow | 2 | Sparse |
| SlideViewer | 5 framer-motion variant sets | N/A | All opacity+translate |
| ReadingSection | Static render | 0 | No scroll reveals |
| InteractiveExercise | framer-motion layout + hover | N/A | No attention animation |
| CSS keyframes | 10 defined | N/A | No reduced-motion override |

## Implementation Phases

### Phase 1: prefers-reduced-motion (table stakes)

**Files:**
- Create `lib/hooks/useReducedMotion.ts` — wraps `window.matchMedia('(prefers-reduced-motion: reduce)')` with SSR safety + listener for live changes
- Update `app/globals.css` — add `@media (prefers-reduced-motion: reduce)` block that sets `animation: none !important` on all keyframe classes (`.boss-idle`, `.float`, `.pulse-available`, `.streak-fire`, etc.)
- Update `components/UnlockScreen.tsx` — skip particle spawn when reduced motion
- Update `components/HeroNameSetup.tsx` — skip star field + flourish burst when reduced motion
- Update `components/BossBattleSection.tsx` — skip HitExplosion when reduced motion

**Reduced motion behavior:** Functional transitions (slide-to-slide, question advance) become instant crossfades. Looping decorative animations disabled entirely. One-shot feedback (correct/wrong) uses opacity only. Canvas particles not spawned.

### Phase 2: Canvas Particle System

**Files:**
- Create `components/CanvasParticles.tsx` — reusable canvas component
  - Props: `effect: "confetti" | "sparkle" | "stars"`, `count`, `trigger`, `loop`
  - Internal `requestAnimationFrame` loop
  - `document.visibilitychange` → pause/resume (follow LessonTimer pattern)
  - Cleanup on unmount (cancel rAF, clear particle array)
  - Respects `useReducedMotion` — renders nothing when true
  - Particle budget: max 150 for celebrations, max 50 for ambient
- Create `lib/hooks/useCanvas.ts` — shared hook for canvas lifecycle (rAF loop, visibility, cleanup)
- Update `components/UnlockScreen.tsx`:
  - Replace 30 framer-motion `Particle` divs with `<CanvasParticles effect="confetti" count={120} trigger="mount" />`
  - Keep XPCounter (rAF-based, works fine), radial rings (framer-motion, 2 elements)
  - Keep text animations (framer-motion, functional)
- Update `components/HeroNameSetup.tsx`:
  - Replace 50 star divs with `<CanvasParticles effect="stars" count={50} loop />`
  - Replace 40 flourish particles with `<CanvasParticles effect="confetti" count={40} trigger="submit" />`

**Net result:** ~120 animated DOM elements → 2-3 canvas elements. Major perf win.

### Phase 3: Slide Transitions + Reading Reveals

**Files:**
- Update `components/SlideViewer.tsx` (lines 14-40):
  - Add `"swoosh"` variant: slide-left + scale(0.95→1.0) + faster spring (stiffness: 300)
  - Add `"page-flip"` variant: 3D perspective rotateY(-90°→0°) with `perspective: 1200px`
  - Both degrade to simple fade when reduced motion active
- Update `lib/types.ts` line 9: extend `SlideFrame.animation` union with `"swoosh" | "page-flip"`
- Update `components/ReadingSection.tsx`:
  - Wrap each rendered block in `motion.div` with `whileInView={{ opacity: 1, y: 0 }}` + `initial={{ opacity: 0, y: 20 }}`
  - `viewport={{ once: true, amount: 0.15 }}` — one-way reveals, 15% threshold
  - Skip wrapping when reduced motion active (render statically)
  - Scroll progress tracking unaffected (stays on outer container)

### Phase 4: Dashboard + Interactive Polish

**Files:**
- Update `app/page.tsx`:
  - Replace emoji avatar with a small SVG character (reuse boss sprite registry pattern or simple inline SVG)
  - Add CSS `@keyframes torch-flicker` for quest node decorations (scale + opacity on a small flame emoji/SVG)
  - Keep particle sparkles out of MVP — risk of over-animating the most-visited page
- Update `components/InteractiveExercise.tsx`:
  - Add entrance spring animation on available items: `initial={{ scale: 0.9, opacity: 0 }}` → `animate={{ scale: 1, opacity: 1 }}` with stagger delay
  - One-shot attention bounce, not looping jiggle (less distracting for kids)
- Update `app/globals.css`:
  - Add `@keyframes torch-flicker` (0.8s infinite, subtle scale 0.95-1.05 + opacity 0.7-1.0)
  - Add `.torch-flame` utility class

### Phase 5: Playground + Regression Safety

**Files:**
- Update `app/playground/page.tsx` — add links to new playground pages
- Create `app/playground/particles/page.tsx` — canvas particle demo (confetti, sparkle, stars) with controls for count/speed/reduced-motion toggle
- Create `app/playground/transitions/page.tsx` — all 7 slide transition types side-by-side

## Acceptance Criteria

- [x] `prefers-reduced-motion: reduce` disables all CSS keyframe loops
- [x] `useReducedMotion()` hook available and used by particle-heavy components
- [x] UnlockScreen uses canvas confetti instead of 30 framer-motion divs
- [x] HeroNameSetup uses canvas stars + flourish instead of 90 framer-motion divs
- [x] Canvas pauses on tab hidden, cleans up on unmount
- [x] Canvas skipped entirely when reduced motion active
- [x] "Swoosh" and "page-flip" slide transitions implemented
- [x] Reading section has scroll-triggered reveals (one-way, 15% threshold)
- [x] Interactive items have entrance spring animation
- [x] Dashboard has subtle torch/flame on available quest nodes
- [x] Playground pages exist for particles and transitions
- [ ] 60fps on modern hardware (spot-check with Chrome DevTools)
- [x] `tsc --noEmit` + `next build` pass
- [ ] No visual regressions in boss battle (CSS/framer-motion split unchanged)

## What's Deferred

- **Sprite sheets** — blocked on art assets. No PNG/JSON atlas pipeline exists. Follow-up issue.
- **Victory character pose** — needs `characterClass` persisted to `PlayerProfile` + art. Follow-up.
- **Dashboard sparkle particles** — risk of over-animating. Evaluate after canvas system lands.
- **In-app animation toggle** — nice-to-have beyond OS-level reduced motion. Follow-up.
- **Performance monitoring framework** — PerformanceObserver / dropped-frame detection. Follow-up.

## Technical Considerations

- **Canvas vs framer-motion ownership rule:** Canvas for particle effects (>10 elements). framer-motion for layout transitions, state changes, and small bursts (≤8 elements like HitExplosion). CSS keyframes for continuous loops (idle, float, torch).
- **No new deps.** Canvas API is built-in. `IntersectionObserver` is built-in. framer-motion v12 has `whileInView`.
- **HeroNameSetup star migration.** Current stars use deterministic positions seeded from index. Canvas version should seed from same math to maintain visual feel.
- **Audio sync.** SFX triggers stay in component code (not tied to canvas). Animation timing changes don't affect audio.

## Open Questions

1. **Particle density on mobile.** Should canvas effects auto-reduce count on small viewports? Leaning yes — halve count below 768px.
2. **Should existing lesson 1 slides get new transition types?** Leaning no for this PR — add types but only use in new content.

## References

- Current keyframes: `app/globals.css:286-351`
- UnlockScreen particles: `components/UnlockScreen.tsx:14-37`
- HeroNameSetup stars: `components/HeroNameSetup.tsx:29-53`
- SlideViewer variants: `components/SlideViewer.tsx:14-40`
- ReadingSection render: `components/ReadingSection.tsx:202-237`
- LessonTimer visibility: `components/LessonTimer.tsx:82-101` (pattern to follow)
- Boss sprite animation split: `components/bosses/MergeConflictHydra.tsx` (CSS for loops, framer for death)
- Playground: `app/playground/page.tsx`
