import type { Lesson } from "@/lib/types";
import type { DragDropScenarioStep, GitTreeState } from "@/lib/git-branch-types";

// ── Tree states for the interactive exercise ──

const baseTree: GitTreeState = {
  branches: [
    { id: "main", name: "main", color: "gold", pattern: "solid" },
  ],
  commits: [
    { id: "c1", message: "Start project", branch: "main", position: 0 },
    { id: "c2", message: "Add homepage", branch: "main", position: 1 },
    { id: "c3", message: "Fix typo", branch: "main", position: 2 },
  ],
};

const branchedTree: GitTreeState = {
  branches: [
    { id: "main", name: "main", color: "gold", pattern: "solid" },
    {
      id: "feature",
      name: "feature/search",
      color: "mana-blue",
      pattern: "dashed",
      parentBranch: "main",
      forkFromCommit: "c3",
    },
  ],
  commits: [
    ...baseTree.commits,
  ],
};

const withCommitsTree: GitTreeState = {
  branches: [...branchedTree.branches],
  commits: [
    ...branchedTree.commits,
    { id: "f1", message: "Add search bar", branch: "feature", position: 0 },
    { id: "f2", message: "Style search UI", branch: "feature", position: 1 },
  ],
};

const mergedTree: GitTreeState = {
  branches: [...withCommitsTree.branches],
  commits: [
    ...withCommitsTree.commits,
    { id: "merge-feature", message: "Merge search", branch: "main", position: 3 },
  ],
};

// ── Scenario step data ──

const scenario1: DragDropScenarioStep = {
  instruction:
    "Create a new branch! Drag the 'New Branch' item onto the last commit on main to fork a feature branch.",
  hint: "Drop it on the 'Fix typo' commit — that's where your feature branch will start.",
  initialTree: baseTree,
  availableItems: [
    { type: "branch", label: "New Branch: feature/search" },
  ],
  expectedAction: { type: "create-branch", target: "c3" },
  resultTree: branchedTree,
};

const scenario2: DragDropScenarioStep = {
  instruction:
    "Add commits to your feature branch! Drag each commit onto the feature branch to build your search feature.",
  hint: "Drop the commits on the feature/search branch tip.",
  initialTree: branchedTree,
  availableItems: [
    { type: "commit", label: "Add search bar" },
    { type: "commit", label: "Style search UI" },
  ],
  expectedAction: { type: "place-commit", target: "feature" },
  resultTree: withCommitsTree,
};

const scenario3: DragDropScenarioStep = {
  instruction:
    "Time to merge! Drag the feature branch label onto main to combine your work.",
  hint: "Drag 'feature/search' onto 'main' to merge the branches together.",
  initialTree: withCommitsTree,
  availableItems: [
    { type: "branch", label: "Merge feature/search → main" },
  ],
  expectedAction: { type: "merge", target: "main", source: "feature" },
  resultTree: mergedTree,
  triggerConflict: {
    optionA: 'background-color: blue; /* from feature/search */',
    optionB: 'background-color: green; /* from main */',
    explanation:
      "In real git, both answers are valid! You choose which version to keep (or combine them). This is called 'resolving a conflict.'",
  },
};

const scenario4: DragDropScenarioStep = {
  instruction:
    "Look at the final history! Your feature branch was merged into main. The merge commit connects both histories together.",
  hint: undefined,
  initialTree: mergedTree,
  availableItems: [], // No action — just observe
  expectedAction: { type: "merge", target: "done" }, // Won't match; step auto-completes
  resultTree: mergedTree,
};

// ── Lesson definition ──

const lesson: Lesson = {
  slug: "git-branches",
  title: "Git Branches: Parallel Universes",
  description:
    "Learn how branches let you work on new features safely — like creating parallel universes for your code.",
  order: 2,
  estimatedMinutes: 15,
  xpReward: 75,
  icon: "🌿",
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "What If You Could Clone Yourself?",
          content:
            "Imagine you could make a **copy of yourself** to try a risky experiment. If it works — great, merge back! If it fails — no problem, the original is fine.",
          visual: `
  ┌─────────────────────────────┐
  │  🧙 ← You (safe on main)   │
  │     \\                       │
  │      🧙 ← Clone (feature)  │
  │         experimenting...    │
  └─────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "That's What Branches Do!",
          content:
            "A **branch** is a parallel version of your code. You can make changes on a branch without touching the original.\n\n- **main** = your stable, working code\n- **feature branch** = your experimental playground",
          animation: "pop",
        },
        {
          title: "Creating a Branch",
          content:
            "When you create a branch, git makes a **copy** of your code at that point. From there, the two branches can change independently.",
          visual: `
  main:    ─●────●────●─────────→
                       \\
  feature:  ────●────●────→
                 "try new    "it works!
                  search bar" add styles"`,
          animation: "slide-left",
        },
        {
          title: "Working on a Branch",
          content:
            "While you're on your feature branch, you can:\n\n- Add new files\n- Change existing code\n- Make as many commits as you want\n\n**None of this affects main** until you decide to merge.",
          animation: "slide-up",
        },
        {
          title: "Merging: Bringing It Together",
          content:
            "When your feature is ready, you **merge** it back into main. Git combines both sets of changes into one.\n\nSometimes both branches changed the **same line** — that's a **merge conflict**. You just pick which version to keep!",
          visual: `
  main:    ─●────●────●──────────●─→
                       \\          /
  feature:  ────●────●──→
                          MERGE!`,
          animation: "slide-left",
        },
        {
          title: "Branch Commands",
          content:
            "Here are the key commands:\n\n`git branch feature-name` — Create a new branch\n`git checkout feature-name` — Switch to that branch\n`git merge feature-name` — Merge a branch into your current one\n\nOr the modern shortcut:\n`git switch -c feature-name` — Create AND switch in one step!",
          animation: "pop",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 3,
      content: `## Branch Strategy Guide

### When to Branch

**Always branch when:**
- Adding a new feature (even small ones!)
- Fixing a bug
- Experimenting with an idea

**The golden rule:** Never work directly on \`main\`. Always create a branch first.

### Naming Your Branches

Good branch names describe what you're working on:

| Good | Bad |
|---|---|
| \`feature/search-bar\` | \`my-branch\` |
| \`fix/login-crash\` | \`stuff\` |
| \`experiment/dark-mode\` | \`test123\` |

**Pattern:** \`type/short-description\`
- \`feature/\` for new features
- \`fix/\` for bug fixes
- \`experiment/\` for things you might throw away

### The Branch Lifecycle

1. **Create** a branch from main
2. **Work** on your changes (commit often!)
3. **Test** everything works
4. **Merge** back into main
5. **Delete** the branch (it's done!)

### What About Merge Conflicts?

A merge conflict happens when two branches change the **same line** in the **same file**. Git can't decide which version to keep, so it asks you.

Git shows you both versions:
\`\`\`
<<<<<<< main
background-color: green;
=======
background-color: blue;
>>>>>>> feature/search
\`\`\`

You pick which one to keep (or combine them), remove the markers, and commit. That's it!

### Branches + AI Tools

When using Cursor or Claude with your code:
1. **Create a branch** before asking AI to make big changes
2. If the AI's changes are great → merge
3. If they're not → delete the branch, try again
4. Your main branch stays safe no matter what`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Build a Branch Tree",
      description:
        "Practice creating branches, adding commits, and merging — by dragging items onto the git tree!",
      steps: [
        {
          instruction: scenario1.instruction,
          type: "drag-drop",
          data: scenario1 as unknown as Record<string, unknown>,
          hint: scenario1.hint,
          solution: null,
        },
        {
          instruction: scenario2.instruction,
          type: "drag-drop",
          data: scenario2 as unknown as Record<string, unknown>,
          hint: scenario2.hint,
          solution: null,
        },
        {
          instruction: scenario3.instruction,
          type: "drag-drop",
          data: scenario3 as unknown as Record<string, unknown>,
          hint: scenario3.hint,
          solution: null,
        },
        {
          instruction: scenario4.instruction,
          type: "drag-drop",
          data: scenario4 as unknown as Record<string, unknown>,
          hint: undefined,
          solution: null,
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What is a git branch?",
          type: "multiple-choice",
          options: [
            "A way to delete old code",
            "A parallel version of your code where you can work independently",
            "A backup of your computer",
            "A type of git commit",
          ],
          correctAnswer: 1,
          explanation:
            "A branch is a parallel version of your code. You can make changes on it without affecting the main branch.",
        },
        {
          question:
            "You should always work directly on the main branch.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "You should create a feature branch first! Working directly on main is risky because mistakes affect everyone.",
        },
        {
          question: "What does 'merging' a branch do?",
          type: "multiple-choice",
          options: [
            "Deletes both branches",
            "Combines changes from one branch into another",
            "Creates a new repository",
            "Undoes all your commits",
          ],
          correctAnswer: 1,
          explanation:
            "Merging combines the changes from your feature branch into the target branch (usually main).",
        },
        {
          question: "What causes a merge conflict?",
          type: "multiple-choice",
          options: [
            "Creating too many branches",
            "Two branches changing the same line in the same file",
            "Forgetting to push your code",
            "Using the wrong branch name",
          ],
          correctAnswer: 1,
          explanation:
            "A merge conflict happens when two branches change the same line. Git asks you to pick which version to keep.",
        },
        {
          question:
            "Which is a good branch name for adding a search feature?",
          type: "multiple-choice",
          options: [
            "my-branch",
            "test123",
            "feature/search-bar",
            "stuff",
          ],
          correctAnswer: 2,
          explanation:
            "Good branch names follow the pattern 'type/short-description'. 'feature/search-bar' clearly describes what the branch is for.",
        },
      ],
    },
  ],
};

export default lesson;
