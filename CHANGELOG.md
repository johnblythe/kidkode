# Changelog

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
