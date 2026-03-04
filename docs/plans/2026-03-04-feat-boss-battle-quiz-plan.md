---
title: "feat: Boss Battle Quiz UI"
type: feat
date: 2026-03-04
issue: "#5"
brainstorm: docs/brainstorms/2026-03-04-boss-battle-brainstorm.md
depends_on: "#4"
---

# Boss Battle Quiz UI

## Overview

Transform the quiz section into an RPG boss battle. Each lesson has a unique code-themed boss monster. Quiz answers are styled as attack moves — correct = effective spell that damages boss, wrong = fizzle that lets boss counterattack. Both player and boss have HP bars. Player death triggers a "Study Up" review flow that sends them back to earlier lesson sections.

## Problem Statement

The current quiz (`QuizSection.tsx`) is functional but feels like a school test. For a 12-year-old, quizzes should feel like boss fights. The battle framing transforms "answer questions" into "choose attacks" and adds real stakes (player HP, retry on death).

## Proposed Solution

New `BossBattleSection` component replaces `QuizSection` when a lesson has boss data. The existing `QuizSection` stays as fallback for lessons without bosses. Boss metadata lives on the `Lesson` type. SVG sprites for boss creatures, CSS keyframes for battle animations.

## Technical Approach

### Type Extensions

**`lib/types.ts`** — add:

```ts
export interface BossData {
  name: string;              // "Merge Conflict Hydra"
  description: string;       // flavor text
  sprite: string;            // component key for SVG registry
  maxHp: number;             // e.g. 100
  playerMaxHp: number;       // e.g. 3 (hits before death)
  damagePerCorrect: number;  // % of boss HP per correct answer
  attackNames: string[];     // flavor text for boss counterattacks
  defeatText: string;        // shown on boss death
}
```

Add to `Lesson`:
```ts
export interface Lesson {
  // ... existing fields
  boss?: BossData;
}
```

### New Files

#### `components/BossBattleSection.tsx` — Main battle component

Props:
```ts
interface BossBattleProps {
  section: QuizSection;
  boss: BossData;
  onComplete: (score: number) => void;
  onStudyUp: (sectionIndex: number) => void;
}
```

State:
- `bossHp: number` — starts at `boss.maxHp`, decreases on correct answers
- `playerHp: number` — starts at `boss.playerMaxHp`, decreases on wrong answers
- `currentQ: number` — question index
- `phase: "intro" | "battle" | "victory" | "defeat"` — battle state machine
- `lastAction: "idle" | "player-attack" | "boss-attack" | "player-fizzle"` — drives animations

Layout (split screen):
```
┌──────────────────────────────────┐
│  [Boss Name]     [Boss HP Bar]   │
│         ┌─────────────┐          │
│         │  BOSS SPRITE │          │
│         │  (idle bob)  │          │
│         └─────────────┘          │
│                                  │
│  ── Question ──────────────────  │
│                                  │
│  [Attack A]  [Attack B]          │
│  [Attack C]  [Attack D]          │
│                                  │
│  [Player HP: ♥ ♥ ♥]             │
└──────────────────────────────────┘
```

**Battle flow per question:**
1. Question text appears as battle prompt
2. Options styled as attack moves (spell names with letter badges)
3. Player picks an attack:
   - **Correct**: player attack animation → boss takes damage → boss HP bar depletes → damage number floats up → if boss HP ≤ 0 → victory phase → after animation → `onComplete(score)`
   - **Wrong**: fizzle animation → boss counterattack (lunge + screen shake) → player loses 1 HP → if player HP ≤ 0 → defeat phase → "Study Up" screen
4. Brief pause → next question

**Victory phase**: boss death animation (flash bright → shrink → fade) → "Quest Complete!" → 1.5s delay → `onComplete(percentage)`

**Defeat phase**: screen darkens → "You Have Fallen..." → show missed topics → "Study Up!" button → calls `onStudyUp(0)` to jump back to slides

#### `components/bosses/MergeConflictHydra.tsx` — First boss SVG

SVG component for the Merge Conflict Hydra:
- Multi-headed serpent/dragon representing diverging git branches
- Heads styled as branch lines diverging from a body
- CSS `boss-idle-bob` animation on mount
- `damage-shake` class toggled on hit
- `death-fade` animation on defeat
- Props: `state: "idle" | "attacking" | "damaged" | "dead"`

#### `components/bosses/index.ts` — Sprite registry

Maps boss sprite keys to components:
```ts
export const bossSprites: Record<string, React.ComponentType<BossSpriteProps>> = {
  hydra: MergeConflictHydra,
  // future bosses registered here
};
```

### Modified Files

#### `lib/types.ts`
- Add `BossData` interface
- Add `boss?: BossData` to `Lesson`

#### `content/lessons/01-git-save-points.ts`
- Add `boss` field:
```ts
boss: {
  name: "Merge Conflict Hydra",
  description: "A multi-headed beast born from diverging branches",
  sprite: "hydra",
  maxHp: 100,
  playerMaxHp: 3,
  damagePerCorrect: 20, // 5 questions × 20% = 100%
  attackNames: [
    "Diverging History Slam!",
    "Unresolved Conflict Bite!",
    "Detached HEAD Strike!",
  ],
  defeatText: "The Hydra's heads collapse as your commits align!",
}
```

#### `app/lesson/[slug]/page.tsx`
- Import `BossBattleSection`
- Conditional rendering (~line 241-243):
  ```tsx
  {section.type === "quiz" && lesson.boss ? (
    <BossBattleSection
      section={section}
      boss={lesson.boss}
      onComplete={handleQuizComplete}
      onStudyUp={(idx) => setCurrentSection(idx)}
    />
  ) : section.type === "quiz" ? (
    <QuizSection section={section} onComplete={handleQuizComplete} />
  ) : null}
  ```

#### `app/globals.css`
- Add battle keyframes:
  - `@keyframes boss-idle-bob` — gentle asymmetric bob (3s loop)
  - `@keyframes damage-shake` — horizontal shake (0.3s)
  - `@keyframes attack-lunge` — forward lunge + scale (0.4s)
  - `@keyframes death-fade` — brighten → shrink → fade (1s)
  - `@keyframes float-up-damage` — damage numbers float up and fade (0.8s)
- Add utility classes: `.boss-idle`, `.boss-damaged`, `.boss-attacking`, `.boss-dead`
- Add HP bar styles: `.hp-bar-boss`, `.hp-bar-player`

### "Study Up" Review Flow

When player HP hits 0:
1. Screen darkens with defeat overlay
2. "You Have Fallen..." text with red glow
3. Show which questions were wrong with brief topic hints
4. "Study Up!" button calls `onStudyUp(0)` → jumps to slides (section 0)
5. Player reviews slides/reading at their own pace
6. When they reach the quiz section again, boss is at full HP, player at full HP
7. Progress through sections still tracked — they can skip directly to quiz if they want

This works because `setCurrentSection(0)` already exists in the lesson page's header navigation. The boss battle just triggers it programmatically.

### Audio Integration (depends on #4)

If audio system exists when this ships:
- `sfx('quiz-start-horn')` on battle intro
- `playBGM('battle')` on battle start
- `sfx('correct-ding')` on successful attack
- `sfx('wrong-buzz')` on fizzle/boss counterattack
- Boss defeat: `sfx('unlock-celebration')` + `playBGM('victory')`
- Player defeat: low buzz/defeat sound

If #4 isn't done yet, the battle works silently and audio hooks are added later.

## Implementation Phases

### Phase 1: Battle mechanics + UI shell
1. Extend types (`BossData`, `Lesson.boss`)
2. Build `BossBattleSection` with full battle state machine
3. Wire into lesson page with conditional rendering
4. Implement HP bars (boss + player), damage numbers, attack selection UI
5. Add boss data to git lesson
6. Implement victory → `onComplete` flow
7. Implement defeat → "Study Up" → `onStudyUp` flow

### Phase 2: Boss sprite
1. Create `MergeConflictHydra` SVG component
2. Add battle CSS keyframes to globals.css
3. Wire sprite state to battle actions (idle, damaged, attacking, dead)
4. Create sprite registry

### Phase 3: Polish
1. Screen shake on boss attack (framer-motion on battle container)
2. Floating damage numbers
3. Battle intro sequence (boss appears with dramatic entrance)
4. Tune HP values through playtesting
5. Audio integration when #4 lands

## Acceptance Criteria

- [ ] Lessons with `boss` data render `BossBattleSection` instead of `QuizSection`
- [ ] Lessons without `boss` still render original `QuizSection` (backward compat)
- [ ] Boss sprite visible with idle animation during battle
- [ ] Correct answer triggers attack animation + boss HP decrease
- [ ] Wrong answer triggers boss attack animation + player HP decrease
- [ ] Boss HP reaching 0 triggers death animation → unlock flow
- [ ] Player HP reaching 0 triggers defeat screen with "Study Up" option
- [ ] "Study Up" navigates back to lesson slides
- [ ] Returning to quiz after "Study Up" resets battle (full HP both sides)
- [ ] Attack options styled as spell/move names, not generic "A/B/C/D"
- [ ] HP bars animate smoothly on damage

## Dependencies & Risks

- **#4 (audio)**: Boss battle is dramatically better with battle music + SFX. Can ship without, but should aim to have audio first
- **SVG sprite complexity**: Hydra might be hard to make look good in SVG. Mitigation: start simple, iterate. Can pivot to PNG sprite sheet if SVG isn't landing
- **Player HP tuning**: 3 HP with 5 questions means 3 wrong = death. Might be too punishing or too lenient. Need playtesting. Make `playerMaxHp` configurable per boss
- **"Study Up" UX**: Jumping back to section 0 might feel jarring. Could add a brief transition. Keep it simple for MVP

## References

- Brainstorm: `docs/brainstorms/2026-03-04-boss-battle-brainstorm.md`
- Current quiz flow: `components/QuizSection.tsx` (full component stays as fallback)
- Unlock flow: `app/lesson/[slug]/page.tsx:78-90`
- Animation patterns: `components/UnlockScreen.tsx` (particles, rings, spring animations)
- Existing CSS utilities: `app/globals.css` (glow, float, flicker keyframes)
- GitHub issue: #5
