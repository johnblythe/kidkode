# KidKode Roadmap

## Tier 1: Make It Amazing (NOW)

### Experience & Feel
- [x] **Player name setup** — first-run "Choose your hero name" screen, stored in profile, personalized throughout (#8)
- [x] **Lesson timer** — visible countdown/elapsed timer during lessons, targeting 10-15 min per session (#8)
- [x] **8-bit music & sound effects** (#4, #9)
  - Dashboard: looping chiptune BGM
  - Lessons: ambient music that fades in/out between sections
  - SFX: correct answer ding, wrong answer buzz, level up fanfare, unlock celebration
  - Mute/volume toggle
- [x] **Boss battle quiz UI** — quizzes are battles against a pixel-art boss creature. Health bar that depletes as you answer correctly. Battle music. (#5, #10)
- [x] **Real animations** — canvas particle system, prefers-reduced-motion, swoosh/page-flip transitions, scroll-triggered reveals (#7, #12)
- [x] **Drag-and-drop git branches** — interactive exercise where you visually build/merge a branch tree. Drag commits onto branches, merge branches together. (#6, #11)

### Polish
- [ ] Mobile/tablet responsive (#13)
- [ ] Tighten lesson pacing and content based on playtesting (#14)
- [ ] Visual QA pass — verify particles, transitions, drag-drop end-to-end (#15)

## Tier 2: More Lessons (NEXT)

- [x] Git Branches deep-dive (with the drag-and-drop interactive) (#6, #11)
- [ ] Terminal basics (#16)
- [ ] Client vs Server (#17)
- [ ] Databases (#18)
- [ ] Sync vs Async (#19)
- [ ] How to ask AI better questions (#20)

Goal: ~8 total lessons before expanding further.

## Tier 3: Real Gating & Tracking

- [ ] Database backend (SQLite or Supabase) replacing localStorage (#21)
- [ ] Parent dashboard — completion history, scores, streaks (#22)
- [ ] Auth — multi-kid support (#23)
- [ ] Real unlock mechanism — time-windowed or code-based (#24)

## Tier 4: Scale

- [ ] AI lesson generator — prompt template → lesson JSON → review → ship (#25)
- [ ] More exercise types — code sandbox, SQL playground, debugging challenges (#26)
- [ ] Full curriculum map (30+ lessons) (#27)
- [ ] Open to other families (#28)
