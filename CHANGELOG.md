# Changelog

## [0.5.1] - 2026-03-06

### Changed
- Boss battle: "Study Up!" → "Review & Retry" with subtitle explaining it returns to lesson material (#14)
- Boss victory: differentiate "BOSS DEFEATED!" (boss killed) vs "QUEST PASSED!" (survived with score) (#14)
- Boss battle: added answer flash feedback ("Correct! Your attack lands!" / "Wrong! The boss strikes back!") before damage resolves (#14)
- Boss battle: added floating "-1" damage indicator on player HP when boss counterattacks (#14)
- Interactive multiple-choice: wrong answer now explicitly shows the correct answer text instead of "highlighted in green" (#14)
- Slide nav dots: increased from 12px → 14px with larger 18px touch padding and hover states (#14)
- Typewriter slide animation: click-to-skip so kids aren't stuck waiting (#14)
- Reading section: increased max-height from 60vh → 70vh for less cramped scrolling (#14)

## [0.5.0] - 2026-03-05

### Added
- Canvas particle system replacing 120+ framer-motion particle divs (#12)
- `useCanvas` hook for reusable canvas-based animations (#12)
- `useReducedMotion` hook with prefers-reduced-motion support across all animated components (#12)
- Swoosh and page-flip slide transition types (#12)
- Scroll-triggered reading reveals with IntersectionObserver (#12)
- Dashboard torch flame effect on quest nodes (#12)
- Canvas particles and slide transitions playground pages (#12)

### Changed
- Replaced framer-motion drag with @dnd-kit/core for drag-drop exercises (#12)
- Extracted shared `animationVariants` to `lib/slide-variants.ts` — removes duplication between SlideViewer and playground (#12)
- Extracted shared `inlineFormat` to `lib/markdown-utils.tsx` — removes duplication between SlideViewer and ReadingSection (#12)
- Refactored `InteractiveStep` to discriminated union — eliminates unsafe `as unknown as` casts (#12)
- Memoized `renderMarkdown` in ReadingSection to avoid re-parsing on scroll (#12)

### Fixed
- Canvas resize DPR bug — simplified to skip DPR scaling (#12)
- `cancelAnimationFrame` cleanup missing in UnlockScreen XPCounter (#12)
- `DEFAULT_PROFILE` singleton mutation in `lib/progress.ts` — fallback returns now spread (#12)
- Unsafe `as number` cast and fragile string ID parsing in DragDropStep — replaced with type guards (#12)
- `resolveColor` fallthrough passing raw strings to inline styles — added hex validation (#12)
- Removed dead `initialized` state guard in CanvasParticles (#12)

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
