---
title: "feat: 8-bit Music & Sound Effects System"
type: feat
date: 2026-03-04
issue: "#4"
brainstorm: docs/brainstorms/2026-03-04-audio-system-brainstorm.md
---

# 8-bit Music & Sound Effects System

## Overview

Add a hybrid audio system to KidKode: Web Audio API synthesized SFX for ~10 interactive sounds, and royalty-free chiptune MP3/OGG tracks for BGM. Music is always-on but subtle, crossfading contextually between dashboard, lessons, and battles. Mute/volume controls in the header bar.

## Proposed Solution

Three new files form the audio engine. A React context provider wraps the app in `layout.tsx`. Individual components call `useAudio()` to trigger SFX and BGM changes at specific interaction points.

No external audio libraries — Web Audio API for SFX, native `HTMLAudioElement` via `createMediaElementSource()` for BGM tracks with gain-node crossfading.

## Technical Approach

### New Files

#### `lib/audio/AudioManager.ts` — Singleton engine

- Lazy-initializes `AudioContext` on first user interaction (autoplay policy)
- `ctx.resume()` on every play call (mobile Safari)
- **SFX**: oscillator-based recipes (square/triangle waves, envelopes). Each sound is a function that creates short-lived oscillator → gain → destination chains
- **BGM**: two `Audio` elements (current + next) routed through `createMediaElementSource()` → gain nodes. Crossfade by ramping gains over 0.4s (matches existing framer-motion transition duration)
- **Volume**: master gain node. `setVolume(0-1)`, `mute()`, `unmute()`
- **State**: muted/volume persisted in localStorage as `kidkode:audio:muted` and `kidkode:audio:volume`

#### `lib/audio/sfx.ts` — SFX recipes

Each function takes an `AudioContext` and plays immediately:

| Function | Waveform | Notes |
|----------|----------|-------|
| `correctDing()` | Triangle, 880Hz→1320Hz | Quick ascending chime, 150ms |
| `wrongBuzz()` | Sawtooth, 200Hz | Low buzz with fast decay, 200ms |
| `levelUpJingle()` | Triangle, arpeggio C5→E5→G5→C6 | 4-note ascending, 400ms |
| `buttonClick()` | Square, 660Hz | Short blip, 50ms |
| `slideWhoosh()` | White noise, bandpass filter sweep | 200ms |
| `quizStartHorn()` | Square, 440Hz→660Hz | Two-tone fanfare, 300ms |
| `timerWarning()` | Triangle, 440Hz pulse x2 | Double beep, 200ms |
| `unlockCelebration()` | Triangle arpeggio + noise burst | Multi-voice, 600ms |

#### `lib/audio/AudioContext.tsx` — React context + provider

```tsx
"use client";
// AudioProvider wraps app in layout.tsx
// Exposes useAudio() hook: { sfx(name), playBGM(track), volume, setVolume, muted, toggleMute }
// First user interaction triggers AudioContext initialization
```

### Modified Files

#### `app/layout.tsx`
- Import `AudioProvider`, wrap `{children}`

#### `app/page.tsx` — Dashboard
- `useAudio().playBGM('dashboard')` when profile loads (~line 358)
- `sfx('button-click')` on lesson node click (~line 164)

#### `app/lesson/[slug]/page.tsx` — Lesson player
- `useEffect([currentSection])`: detect section type, crossfade BGM
  - `slides`/`reading`/`interactive` → `playBGM('lesson-ambient')`
  - `quiz` → `playBGM('battle')`
- `sfx('unlock-celebration')` before `setShowUnlock(true)` (~line 87)

#### `components/QuizSection.tsx`
- `sfx('correct-ding')` / `sfx('wrong-buzz')` in `handleSelect()` (~line 33)
- `sfx('quiz-start-horn')` on mount

#### `components/SlideViewer.tsx`
- `sfx('slide-whoosh')` in `goNext()` (~line 102)

#### `components/InteractiveExercise.tsx`
- `sfx('correct-ding')` / `sfx('wrong-buzz')` in `checkOrder()` (~line 50) and `submit()` (~line 220)

#### `components/UnlockScreen.tsx`
- `sfx('unlock-celebration')` + `playBGM('victory')` on mount

#### `components/HeroNameSetup.tsx`
- `sfx('level-up')` in `handleSubmit()` (~line 179) — this is the first user interaction, unlocks AudioContext

#### `components/LessonTimer.tsx`
- `sfx('timer-warning')` when `shouldPulse` first becomes true (use ref to avoid re-firing)

### Volume Control Component

New component in header bar, styled like `LessonTimer` pill:
- Speaker icon (🔊/🔇) — click to toggle mute
- Small volume slider on hover/click (optional for MVP, can be just mute toggle)
- Show in both dashboard header and lesson header

### BGM Tracks to Source

| Track | Context | Vibe | Duration |
|-------|---------|------|----------|
| `dashboard.mp3` | Quest map | Chill RPG town, loopable | ~60s loop |
| `lesson-ambient.mp3` | Slides/reading/interactive | Soft, explorative | ~90s loop |
| `battle.mp3` | Quiz section | Intense, driven | ~60s loop |
| `victory.mp3` | Unlock screen | Triumphant fanfare | ~15s, no loop |

Source from OpenGameArt.org or freesound.org. Store in `public/audio/bgm/`. Keep each <500KB.

## Implementation Phases

### Phase 1: Audio engine + SFX (can ship standalone)
1. Create `lib/audio/AudioManager.ts`
2. Create `lib/audio/sfx.ts` with all 8 synth recipes
3. Create `lib/audio/AudioContext.tsx` with provider + hook
4. Wrap app in `layout.tsx`
5. Wire SFX into all components (trigger points listed above)
6. Add mute toggle to dashboard header and lesson header

### Phase 2: BGM tracks
1. Source/download 4 royalty-free chiptune tracks
2. Add to `public/audio/bgm/`
3. Wire BGM transitions (dashboard → lesson → battle → victory)
4. Implement crossfade logic in AudioManager

### Phase 3: Polish
1. Tune SFX volumes relative to each other
2. Tune crossfade timing to match framer-motion transitions (0.4s)
3. Test autoplay policy on Safari, Chrome, Firefox
4. Test mobile (tab blur/resume)

## Acceptance Criteria

- [x] SFX play on correct/wrong answers, level up, button clicks, slide transitions, quiz start, timer warning, unlock
- [x] BGM loops on dashboard after first user interaction
- [x] BGM crossfades between dashboard → lesson ambient → battle → victory
- [x] Mute toggle in header, persisted across sessions
- [x] No autoplay violations (audio starts on first click/interaction)
- [x] Timer pauses audio check on tab blur (BGM pauses or continues, SFX don't fire)
- [x] All SFX are synthesized (no external audio files needed)
- [ ] BGM tracks < 500KB each (tracks not yet sourced — `public/audio/bgm/` ready)
- [x] Zero new npm dependencies

## Dependencies & Risks

- **Autoplay policy**: Must handle gracefully. AudioContext created on first interaction, `ctx.resume()` on every play
- **Mobile Safari**: Known AudioContext suspension issues. Fire-and-forget `ctx.resume()` pattern handles this
- **SSR**: AudioProvider must be `"use client"`. Layout stays server component. Guard all `window`/`AudioContext` references
- **BGM sourcing**: Need to find tracks that fit together. Risk of mismatched vibes. Mitigation: source from same artist/pack when possible

## References

- Brainstorm: `docs/brainstorms/2026-03-04-audio-system-brainstorm.md`
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- Existing pattern for localStorage: `lib/progress.ts`
- Existing animation timing: 0.4-0.5s transitions in all components
- GitHub issue: #4
