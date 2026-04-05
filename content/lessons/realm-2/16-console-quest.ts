import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "console-quest",
  title: "The Gauntlet: Console Quest",
  description:
    "Put your new skills to the test! Build a console-based adventure using variables, conditions, loops, and functions.",
  order: 12,
  realm: 2,
  estimatedMinutes: 15,
  xpReward: 150,
  icon: "⚔️",
  boss: {
    name: "The Logic Gargoyle",
    description:
      "A stone beast that tests your ability to combine all your skills — only a true coder can pass",
    sprite: "logicGargoyle",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Combined Logic Crush!",
      "Integration Test Slam!",
      "Skill Check Blast!",
    ],
    defeatText:
      "The Gargoyle crumbles — you've proven you can combine variables, conditions, loops, and functions!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Quest",
          content:
            "You've learned variables, conditions, loops, and functions — four powerful spells, each dangerous on its own. But here's the secret every master coder knows: **the real magic happens when you combine them.**\n\nToday you're building a **Number Guessing Game**. The computer picks a secret number between 1 and 100. You guess. It tells you \"higher\" or \"lower.\" You keep guessing until you nail it.\n\nThis tiny project uses **every skill you've learned**: variables to store the secret number and attempts, conditions to check each guess, a loop to keep the game running, and a function to organize the logic. Let's go.",
          visual: `
  ┌─────────────────────────────────┐
  │  🎯 NUMBER GUESSING GAME       │
  │                                 │
  │  Skills needed:                 │
  │  ├─ 📦 Variables (store data)  │
  │  ├─ 🔀 Conditions (compare)   │
  │  ├─ 🔄 Loops (keep going)     │
  │  └─ 🧬 Functions (organize)   │
  │                                 │
  │  Computer: "I picked a number" │
  │  You:      "Is it 50?"         │
  │  Computer: "Higher!"           │
  │  You:      "75?"               │
  │  Computer: "Lower!"            │
  │  You:      "63?"               │
  │  Computer: "🎉 Correct!"       │
  └─────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "The Blueprint",
          content:
            "Before writing any code, a good coder **plans**. Here's the blueprint for our game:\n\n**Step 1** — Generate a random secret number (1–100) and store it in a variable.\n**Step 2** — Write a `checkGuess()` function that compares a guess to the secret and returns whether it's too low, too high, or correct.\n**Step 3** — Use a `while` loop that keeps asking for guesses until the player gets it right.\n**Step 4** — Track the number of attempts in a variable, and celebrate when the player wins.\n\nNotice how each step maps to a skill you already know? There's nothing new here — just four familiar tools working together.",
          visual: `
  ┌─── Game Blueprint ─────────────┐
  │                                 │
  │  1. 📦 secret = random(1-100)  │
  │           │                     │
  │  2. 🧬 checkGuess(guess, sec) │
  │           │                     │
  │  3. 🔄 while (not correct) {  │
  │        │  get guess             │
  │        │  check it              │
  │        │  give feedback         │
  │        └─ loop back             │
  │           │                     │
  │  4. 🎉 "You got it in X!"     │
  └─────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Building Blocks",
          content:
            "Quick reminder of the tools you'll use — no new concepts here, just a refresher.\n\n**Random number:** `Math.floor(Math.random() * 100) + 1` gives you a whole number from 1 to 100. `Math.random()` picks a decimal between 0 and 1, multiplying by 100 stretches the range, `Math.floor()` chops off the decimal, and `+ 1` shifts from 0–99 to 1–100.\n\n**Function:** `function checkGuess(guess, secret) { ... }` packages our comparison logic so we can reuse it cleanly.\n\n**While loop:** `while (guess !== secret) { ... }` keeps the game alive until the player finds the answer.\n\n**Variable:** `let attempts = 0` and `attempts++` count how many tries it took.",
          visual: `
  ┌─── Your Toolkit ───────────────┐
  │                                 │
  │  Math.floor(Math.random()*100)+1│
  │  └─ random whole number 1-100  │
  │                                 │
  │  function checkGuess(g, s) {   │
  │    if (g < s) return "Higher!" │
  │    if (g > s) return "Lower!"  │
  │    return "Correct!"           │
  │  }                              │
  │                                 │
  │  while (guess !== secret) {    │
  │    // keep playing              │
  │  }                              │
  │                                 │
  │  let attempts = 0;             │
  │  attempts++;  // each round    │
  └─────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Let's Build!",
          content:
            "You have all four tools in your belt. You've seen the blueprint. Now it's time to **combine them** and build this thing piece by piece.\n\nIn the next sections you'll assemble the game step by step — generating the secret number, writing the check function, wiring up the loop, and tracking attempts. Each piece is something you've already done before; the only new part is putting them together.\n\nThis is what real programming feels like. Not memorizing syntax — **solving problems by snapping small pieces together.** Ready? Let's forge the Console Quest.",
          visual: `
  ┌─────────────────────────────────┐
  │                                 │
  │       ⚔️  CONSOLE QUEST  ⚔️    │
  │                                 │
  │     You have the skills.        │
  │     You have the plan.          │
  │     Time to build.              │
  │                                 │
  │  ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
  │  │VAR│+│IF │+│🔄│+│f()│ = 🎮  │
  │  └───┘ └───┘ └───┘ └───┘      │
  │                                 │
  │     Forge your first project!   │
  └─────────────────────────────────┘`,
          animation: "pop",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 3,
      content: `## Project Blueprint: Number Guessing Game

Here's the full game broken into four steps. Read through the code patterns — you'll build each piece in the interactive section.

### Step 1 — Generate the Secret Number

\`\`\`js
const secret = Math.floor(Math.random() * 100) + 1;
\`\`\`

- \`Math.random()\` → decimal between 0 and 0.999...
- \`* 100\` → stretches to 0–99.999...
- \`Math.floor()\` → chops the decimal: 0–99
- \`+ 1\` → shifts to 1–100

One line, one variable, one random number. Done.

### Step 2 — The checkGuess Function

\`\`\`js
function checkGuess(guess, secret) {
  if (guess < secret) {
    return "Too low!";
  }
  if (guess > secret) {
    return "Too high!";
  }
  return "Correct!";
}
\`\`\`

Three paths, three conditions. The function takes two inputs and returns a string telling the player what to do next. Clean and reusable — you could plug this into any guessing game.

### Step 3 — The Game Loop

\`\`\`js
let guess = 0;

while (guess !== secret) {
  guess = getPlayerInput(); // imagine this gets a number
  console.log(checkGuess(guess, secret));
}
\`\`\`

The \`while\` loop keeps running as long as \`guess !== secret\`. Each lap, it grabs a new guess and checks it. The moment the player guesses right, \`guess === secret\`, the condition is false, and the loop stops.

### Step 4 — Track Attempts

\`\`\`js
let attempts = 0;

while (guess !== secret) {
  guess = getPlayerInput();
  attempts++;
  console.log(checkGuess(guess, secret));
}

console.log("You got it in " + attempts + " tries!");
\`\`\`

Add a counter variable, bump it each round with \`attempts++\`, and celebrate at the end. That's the whole game.

### How the Pieces Connect

| Concept | Role in the Game |
|---|---|
| **Variable** | \`secret\`, \`guess\`, \`attempts\` — storing data |
| **Condition** | \`if (guess < secret)\` — deciding feedback |
| **Loop** | \`while (guess !== secret)\` — repeating turns |
| **Function** | \`checkGuess()\` — organizing logic |

Every skill you learned has a job. That's the power of combining your tools.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Forge the Console Quest",
      description:
        "Build the number guessing game piece by piece — each step uses skills you already know.",
      steps: [
        {
          instruction:
            "Generate the secret number. Fill in the missing method that produces a random decimal between 0 and 1.",
          type: "fill-blank",
          data: {
            template: "const secret = Math.floor(Math.___() * 100) + 1",
            blanks: [{ id: "method", placeholder: "method" }],
          },
          solution: {
            method: "random",
          },
          hint: "Which Math method gives you a random decimal? It starts with 'r'.",
        },
        {
          instruction:
            "Complete the checkGuess function. What operator checks if the guess is less than the secret?",
          type: "fill-blank",
          data: {
            template:
              'function checkGuess(guess, secret) {\n  if (guess ___ secret) { return "Too low!"; }\n}',
            blanks: [{ id: "op", placeholder: "operator" }],
          },
          solution: {
            op: "<",
          },
          hint: "You need the 'less than' comparison operator — a single character.",
        },
        {
          instruction:
            "What should the while loop condition be to keep the game running until the player guesses correctly?",
          type: "multiple-choice",
          data: {
            options: [
              "guess === secret",
              "guess !== secret",
              "attempts < 10",
              "secret > 0",
            ],
          },
          solution: 1,
          hint: "The loop should keep going while the guess is NOT equal to the secret.",
        },
        {
          instruction:
            "Initialize the attempts counter. What starting value makes sense if the player hasn't guessed yet?",
          type: "fill-blank",
          data: {
            template: "let attempts = ___",
            blanks: [{ id: "init", placeholder: "?" }],
          },
          solution: {
            init: "0",
          },
          hint: "Before any guesses have happened, how many attempts have been made?",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question:
            "Why do we put the comparison logic inside a `checkGuess` function instead of writing it directly in the loop?",
          type: "multiple-choice",
          options: [
            "Functions make code run faster",
            "It's required — JavaScript won't work without it",
            "It keeps the loop clean and the logic reusable",
            "Functions automatically fix bugs",
          ],
          correctAnswer: 2,
          explanation:
            "Wrapping logic in a function keeps your loop body short and readable. The function can also be reused — if you built a different guessing game, you could use the same checkGuess function.",
        },
        {
          question:
            "What does `Math.floor(Math.random() * 100) + 1` produce?",
          type: "multiple-choice",
          options: [
            "A decimal between 0 and 100",
            "A whole number between 0 and 99",
            "A whole number between 1 and 100",
            "Always the number 100",
          ],
          correctAnswer: 2,
          explanation:
            "Math.random() gives 0–0.999..., times 100 gives 0–99.999..., Math.floor chops to 0–99, and +1 shifts to 1–100. A whole number between 1 and 100.",
        },
        {
          question:
            "Why is a `while` loop a better fit than a `for` loop for this game?",
          type: "multiple-choice",
          options: [
            "while loops are faster than for loops",
            "for loops can't use conditions",
            "We don't know how many guesses the player will need",
            "while loops can use functions but for loops can't",
          ],
          correctAnswer: 2,
          explanation:
            "A for loop is great when you know the count in advance (e.g. 'repeat 10 times'). A while loop is better when you loop until a condition changes — and we don't know how many guesses it'll take.",
        },
        {
          question:
            "What happens if we forget to include `attempts++` inside the loop?",
          type: "multiple-choice",
          options: [
            "The game crashes immediately",
            "The attempts counter stays at 0 forever",
            "The loop becomes infinite",
            "The secret number changes each round",
          ],
          correctAnswer: 1,
          explanation:
            "Without attempts++, the variable never increases — it stays at 0. The game still works, but at the end it would say 'You got it in 0 tries!' which is wrong. The loop itself doesn't break because it depends on guess !== secret, not attempts.",
        },
        {
          question:
            "Which concepts from previous lessons does this game use?",
          type: "multiple-choice",
          options: [
            "Only variables and conditions",
            "Only loops and functions",
            "Variables, conditions, and loops — but not functions",
            "Variables, conditions, loops, and functions — all of them!",
          ],
          correctAnswer: 3,
          explanation:
            "The game uses variables (secret, guess, attempts), conditions (if guess < secret), a while loop (keep guessing), and a function (checkGuess). All four skills working together — that's the whole point of this practical!",
        },
      ],
    },
  ],
};

export default lesson;
