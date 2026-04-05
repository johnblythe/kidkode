import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "hello-world",
  title: "Hello World: Your First Spell",
  description:
    "Cast your first spell — write real JavaScript code, run it, and see the magic happen in your terminal.",
  order: 7,
  realm: 2,
  estimatedMinutes: 10,
  xpReward: 80,
  icon: "✨",
  boss: {
    name: "The Silent Console",
    description:
      "An empty, mocking terminal that refuses to display anything until you prove you can make it speak",
    sprite: "silentConsole",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Blank Screen Stare!",
      "Undefined Output!",
      "Syntax Error Shriek!",
    ],
    defeatText:
      "The console springs to life with color and text — your code has broken the silence!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "Your First Spell",
          content:
            "Every wizard remembers their first incantation. Every coder remembers **Hello World**.\n\nIt's a tradition that stretches back decades — the very first thing programmers write in any new language is a tiny program that prints \"Hello, World!\" to the screen. It's proof that you and the machine are speaking the same tongue.\n\nToday, you join that tradition. You're about to write your first line of **real JavaScript** — and watch the computer obey.",
          visual: `
  ┌──────────────────────────────────┐
  │     📜 THE ANCIENT TRADITION     │
  │                                  │
  │   1972  ···  "hello, world"  ··  │
  │   1978  ···  "Hello, World"  ··  │
  │   2002  ···  "Hello, World!" ··  │
  │   ····                           │
  │   TODAY ···  YOUR TURN!      ··  │
  │                                  │
  │     ✨ Every coder starts here   │
  └──────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "console.log() — The Speak Command",
          content:
            "In JavaScript, the spell that makes the computer speak is called **`console.log()`**. Let's break it apart like a potion recipe:\n\n- **`console`** — the terminal / output screen (where your message appears)\n- **`.log`** — the command that says \"print this out\"\n- **`(\"Hello, World!\")`** — the message you want to display, wrapped in **parentheses** and **quotes**\n\nThe quotes tell JavaScript: \"This is text, not a command.\" Without them, JavaScript would try to interpret your words as code — and get very confused.",
          visual: `
  ┌──────────────────────────────────┐
  │  🧪 SPELL ANATOMY               │
  │                                  │
  │  console.log("Hello, World!");   │
  │  ───┬─── ─┬─ ──────┬──────  ;   │
  │     │     │        │         │   │
  │  target  action  message   end   │
  │  (where) (how)  (what)   (done)  │
  │                                  │
  │  🗣️  "Speak this to the screen"  │
  └──────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Create → Save → Run",
          content:
            "Casting a spell takes three steps — and coding is the same:\n\n**1. Create** — Open VS Code and make a new file called `hello.js`. The `.js` extension tells your computer \"this is JavaScript.\"\n\n**2. Save** — Type `console.log(\"Hello, World!\");` and press **Ctrl/Cmd + S**. Your spell is inscribed on the scroll.\n\n**3. Run** — Open the terminal and type `node hello.js`. The `node` command reads your file and executes every line of JavaScript inside it.\n\nThis **edit → save → run** loop is the heartbeat of coding. You'll do it thousands of times.",
          visual: `
  ┌──────────────────────────────────┐
  │  ⚡ THE CODING LOOP              │
  │                                  │
  │  ┌────────┐   ┌────────┐        │
  │  │ CREATE │──▶│  SAVE  │        │
  │  │ hello.js│  │ Ctrl+S │        │
  │  └────────┘   └───┬────┘        │
  │       ▲           │              │
  │       │      ┌────▼───┐         │
  │       └──────│  RUN   │         │
  │              │node .js│         │
  │              └────────┘         │
  └──────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Comments: Notes to Your Future Self",
          content:
            "Wizards keep journals. Coders write **comments** — notes that the computer completely ignores but humans can read.\n\nTwo styles:\n\n```\n// This is a single-line comment\n```\n\n```\n/* This is a\n   multi-line comment */\n```\n\nWhy bother? Because six months from now, you'll look at your own code and think \"What was I trying to do here?\" Comments are messages to your future self. Write them like you're leaving breadcrumbs through a dungeon.",
          visual: `
  ┌──────────────────────────────────┐
  │  📝 COMMENTS = BREADCRUMBS       │
  │                                  │
  │  // This spell greets the world  │
  │  console.log("Hello, World!");   │
  │                                  │
  │  /* TODO:                        │
  │     - add more greetings         │
  │     - learn variables next */    │
  │                                  │
  │  Computer sees: 1 line of code   │
  │  Human sees:    the whole story  │
  └──────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Experiment!",
          content:
            "Here's the secret the best coders know: **coding is experimenting**. There's no way to break your computer by changing what `console.log` prints.\n\nTry these experiments in your `hello.js` file:\n\n- Change the text: `console.log(\"I am a wizard!\");`\n- Print multiple lines — add several `console.log()` calls, one per line\n- Try a number without quotes: `console.log(42);` — notice: no quotes needed for numbers!\n\nEvery experiment teaches you something. The more you tinker, the faster you level up. Break things on purpose — that's how you learn what the rules really are.",
          visual: `
  ┌──────────────────────────────────┐
  │  🔬 EXPERIMENT LOG               │
  │                                  │
  │  console.log("I am a wizard!");  │
  │  → I am a wizard!               │
  │                                  │
  │  console.log(42);                │
  │  → 42                           │
  │                                  │
  │  console.log("HP:", 100);        │
  │  → HP: 100                      │
  │                                  │
  │  ✨ Tinker. Break. Learn. Repeat.│
  └──────────────────────────────────┘`,
          animation: "pop",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 3,
      content: `## JavaScript Basics Cheat Sheet

### console.log — Your First Command

\`console.log()\` prints whatever you put inside the parentheses to the terminal.

\`\`\`js
console.log("Hello, World!");
// Output: Hello, World!

console.log("My name is Link");
// Output: My name is Link

console.log(99);
// Output: 99

console.log("Level:", 5);
// Output: Level: 5
\`\`\`

### Strings vs Numbers

| Type | Example | Quotes? | What it is |
|---|---|---|---|
| **String** | \`"Hello"\` | Yes — always | Text data — words, sentences, symbols |
| **Number** | \`42\` | No — never | Numeric data — for math and counting |

JavaScript treats them differently:
\`\`\`js
console.log("3" + "3");  // "33" — glues text together
console.log(3 + 3);      // 6   — does actual math
\`\`\`

### Comments

\`\`\`js
// Single-line comment — everything after // is ignored

/* Multi-line comment
   spans as many lines
   as you need */
\`\`\`

### Running Your Code

\`\`\`
$ node hello.js        ← runs hello.js with Node
Hello, World!          ← output appears here
$                      ← ready for next command
\`\`\`

### Semicolons

Semicolons (\`;\`) go at the end of each statement. JavaScript doesn't *require* them — it guesses where they go — but adding them yourself is a **good habit**. It makes your code clearer and avoids rare, sneaky bugs.

\`\`\`js
console.log("With semicolon");    // ✅ explicit — good habit
console.log("Without semicolon")  // ✅ works, but risky later
\`\`\`

### Quick Reference

| What you want | Code |
|---|---|
| Print text | \`console.log("text");\` |
| Print a number | \`console.log(42);\` |
| Print multiple things | \`console.log("HP:", 100);\` |
| Single-line comment | \`// comment here\` |
| Multi-line comment | \`/* comment here */\` |
| Run a JS file | \`node filename.js\` |`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "First Spell Training",
      description:
        "Prove you can cast your first JavaScript spells — from running files to writing real code!",
      steps: [
        {
          instruction:
            "You've created a file called hello.js. Type the command to run it with Node!",
          type: "type-command",
          data: {
            prompt: "$ ",
            expectedOutput: "Hello, World!",
            caseSensitive: true,
            acceptAlternatives: ["node ./hello.js"],
          },
          solution: "node hello.js",
          hint: "The command is: node <filename>. Your file is called hello.js.",
        },
        {
          instruction:
            'Complete the code so it prints "Hello, World!" to the terminal.',
          type: "fill-blank",
          data: {
            template: 'console.___("Hello, World!")',
            blanks: [{ id: "method", placeholder: "method" }],
            filename: "hello.js",
          },
          solution: {
            method: "log",
          },
          hint: "console.??? — the method name is a short word meaning 'record' or 'write down'.",
        },
        {
          instruction:
            "What do the quotes around text tell JavaScript?",
          type: "multiple-choice",
          data: {
            options: [
              "The text should be printed in bold",
              "It's a string — text data, not a command",
              "The text is a comment and should be ignored",
              "The text is a variable name",
            ],
          },
          solution: 1,
          hint: "Without quotes, JavaScript would try to run the words as code. Quotes mark them as...",
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
            'What will `console.log("Hello!");` display in the terminal?',
          type: "multiple-choice",
          options: [
            "console.log(\"Hello!\")",
            "Hello!",
            "\"Hello!\"",
            "log: Hello!",
          ],
          correctAnswer: 1,
          explanation:
            "console.log() prints the value inside the parentheses. The quotes define the string but aren't part of the output, so it displays: Hello!",
        },
        {
          question:
            "Which command runs a JavaScript file called app.js in the terminal?",
          type: "multiple-choice",
          options: [
            "run app.js",
            "javascript app.js",
            "node app.js",
            "open app.js",
          ],
          correctAnswer: 2,
          explanation:
            "The 'node' command is the JavaScript runtime. 'node app.js' tells Node to read and execute the JavaScript code inside app.js.",
        },
        {
          question:
            "What is the difference between \"42\" (with quotes) and 42 (without quotes)?",
          type: "multiple-choice",
          options: [
            "There is no difference",
            "\"42\" is a string (text), 42 is a number",
            "\"42\" is a number, 42 is a string",
            "42 without quotes causes an error",
          ],
          correctAnswer: 1,
          explanation:
            "Quotes make something a string (text data). Without quotes, 42 is a number JavaScript can do math with. \"42\" is just the characters 4 and 2 treated as text.",
        },
        {
          question: "What does a comment do in JavaScript?",
          type: "multiple-choice",
          options: [
            "Sends a message to the user",
            "Makes the code run faster",
            "Is ignored by the computer — it's a note for humans",
            "Deletes the next line of code",
          ],
          correctAnswer: 2,
          explanation:
            "Comments (// or /* */) are completely ignored when the code runs. They exist only to help humans understand what the code does.",
        },
        {
          question:
            "What are the three steps of the edit-save-run coding loop?",
          type: "multiple-choice",
          options: [
            "Download → Install → Open",
            "Create/edit the file → Save (Ctrl+S) → Run with node",
            "Copy → Paste → Delete",
            "Read → Memorize → Type",
          ],
          correctAnswer: 1,
          explanation:
            "The coding loop is: (1) create or edit your code in the editor, (2) save the file with Ctrl/Cmd + S, and (3) run it in the terminal with 'node filename.js'. You'll repeat this cycle constantly.",
        },
      ],
    },
  ],
};

export default lesson;
