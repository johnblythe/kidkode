# Changelog

## [0.4.0] - 2026-03-04

### Added
- Interactive drag-and-drop git branch visualization exercise (#6)
- GitBranchTree SVG component — renders commits, branches, forks, and merges with animated paths
- DragDropStep component — palette-based drag-and-drop with hit detection, keyboard alternative, and merge conflict modal
- Lesson 2: "Git Branches: Parallel Universes" — slides, reading section, 4 interactive drag-drop scenarios, quiz (#6)
- Branch Tree playground page for isolated component testing
- Observation-only step support in DragDropStep (Continue button when no draggable items)
- `lib/git-branch-types.ts` — shared types for branch tree and drag-drop scenario data

## [0.3.0] - 2026-03-04

### Fixed
- correctAnswer resolution silently producing -1 for true-false questions — shared `resolveCorrectIndex()` helper with `["True","False"]` fallback (#10)
- SFX bypassing master volume — all SFX now route through masterGain node (#10)
- CSS and framer-motion fighting over death animation in MergeConflictHydra — CSS `boss-dead` class removed, framer-motion is sole owner (#10)
- Triple non-null assertions in playground page replaced with descriptive error guards (#10)
- Missing boss sprite silently rendering invisible boss — now shows fallback placeholder (#10)

### Changed
- Extracted duplicated `correctAnswer` logic from BossBattleSection and QuizSection into `lib/quiz-utils.ts` (#10)
- Extracted duplicated noise buffer generation in sfx.ts into `noiseSource()` helper (#10)
- Shared `BossSpriteState` type from `bosses/index.ts` instead of duplicating (#10)
- Removed unused `DamageNumber.x` prop, `.hp-bar-player` CSS, `death-fade` keyframe (#10)

### Added
- Boss battle quiz system — quizzes with boss data render as RPG boss fights (#5)
- BossBattleSection component with full battle state machine (intro, battle, victory, defeat phases)
- Merge Conflict Hydra SVG boss sprite with idle bob, damage shake, attack lunge, and death animations
- Boss sprite registry for future boss additions
- Player HP hearts system with boss counterattack on wrong answers
- Boss HP bar with animated damage depletion and floating damage numbers
- Screen shake effect on boss attacks
- "Study Up" defeat flow — shows missed questions and navigates back to lesson slides
- Battle CSS keyframes: boss-idle-bob, damage-shake, attack-lunge, death-fade, float-up-damage, screen-shake
- BossData type and Lesson.boss optional field
- Boss data for Git lesson: Merge Conflict Hydra with git-themed attack names

## [0.2.0] - 2026-03-04

### Added
- 8-bit SFX system using Web Audio API with procedural sound generation (no audio files needed)
- Sound effects for: correct/wrong answers, level up, quiz pass/fail, XP gain, button clicks, page transitions
- Background music infrastructure with AudioManager and BGM context provider
- Volume toggle component with mute/unmute and localStorage persistence
- Audio integration across all interactive components (quiz, exercises, unlock screen, timer, hero setup)
- Brainstorm and plan docs for audio system and boss battle features
- Reset progress button on dashboard

### Fixed
- BGM file 404 errors resolved with .gitkeep placeholder

## [0.1.0] - 2026-03-03

### Added
- RPG-themed lesson engine with slides, reading, interactive exercises, and quiz sections
- First lesson: "Git: Save Points for Your Code" covering commits, branches, and workflows
- Dashboard with quest map progression, XP bar, level system, and streak tracking
- Slide viewer with 5 animation types (fade, slide, typewriter, pop)
- Reading section with markdown rendering and scroll progress
- Interactive exercises: sequence ordering and multiple choice
- Quiz system with pass/fail gating and explanations
- Unlock screen with particle effects and XP celebration
- Daily lesson-to-unlock gating (honor system for MVP)
- Progress persistence via localStorage
- RPG aesthetic: pixel font headings, dungeon grid background, gold/purple/green theme, glow effects
