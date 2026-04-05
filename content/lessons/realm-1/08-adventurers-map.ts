import { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "adventurers-map",
  title: "The Adventurer's Map: What is Code?",
  description:
    "Discover what code really is — instructions that make computers do amazing things, from video games to space rockets.",
  order: 1,
  realm: 1,
  estimatedMinutes: 10,
  xpReward: 50,
  icon: "\u{1F5FA}\uFE0F",
  boss: {
    name: "The Block Golem",
    description:
      "A clunky creature made of drag-and-drop blocks that refuses to evolve beyond visual coding",
    sprite: "blockGolem",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Snap Block Slam!",
      "Drag & Drop Crush!",
      "Visual-Only Blast!",
    ],
    defeatText:
      "The Block Golem shatters as you prove that real code gives you superpowers beyond blocks!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "Code Is Just Instructions",
          content:
            "At its core, **code** is a set of instructions. That's it.\n\nThink about things you already follow instructions for — a recipe tells you how to make a cake, LEGO instructions tell you how to build a spaceship, and game rules tell you how to play.\n\nCode works the same way, except the one following the instructions is a **computer**. And computers follow instructions *perfectly* — every single time.",
          visual: `
    ┌──────────────────────────────────┐
    │   RECIPE         CODE            │
    │  ┌──────┐      ┌──────────┐      │
    │  │1.Mix │      │1.Open    │      │
    │  │2.Bake│  ──► │2.Calculate│     │
    │  │3.Eat │      │3.Display │      │
    │  └──────┘      └──────────┘      │
    │                                  │
    │  Instructions → Result           │
    │  Same idea. Different audience.  │
    └──────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Code Is Everywhere",
          content:
            "Every app on your phone, every game you play, every website you visit — someone wrote the code that makes it work.\n\n**Minecraft?** Written in Java. **Fortnite?** C++ and Blueprints. **TikTok?** A mix of Python, Java, and JavaScript. **YouTube?** Runs on a mountain of code.\n\nEven things you might not think of — traffic lights, space rockets, hospital machines — are all controlled by code that someone sat down and wrote.",
          visual: `
    ┌─────────────────────────────────┐
    │   YOUR WORLD RUNS ON CODE       │
    │                                 │
    │   [Phone]  [Game]  [Robot]      │
    │    📱       🎮      🤖          │
    │     ↓        ↓       ↓          │
    │    code     code    code        │
    │                                 │
    │   [Rocket] [Music] [Hospital]   │
    │    🚀       🎵      🏥          │
    │     ↓        ↓       ↓          │
    │    code     code    code        │
    └─────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "From Blocks to Text",
          content:
            "If you've used Scratch (or any block-coding tool), you already understand the core ideas — loops, conditions, variables. You've been coding!\n\nBlock-based tools are like training wheels. They help you learn *how to think* like a programmer. But text-based code is where the real power lives. It's faster, more flexible, and it's what every professional developer uses.\n\nYou're ready to take that next step.",
          visual: `
    ┌─────────────────────────────────┐
    │  BLOCKS           TEXT CODE     │
    │  ┌─────────┐                    │
    │  │ when 🟢  │    let score = 0; │
    │  │ repeat 10│    for (let i=0;  │
    │  │  move 10 │      i<10; i++) { │
    │  │  turn ↻  │      move(10);    │
    │  └─────────┘      turn(15);     │
    │                   }             │
    │   Same logic ──► More power     │
    └─────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "What You'll Learn in KidKode",
          content:
            "This isn't just theory — you're going to **build real things**.\n\nYour journey through the realms will take you from zero to actually dangerous:\n\n- **The Terminal** — command your computer like a hacker\n- **Git** — save points for your code, never lose work again\n- **HTML & CSS** — build web pages from scratch\n- **JavaScript** — make things move, react, and come alive\n- **Full projects** — real apps, real tools, real code",
          visual: `
    ┌─────────────────────────────────┐
    │         YOUR QUEST MAP          │
    │                                 │
    │  Terminal ──► Git ──► HTML/CSS  │
    │      \\                  /       │
    │       ▼                ▼        │
    │    Command          Build       │
    │    the machine     the web      │
    │             \\      /            │
    │              ▼    ▼             │
    │          JavaScript             │
    │          Make it live!           │
    └─────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Your Quest Begins",
          content:
            "Right now, somewhere in the world, a kid about your age is writing code that solves a real problem. Maybe it's an app, maybe it's a game, maybe it's something nobody has thought of yet.\n\nThere's nothing stopping you from being that kid.\n\nYou've got the curiosity — that's the hardest part. The rest is just practice, one lesson at a time. Let's go.",
          visual: `
    ┌─────────────────────────────────┐
    │                                 │
    │         ⚔️  QUEST START  ⚔️     │
    │                                 │
    │           /|                    │
    │          / |  "I'm ready."     │
    │         /__|                    │
    │          /\\                     │
    │         /  \\                    │
    │                                 │
    │    [ Press NEXT to begin... ]   │
    │                                 │
    └─────────────────────────────────┘`,
          animation: "pop",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 3,
      content: `## What is Code? — Quick Reference

### Code = Instructions for Computers

A **program** is a set of step-by-step instructions written in a language a computer can understand. You write the instructions, the computer executes them — instantly, precisely, millions of times without complaining.

---

### Why Learn to Code?

| Reason | What It Means |
|---|---|
| **Build things** | Create games, apps, websites, robots |
| **Solve problems** | Automate boring stuff, help people |
| **Think sharper** | Coding trains logical thinking |
| **Career power** | One of the most in-demand skills on Earth |
| **Creative freedom** | If you can imagine it, you can build it |

---

### Languages You'll Encounter

\`\`\`
JavaScript  → websites, apps, games (you'll learn this!)
HTML / CSS  → structure and style of web pages
Python      → data science, AI, automation
Java        → Android apps, Minecraft
C++         → game engines, operating systems
\`\`\`

### A Taste of Real Code

Here's JavaScript that shows a message on a web page:

\`\`\`js
let playerName = "You";
console.log(playerName + " has entered the dungeon!");
// Output: "You has entered the dungeon!"
\`\`\`

That's it — three lines, and the computer does exactly what you told it.

---

### The Journey Ahead

1. **Realm 1** — Terminal, Git, and your first code
2. **Realm 2** — HTML & CSS: build the web
3. **Realm 3** — JavaScript: make things interactive
4. **Realm 4** — Backend: servers, databases, real apps
5. **Realm 5** — AI tools, APIs, and beyond

Each realm has lessons, interactive challenges, and a **boss battle** at the end. Defeat the boss to prove your mastery and unlock the next realm.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Code or Not?",
      description:
        "Test your instincts — can you tell what counts as code and what doesn't?",
      steps: [
        {
          instruction: "Which of these is NOT code?",
          type: "multiple-choice",
          data: {
            options: [
              "A JavaScript file that makes a button work",
              "An HTML page that displays a website",
              "A photograph of a sunset",
              "A Python script that calculates your grade",
            ],
          },
          hint: "Code is instructions a computer follows. Which of these is just... a thing?",
          solution: 2,
        },
        {
          instruction:
            "Put these coding concepts in order from simplest to most complex:",
          type: "sequence",
          data: {
            items: [
              {
                id: "variables",
                text: "Variables",
                description: "Store a piece of information, like a name or score",
              },
              {
                id: "functions",
                text: "Functions",
                description: "Reusable blocks of instructions that do a specific job",
              },
              {
                id: "websites",
                text: "Websites",
                description: "Multiple pages with HTML, CSS, and JavaScript working together",
              },
              {
                id: "apps",
                text: "Full Applications",
                description: "Complete programs with databases, servers, and user interfaces",
              },
            ],
            correctOrder: ["variables", "functions", "websites", "apps"],
          },
          hint: "Think about what builds on what — you need the small pieces before you can make the big ones.",
        },
        {
          instruction: "What does a programmer actually do?",
          type: "multiple-choice",
          data: {
            options: [
              "Writes instructions that tell computers what to do",
              "Draws pictures on a screen all day",
              "Fixes broken hardware like keyboards and monitors",
              "Types really fast and hopes for the best",
            ],
          },
          hint: "Remember: code is instructions. So a coder is someone who...",
          solution: 0,
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What is code, at its most basic?",
          type: "multiple-choice",
          options: [
            "A set of instructions a computer follows",
            "A secret language only geniuses understand",
            "A type of video game",
            "Something that only works on expensive computers",
          ],
          correctAnswer: 0,
          explanation:
            "Code is simply instructions written for a computer. Anyone can learn to write them — including you.",
        },
        {
          question: "Which of these was built with code?",
          type: "multiple-choice",
          options: [
            "Minecraft",
            "TikTok",
            "YouTube",
            "All of the above",
          ],
          correctAnswer: 3,
          explanation:
            "Every app, game, and website is built with code — Minecraft (Java), TikTok (Python/Java/JS), and YouTube included.",
        },
        {
          question: "Why is text-based code more powerful than block-based coding tools like Scratch?",
          type: "multiple-choice",
          options: [
            "It looks cooler",
            "It's faster, more flexible, and used by all professional developers",
            "Blocks don't actually teach you anything",
            "Text code is easier to learn",
          ],
          correctAnswer: 1,
          explanation:
            "Block-based tools are great for learning the concepts, but text code gives you full control and is what every real-world project uses.",
        },
        {
          question:
            "If you've used Scratch before, you already understand some core programming ideas.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Scratch teaches loops, conditions, and variables — the same core ideas used in every programming language. You're ahead of the game!",
        },
        {
          question: "What will you learn to build in KidKode?",
          type: "multiple-choice",
          options: [
            "Only theory and definitions",
            "Real websites, apps, and tools using actual code",
            "How to use a calculator",
            "How to type faster",
          ],
          correctAnswer: 1,
          explanation:
            "KidKode is hands-on — you'll build real projects using the terminal, Git, HTML, CSS, JavaScript, and more.",
        },
      ],
    },
  ],
};

export default lesson;
