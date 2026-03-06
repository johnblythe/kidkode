import { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "git-save-points",
  title: "Git: Save Points for Your Code",
  description: "Learn how Git works like save points in a video game — letting you save progress, go back in time, and try different paths.",
  order: 1,
  estimatedMinutes: 12,
  xpReward: 50,
  icon: "💾",
  boss: {
    name: "Merge Conflict Hydra",
    description: "A multi-headed beast born from diverging branches",
    sprite: "hydra",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Diverging History Slam!",
      "Unresolved Conflict Bite!",
      "Detached HEAD Strike!",
    ],
    defeatText: "The Hydra's heads collapse as your commits align!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "Imagine You're Playing a Game...",
          content: "You're deep in a dungeon. You just found an epic sword. What's the **first thing** you do?",
          visual: `
  ┌─────────────────────────────┐
  │  🏰  DUNGEON LEVEL 5       │
  │                             │
  │    🧙 ← You                │
  │         ⚔️ ← Epic Sword    │
  │                             │
  │  💾 SAVE POINT?            │
  └─────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "You SAVE the game!",
          content: "Because if you walk into the next room and a dragon eats you, you want to come back to **this** moment — with the sword, with full health, with everything exactly as it is.",
          animation: "pop",
        },
        {
          title: "Git is Save Points for Code",
          content: "**Git** does the same thing for your code.\n\nEvery time you make something work — a new feature, a bug fix, a cool design — you **save** that moment.\n\nThat save is called a **commit**.",
          visual: `
  Timeline:
  ─●──────●──────●──────●──→
   │      │      │      │
  "start" "add   "fix   "add
   page"  header" bug"  style"`,
          animation: "slide-left",
        },
        {
          title: "What's Inside a Commit?",
          content: "A commit saves **three things**:\n\n1. **What changed** — the actual code differences\n2. **Who changed it** — your name\n3. **Why it changed** — your message describing what you did",
          visual: `
  ┌─── Commit ─────────────────┐
  │ 📝 Message: "Add Pokemon   │
  │              search bar"   │
  │ 👤 Author:  You            │
  │ 📅 Date:    March 3, 2026  │
  │ 📦 Changes: +42 lines      │
  └────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Branches: Parallel Universes",
          content: "What if you want to **try something risky** without messing up your working code?\n\nYou create a **branch** — a parallel universe where you can experiment.\n\nIf it works → merge it back.\nIf it fails → delete it. No harm done.",
          visual: `
  main:     ─●────●────●────●────●─→
                    \\              /
  experiment: ────●────●────●──→
                   "try new    "it worked!
                    layout"     merge it"`,
          animation: "slide-left",
        },
        {
          title: "The Big Picture",
          content: "Git gives you **superpowers**:\n\n🔄 **Undo mistakes** — go back to any save point\n🌿 **Try things safely** — branches are free experiments\n👥 **Work with others** — everyone has their own copy\n📜 **See history** — what changed, when, and why",
          animation: "pop",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 2,
      content: `## Git Cheat Sheet

### The 3 Key Commands

**\`git add\`** — Stage your changes (put them in the "ready to save" pile)

**\`git commit -m "your message"\`** — Save a snapshot with a description

**\`git push\`** — Upload your saves to the cloud (GitHub)

### Think of it Like This

| Real Life | Git |
|---|---|
| Save game | \`git commit\` |
| Different save slot | Branch |
| Load a save | \`git checkout\` |
| Upload save to cloud | \`git push\` |
| Download save from cloud | \`git pull\` |

### Good Commit Messages

**Bad:** \`"update stuff"\` — update WHAT stuff?!

**Good:** \`"Add search bar to Pokemon list page"\` — clear, specific, tells the story

**Rule of thumb:** Your message should finish the sentence: *"This commit will..."*

### Why This Matters When Using AI

When you use Cursor or any AI coding tool, Git is your **safety net**. Before you ask the AI to make a big change:

1. **Commit** what you have (save point!)
2. Let the AI make changes
3. **Test it** — does it work?
4. If yes → commit again ✅
5. If no → \`git checkout .\` to undo everything back to your save ↩️

Without Git, if the AI breaks something, you're stuck trying to remember what your code looked like before. With Git, you just load your last save.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Build a Commit",
      description: "Put the steps in the right order to save your code changes with Git.",
      steps: [
        {
          instruction: "You just added a new Pokemon search feature. Put these Git steps in the right order:",
          type: "sequence",
          data: {
            items: [
              { id: "add", text: "git add .", description: "Stage all changed files" },
              { id: "commit", text: 'git commit -m "Add Pokemon search"', description: "Save a snapshot" },
              { id: "push", text: "git push", description: "Upload to GitHub" },
              { id: "test", text: "Test that it works", description: "Make sure nothing is broken" },
            ],
            correctOrder: ["test", "add", "commit", "push"],
          },
          hint: "Think about it: would you save before or after checking that things work?",
        },
        {
          instruction: "Which commit message is better for adding a dark mode toggle?",
          type: "multiple-choice",
          data: {
            options: [
              "fixed stuff",
              "Add dark mode toggle to settings page",
              "changes",
              "asdfasdf",
            ],
          },
          hint: "Your message should finish the sentence: 'This commit will...'",
          solution: 1,
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What is a Git commit most like?",
          type: "multiple-choice",
          options: [
            "Deleting your old code",
            "A save point in a video game",
            "Turning off your computer",
            "Copying a file to a USB drive",
          ],
          correctAnswer: 1,
          explanation: "A commit is like a save point — it captures exactly what your code looks like at that moment, and you can always go back to it.",
        },
        {
          question: "What does a Git branch let you do?",
          type: "multiple-choice",
          options: [
            "Delete all your code permanently",
            "Make your code run faster",
            "Try changes safely without affecting your main code",
            "Send your code to a friend",
          ],
          correctAnswer: 2,
          explanation: "Branches are like parallel universes — you can experiment freely, and if things go wrong, your main code is untouched.",
        },
        {
          question: "A good commit message should be clear and specific.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation: "Good commit messages tell the story of your project. 'Add Pokemon search bar' is way better than 'update stuff'.",
        },
        {
          question: "Before asking AI to make big code changes, you should:",
          type: "multiple-choice",
          options: [
            "Delete your project and start over",
            "Commit your current working code first",
            "Close your editor",
            "It doesn't matter",
          ],
          correctAnswer: 1,
          explanation: "Always save (commit) before letting AI make big changes. That way if something breaks, you can go back to your save point!",
        },
        {
          question: "What does 'git push' do?",
          type: "multiple-choice",
          options: [
            "Deletes your local code",
            "Runs your code",
            "Uploads your commits to a remote server like GitHub",
            "Creates a new branch",
          ],
          correctAnswer: 2,
          explanation: "git push uploads your local commits to a remote server (like GitHub), so your code is backed up and others can see it.",
        },
      ],
    },
  ],
};

export default lesson;
