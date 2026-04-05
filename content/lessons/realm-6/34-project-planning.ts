import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "project-planning",
  title: "Project Planning: The Architect's Blueprint",
  description:
    "Before writing code, learn to plan — break it down, sketch it out, and set yourself up for success.",
  order: 34,
  realm: 6,
  estimatedMinutes: 12,
  xpReward: 200,
  icon: "📐",
  boss: {
    name: "The Scope Creep Hydra",
    description:
      "A hydra that grows new heads every time you add just one more feature",
    sprite: "scopeCreepHydra",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Feature Creep!",
      "Endless Redesign!",
      "Perfectionism Paralysis!",
    ],
    defeatText:
      "You define a clear MVP and the Hydra stops growing — ship it!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "Why Plan Before You Code?",
          content:
            "Imagine building a treehouse by just nailing boards together without a plan. Maybe the door ends up on the ceiling. Maybe there's no floor.\n\nCoding without a plan leads to the same chaos — features that don't connect, wasted hours rewriting, and the dreaded **\"I don't even know what this app is supposed to do anymore.\"**\n\nProfessional developers spend **30-50% of their time planning** before writing a single line of code. It feels slow, but it's actually the fastest route to a finished project.\n\n**The rule:** An hour of planning saves ten hours of coding.",
          visual: `
  ┌─── WITHOUT A PLAN ──────────────┐
  │                                   │
  │   🔨 Build → 🤔 Wait...        │
  │   🔨 Rebuild → 😩 Ugh...       │
  │   🔨 Rebuild AGAIN → 😭 Why?!  │
  │                                   │
  │   Total: 30 hours                 │
  ├───────────────────────────────────┤
  │                                   │
  │   WITH A PLAN:                    │
  │                                   │
  │   📐 Plan (2h) → 🔨 Build (8h) │
  │   ✅ Done!                        │
  │                                   │
  │   Total: 10 hours                 │
  └───────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "User Stories: What Does the User Need?",
          content:
            "Before deciding HOW to build something, figure out WHAT it should do — from the **user's** perspective.\n\n**User stories** follow a simple template:\n\n> **\"As a [type of user], I can [do something], so that [benefit].\"**\n\nExamples for a to-do app:\n- As a user, I can **add a task**, so that I remember what to do\n- As a user, I can **mark a task complete**, so that I track my progress\n- As a user, I can **delete a task**, so that I keep my list clean\n\nUser stories keep you focused on **real needs** instead of getting lost in cool-but-unnecessary features.",
          visual: `
  ┌─── USER STORY TEMPLATE ─────────┐
  │                                   │
  │  "As a ________,                  │
  │   I can ________,                 │
  │   so that ________."              │
  │                                   │
  ├─── EXAMPLE: Quest Tracker ────────┤
  │                                   │
  │  📝 "As a hero, I can add a      │
  │      quest, so I know what        │
  │      adventures await."           │
  │                                   │
  │  ✅ "As a hero, I can mark a     │
  │      quest complete, so I earn    │
  │      my reward."                  │
  │                                   │
  │  🗑️  "As a hero, I can delete    │
  │      a quest I no longer need."   │
  └───────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Wireframing: Sketch Before You Code",
          content:
            "A **wireframe** is a rough sketch of what your app will look like — no colors, no fancy fonts, just boxes and labels.\n\nWhy sketch first?\n- **Fast to change** — erasing a line takes 2 seconds, rewriting a component takes 2 hours\n- **Reveals missing pieces** — \"Wait, where does the user click to go back?\"\n- **Aligns the vision** — everyone sees the same plan\n\nYou don't need fancy tools. A pencil and paper (or ASCII art!) works perfectly. The goal is **structure**, not beauty.",
          visual: `
  ┌─── WIREFRAME: Quest Tracker ────┐
  │ ┌─────────────────────────────┐  │
  │ │  ⚔️  Quest Tracker   [+ Add]│  │
  │ └─────────────────────────────┘  │
  │ ┌─────────────────────────────┐  │
  │ │ [ ] Defeat the Dragon       │  │
  │ │ [x] Find the Magic Sword    │  │
  │ │ [ ] Rescue the Village      │  │
  │ └─────────────────────────────┘  │
  │ ┌─────────────────────────────┐  │
  │ │  Quests: 3  |  Done: 1      │  │
  │ └─────────────────────────────┘  │
  │                                   │
  │  ^ This took 5 minutes to draw.  │
  │  Building it blind? Hours lost.   │
  └───────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Breaking Into Tasks",
          content:
            "A whole project feels overwhelming. **\"Build a to-do app\"** — where do you even start?\n\nThe secret: break it into **tiny, concrete tasks** you can finish in 30 minutes to 2 hours each.\n\n```\nQuest Tracker — Task List\n─────────────────────────\n1. Set up project (npm init, install deps)   ~30 min\n2. Create the HTML layout                    ~45 min\n3. Add CSS styling                           ~1 hour\n4. Write \"add quest\" function                ~45 min\n5. Write \"complete quest\" function           ~30 min\n6. Write \"delete quest\" function             ~30 min\n7. Add quest counter                         ~30 min\n8. Test everything                           ~30 min\n```\n\nNow you have a **roadmap**. Each task is one clear step — no confusion about what to do next.",
          visual: `
  ┌─── TASK BREAKDOWN ──────────────┐
  │                                   │
  │  BIG SCARY PROJECT:               │
  │  😰 "Build a quest tracker"      │
  │        │                          │
  │        ▼ break it down!           │
  │                                   │
  │  SMALL CLEAR TASKS:               │
  │  ✅ Task 1 — setup     (30 min)  │
  │  ✅ Task 2 — HTML      (45 min)  │
  │  ✅ Task 3 — CSS       (1 hour)  │
  │  ✅ Task 4 — add fn    (45 min)  │
  │  ✅ Task 5 — complete  (30 min)  │
  │  ✅ Task 6 — delete    (30 min)  │
  │                                   │
  │  😎 "I know exactly what to do!" │
  └───────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "MVP Thinking: Ship the Simplest Version",
          content:
            "**MVP** = Minimum Viable Product — the **smallest version** of your project that actually works and is useful.\n\nYour brain will scream: *\"Add dark mode! Add animations! Add multiplayer! Add AI!\"*\n\nThat's the **Scope Creep Hydra** — every new idea grows a new head, and suddenly your weekend project takes six months.\n\n**MVP approach:**\n1. List ALL the features you want\n2. Circle ONLY the ones needed for it to **work at all**\n3. Build those. Ship it.\n4. Add extras **after** the core works\n\nRemember: a finished simple app beats an unfinished complex one **every time**.",
          visual: `
  ┌─── MVP vs EVERYTHING ───────────┐
  │                                   │
  │  🐉 THE SCOPE CREEP HYDRA:      │
  │  "Just one more feature..."       │
  │  "What about dark mode?"          │
  │  "It NEEDS multiplayer!"          │
  │                                   │
  │  ✂️  CUT IT DOWN TO MVP:         │
  │                                   │
  │  ✅ Add quests        ← MUST     │
  │  ✅ Complete quests   ← MUST     │
  │  ✅ Delete quests     ← MUST     │
  │  ❌ Dark mode         ← LATER   │
  │  ❌ Animations        ← LATER   │
  │  ❌ Multiplayer       ← LATER   │
  │                                   │
  │  Ship MVP first. Polish second.   │
  └───────────────────────────────────┘`,
          animation: "swoosh",
        },
        {
          title: "Project File Structure: Organize Your Kingdom",
          content:
            "Before coding, plan **where** your files will live. A clean structure keeps you sane as the project grows.\n\nA typical web project:\n\n```\nquest-tracker/\n├── index.html          ← main page\n├── style.css           ← all styles\n├── app.js              ← main logic\n├── package.json        ← dependencies\n├── .gitignore          ← files git ignores\n└── README.md           ← what this project is\n```\n\nAs projects grow, you add folders: `src/` for source code, `assets/` for images, `tests/` for test files. But start simple — don't over-organize a 3-file project into 15 folders.",
          visual: `
  ┌─── FILE STRUCTURE ──────────────┐
  │                                   │
  │  quest-tracker/                   │
  │  ├── 📄 index.html               │
  │  ├── 🎨 style.css                │
  │  ├── ⚡ app.js                   │
  │  ├── 📦 package.json             │
  │  ├── 🚫 .gitignore               │
  │  └── 📖 README.md                │
  │                                   │
  │  RULE OF THUMB:                   │
  │  ┌───────────────────────────┐    │
  │  │ Start FLAT. Add folders   │    │
  │  │ only when you NEED them.  │    │
  │  │ 3 files ≠ 15 folders.    │    │
  │  └───────────────────────────┘    │
  └───────────────────────────────────┘`,
          animation: "page-flip",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Project Planning Cheat Sheet

### The 5 Planning Steps

Every project — whether it's a weekend hack or a team effort — benefits from these five steps:

1. **Define the goal** — What problem does this solve? Who is it for? One sentence.
2. **Write user stories** — What can the user DO? List every action.
3. **Wireframe** — Sketch the screens. Boxes and labels, nothing fancy.
4. **Break into tasks** — Tiny, concrete steps. Each under 2 hours.
5. **Start coding** — NOW you open your editor. Not before.

### User Story Template

\`\`\`
As a [type of user],
I can [perform an action],
so that [I get a benefit].
\`\`\`

**Good examples:**
- "As a student, I can save my homework answers, so that I don't lose my work."
- "As a player, I can see my high score, so that I can try to beat it."
- "As a parent, I can view my child's progress, so that I know how they're doing."

**Bad examples:**
- "The app should be fast" — too vague, not a user action
- "Use React and Tailwind" — that's a tech choice, not a user need
- "Make it look cool" — not specific or measurable

### Wireframing Tips

- **Use paper first** — faster than any tool
- **Label everything** — "Header," "Add Button," "Quest List"
- **Show the flow** — Screen 1 → click "Add" → Screen 2 (form) → submit → back to Screen 1
- **Include edge cases** — What does it look like with 0 items? With 100?
- **Tools if you want them:** Excalidraw (free), Figma (free tier), or plain ASCII art

### Task Breakdown Rules

| Rule | Why |
|---|---|
| Each task takes 30 min – 2 hours | Longer tasks mean you haven't broken it down enough |
| Tasks are verifiable | "Add a button that saves a quest" — you can test this |
| Order matters | Build the foundation first (setup, HTML) before features |
| Include testing | Don't forget "test that X works" as its own task |

### MVP Definition

**MVP = Minimum Viable Product**

The smallest version that:
- **Works** — it actually does something useful
- **Is complete** — no half-finished features
- **Can be used** — someone could open it and accomplish the goal

**What MVP is NOT:**
- A broken prototype with "TODO" everywhere
- A feature-complete polished product
- Just a wireframe or design

The goal: get something **real** in front of users (or yourself) as fast as possible, then improve based on what you learn.

### Project Planning Tools

| Tool | Best For | Cost |
|---|---|---|
| Pen & paper | Quick wireframes, brainstorming | Free |
| GitHub Issues | Task tracking, bug reports | Free |
| Excalidraw | Digital wireframes, diagrams | Free |
| Notion | Notes, docs, kanban boards | Free tier |
| Trello | Simple task boards | Free tier |

You don't need fancy tools to plan well. A notebook and a checklist can take you surprisingly far.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "The Architect's Trials",
      description:
        "Prove you can plan a project like a seasoned architect — ordering steps, picking MVPs, and knowing when to code.",
      steps: [
        {
          instruction:
            "You're starting a brand new project. Put these planning steps in the correct order:",
          type: "sequence",
          data: {
            items: [
              {
                id: "define",
                text: "Define the goal",
                description: "What problem does this solve? Who is it for?",
              },
              {
                id: "features",
                text: "Write user stories",
                description:
                  "List what the user can do: 'As a user, I can...'",
              },
              {
                id: "wireframe",
                text: "Wireframe the screens",
                description:
                  "Sketch rough layouts — boxes and labels, not pixel-perfect designs",
              },
              {
                id: "tasks",
                text: "Break into tasks",
                description:
                  "Split the work into small, concrete steps (30 min – 2 hours each)",
              },
              {
                id: "code",
                text: "Start coding",
                description:
                  "Open your editor and begin building — the plan is your guide",
              },
            ],
            correctOrder: ["define", "features", "wireframe", "tasks", "code"],
          },
          hint: "Start with the big picture (what and why), then get more specific (how), and code last.",
        },
        {
          instruction:
            "You're building a recipe app. Which set of features is the best MVP?",
          type: "multiple-choice",
          data: {
            options: [
              "Add recipes, edit recipes, delete recipes, search recipes, share to social media, AI recipe suggestions, meal planning calendar, grocery list generator",
              "Add recipes, view recipes, delete recipes",
              "Just a landing page that says 'Coming Soon'",
              "Full recipe database with ratings, reviews, video tutorials, and a cooking timer",
            ],
          },
          solution: 1,
          hint: "MVP = the smallest set of features that makes the app actually useful. Not a coming-soon page, but not every feature you can imagine either.",
        },
        {
          instruction:
            "You've finished your wireframes and user stories. When should you start coding?",
          type: "multiple-choice",
          data: {
            options: [
              "Immediately — wireframes and stories are enough to start",
              "After you've broken the work into small, concrete tasks",
              "After you've chosen the perfect color scheme and fonts",
              "After you've built the entire database schema and API design",
            ],
          },
          solution: 1,
          hint: "There's one more planning step between wireframes and coding — making sure you know exactly what to build first, second, third...",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "Why should you plan a project before writing code?",
          type: "multiple-choice",
          options: [
            "Planning is required by law for all software projects",
            "It prevents wasted time from building the wrong thing or getting lost mid-project",
            "Code written without a plan won't compile",
            "Planning replaces the need for testing",
          ],
          correctAnswer: 1,
          explanation:
            "Planning saves time by catching problems early — wrong features, missing screens, unclear goals — before you spend hours coding them. An hour of planning can save ten hours of rework.",
        },
        {
          question:
            "Which of these is a well-written user story?",
          type: "multiple-choice",
          options: [
            "The app should use React and have good performance",
            "Make the button blue and add a hover effect",
            "As a player, I can save my game progress, so that I can continue later",
            "Build the backend API with proper error handling",
          ],
          correctAnswer: 2,
          explanation:
            "User stories follow the template: 'As a [user], I can [action], so that [benefit].' They describe what the user needs, not implementation details or visual design choices.",
        },
        {
          question: "What is a wireframe?",
          type: "multiple-choice",
          options: [
            "The final, pixel-perfect design of the app",
            "A rough sketch showing the layout and structure of screens — boxes and labels, not colors",
            "A type of CSS framework for building layouts",
            "A testing tool that checks if your HTML is valid",
          ],
          correctAnswer: 1,
          explanation:
            "A wireframe is a low-fidelity sketch that shows where things go on the screen — headers, buttons, lists, forms. It's fast to create and easy to change, which is why you sketch before you code.",
        },
        {
          question: "What does MVP stand for, and what does it mean?",
          type: "multiple-choice",
          options: [
            "Most Valuable Player — the best feature in your app",
            "Maximum Viable Product — build as many features as possible",
            "Minimum Viable Product — the smallest version that works and is useful",
            "Minimum Visual Presentation — the simplest design possible",
          ],
          correctAnswer: 2,
          explanation:
            "MVP = Minimum Viable Product. It's the smallest, simplest version of your project that actually works and provides value. Ship the MVP first, then add features based on what you learn.",
        },
        {
          question:
            "When breaking a project into tasks, how long should each task take?",
          type: "multiple-choice",
          options: [
            "Each task should take exactly 1 week",
            "30 minutes to 2 hours — if it's longer, break it down further",
            "As long as needed — some tasks naturally take days",
            "Under 5 minutes — the smaller the better",
          ],
          correctAnswer: 1,
          explanation:
            "Tasks should be 30 minutes to 2 hours each. This keeps them small enough to feel achievable, clear enough to verify when done, and concrete enough that you always know what to work on next. If a task feels bigger, it probably needs to be split.",
        },
      ],
    },
  ],
};

export default lesson;
