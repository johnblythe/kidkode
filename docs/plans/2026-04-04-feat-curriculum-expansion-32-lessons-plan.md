---
title: "feat: Curriculum Expansion — 36 Lessons Across 6 Realms"
type: feat
date: 2026-04-04
deepened: 2026-04-04
---

# Curriculum Expansion — 36 Lessons Across 6 Realms

## Enhancement Summary

**Deepened on:** 2026-04-04
**Research agents used:** 6 (gamification best practices, quest map UI, architecture review, learnings check, code sandbox, simplicity review)

### Key Improvements
1. **Simplified phasing** — 3 phases instead of 6. Ship lessons immediately with minimal infrastructure.
2. **First-class Realm type** — separate `Realm` entity instead of flat fields on Lesson. Prevents data duplication.
3. **Generic BossShell** — extract shared animation wrapper; use generic boss + 5-6 custom sprites instead of 29 hand-crafted SVGs.
4. **Sandpack for practicals** — Sandpack (editor + execution + preview, ~200KB, Apache-2.0) + CodeMirror readonly-ranges for fill-in-the-blank.
5. **XP scaling per realm** — rewards grow with difficulty (50→75→100→125→150→175 per realm).
6. **Boss difficulty scaling** — 5 questions (Realm 1-2), 6 (Realm 3-4), 7 (Realm 5-6).
7. **Winding quest map** — Duolingo-style serpentine vertical path with realm gates.

### Critical Learnings to Follow (from docs/solutions/)
- Phase 0 (types) → Phase 1 (parallel content) → Phase 2 (registration). Never parallelize shared index file edits.
- FillBlank validation: template `___` count must equal `blanks.length` must equal `solution` keys. TypeScript can't enforce this.
- Never use `startTransition` with Server Actions inside `useEffect` — causes infinite re-render loop. Use plain async IIFE + cancelled flag.
- React 19: `useRef()` without initial value errors. Always `useRef<T>(undefined)`.
- Boss animations: use counter-as-key pattern for repeatable animations, not boolean toggles.
- Separate state updates (HP, XP) from VFX (sprites, shake). Apply state immediately, cosmetics with delay.

---

## Overview

Expand KidKode from 7 lessons to 36, organized into 6 themed realms with hands-on "practicals" sprinkled throughout. Target: ages 10-15, may know Scratch/block-code. Reorder existing lessons, add 29 new lessons from programming fundamentals through full-stack concepts.

Related: issue #27 (30+ lessons), plan at `.claude/plans/synthetic-hatching-frog.md` (original curriculum map).

## Resolved Decisions

All blocking questions answered:

| Decision | Answer |
|----------|--------|
| Hello World lesson | YES — add as Lesson 7, 33+ total |
| Realm 4 reorder | YES — JSON → Async → APIs → DBs → Auth |
| Practicals | YES — add applied mini-projects after every 3-4 theory lessons, across ALL realms |
| Locking model | Linear within realm, jump between unlocked realms (FF7-style) |
| Realm UI | Full-screen transition (2-3s, skippable) on first realm entry |
| Scratch reference | Name Scratch explicitly with fallback: "If you've used Scratch (or any block-coding tool)..." |
| Capstone length | More sections (8 instead of 4), same lesson — finer checkpointing |
| Early debugging | Fold error-reading basics into Loops lesson; keep Lesson 29 for DevTools/breakpoints |
| Code sandbox | Write content assuming future sandbox; use fill-blank for now |

---

## Critical Fixes to Original Plan

SpecFlow analysis identified 3 blocking issues in the original curriculum map:

### Fix 1: Missing "Hello World" Lesson

**Problem:** Realm 2 starts with Variables (Lesson 7) but the child has never run a line of code. They don't know `console.log`, the edit-save-run cycle, or where output appears.

**Fix:** Insert **Lesson 7: "Hello World: Your First Spell"** between Realm 1 (tools) and Realm 2 (fundamentals). Teaches: create a `.js` file, run with `node`, `console.log()`, edit-save-run cycle, comments.

This bumps total to **33 lessons** and shifts Realm 2 numbering by 1.

### Fix 2: Realm 4 Sequencing Error

**Problem:** APIs lesson (20) uses `fetch()` which requires async/await, but async/await isn't taught until lesson 23. JSON lesson (21) comes after APIs but is required during APIs.

**Fix — corrected Realm 4 order:**

| # | Title | Rationale |
|---|-------|-----------|
| 20 | Client vs Server *(existing)* | What is a request? |
| 21 | JSON: The Universal Scroll Language | Data format — needed before fetch |
| 22 | Sync vs Async: Time Magic *(existing)* | Promises/await — needed before fetch |
| 23 | APIs: The Messenger Ravens | Now has JSON + async prereqs |
| 24 | Databases *(existing)* | CRUD on server side |
| 25 | Authentication: The Gatekeeper's Key | Depends on all above |

### Fix 3: Lesson 6 Missing Boss

**Problem:** Git Branches is the only lesson without a boss. Breaks the reward pattern.

**Fix:** Add boss: **"The Detached HEAD Phantom"** — plays on the common `detached HEAD` git state.

---

## Final Curriculum — 6 Realms, 36 Lessons (including 3 Practicals)

*Practicals are hands-on applied mini-projects that break up theory streaks. Marked with (P).*

### REALM 1: The Apprentice's Tower (Orientation & Tools) — 6 lessons

| # | Title | Status | XP | Boss |
|---|-------|--------|-----|------|
| 1 | The Adventurer's Map: What is Code? | NEW | 50 | The Block Golem |
| 2 | Terminal: The Dungeon Console | EXISTING (was #3) | 60 | Permission Denied Golem |
| 3 | Terminal II: Spells & Shortcuts | NEW | 70 | The Wildcard Wraith |
| 4 | The Code Forge: Your First Editor | NEW | 80 | The Extension Mimic |
| 5 | Git: Save Points for Your Code | EXISTING (was #1) | 90 | Merge Conflict Hydra |
| 6 | Git Branches: Parallel Universes | EXISTING (was #2) | 100 | The Detached HEAD Phantom |

### REALM 2: The Scribe's Library (Programming Fundamentals) — 8 lessons

| # | Title | Status | XP | Boss |
|---|-------|--------|-----|------|
| 7 | Hello World: Your First Spell | NEW | 80 | The Silent Console |
| 8 | Variables: Naming Your Potions | NEW | 90 | The Unnamed Specter |
| 9 | Conditions: The Crossroads | NEW | 100 | The Riddle Sphinx |
| 10 | Loops: The Enchanted Treadmill | NEW | 110 | The Infinite Loop Worm |
| 11 | Functions: Bottling Your Spells | NEW | 120 | The Copy-Paste Slime |
| 12 | **(P) The Gauntlet: Console Quest** | NEW | 150 | The Logic Gargoyle |
| 13 | Arrays: The Treasure Chest | NEW | 130 | The Index Troll |
| 14 | Objects: The Character Sheet | NEW | 140 | The Shapeless Ooze |

*Practical 12 — apply variables, conditions, loops, functions in a guided console-based text adventure or calculator. No new concepts, pure application.*

### REALM 3: The Frontend Realm (Building What You See) — 7 lessons

| # | Title | Status | XP | Boss |
|---|-------|--------|-----|------|
| 15 | HTML: The Skeleton Scroll | NEW | 120 | The Tag Lich |
| 16 | CSS: The Enchantment Layer | NEW | 130 | The Style Vampire |
| 17 | Layout: The Architect's Grid | NEW | 140 | The Chaos Architect |
| 18 | JavaScript in the Browser: The Puppet Strings | NEW | 150 | The Static Gargoyle |
| 19 | **(P) The Forge: Build a Fan Page** | NEW | 180 | The Pixel Perfectionist |
| 20 | Forms & Input: The Questionnaire Golem | NEW | 160 | The Questionnaire Golem |
| 21 | Responsive Design: The Shapeshifter's Cloak | NEW | 170 | The Shapeshifter |

*Practical 19 — combine HTML + CSS + DOM JS to build a simple fan page (favorite game/show). Apply layout, styling, and interactivity together.*

### REALM 4: The Backend Dungeons (The Invisible Kingdom) — 7 lessons

| # | Title | Status | XP | Boss |
|---|-------|--------|-----|------|
| 22 | Client vs Server: The Two Kingdoms | EXISTING (was #4) | 150 | The 404 Phantom |
| 23 | JSON: The Universal Scroll Language | NEW | 160 | The Syntax Gremlin |
| 24 | Sync vs Async: Time Magic | EXISTING (was #6) | 170 | The Callback Serpent |
| 25 | APIs: The Messenger Ravens | NEW | 180 | The Raven Interceptor |
| 26 | **(P) The Workshop: Weather Dashboard** | NEW | 200 | The API Hydra |
| 27 | Databases: The Inventory System | EXISTING (was #5) | 190 | The Null Pointer |
| 28 | Authentication: The Gatekeeper's Key | NEW | 200 | The Identity Thief |

*Practical 26 — fetch real weather data from a public API, parse JSON, display it. Combines client/server, JSON, async, and APIs in one applied project.*

### REALM 5: The Artificer's Workshop (Real Tools & Workflows) — 5 lessons

| # | Title | Status | XP | Boss |
|---|-------|--------|-----|------|
| 29 | Asking AI: The Genie's Rules | EXISTING (was #7) | 180 | The Hallucination Phantom |
| 30 | Claude Code: The AI Familiar | NEW | 200 | Hallucination Phantom II |
| 31 | npm & Packages: The Potion Shop | NEW | 200 | The Dependency Dragon |
| 32 | Debugging: The Bug Exterminator | NEW | 220 | The Bug Swarm |
| 33 | Deployment: Launching the Airship | NEW | 240 | The Build Failure Demon |

### REALM 6: The Grand Quest (Putting It All Together) — 3 lessons

| # | Title | Status | XP | Boss |
|---|-------|--------|-----|------|
| 34 | Project Planning: The Architect's Blueprint | NEW | 200 | The Scope Creep Hydra |
| 35 | Build a Profile Page: The Hero's Banner | NEW | 250 | The Blank Page Dragon |
| 36 | The Final Boss: Full Stack Siege | NEW | 300 | The Chaos Compiler |

**Total XP: 5,280** (completionist at 1.0x) / **~7,920** (perfect at 1.5x first-attempt bonus)

### Summary

| | Existing | New | Practicals | Total |
|---|---------|-----|-----------|-------|
| Realm 1 | 3 | 3 | 0 | 6 |
| Realm 2 | 0 | 7+1 | 1 | 8 |
| Realm 3 | 0 | 6+1 | 1 | 7 |
| Realm 4 | 3 | 3+1 | 1 | 7 |
| Realm 5 | 1 | 4 | 0 | 5 |
| Realm 6 | 0 | 3 | 0 | 3 |
| **Total** | **7** | **28+3** | **3** | **36** |

---

## XP & Level System Changes

Current `XP_PER_LEVEL` only goes to level 10 (3200 XP). Extend to 15 levels with continued quadratic curve:

```
XP_PER_LEVEL = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 4900, 5900, 7000, 8500]
```

Level 10 (~lesson 24) = "graduated basics." Level 15 = completionist/perfectionist.

**Note:** `calculateLevel()` already handles overflow gracefully (`+ 500` fallback at line 209). Extending the array is a nice-to-have, not a blocker. Can ship lessons before extending.

---

## Infrastructure Changes Required

### 1. First-class Realm type (not flat fields on Lesson)

**Why:** `realmName` as a flat string on every lesson = denormalized data. Realm-level data will grow (colors, transitions, badges, unlock conditions). A separate entity is the right abstraction.

```typescript
// lib/types.ts — NEW
export interface Realm {
  id: number;             // 1-6
  slug: string;           // "apprentices-tower"
  name: string;           // "The Apprentice's Tower"
  subtitle: string;       // "Orientation & Tools"
  icon: string;           // emoji
  accentColor: string;    // Tailwind token, e.g. "emerald-500"
  unlockCondition: RealmUnlockCondition;
}

export type RealmUnlockCondition =
  | { type: "default" }                          // realm 1, always open
  | { type: "realm-complete"; realmId: number }  // complete prior realm
  | { type: "all-realms"; realmIds: number[] };  // realm 6

// On Lesson — add only the foreign key:
export interface Lesson {
  // ... existing fields
  realm: number;  // references Realm.id
}
```

Create `content/realms.ts` with realm definitions. Derive `realmName` at render time via lookup.

**Realm color tokens:**

| Realm | Theme | Accent |
|---|---|---|
| 1: Apprentice's Tower | Tools & orientation | `emerald-500` |
| 2: Scribe's Library | JS fundamentals | `amber-500` |
| 3: Frontend Realm | HTML/CSS/DOM | `sky-500` |
| 4: Backend Dungeons | Server/APIs/DB | `violet-500` |
| 5: Artificer's Workshop | AI, npm, deploy | `rose-500` |
| 6: Grand Quest | Capstone | `gold` |

### 2. Extract unlock logic to `lib/unlock.ts`

**Why:** `unlockNextLesson` is duplicated in `lib/progress.ts` and `app/actions/users.ts` with identical sort-and-find logic. Adding realm awareness multiplies the duplication cost.

```typescript
// lib/unlock.ts — pure functions, no DB calls, testable
export function getNextUnlockableSlugs(
  completedSlug: string,
  allLessons: Lesson[],
  allRealms: Realm[],
  completedSlugs: Set<string>
): string[];

export function isRealmComplete(realmId: number, allLessons: Lesson[], completedSlugs: Set<string>): boolean;

export function getFirstLessonSlug(allLessons: Lesson[]): string;
```

Both `progress.ts` and `users.ts` delegate to these. Kills the duplication.

### 3. Export lightweight `lessonMetas` for client bundle

**Why:** `app/page.tsx` imports the full `lessons` array (all section content, quiz questions, slides). At 36 lessons, this could push 200KB+ of JSON into the client. The dashboard only uses 6 fields per lesson.

```typescript
// content/lessons/index.ts — NEW export
export type LessonMeta = Pick<Lesson, 'slug' | 'title' | 'description' | 'order' | 'realm' | 'xpReward' | 'estimatedMinutes' | 'icon'>;

export const lessonMetas: LessonMeta[] = lessons.map(({ slug, title, description, order, realm, xpReward, estimatedMinutes, icon }) => ({
  slug, title, description, order, realm, xpReward, estimatedMinutes, icon,
}));
```

Dashboard pages import `lessonMetas`. Full `lessons` array stays server-only.

### 4. Renumber existing lesson `order` fields (no file renames)

**Don't rename files.** The numeric prefix is cosmetic — `order` field is the source of truth. Renaming breaks `git blame` and creates needless churn.

| Lesson Slug | Current Order | New Order | File (unchanged) |
|-------------|--------------|-----------|-------------------|
| terminal-basics | 3 | 2 | `03-terminal-basics.ts` |
| git-save-points | 1 | 5 | `01-git-save-points.ts` |
| git-branches | 2 | 6 | `02-git-branches.ts` |
| client-vs-server | 4 | 22 | `04-client-vs-server.ts` |
| sync-vs-async | 6 | 24 | `06-sync-vs-async.ts` |
| databases | 5 | 27 | `05-databases.ts` |
| asking-ai | 7 | 29 | `07-asking-ai.ts` |

New lessons use `{NN}-{slug}.ts` starting at `08-*`. The `NN` prefix aids directory listing but is not authoritative.

**Migration note:** `lesson_progress` uses `lesson_slug` (not order), so progress data is safe.

### 5. Boss sprite architecture: BossShell + generic fallback

**Why:** 29 hand-crafted SVG sprites (~7,000 lines of SVG art) is unsustainable. Current sprites share identical animation logic (Framer Motion state machine, `BossSpriteProps`).

**Approach:**

```
components/bosses/
  BossShell.tsx          — shared animation wrapper (motion.div, state classes, damage flash)
  GenericBoss.tsx         — parametric boss: takes color/emoji/shape config, renders a stylized creature
  sprites/               — custom SVGs for milestone bosses only
    hydra.tsx            — just SVG innards, no animation logic
    golem.tsx
    ...                  — 5-6 total custom sprites (one per realm final boss)
  index.ts               — registry with fallback to GenericBoss
```

`BossShell.tsx` handles all Framer Motion animation. Each sprite is stateless SVG-only. `GenericBoss` takes a config object (primary color, shape variant, size) and renders a parameterized creature.

**Registry with fallback:**
```typescript
export function getBossSprite(key: string): ComponentType<BossSpriteProps> {
  return bossSprites[key] ?? GenericBoss;
}
```

### 6. Early debugging in Loops lesson

Fold basic error-reading into Lesson 10 (Loops) — where kids first encounter infinite loops. Cover: `Ctrl+C`, reading error messages, common mistakes. Lesson 32 (Debugging) covers advanced topics (DevTools, breakpoints, stack traces).

### 7. Unlock logic (realm-based)

Implemented in `lib/unlock.ts` (see item 2 above):
- Linear progression within a realm
- Completing a realm's last lesson unlocks next realm
- Can revisit any lesson in any unlocked realm
- Realm 6 requires all prior realms completed

**Note:** Current linear unlock already works for shipping lessons immediately. Realm-based locking is a Phase 3 enhancement — the ordering alone handles progression correctly.

### 8. Organize lesson files by realm (filesystem)

```
content/lessons/
  realm-1/   01-adventurers-map.ts ... 06-git-branches.ts
  realm-2/   07-hello-world.ts ... 14-objects.ts
  realm-3/   15-html.ts ... 21-responsive.ts
  realm-4/   22-client-server.ts ... 28-auth.ts
  realm-5/   29-asking-ai.ts ... 33-deployment.ts
  realm-6/   34-project-planning.ts ... 36-final-boss.ts
  index.ts   (barrel file, flat lessons array — consumers see no change)
```

---

## Implementation Phases (Simplified: 3 not 6)

The simplicity review found that the original 6-phase plan front-loads infrastructure that isn't needed to start shipping lessons. The current linear unlock system handles 36 lessons identically to 7. Ship content first, polish later.

### Phase 1: Minimal Infrastructure (~1 day)

**Minimum changes to start adding lessons:**

- [ ] Add `realm: number` to `Lesson` interface in `lib/types.ts`
- [ ] Create `Realm` type and `content/realms.ts` with 6 realm definitions
- [ ] Extend `XP_PER_LEVEL` to 15 levels (one line change)
- [ ] Update `order` values on 7 existing lesson files (no file renames)
- [ ] Add `realm` field to existing lessons
- [ ] Create `content/lessons/realm-*/` directories
- [ ] Update `content/lessons/index.ts` imports
- [ ] Extract `BossShell.tsx` from existing sprite components
- [ ] Create `GenericBoss.tsx` with parametric rendering + fallback registry
- [ ] Add boss data to Lesson 6 (Git Branches): The Detached HEAD Phantom

**Defer to Phase 3:** Realm-based unlock logic, `lessonMetas` export, `lib/unlock.ts` extraction. Current linear unlock works fine.

### Phase 2: Content (ongoing, ship incrementally)

Write lessons in curriculum order, one at a time. Ship every 3-5 lessons. The flat quest map handles it.

**Execution pattern (from `docs/solutions/feature-patterns/adding-lessons-and-step-types.md`):**
1. Write lesson content file (`content/lessons/realm-N/NN-slug.ts`)
2. Add import + array entry in `content/lessons/index.ts`
3. Boss uses `GenericBoss` fallback (no custom sprite needed)
4. Run `tsc --noEmit` to verify
5. Ship

**Content priority order:**
1. Realm 1 & 2 (Lessons 1, 3, 4, 7-14) — 11 new, foundation
2. Realm 3 (Lessons 15-21) — 7 new, frontend
3. Realm 4 (Lessons 23, 25, 26, 28) — 4 new, backend
4. Realm 5 & 6 (Lessons 30-36) — 7 new, tools + capstone

### Phase 3: Polish (when 15+ lessons are live)

- [ ] Realm-based unlock logic (`lib/unlock.ts`)
- [ ] `lessonMetas` lightweight export for client bundle
- [ ] Quest map UI: realm groupings, winding path, gates
- [ ] Full-screen realm transition animations
- [ ] 5-6 custom boss sprites for realm-final bosses
- [ ] Boss difficulty scaling (5→6→7 questions by realm)
- [ ] Session-based gentle streaks
- [ ] Realm completion badges

---

## Open Items (non-blocking)

1. **Code sandbox** — Sandpack recommended (see research below). Write content assuming future sandbox; use fill-blank for now.
2. **Capstone lesson (36)** — 8 sections instead of 4 for finer checkpointing. Exact section breakdown TBD during content writing.
3. **Practical themes** — current suggestions (Console Quest, Fan Page, Weather Dashboard) are placeholders. Finalize during outline phase.

---

## Research Insights

### XP & Progression Design

**Current quadratic curve is correct.** Deltas grow linearly (100, 150, 200...) — this is the consensus approach for educational games with bounded content. Codecademy, Duolingo, and Prodigy all use variants of this.

**Scale XP rewards per realm** to match difficulty:

| Realm | Base XP per lesson | Practical XP | Rationale |
|-------|-------------------|--------------|-----------|
| 1 | 50-100 | — | Easy orientation |
| 2 | 80-150 | 150 | First real coding |
| 3 | 120-170 | 180 | Applied frontend |
| 4 | 150-200 | 200 | Abstract backend |
| 5 | 180-240 | — | Professional tools |
| 6 | 200-300 | — | Capstone |

**Boss victory bonus:** +50 XP per boss kill (on top of lesson XP). Incentivizes completing the battle, not just passing the quiz.

**Level-up pacing:** Target a level-up every 2-3 lessons in early realms, every 3-4 in later realms. Test by simulating a play-through and counting sessions-between-levels.

**Note:** `calculateLevel()` in `lib/types.ts` already handles overflow gracefully (line 209: `+ 500` fallback). The 15-level extension is future-proofing but not strictly required — the current 10-level array works with auto-generated thresholds.

### Boss Battle Scaling

| Realm | Questions | Player HP | Boss HP | Pass Threshold |
|-------|-----------|-----------|---------|---------------|
| 1-2 | 5 | 4 hearts | 100 | 60% (3/5) |
| 3-4 | 6 | 3 hearts | 120 | 67% (4/6) |
| 5-6 | 7 | 3 hearts | 140 | 71% (5/7) |

**Partial credit:** After wrong answer, show explanation + simpler follow-up for half damage. Mirrors classroom "Boss Fight Assessment" research.

**Retry improvements:** Shuffle questions on retry (prevent memorizing positions). After 2 failed attempts, offer one-time hint per question.

**Add `tauntText`** to `BossData` — boss says something before battle. Already have `defeatText` for victory.

### Engagement: Gentle Streaks

Session-based, not day-based (kid may only play 3 days/week):

| Feature | Design |
|---------|--------|
| Streak unit | "Sessions" not "days" |
| Streak freeze | Auto-grant 1/week |
| Broken streak | "Comeback bonus" — 2x XP on return |
| Milestones | 3, 7, 14, 30 sessions |
| Visual | Warm glow, not angry fire |

### Practical Lesson Design

**Scaffolding progression across realms:**

| Realm | Structure | Tasks | Duration |
|-------|-----------|-------|----------|
| 1-2 | 100% guided, step-by-step | 3 | ~12 min |
| 3-4 | 70% scaffolded / 30% open | 4 | ~18 min |
| 5-6 | 50% scaffolded / 50% open | 5 | ~25 min |

**Practical structure:**
1. Context (1-2 min): "You're building X for Y reason"
2. Starter code: 60-70% complete with `// TODO` markers
3. 3-5 tasks: each applies one concept from recent lessons
4. Validation: automated checks (existing interactive step types)
5. Bonus challenge (optional, +50% XP)

### Quest Map UI (Phase 3)

**Layout: Winding vertical path** (Duolingo-style serpentine):
```tsx
// Repeating offset pattern
const OFFSETS = [0, -60, -100, -60, 0, 60, 100, 60]; // px from center
// Responsive: mobile uses tighter offsets (30/50), desktop uses wider (60/100)
```

**Realm gates** between sections: locked/unlocked visual divider. Gate animates open when previous realm is complete.

**Animation fix:** Current stagger `delay: index * 0.12` = 4.3s at 36 lessons. Fix:
- Reset stagger counter at each realm boundary
- Cap: `delay: Math.min(index * 0.12, 0.6)`
- Use `whileInView` for off-screen realms (Framer Motion)

**Accessibility:**
- Touch targets: minimum 44x44px (current 32x32 is too small)
- Each state uses icon + color (not color alone): checkmark, fire/arrow, lock
- Realm headers as `<h2>` landmarks for screen reader navigation
- Connector lines: `aria-hidden="true"`
- Respect `prefers-reduced-motion`

**Fog-reveal pattern:** Future realms shown as silhouettes. Reduces overwhelm, creates anticipation.

### Code Sandbox (Future)

**Recommendation: Sandpack + CodeMirror readonly-ranges**

| Tool | Role | Bundle | License |
|------|------|--------|---------|
| `@codesandbox/sandpack-react` | Editor + execution + preview | ~200KB gzip | Apache-2.0 |
| `codemirror-readonly-ranges` | Fill-in-the-blank locked regions | Included in Sandpack (CM6) | MIT |

**Architecture:**
- Realm 2 (JS fundamentals): `Sandpack(template="vanilla")` + `SandpackConsole` — write JS, see `console.log` output
- Realm 3 (frontend): `Sandpack(template="static")` + `SandpackPreview` — write HTML/CSS/JS, see live preview
- Fill-in-the-blank: CodeMirror `readonly-ranges` extension within Sandpack editor

**Skip:** Monaco (5MB, overkill for kids), Pyodide (Python, wrong language), Judge0 (server dependency), WebContainers (commercial license, browser compat issues)

**Implementation:** Create `components/CodePlayground.tsx` wrapper that selects Sandpack template by lesson type. Add when starting Realm 3 content.

---

## Content Authoring Pattern

Each lesson file follows this exact structure (from `docs/solutions/feature-patterns/adding-lessons-and-step-types.md`):

```
content/lessons/{NN}-{slug}.ts
```

4 sections per lesson:
1. **slides** — 4-6 frames with ASCII art, animations from `slide-variants.ts`
2. **reading** — markdown with tables, code blocks, cheat sheets
3. **interactive** — 2-4 steps using step types (sequence, fill-blank, type-command, multiple-choice, drag-drop)
4. **quiz** — 5 questions, passingScore: 60, 0-indexed correctAnswer

**FillBlank validation gotcha:** Template `___` count must match `blanks.length`, every `blank.id` must have a key in `solution`.

**Boss convention:** `damagePerCorrect = maxHp / 5` (5 correct answers = kill), `playerMaxHp = 3`.

---

## References

- Original curriculum map: `.claude/plans/synthetic-hatching-frog.md`
- Lesson authoring patterns: `docs/solutions/feature-patterns/adding-lessons-and-step-types.md`
- Infinite re-render fix: `docs/solutions/runtime-errors/server-action-starttransition-infinite-rerender.md`
- Type system: `lib/types.ts`
- Existing lessons: `content/lessons/01-07`
- Boss sprites: `components/bosses/`
- Issue #27: 30+ lessons request
