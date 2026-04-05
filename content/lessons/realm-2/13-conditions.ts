import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "conditions",
  title: "Conditions: The Crossroads",
  description:
    "Make your code choose different paths — like standing at a crossroads in a dungeon and deciding which way to go.",
  order: 9,
  realm: 2,
  estimatedMinutes: 12,
  xpReward: 100,
  icon: "🔀",
  boss: {
    name: "The Riddle Sphinx",
    description:
      "A stone guardian that blocks the path with logic puzzles — only true answers may pass",
    sprite: "riddleSphinx",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "False Condition Strike!",
      "Logic Trap!",
      "Unreachable Branch Attack!",
    ],
    defeatText:
      "The Sphinx bows — your logic is flawless, and the path opens before you!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Crossroads",
          content:
            "Every adventurer reaches a **crossroads** — a moment where the path splits and you must choose.\n\nPrograms are the same. They constantly face decisions: *Is the player alive? Did they find the key? Is the door locked?* The `if` statement is how your code decides which path to take.\n\nThink of it like this: \"**If** the door is locked, use the key. **Otherwise**, walk straight through.\" That's all an `if/else` really is — a fork in the road for your program.",
          visual: `
  ┌──────────────────────────────────┐
  │         THE CROSSROADS           │
  │                                  │
  │           YOU ARE HERE           │
  │               ⚔️                 │
  │              / \\                 │
  │             /   \\                │
  │            /     \\               │
  │      🚪 LEFT   RIGHT 🐉         │
  │      (locked)  (dragon!)         │
  │                                  │
  │   Which path does your code take?│
  └──────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "if / else: Choosing Your Path",
          content:
            "The `if` statement checks a **condition** — something that's either `true` or `false`. If it's true, the code inside the curly braces runs. If it's false, the `else` block runs instead.\n\n```js\nif (playerHP > 0) {\n  fight();\n} else {\n  gameOver();\n}\n```\n\nThe condition lives inside the parentheses `()`. The code to run goes inside curly braces `{}`. When `playerHP > 0` is true, your hero keeps fighting. When it's false — game over.",
          visual: `
  ┌── Decision Flow ───────────────┐
  │                                 │
  │       ┌──────────────┐          │
  │       │ playerHP > 0 │          │
  │       └──────┬───────┘          │
  │         true │ false            │
  │        ┌─────┴─────┐            │
  │        ▼           ▼            │
  │   ┌────────┐  ┌──────────┐     │
  │   │ fight()│  │gameOver()│     │
  │   └────────┘  └──────────┘     │
  │                                 │
  │   Only ONE path runs!           │
  └─────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Comparison Operators",
          content:
            "To build conditions, you need **comparison operators** — symbols that compare two values and return `true` or `false`.\n\n- `===` strict equals (\"is exactly the same?\")\n- `!==` not equals (\"is different?\")\n- `>` greater than, `<` less than\n- `>=` greater or equal, `<=` less or equal\n\n**Important:** Always use `===` (triple equals), not `==` (double equals). Double equals does weird type conversions — `0 == \"\"` is `true`, which is almost never what you want. Triple equals is strict and trustworthy.",
          visual: `
  ┌── Comparison Operators ────────┐
  │                                 │
  │  10 === 10   → true  ✅        │
  │  10 === "10" → false ❌        │
  │  10 !== 5    → true  ✅        │
  │   7 > 3      → true  ✅        │
  │   2 < 1      → false ❌        │
  │   5 >= 5     → true  ✅        │
  │   4 <= 3     → false ❌        │
  │                                 │
  │  ⚠️  === not == (always triple!)│
  └─────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "else if: Multiple Paths",
          content:
            "Sometimes there are more than two choices. Imagine a **three-way crossroads** — you can go left, right, or straight. That's what `else if` is for.\n\n```js\nif (score >= 90) {\n  rank = \"S\";\n} else if (score >= 70) {\n  rank = \"A\";\n} else if (score >= 50) {\n  rank = \"B\";\n} else {\n  rank = \"C\";\n}\n```\n\nYour code checks each condition from top to bottom. The **first** one that's true wins — the rest are skipped. The final `else` is the catch-all: if nothing else matched, this runs.",
          visual: `
  ┌── Multiple Paths ──────────────┐
  │                                 │
  │  score = 75                     │
  │                                 │
  │  >= 90? ──── NO ──┐            │
  │  >= 70? ──── YES! ▼            │
  │          ┌──────────────┐      │
  │          │  rank = "A"  │      │
  │          └──────────────┘      │
  │  >= 50?  (skipped)              │
  │  else    (skipped)              │
  │                                 │
  │  First TRUE wins — rest skip!   │
  └─────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Logical Operators: Combining Conditions",
          content:
            "What if you need to check **multiple things** at once? Logical operators let you combine conditions.\n\n- `&&` (AND) — **both** must be true: `if (hasKey && doorIsLocked)`\n- `||` (OR) — **at least one** must be true: `if (hasPotion || hasSpell)`\n- `!` (NOT) — **flips** true to false: `if (!isGameOver)`\n\nThink of `&&` as a strict guard: \"You need a key AND a map to enter.\" Think of `||` as a generous one: \"You can enter with a key OR a password.\" And `!` just flips things around — NOT game over means the game is still going.",
          visual: `
  ┌── Logical Operators ───────────┐
  │                                 │
  │  && (AND)  Both must be true    │
  │  ┌─────┐   ┌─────┐             │
  │  │ key │ + │ map │ = ✅ ENTER  │
  │  └─────┘   └─────┘             │
  │                                 │
  │  || (OR)   At least one true    │
  │  ┌─────┐   ┌──────┐            │
  │  │ key │ or│passwd│ = ✅ ENTER │
  │  └─────┘   └──────┘            │
  │                                 │
  │  ! (NOT)   Flip it              │
  │  !false → true  !true → false   │
  └─────────────────────────────────┘`,
          animation: "swoosh",
        },
        {
          title: "Truthy and Falsy: The Hidden Rule",
          content:
            "JavaScript has a secret: **every value** can be treated as `true` or `false`, even if it's not a boolean.\n\nThese values are **falsy** — they act like `false`:\n`0`, `\"\"` (empty string), `null`, `undefined`, `NaN`, and `false` itself.\n\n**Everything else is truthy** — numbers, non-empty strings, objects, arrays — they all act like `true` in a condition.\n\nThis is useful but can surprise you: `if (playerName)` checks if the name exists and isn't empty. Just know this for now — you'll use it more as you level up.",
          visual: `
  ┌── Truthy vs Falsy ─────────────┐
  │                                 │
  │  FALSY (act like false):        │
  │  ┌───┬────┬──────┬───────────┐ │
  │  │ 0 │ "" │ null │ undefined │ │
  │  └───┴────┴──────┴───────────┘ │
  │                                 │
  │  TRUTHY (act like true):        │
  │  ┌────┬─────────┬───────────┐  │
  │  │ 42 │ "hello" │ [1, 2, 3] │  │
  │  └────┴─────────┴───────────┘  │
  │                                 │
  │  if (playerName) — checks exist │
  └─────────────────────────────────┘`,
          animation: "slide-up",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Conditions Cheat Sheet

### if / else Syntax

\`\`\`js
if (condition) {
  // runs when condition is true
} else {
  // runs when condition is false
}
\`\`\`

### else if — Multiple Branches

\`\`\`js
if (hp > 75) {
  status = "Healthy";
} else if (hp > 25) {
  status = "Wounded";
} else {
  status = "Critical";
}
\`\`\`

### Comparison Operators

| Operator | Meaning | Example | Result |
|---|---|---|---|
| \`===\` | Strict equals | \`5 === 5\` | \`true\` |
| \`!==\` | Not equals | \`5 !== 3\` | \`true\` |
| \`>\` | Greater than | \`10 > 7\` | \`true\` |
| \`<\` | Less than | \`3 < 8\` | \`true\` |
| \`>=\` | Greater or equal | \`5 >= 5\` | \`true\` |
| \`<=\` | Less or equal | \`4 <= 3\` | \`false\` |

### Logical Operators

| Operator | Name | Meaning | Example |
|---|---|---|---|
| \`&&\` | AND | Both must be true | \`hasKey && doorIsLocked\` |
| \`\\|\\|\` | OR | At least one true | \`hasPotion \\|\\| hasSpell\` |
| \`!\` | NOT | Flip true/false | \`!isGameOver\` |

### Common Mistakes

1. **\`=\` vs \`===\`** — Single \`=\` **assigns** a value. Triple \`===\` **compares** values. Writing \`if (x = 5)\` sets x to 5 instead of checking it!

2. **Missing braces** — Always use \`{}\` even for single-line blocks. Skipping them causes bugs when you add more code later.

3. **Unreachable code** — If you put a condition that's always true first, later branches never run:
\`\`\`js
// BUG: score >= 50 catches everything >= 70 too!
if (score >= 50) { rank = "B"; }
else if (score >= 70) { rank = "A"; }  // never reached!
\`\`\`
Always check the **strictest** condition first.

### Examples

**Example 1: Treasure chest**
\`\`\`js
let gold = 50;
if (gold >= 100) {
  console.log("You buy the legendary sword!");
} else {
  console.log("Not enough gold...");
}
// Output: "Not enough gold..."
\`\`\`

**Example 2: Combined conditions**
\`\`\`js
let level = 10;
let hasPass = true;
if (level >= 5 && hasPass) {
  console.log("Welcome to the elite dungeon!");
}
// Output: "Welcome to the elite dungeon!"
\`\`\`

**Example 3: Multiple ranks**
\`\`\`js
let score = 82;
if (score >= 90) {
  console.log("Rank S — Legendary!");
} else if (score >= 70) {
  console.log("Rank A — Excellent!");
} else if (score >= 50) {
  console.log("Rank B — Good job!");
} else {
  console.log("Rank C — Keep training!");
}
// Output: "Rank A — Excellent!"
\`\`\``,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Crossroads Training",
      description:
        "Practice writing conditions, comparisons, and logical operators!",
      steps: [
        {
          instruction:
            "Complete the condition to check if the player's HP has reached zero.",
          type: "fill-blank",
          data: {
            template:
              'if (playerHP ___ 0) { console.log("Game Over!"); }',
            blanks: [{ id: "op", placeholder: "operator" }],
          },
          solution: { op: ["===", "=="] },
          hint: "You want to check if playerHP *equals* zero. Which equality operator should you use?",
        },
        {
          instruction:
            "What does the `&&` (AND) operator mean in a condition?",
          type: "multiple-choice",
          data: {
            options: [
              "Only the first condition must be true",
              "Both conditions must be true",
              "At least one condition must be true",
              "Neither condition needs to be true",
            ],
          },
          solution: 1,
          hint: "Think of && as a strict guard — it demands ALL conditions are met.",
        },
        {
          instruction:
            "Fill in the logical operator: you can enter if you have a key OR the door is already unlocked.",
          type: "fill-blank",
          data: {
            template:
              "if (hasKey ___ !doorIsLocked) { enter(); }",
            blanks: [{ id: "logic", placeholder: "operator" }],
          },
          solution: { logic: "||" },
          hint: "You need the operator that means \"at least one of these is true.\" Two vertical pipes.",
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
            "What is the correct syntax for an if/else statement?",
          type: "multiple-choice",
          options: [
            "if (condition) { ... } else { ... }",
            "if condition { ... } else { ... }",
            "if [condition] then ... else ... end",
            "when (condition) do { ... } otherwise { ... }",
          ],
          correctAnswer: 0,
          explanation:
            "In JavaScript, the condition goes inside parentheses () and the code blocks go inside curly braces {}. The keyword is 'if', not 'when'.",
        },
        {
          question:
            "What is the difference between `=` and `===`?",
          type: "multiple-choice",
          options: [
            "They do the same thing",
            "`=` assigns a value, `===` compares two values",
            "`=` compares values, `===` assigns a value",
            "`===` is for numbers and `=` is for strings",
          ],
          correctAnswer: 1,
          explanation:
            "Single `=` is the assignment operator — it sets a variable. Triple `===` is the strict equality operator — it checks if two values are the same. Mixing them up is a very common bug!",
        },
        {
          question:
            "What does `||` (OR) mean in a condition like `if (a || b)`?",
          type: "multiple-choice",
          options: [
            "Both a AND b must be true",
            "Neither a nor b can be true",
            "At least one of a or b must be true",
            "a must be true and b must be false",
          ],
          correctAnswer: 2,
          explanation:
            "The `||` (OR) operator returns true if at least one of the conditions is true. It only returns false if BOTH are false.",
        },
        {
          question:
            "In an if / else if / else chain, what happens when the first `true` condition is found?",
          type: "multiple-choice",
          options: [
            "All remaining conditions are still checked",
            "The program crashes if there are more conditions",
            "That block runs and all remaining branches are skipped",
            "It runs that block and also the else block",
          ],
          correctAnswer: 2,
          explanation:
            "In an if/else if/else chain, the first true condition wins. Its block runs, and every remaining branch is skipped — only one path executes.",
        },
        {
          question:
            "Which of these values is 'falsy' in JavaScript?",
          type: "multiple-choice",
          options: [
            '"hello"',
            "42",
            '""  (empty string)',
            "[1, 2, 3]",
          ],
          correctAnswer: 2,
          explanation:
            'An empty string "" is falsy — it acts like false in a condition. Non-empty strings like "hello", numbers like 42, and arrays like [1, 2, 3] are all truthy.',
        },
      ],
    },
  ],
};

export default lesson;
