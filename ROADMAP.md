# KidKode Roadmap

## Tier 1: Make It Amazing (NOW)

### Experience & Feel
- [ ] **Player name setup** — first-run "Choose your hero name" screen, stored in profile, personalized throughout
- [ ] **Lesson timer** — visible countdown/elapsed timer during lessons, targeting 10-15 min per session
- [ ] **8-bit music & sound effects**
  - Dashboard: looping chiptune BGM
  - Lessons: ambient music that fades in/out between sections
  - SFX: correct answer ding, wrong answer buzz, level up fanfare, unlock celebration
  - Mute/volume toggle
- [ ] **Boss battle quiz UI** — quizzes are battles against a pixel-art boss creature (demon/centaur/medusa-style sprite with idle animation). Health bar that depletes as you answer correctly. Battle music.
- [ ] **Real animations** — actual sprite animations, not just framer-motion transitions. Idle loops, attack animations, damage shakes. CSS sprite sheets or canvas-based.
- [ ] **Drag-and-drop git branches** — interactive exercise where you visually build/merge a branch tree. Drag commits onto branches, merge branches together.

### Polish
- [ ] Mobile/tablet responsive
- [ ] Tighten lesson pacing and content based on playtesting

## Tier 2: More Lessons (NEXT)

- [ ] Git Branches deep-dive (with the drag-and-drop interactive)
- [ ] Terminal basics
- [ ] Client vs Server
- [ ] Databases
- [ ] Sync vs Async
- [ ] How to ask AI better questions

Goal: ~6-8 total lessons before expanding further.

## Tier 3: Real Gating & Tracking

- [ ] Database backend (SQLite or Supabase) replacing localStorage
- [ ] Parent dashboard — completion history, scores, streaks
- [ ] Real unlock mechanism — time-windowed or code-based
- [ ] Auth — multi-kid support

## Tier 4: Scale

- [ ] AI lesson generator — prompt template → lesson JSON → review → ship
- [ ] More exercise types — code sandbox, SQL playground, debugging challenges
- [ ] Full curriculum map (30+ lessons)
- [ ] Open to other families
