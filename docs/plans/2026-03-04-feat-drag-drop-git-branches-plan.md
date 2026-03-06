---
title: "feat: Drag-and-drop git branches — interactive exercise + lesson"
type: feat
date: 2026-03-04
issue: 6
---

# Drag-and-Drop Git Branches — Interactive Exercise + Lesson

## Overview

New lesson "Git Branches — Parallel Universes" (order: 2) with an SVG-based interactive branch tree exercise. Players create branches, add commits, and merge — all via drag-and-drop using framer-motion's built-in `drag` prop. No new dependencies.

## Interaction Model

**Palette-based drag.** A sidebar/toolbar provides draggable items ("New Branch", "New Commit"). User drags items onto the SVG tree to place them. This avoids ambiguous gestures and works on both pointer and touch devices.

- **Create branch:** Drag "New Branch" item from palette onto a commit node → branch forks from that commit
- **Add commit:** Drag "New Commit" item onto a branch tip → commit appends to branch
- **Merge:** Drag one branch label onto another branch label → merge commit appears at intersection
- **Wrong drop:** Snap back to palette with brief hint toast ("Try dropping on a branch tip")
- **Conflict simulation:** After merge drop, modal with two code snippets — both are "valid", it's a teaching moment not a test. Brief explanation of what each choice means.

## Data Schema

New types in `lib/types.ts` or `lib/git-branch-types.ts`:

```typescript
interface GitCommitNode {
  id: string;
  message: string;
  branch: string;
  position: number;
}

interface GitBranchDef {
  id: string;
  name: string;
  color: string;          // tailwind token e.g. "gold", "mana-blue"
  pattern: "solid" | "dashed";  // colorblind-safe secondary indicator
  parentBranch?: string;
  forkFromCommit?: string;
}

interface DragDropScenarioStep {
  instruction: string;
  hint?: string;
  initialTree: { branches: GitBranchDef[]; commits: GitCommitNode[] };
  availableItems: Array<{ type: "commit" | "branch"; label: string }>;
  expectedAction: {
    type: "place-commit" | "create-branch" | "merge";
    target: string;
    source?: string;
  };
  triggerConflict?: {
    optionA: string;
    optionB: string;
    explanation: string;
  };
}
```

Each guided scenario = one `InteractiveStep` with `type: "drag-drop"` and `data` cast to `DragDropScenarioStep`. Steps carry forward — each step's `initialTree` is the expected end-state of the previous step.

## Implementation Phases

### Phase 1: Static SVG Branch Tree Renderer

**Files:**
- Create `components/GitBranchTree.tsx` — renders branch graph from data
  - Vertical timeline (top→down), main on left, feature branches offset right
  - Commit nodes: 32px circles with short message label
  - Branch lines: colored SVG paths with `pattern` indicator (solid/dashed)
  - Branch labels at tips
  - Responsive: `viewBox` scaling inside `max-w-3xl` container
  - Horizontal scroll wrapper on mobile (`overflow-x: auto`)
- Add to playground: `app/playground/branch-tree/page.tsx` for isolated testing

### Phase 2: Drag-and-Drop Interaction

**Files:**
- Create `components/DragDropStep.tsx` — the interactive step component
  - Palette sidebar with draggable items (framer-motion `drag`, `dragSnapToOrigin`)
  - Drop zones on commit nodes and branch tips (hit detection via `onDragEnd` + bounding rects)
  - Snap-to-position on valid drop (spring animation)
  - Hint toast on invalid drop
  - Step validation: compare tree state to `expectedAction`
  - Auto-advance on correct action with brief celebration
- Update `components/InteractiveExercise.tsx` — add `"drag-drop"` case that renders `DragDropStep`
- Touch handling: `touch-action: none` on SVG container, 44px minimum touch targets
- Keyboard alternative: Tab to select source item, Tab to target, Enter to place

### Phase 3: Lesson Content + Guided Scenarios

**Files:**
- Create `content/lessons/02-git-branches.ts`:
  - `slug: "git-branches"`, `order: 2`, `estimatedMinutes: 15`, `xpReward: 75`, `icon: "🌿"`
  - **Slides** (6 frames): What are branches, why branch, visual metaphor (parallel universes), branching workflow, merging, conflicts
  - **Reading**: Branch strategy basics, when to branch, naming conventions
  - **Interactive** (4 steps):
    1. Create feature branch from main (3 existing commits on main)
    2. Add 2 commits to feature branch
    3. Merge feature into main (triggers conflict simulation)
    4. View final history — summary/celebration
  - **Quiz** (5 questions): Branching concepts, merge vs rebase (conceptual), HEAD, branch naming
  - **Boss** (optional): New boss "The Detached HEAD" or plain quiz for MVP
- Update `content/lessons/index.ts` — register lesson 2

### Phase 4: New Boss (stretch) + Polish

**Files (if boss):**
- Create `components/bosses/DetachedHead.tsx` — SVG sprite for new boss
- Register in `components/bosses/index.ts`
- Add boss data to lesson 2
- Add new SFX: `branch-snap`, `merge-whoosh` in `lib/audio/sfx.ts`

## Acceptance Criteria

- [ ] Interactive branch tree renders with main branch + 3 commits
- [ ] Can drag "New Branch" from palette onto a commit to fork
- [ ] Can drag "New Commit" onto a branch tip to extend it
- [ ] Can drag branch label onto another to merge
- [ ] Wrong drops snap back with hint text
- [ ] Conflict simulation shows two options with explanation
- [ ] Guided scenario walks through 4 steps sequentially
- [ ] New lesson appears in quest map after lesson 1
- [ ] Lesson follows slides → reading → interactive → quiz pattern
- [ ] Quiz has 5+ questions on branching concepts
- [ ] Keyboard navigation works (Tab + Enter for select/place)
- [ ] Touch targets ≥ 44px, horizontal scroll on mobile
- [ ] Branch colors have non-color secondary indicators (solid/dashed)
- [ ] `tsc --noEmit` + `next build` pass

## Technical Considerations

- **No new deps.** framer-motion `drag` + `onDragEnd` + `dragSnapToOrigin` covers all drag needs.
- **SVG coordinate math.** Drop zone hit detection uses `getBoundingClientRect()` on SVG elements, not SVG coordinate transforms. Simpler and works with framer-motion's DOM-based drag.
- **State persistence.** Mid-exercise progress not saved (matches existing pattern). 4 scenarios ≈ 3-5 min, acceptable to restart.
- **Mobile.** Palette-based drag works better on touch than free-form. Horizontal scroll container for wide trees. No pinch-to-zoom for MVP.

## Open Questions

1. **Boss or plain quiz for lesson 2?** Leaning plain quiz for MVP — a second boss is scope creep. Can add later.
2. **Should conflict simulation block progress or just demonstrate?** Leaning demonstrate — both choices valid, brief explanation shown.

## References

- Lesson structure: `content/lessons/01-git-save-points.ts`
- Interactive pattern: `components/InteractiveExercise.tsx:417-436` (step type switch)
- Lesson player: `app/lesson/[slug]/page.tsx:240-264` (section rendering)
- Boss sprite pattern: `components/bosses/MergeConflictHydra.tsx`
- SVG pattern: `components/bosses/MergeConflictHydra.tsx` (inline SVG with viewBox)
- Timer cleanup pattern: `components/BossBattleSection.tsx` (safeTimeout + timersRef)
