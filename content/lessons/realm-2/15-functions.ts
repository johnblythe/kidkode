import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "functions",
  title: "Functions: Bottling Your Spells",
  description:
    "Learn to package your code into reusable spells — write once, cast anywhere, with different ingredients each time.",
  order: 11,
  realm: 2,
  estimatedMinutes: 14,
  xpReward: 120,
  icon: "🧬",
  boss: {
    name: "The Copy-Paste Slime",
    description:
      "A gooey monster that duplicates everything — growing bigger and messier with every copy",
    sprite: "copyPasteSlime",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Duplicate Code Splash!",
      "Spaghetti Tangle!",
      "DRY Violation Slam!",
    ],
    defeatText:
      "You refactor the Slime into a single clean function — it shrinks to nothing!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "Why Functions?",
          content:
            "Imagine you're in a dungeon and you keep writing the same attack code over and over — `slash`, `check HP`, `print damage` — every single time you encounter a monster. Your scroll is getting **ridiculously long** and your hand is cramping.\n\nWhat if you could **bottle that spell once** and just uncork it whenever you need it? That's exactly what a **function** is: a reusable block of code you write once and call anywhere.\n\nProgrammers live by a sacred rule: **DRY — Don't Repeat Yourself.** Functions are how you obey that rule. One spell, many castings.",
          visual: `
  ┌─────────────────────────────────┐
  │  ❌ WITHOUT FUNCTIONS           │
  │                                 │
  │  slash(); checkHP(); print();   │
  │  slash(); checkHP(); print();   │
  │  slash(); checkHP(); print();   │
  │  slash(); checkHP(); print();   │
  │                                 │
  │  ✅ WITH FUNCTIONS              │
  │                                 │
  │  function attack() { ... }      │
  │  attack(); attack(); attack();  │
  │                                 │
  │  🧪 Bottle once, cast forever!  │
  └─────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Declaring a Function",
          content:
            "To create a function you use the `function` keyword, give it a **name**, list any **parameters** in parentheses, and wrap the code in curly braces.\n\n```js\nfunction greet(name) {\n  console.log(\"Hello, \" + name + \"!\");\n}\ngreet(\"Luna\"); // Hello, Luna!\n```\n\nThe **name** is what you shout to cast the spell. The **parameters** are ingredients you feed in. The **body** (inside `{ }`) is what the spell actually does. And **calling** the function — `greet(\"Luna\")` — is you uncorking the bottle.\n\nYou can call the same function as many times as you want with different inputs each time.",
          visual: `
  ┌─── Anatomy of a Function ──────┐
  │                                 │
  │  function greet(name) {         │
  │  ────────  ─────  ────          │
  │  keyword   name   param         │
  │                                 │
  │    console.log("Hello, "+name); │
  │    ─────────────────────────    │
  │              body               │
  │  }                              │
  │                                 │
  │  greet("Luna");  ← CALL IT     │
  │  // Hello, Luna!                │
  └─────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Parameters: Spell Ingredients",
          content:
            "Parameters are the **ingredients** you hand to a function when you call it. Different inputs lead to different results — just like the same potion recipe yields different effects depending on what herbs you toss in.\n\n```js\nfunction attack(weapon, damage) {\n  console.log(weapon + \" deals \" + damage + \" damage!\");\n}\nattack(\"Sword\", 25);   // Sword deals 25 damage!\nattack(\"Fireball\", 40); // Fireball deals 40 damage!\n```\n\nYou can have **zero, one, or many** parameters. When you call the function, the values you pass in are called **arguments**. Think of parameters as labelled slots and arguments as the actual items you slide into those slots.",
          visual: `
  ┌─── Spell Ingredient Slots ─────┐
  │                                 │
  │  function attack(weapon, dmg)   │
  │                 ┌──────┐┌────┐  │
  │    Slots:       │weapon││dmg │  │
  │                 └──┬───┘└─┬──┘  │
  │                    │      │     │
  │    Call:       "Sword"   25     │
  │                                 │
  │  attack("Sword", 25)            │
  │  → "Sword deals 25 damage!"    │
  │                                 │
  │  attack("Fireball", 40)         │
  │  → "Fireball deals 40 damage!" │
  └─────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Return Values: Spell Results",
          content:
            "Sometimes you don't just want your function to *do* something — you want it to **give you something back**. That's what `return` does. It sends a value back to whoever called the function.\n\n```js\nfunction add(a, b) {\n  return a + b;\n}\nconst sum = add(3, 7); // sum is 10\n```\n\nWithout `return`, a function hands back `undefined` — like a courier who delivers your package but comes back empty-handed. With `return`, you get a result you can store in a variable, pass to another function, or use in a condition.\n\n**Important:** Code after `return` never runs. Once the spell delivers its result, it's done.",
          visual: `
  ┌─── Return: Getting Results ────┐
  │                                 │
  │  function add(a, b) {           │
  │    return a + b;  ← sends back │
  │  }                              │
  │                                 │
  │  const sum = add(3, 7);         │
  │        │                        │
  │        ▼                        │
  │      sum = 10  ✅               │
  │                                 │
  │  ⚠️  No return?                 │
  │      → you get undefined        │
  └─────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Arrow Functions: Shorthand Spells",
          content:
            "JavaScript has a shorter way to write functions called **arrow functions**. Instead of the `function` keyword, you use a fat arrow `=>`.\n\n```js\n// Regular function\nfunction greet(name) {\n  return \"Hello, \" + name;\n}\n\n// Arrow function (same thing)\nconst greet = (name) => {\n  return \"Hello, \" + name;\n};\n\n// One-liner (even shorter!)\nconst double = (n) => n * 2;\n```\n\nFor simple one-liners, you can skip the `{ }` and the `return` — the result is returned automatically. Arrow functions are popular in modern JavaScript. They look different but do the same job.",
          visual: `
  ┌─── Arrow Function Shorthand ───┐
  │                                 │
  │  REGULAR:                       │
  │  function add(a, b) {           │
  │    return a + b;                │
  │  }                              │
  │                                 │
  │  ARROW:                         │
  │  const add = (a, b) => {        │
  │    return a + b;                │
  │  };                             │
  │                                 │
  │  ONE-LINER:                     │
  │  const add = (a, b) => a + b;   │
  └─────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Functions Calling Functions",
          content:
            "Here's where it gets powerful: functions can **call other functions**. You build simple spells, then combine them into complex rituals — like mixing potion ingredients one at a time.\n\n```js\nfunction double(n) { return n * 2; }\nfunction addOne(n) { return n + 1; }\nfunction doubleAndAddOne(n) {\n  return addOne(double(n));\n}\ndoubleAndAddOne(5); // 11\n```\n\nFirst `double(5)` returns `10`, then `addOne(10)` returns `11`. Each function does one small job well, and together they solve bigger problems. This is the secret of all great code — small, reusable pieces snapping together like enchanted building blocks.",
          visual: `
  ┌─── Combining Spell Pieces ─────┐
  │                                 │
  │  double(5)                      │
  │     │                           │
  │     ▼                           │
  │    10  ──→  addOne(10)          │
  │                 │               │
  │                 ▼               │
  │                11  ✅           │
  │                                 │
  │  🧱  Small pieces → Big power  │
  │                                 │
  │  doubleAndAddOne(5) → 11       │
  └─────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Functions Cheat Sheet

### Declaring a Function

\`\`\`js
// Standard declaration
function functionName(param1, param2) {
  // body — the code that runs
  return result; // optional — sends a value back
}

// Calling it
functionName(arg1, arg2);
\`\`\`

- **function** — the keyword that starts the spell
- **functionName** — pick something descriptive: \`calculateDamage\`, not \`doStuff\`
- **parameters** — the labelled ingredient slots (inside the parentheses)
- **arguments** — the actual values you pass in when calling
- **return** — sends a value back to the caller

### Parameters vs Arguments

| Term | Where? | Example |
|---|---|---|
| **Parameter** | In the declaration | \`function greet(name)\` — \`name\` is the parameter |
| **Argument** | In the call | \`greet("Luna")\` — \`"Luna"\` is the argument |

Think of parameters as **empty jars** and arguments as **what you pour in**.

### Return Values

\`\`\`js
function square(n) {
  return n * n;
}
const result = square(4); // 16

// Without return → undefined
function sayHi(name) {
  console.log("Hi " + name);
}
const x = sayHi("Link"); // x is undefined
\`\`\`

\`return\` immediately exits the function. Any code after it is **dead code** and will never run.

### Arrow Functions

\`\`\`js
// Multi-line arrow
const greet = (name) => {
  return "Hello, " + name;
};

// One-liner (implicit return)
const double = (n) => n * 2;

// Multiple params
const add = (a, b) => a + b;

// No params
const rollDice = () => Math.floor(Math.random() * 6) + 1;
\`\`\`

| Style | Syntax |
|---|---|
| Regular | \`function name(params) { ... }\` |
| Arrow (multi-line) | \`const name = (params) => { ... }\` |
| Arrow (one-liner) | \`const name = (params) => expression\` |

### Common Mistakes

1. **Forgetting \`return\`** — Your function runs fine but gives back \`undefined\`. Always check: did I \`return\` the result?
2. **Wrong number of arguments** — Calling \`add(3)\` when it expects two params. The missing param becomes \`undefined\`, and \`3 + undefined\` is \`NaN\`.
3. **Scope confusion** — Variables created inside a function are invisible outside it. They exist only while the spell is active.

### Putting It All Together

\`\`\`js
// Simple building blocks
function getMaxHP(level) {
  return 100 + (level * 20);
}

function formatBar(current, max) {
  const pct = Math.round((current / max) * 100);
  return "[" + "█".repeat(pct / 10) + "░".repeat(10 - pct / 10) + "] " + pct + "%";
}

// Combine them
function showPlayerHP(level, currentHP) {
  const max = getMaxHP(level);
  console.log("HP: " + formatBar(currentHP, max));
}

showPlayerHP(5, 150);
// HP: [███████░░░] 75%
\`\`\`

Functions keep your code **short**, **readable**, and **easy to fix**. Change the formula in one place, and every caller benefits.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Spell Bottling Workshop",
      description:
        "Practice writing and reading functions — the building blocks of every program.",
      steps: [
        {
          instruction:
            "Complete the function so it returns a greeting. What should the function be named?",
          type: "fill-blank",
          data: {
            template:
              'function ___(name) { return "Hello, " + name; }',
            blanks: [{ id: "fname", placeholder: "functionName" }],
          },
          solution: {
            fname: ["greet", "sayHello", "hello", "greeting"],
          },
          hint: "Think of a short, descriptive name for a function that greets someone — like 'greet'.",
        },
        {
          instruction:
            "The function `add` returns the sum of two numbers. What does `add(3, 7)` return?",
          type: "fill-blank",
          data: {
            template: "add(3, 7) returns ___",
            blanks: [{ id: "result", placeholder: "?" }],
          },
          solution: {
            result: "10",
          },
          hint: "The function returns a + b. Plug in the numbers: 3 + 7 = ?",
        },
        {
          instruction:
            "What happens if a function doesn't have a `return` statement?",
          type: "multiple-choice",
          data: {
            options: [
              "It throws an error",
              "It returns undefined",
              "It returns 0",
              "It returns the last line automatically",
            ],
          },
          solution: 1,
          hint: "Think about what a courier does when they deliver a package but have nothing to bring back.",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What is the correct way to declare a function called 'heal'?",
          type: "multiple-choice",
          options: [
            "function heal() { }",
            "heal function() { }",
            "def heal() { }",
            "func heal() { }",
          ],
          correctAnswer: 0,
          explanation:
            "In JavaScript, you use the 'function' keyword first, then the name, then parentheses for parameters, then curly braces for the body.",
        },
        {
          question:
            "What is the difference between a parameter and an argument?",
          type: "multiple-choice",
          options: [
            "There is no difference — they mean the same thing",
            "A parameter is in the function declaration; an argument is the value passed when calling",
            "A parameter is a number; an argument is a string",
            "Arguments are used in arrow functions; parameters are used in regular functions",
          ],
          correctAnswer: 1,
          explanation:
            "Parameters are the named slots in the function declaration (like empty jars). Arguments are the actual values you pass in when you call the function (what you pour into the jars).",
        },
        {
          question:
            "What does this code output?\n```js\nfunction double(n) { return n * 2; }\nconsole.log(double(6));\n```",
          type: "multiple-choice",
          options: ["6", "12", "undefined", "NaN"],
          correctAnswer: 1,
          explanation:
            "double(6) returns 6 * 2 which is 12. The return value is then passed to console.log, which prints 12.",
        },
        {
          question: "Which is a valid arrow function that triples a number?",
          type: "multiple-choice",
          options: [
            "const triple = (n) => n * 3;",
            "const triple = n => return n * 3;",
            "arrow triple(n) { return n * 3; }",
            "const triple => (n) * 3;",
          ],
          correctAnswer: 0,
          explanation:
            "Arrow functions use the syntax: const name = (params) => expression. For a one-liner, you skip the { } and the return — the expression's value is returned automatically.",
        },
        {
          question: "Why do programmers use functions? (DRY principle)",
          type: "multiple-choice",
          options: [
            "Functions make code run faster",
            "Functions are required — code won't work without them",
            "Functions let you write code once and reuse it, avoiding repetition",
            "Functions are only used for math calculations",
          ],
          correctAnswer: 2,
          explanation:
            "DRY stands for Don't Repeat Yourself. Functions let you write a piece of logic once and call it many times — keeping your code shorter, cleaner, and easier to maintain.",
        },
      ],
    },
  ],
};

export default lesson;
