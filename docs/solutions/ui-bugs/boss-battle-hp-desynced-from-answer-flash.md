---
title: Boss Battle HP Desynced from Answer Flash
date: 2026-03-07
category: ui-bugs
tags: [react, framer-motion, state-management, animation-timing, game-ui]
module: BossBattleSection
symptoms:
  - HP bar shows stale value during answer feedback
  - Boss appears alive at victory screen
  - Visual desync between state and animation
root_cause: Game state updates coupled inside VFX timeout
---

# Boss Battle HP Desynced from Answer Flash

## Problem

In `BossBattleSection`, adding a 600ms "Correct!" answer flash before applying damage caused the HP bar to visually lag behind game state. On the final hit, the boss still showed 20HP when the victory screen triggered -- because `setBossHp()` was inside the same 600ms timeout as the VFX.

## Symptoms

- HP bar doesn't start animating until 600ms after answer feedback appears
- On the killing blow, boss HP reads 20 when victory screen fires
- Feels sluggish -- player answers correctly but nothing moves for 600ms

## Root Cause

State updates (`setBossHp`, `setPlayerHp`) were coupled with visual effects (`setSpriteState`, screen shake, hit explosion) inside a single `safeTimeout` callback. The HP bar -- driven by React state -- couldn't begin its CSS/Framer Motion transition until the timeout fired and state finally changed.

```tsx
// BEFORE -- state + VFX coupled in timeout
setAnswerFlash("correct");
safeTimeout(() => {
  const newBossHp = Math.max(0, bossHp - dmg);
  setBossHp(newBossHp);         // HP changes 600ms late
  setPlayerHp(newPlayerHp);     // same problem
  setSpriteState("damaged");    // VFX -- correct to delay
  advanceOrEnd(newBossHp, playerHp);
}, 600);
```

The HP bar animates via Framer Motion's `animate={{ width }}` -- it reacts to state. Delaying the state change delays the animation start, so the bar sits frozen while "Correct!" shows.

## Solution

Separate state updates from VFX. Apply HP changes immediately (outside the timeout) so the bar starts animating in sync with the answer flash. Keep VFX inside the timeout so sprites/shakes play after the flash.

```tsx
// AFTER -- state immediate, VFX delayed
setAnswerFlash("correct");

// State updates immediately -- HP bar starts animating now
const newBossHp = Math.max(0, bossHp - dmg);
setBossHp(newBossHp);
setPlayerHp(newPlayerHp);

// VFX and progression delayed -- cosmetic timing only
safeTimeout(() => {
  setSpriteState("damaged");
  advanceOrEnd(newBossHp, playerHp);
}, 600);
```

Now the HP bar animates during the 600ms flash, and by the time VFX fires, the bar has already reached (or is near) its target value. On the killing blow, HP reads 0 before the victory screen triggers.

## Key Insight

In game-like UIs, **state** and **VFX** serve different purposes and should update on different timelines:

- **State** (HP, score, mana) drives reactive UI elements (bars, counters). Update immediately so transitions start instantly.
- **VFX** (sprites, particles, screen shake) is cosmetic feedback. Safe to delay for dramatic timing.

Coupling them in the same callback forces the UI to wait for cosmetic timing, creating a perceived lag.

## Prevention

- When adding animation delays to game UIs, ask: "Is this delaying data or decoration?" Data changes should be immediate; decoration can be delayed.
- If a Framer Motion / CSS transition depends on React state, that state must update at the moment you want the transition to **begin**, not end.
- Test the final-hit case explicitly -- it's the most visible desync because victory/defeat screens make the stale value obvious.
