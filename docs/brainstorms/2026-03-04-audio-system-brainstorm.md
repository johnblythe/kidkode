---
date: 2026-03-04
topic: audio-system
issue: "#4"
---

# 8-bit Music & SFX System

## What We're Building
Hybrid audio system — Web Audio API for synthesized SFX (~10-12 sounds), sourced royalty-free chiptune tracks for BGM. Music is always-on but subtle, fading contextually between sections. Volume controls in the header bar.

## Why This Approach
- **Hybrid**: SFX are simple waveforms that sound more authentically 8-bit when synthesized. BGM needs actual composition — faster to source than build.
- **Always-on but subtle**: Establishes RPG atmosphere without being annoying by day 5. Fades during reading, picks up during quiz/battle.
- **Medium SFX coverage**: ~10-12 sounds. Big moments + navigational feedback. Not every interaction.

## Key Decisions
- **SFX via Web Audio API**: Zero external assets, authentic chiptune feel, instant playback
- **BGM via royalty-free tracks**: OpenGameArt/freesound, MP3/OGG, <500KB per track
- **Controls in header bar**: Mute toggle + volume, persisted in localStorage
- **Contextual fading**: Dashboard BGM → lesson ambient → battle music, crossfade on transitions
- **Autoplay policy**: Music starts on first user interaction, not page load
- **Future-proofed for full soundtrack**: Architecture supports per-lesson track mapping

## Audio Inventory

### Tracks (sourced)
| Track | Vibe | Context |
|-------|------|---------|
| Dashboard BGM | Chill RPG town | Dashboard/quest map |
| Lesson ambient | Softer, explorative | Slides/reading sections |
| Battle music | Intense, driven | Quiz/boss battle |
| Victory fanfare | Triumphant, short | Unlock screen |

### SFX (synthesized via Web Audio API)
| Sound | Trigger |
|-------|---------|
| Correct answer ding | Quiz/interactive correct |
| Wrong answer buzz | Quiz/interactive wrong |
| Level up jingle | XP causes level increase |
| Button click | Menu/navigation clicks |
| Slide transition whoosh | Advancing slides |
| Quiz start horn | Entering quiz section |
| Timer warning pulse | Timer hits 80% of target |
| Unlock celebration | Unlock screen appears |

## Architecture Notes
- Global AudioManager context/provider wrapping the app
- Singleton AudioContext, lazy-initialized on first interaction
- Track crossfading via gain node transitions
- SFX as reusable oscillator patterns
- Volume state in localStorage, exposed via React context

## Next Steps
→ Plan implementation, source BGM tracks, build AudioManager
