# Changelog

All notable changes to KidKode will be documented here.

## [Unreleased]

## [0.8.0] - 2026-03-09

### Added
- Supabase backend: `users`, `character_stats`, `lesson_progress`, `xp_transactions` tables (#21, closes #21)
- SQL migrations: `001_init.sql` (schema + indexes), `002_functions.sql` (`award_xp` RPC), `003_create_child.sql` (`create_child` atomic RPC) (#21)
- Email-as-identity auth: enter email → DB lookup → localStorage session (no passwords, no JWT) (#22, closes #22)
- `/login` page — email entry, redirects to onboarding for new users or dashboard for returning (#22)
- `/onboard` page — hero name, class picker, role toggle (kid / parent) (#22)
- Parent dashboard `/parent` — list children, add child form, navigate to child detail (#23, closes #23)
- Child detail `/parent/[childId]` — lesson progress breakdown, force-unlock next lesson button (#23)
- `useActiveUser` hook — reads `kidkode:activeUserId`/`kidkode:activeEmail` from localStorage with SSR hydration safety (#22)
- `lib/supabase.ts` — service-role Supabase client with `server-only` build-time guard (#21)
- `lib/progress-client.ts` — client-side localStorage helpers with `STORAGE_KEYS` constants (#22)
- `app/actions/users.ts` — Server Actions: `lookupUser`, `createUser`, `createChild`, `listChildren`, `forceUnlockLesson` (#21, #22, #23)
- `app/actions/progress.ts` — re-exports `getProfile`, `updateLessonProgress`, `completeLesson`, `loadDashboard` as Server Actions (#21)

### Changed
- `lib/progress.ts` fully rewritten as async Supabase-backed server module; removed `"use client"` (#21)
- `lib/types.ts`: `LessonProgress.status` `"in-progress"` → `"in_progress"`, added `PlayerProfile.id/email/heroClass/role`, new types `UserSession`, `LookupResult`, `LessonCompletionResult`, `LessonProgressPatch`, `HeroClass` (#21)
- `app/page.tsx` dashboard: replaced localStorage gate with `useActiveUser` + `loadDashboard(userId)` Server Action, added Sign Out button, parent dashboard link (#22, #23)
- `app/lesson/[slug]/page.tsx`: replaced sync localStorage calls with async Server Actions via `useTransition` (#21)

### Removed
- `HeroNameSetup` component — replaced by `/onboard` flow (#22)

## [0.7.0] - 2026-03-07

### Added
- Lesson 3: Terminal Basics — `pwd`/`ls`/`cd`/`mkdir`/`touch`/`rm` with Permission Denied Golem boss (#31, closes #16)
- Lesson 4: Client vs. Server — request/response cycle, HTTP verbs, status codes with The 404 Phantom boss (#31, closes #17)
- Lesson 5: Databases — CRUD, SQL basics, tables with The Null Pointer boss (#31, closes #18)
- Lesson 6: Sync vs. Async — blocking, promises, async/await with Callback Serpent boss (#31, closes #19)
- Lesson 7: Asking AI — CRISP framework, prompt engineering, hallucinations with Hallucination Phantom boss (#31, closes #20)
- `TypeCommandStep` component — fake terminal UI for command-line exercises (#31)
- `FillBlankStep` component — inline code blanks with per-blank validation (#31)
- Five new SVG boss sprites: PermissionDeniedGolem, The404Phantom, TheNullPointer, CallbackSerpent, HallucinationPhantom (#31)

### Changed
- Refined `TypeCommandInteractiveStep` and `FillBlankInteractiveStep` type interfaces with proper typed `data`/`solution` fields (#31)
- `InteractiveExercise` `renderStep()` handles all 5 step types with exhaustive switch (#31)

## [0.6.2] - 2026-03-07

### Changed
- Boss battle: added 600ms answer flash feedback ("Correct! Your attack lands!" / "Wrong! The boss strikes back!") before damage resolves (#30, closes #14)
- Boss battle: floating "-1" damage indicator on player HP when boss counterattacks (#30)
- Boss victory text: "BOSS DEFEATED!" when boss HP hits 0, "QUEST PASSED!" when player survives with score (#30)
- "Study Up!" button renamed to "Review & Retry" with subtitle "Go back to the lesson material, then try again" (#30)
- Wrong-answer feedback now explicitly shows "The correct answer is: [text]" instead of relying on green highlight (#30)
- Typewriter slide animation: click animating text to skip to full content (#30)
- Slide nav dots: 12px → 14px with 18px tap padding and hover states (#30)
- Reading section max-height: 60vh → 70vh (#30)

## [0.6.1] - 2026-03-06

### Changed
- Tailwind-only responsive pass across 10 components — mobile-first breakpoints, no structural/JS changes (#29, closes #13)
- Dashboard stats grid: `grid-cols-3` → `grid-cols-1 sm:grid-cols-3` (#29)
- Boss sprites: `w-64` → `w-32 sm:w-48 md:w-64` (#29)
- Lesson header progress dots: `w-8` → `w-6 sm:w-8`, connectors `w-4` → `w-2 sm:w-4` (#29)
- SlideViewer, ReadingSection, InteractiveExercise, DragDropStep, HeroNameSetup, DraggableItem: responsive padding/font/gap sizing (#29)
- MergeConflictHydra: base sprite `w-32 h-32` for mobile (#29)

## [0.6.0] - 2026-03-05

### Added
- Canvas particle system replacing 120+ framer-motion particle divs (#12)
- `useCanvas` hook for reusable canvas-based animations (#12)
- `useReducedMotion` hook with `prefers-reduced-motion` support across all animated components (#12)
- Swoosh and page-flip slide transition types (#12)
- Scroll-triggered reading section reveals with `IntersectionObserver` (#12)
- Dashboard torch flame effect on quest nodes (#12)
- Canvas particles and slide transitions playground pages (#12)

### Changed
- Replaced framer-motion drag with `@dnd-kit/core` for drag-drop exercises (#12)
- Extracted shared `animationVariants` to `lib/slide-variants.ts` (#12)
- Extracted shared `inlineFormat` to `lib/markdown-utils.tsx` (#12)
- Refactored `InteractiveStep` to discriminated union — eliminates unsafe `as unknown as` casts (#12)
- Memoized `renderMarkdown` in ReadingSection (#12)

### Fixed
- Canvas resize DPR bug — simplified to skip DPR scaling (#12)
- Missing `cancelAnimationFrame` cleanup in UnlockScreen XPCounter (#12)
- `DEFAULT_PROFILE` singleton mutation in `lib/progress.ts` — fallback returns now spread (#12)
- Unsafe `as number` cast and fragile string ID parsing in DragDropStep — replaced with type guards (#12)
- `resolveColor` fallthrough passing raw strings to inline styles — added hex validation (#12)
- Removed dead `initialized` state guard in CanvasParticles (#12)

## [0.5.0] - 2026-03-06

### Added
- Lesson 2: "Git Branches: Parallel Universes" — slides, reading, 4 interactive drag-drop scenarios, quiz (#11, closes #6)
- `GitBranchTree` SVG component — animated commit nodes, branch lines, forks, and merges with Framer Motion (#11)
- `DragDropStep` — palette-based drag interaction with hit detection, merge conflict teaching modal, and keyboard alternative (Tab → Enter → click) (#11)
- Observation-only step support in DragDropStep (shows Continue instead of empty palette) (#11)
- Branch Tree playground page at `/playground/branch-tree` (#11)
- `lib/git-branch-types.ts` — shared types for branch tree and drag-drop scenario data (#11)

## [0.4.0] - 2026-03-05

### Added
- Boss Battle Quiz System — lessons with `boss` data render as RPG boss fights instead of standard quiz (#10, closes #5)
- `BossBattleSection` component with full state machine: intro → battle → victory/defeat (#10)
- Merge Conflict Hydra SVG boss sprite with idle bob, damage shake, attack lunge, and death animations (#10)
- Boss HP bar with animated damage depletion and floating damage numbers (#10)
- Player HP hearts system — wrong answers trigger boss counterattack and lose a heart (#10)
- Screen shake on boss attacks (#10)
- "Study Up" defeat flow — shows missed questions, navigates back to lesson slides (#10)
- Boss sprite registry at `components/bosses/index.ts` (#10)
- `BossData` type and optional `Lesson.boss` field (#10)
- Battle CSS keyframes: `boss-idle-bob`, `damage-shake`, `attack-lunge`, `death-fade`, `float-up-damage`, `screen-shake` (#10)

### Changed
- Extracted duplicated `correctAnswer` logic into `lib/quiz-utils.ts` shared by BossBattleSection and QuizSection (#10)
- Extracted duplicated noise buffer generation in `sfx.ts` into `noiseSource()` helper (#10)
- Shared `BossSpriteState` type from `bosses/index.ts` instead of duplicating (#10)

### Fixed
- `correctAnswer` resolution silently producing -1 for true/false questions — added `["True","False"]` fallback in `resolveCorrectIndex()` (#10)
- SFX bypassing master volume — all SFX now route through `masterGain` node (#10)
- CSS and Framer Motion fighting over death animation in MergeConflictHydra — CSS `boss-dead` class removed (#10)
- Missing boss sprite now shows fallback placeholder instead of rendering invisible (#10)
- Triple non-null assertions in playground page replaced with descriptive error guards (#10)
- Removed unused `DamageNumber.x` prop, `.hp-bar-player` CSS, and `death-fade` keyframe (#10)

## [0.3.0] - 2026-03-04

### Added
- 8-bit SFX system via Web Audio API — procedural sound generation, no audio files required (#9)
- Sound effects for: correct/wrong answers, level up, quiz pass/fail, XP gain, button clicks, page transitions (#9)
- Background music infrastructure with `AudioManager` and BGM context provider (#9)
- Volume toggle with mute/unmute, persisted via `localStorage` (#9)
- Audio integrated across all interactive components: quiz, exercises, unlock screen, lesson timer, hero setup (#9)
- Reset progress button on dashboard (#9)

### Fixed
- BGM file 404 errors resolved with `.gitkeep` placeholder (#9)

## [0.2.0] - 2026-03-04

### Added
- Hero name setup screen on first visit — character class picker, name input, celebration animation (#8, closes #2)
- Lesson timer HUD in lesson header — elapsed/target time with green → yellow → red color progression (#8, closes #3)
- `ROADMAP.md` with tier 1–4 feature plan (#8)

### Fixed
- Unicode escapes (`\u2192`) rendering as literal text in all button labels (#8)

## [0.1.0] - 2026-03-04

### Added
- Initial prototype: RPG-themed coding tutorial app for kids (#1)
- Lesson engine: slides, reading section, interactive exercises, quiz gating (#1)
- Lesson 1: "Git: Save Points for Your Code" (#1)
- Quest map dashboard with XP bar, level system, and streak tracking (#1)
- Slide viewer with 5 animation types: fade, slide, typewriter, pop (#1)
- Reading section with markdown rendering and scroll progress (#1)
- Interactive exercises: sequence ordering and multiple choice (#1)
- Quiz system with pass/fail gating and answer explanations (#1)
- Unlock screen with particle effects and XP celebration (#1)
- Daily lesson unlock gating (#1)
- Progress persistence via `localStorage` (#1)
- RPG aesthetic: pixel font headings, dungeon grid background, gold/purple/green theme, glow effects (#1)
