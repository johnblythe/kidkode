---
title: AnimatePresence Boolean Toggle Fails to Re-trigger
date: 2026-03-07
category: ui-bugs
tags: [react, framer-motion, animate-presence, animation, state-management]
module: BossBattleSection
symptoms:
  - Animation plays once but not on subsequent triggers
  - Boolean state set to same value is a no-op
  - AnimatePresence does not re-mount same element
root_cause: Boolean toggle produces no state change; AnimatePresence needs changing key
---

# AnimatePresence Boolean Toggle Fails to Re-trigger

## Problem

A floating "-1" damage indicator in the boss battle used a boolean state (`playerDamageShow`) to toggle visibility inside `AnimatePresence`. On consecutive wrong answers, setting `true` -> `true` was a no-op -- React didn't re-render, and AnimatePresence didn't re-mount the element, so the second damage indicator never appeared.

## Symptoms

- Damage number appears on first wrong answer, never again on subsequent wrong answers
- No errors in console
- Works if player gets a correct answer between wrong answers (resets boolean to `false`)

## Root Cause

`AnimatePresence` needs a **changing `key`** to re-trigger enter/exit animations for the same element type. A boolean toggle (`true` -> `true`) produces no state change and no new key:

```tsx
// BROKEN -- boolean toggle
const [show, setShow] = useState(false);

// First wrong answer: false -> true (works!)
// Second wrong answer: true -> true (no-op, nothing happens)
setShow(true);
setTimeout(() => setShow(false), 800); // reset for next time

<AnimatePresence>
  {show && <motion.span>-1</motion.span>}
</AnimatePresence>
```

If the user answers wrong twice quickly (before the 800ms reset), the second `setShow(true)` is identical to current state -- React skips the update entirely.

## Solution

Replace the boolean with a **counter**. Increment on each trigger, use the counter as the AnimatePresence `key`. The animation self-completes (animates to opacity: 0), so no manual reset or timeout is needed:

```tsx
// FIXED -- counter
const [count, setCount] = useState(0);

// Every call produces a new value, guaranteed re-render
setCount(c => c + 1);

<AnimatePresence>
  {count > 0 && (
    <motion.span
      key={count}  // forces re-mount on each increment
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -20 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      -1
    </motion.span>
  )}
</AnimatePresence>
```

## Key Insight

`AnimatePresence` tracks children by `key`. Same key = same element (no re-mount). New key = old element exits, new element enters. A counter guarantees a unique key on every trigger, while a boolean can only alternate between two values -- and consecutive identical values are invisible to React.

The counter approach also eliminates the `setTimeout` reset -- the animation's own `animate: { opacity: 0 }` handles cleanup. Fewer timers = fewer race conditions.

## Prevention

- Whenever using `AnimatePresence` for **repeatable** animations (damage numbers, toast notifications, flash effects), always use a counter or unique ID as the key -- never a boolean toggle.
- Boolean state is fine for **toggle** animations (sidebar open/close, modal show/hide) where consecutive identical values don't occur in normal usage.
- If you need multiple simultaneous animations (e.g., stacking damage numbers), use an array of items with unique IDs instead of a single counter.
