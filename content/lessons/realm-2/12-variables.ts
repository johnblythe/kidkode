import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "variables",
  title: "Variables: Naming Your Potions",
  description:
    "Learn how to store and name data — the building blocks of every program, like labeling potion bottles in your inventory.",
  order: 8,
  realm: 2,
  estimatedMinutes: 12,
  xpReward: 90,
  icon: "🧪",
  boss: {
    name: "The Unnamed Specter",
    description:
      "A formless entity that can't be controlled because it has no name — chaos without variables",
    sprite: "unnamedSpecter",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Undefined Reference!",
      "Type Confusion Blast!",
      "NaN Attack!",
    ],
    defeatText:
      "You bind the Specter to a name — `const specter = 'defeated'` — and it fades away!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "What Are Variables?",
          content:
            "Imagine a shelf full of **potion bottles**, each with a label on it. One says `playerName`, another says `health`, a third says `isAlive`. That's exactly what **variables** are — labeled containers that hold data.\n\nIn JavaScript, you create a variable by giving it a **name** and a **value**:\n\n```js\nlet playerName = \"Luna\"\n```\n\nNow anywhere in your code, you can use `playerName` and the computer knows you mean `\"Luna\"`. Without variables, you'd have to type the same value over and over — and if it changed, you'd have to find every spot and update it by hand.",
          visual: `
  ┌─── Your Potion Shelf ─────────────┐
  │                                    │
  │  ┌──────────┐  ┌────────┐  ┌───┐  │
  │  │ "Luna"   │  │  100   │  │ T │  │
  │  ├──────────┤  ├────────┤  ├───┤  │
  │  │playerName│  │ health │  │alive│ │
  │  └──────────┘  └────────┘  └───┘  │
  │                                    │
  │  label = variable name             │
  │  liquid = the stored value         │
  └────────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "let vs const",
          content:
            "JavaScript gives you two ways to declare variables: `let` and `const`.\n\n**`const`** is like a **sealed potion bottle** — once you fill it, you can never change what's inside. Use it for values that shouldn't change, like a player's username or the number of lives at the start of a game.\n\n```js\nconst maxLives = 3      // sealed — never changes\nlet currentLives = 3    // open — can change later\ncurrentLives = 2        // took damage!\n```\n\n**`let`** is like an **open bottle** — you can pour out the old stuff and put something new in whenever you want. Use it for values that will change, like a score or health bar.\n\n**Rule of thumb:** Always start with `const`. Only switch to `let` if you actually need to change the value later. And never use `var` — it's an old, buggy way that causes weird problems.",
          visual: `
  ┌── const vs let ─────────────────┐
  │                                  │
  │   const maxLives = 3             │
  │   ┌─────────┐  🔒 SEALED        │
  │   │    3    │  can't change!    │
  │   └─────────┘                    │
  │                                  │
  │   let score = 0                  │
  │   ┌─────────┐  🔓 OPEN          │
  │   │  0 → 10 │  change anytime   │
  │   └─────────┘                    │
  │                                  │
  │   var ← ☠️ NEVER USE THIS        │
  └──────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Data Types: Strings, Numbers, Booleans",
          content:
            "Not all potions are the same — some are liquids, some are powders, some glow in the dark. Likewise, variables hold different **types** of data.\n\n**Strings** are text, always wrapped in quotes: `\"Hello\"` or `'world'`. Think of them as scrolls with writing on them.\n\n**Numbers** are just numbers — no quotes needed: `42`, `3.14`, `-7`. They're like measuring the amount of potion in a bottle.\n\n**Booleans** are the simplest type — just `true` or `false`. Like a light switch: on or off. Is the player alive? `true`. Is the door locked? `false`.\n\n```js\nconst name = \"Aria\"      // string\nconst level = 5           // number\nconst isReady = true      // boolean\n```",
          visual: `
  ┌── Three Potion Types ───────────┐
  │                                  │
  │  📜 STRING    "Hello, world!"    │
  │     Text in quotes               │
  │                                  │
  │  🔢 NUMBER    42  3.14  -7       │
  │     No quotes, just digits       │
  │                                  │
  │  💡 BOOLEAN   true / false       │
  │     On or off, yes or no         │
  │                                  │
  │  const hero = "Aria"   // 📜     │
  │  const hp   = 100      // 🔢     │
  │  const alive = true    // 💡     │
  └──────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Template Literals: Mixing Potions",
          content:
            "What if you want to combine variables with regular text? You could use `+` to glue strings together:\n\n```js\n\"Hello, \" + name + \"! You are level \" + level\n```\n\nBut that's messy — like trying to pour three potions into one bottle by hand. Instead, use **template literals**: wrap your text in **backticks** (`` ` ``) and drop variables in with `${...}`:\n\n```js\n`Hello, ${name}! You are level ${level}`\n```\n\nSo much cleaner! The `${}` is like a magic funnel that pours the variable's value right into the text. You can put any expression inside — math, function calls, anything.",
          visual: `
  ┌── String Mixing ────────────────┐
  │                                  │
  │  OLD WAY (messy):                │
  │  "Hi " + name + "! Lvl " + lvl  │
  │   😵 hard to read                │
  │                                  │
  │  NEW WAY (template literals):    │
  │  \`Hi \${name}! Lvl \${lvl}\`        │
  │   ✨ clean and easy               │
  │                                  │
  │  KEY: use backticks \` not '  "   │
  │  and \${ } around variables       │
  └──────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Naming Rules: The Potion Label Guide",
          content:
            "Variable names matter! Good names make code readable. Bad names make code a puzzle nobody wants to solve.\n\n**Use camelCase** — start lowercase, capitalize each new word: `playerHealth`, `isGameOver`, `totalScore`. This is the standard in JavaScript.\n\n**Be descriptive** — `playerHealth` tells you exactly what it stores. `x` or `ph` tells you nothing. Future-you will thank present-you for clear names.\n\n**Rules you MUST follow:**\n- Can't start with a number: ~~`2cool`~~ → `tooCool`\n- No spaces: ~~`player name`~~ → `playerName`\n- No special characters (except `_` and `$`)\n- Can't use reserved words like `let`, `const`, `function`",
          visual: `
  ┌── Naming Cheat Sheet ───────────┐
  │                                  │
  │  ✅ GOOD          ❌ BAD         │
  │  playerHealth     x              │
  │  isGameOver       data2          │
  │  totalScore       ph             │
  │  enemyCount       stuff          │
  │                                  │
  │  RULES:                          │
  │  ✅ camelCase      ❌ 2cool       │
  │  ✅ descriptive    ❌ player name │
  │  ✅ letters first  ❌ let (reserved)│
  └──────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Putting It All Together",
          content:
            "Let's see variables in action with a mini character sheet:\n\n```js\nconst heroName = \"Kai\"\nconst heroClass = \"Wizard\"\nlet health = 100\nlet mana = 50\nconst isAlive = true\n\nconsole.log(`${heroName} the ${heroClass}`)\nconsole.log(`HP: ${health} | Mana: ${mana}`)\nconsole.log(`Status: ${isAlive ? \"Alive\" : \"Defeated\"}`)\n```\n\nNotice the pattern: `const` for things that won't change (name, class), `let` for things that will (health, mana). Template literals to build readable output. Descriptive camelCase names so anyone can understand the code at a glance.\n\nYou now have one of the most fundamental tools in all of programming. Every app, game, and website uses variables — you'll use them in every single lesson from here on out.",
          visual: `
  ┌── Character Sheet ──────────────┐
  │                                  │
  │  const heroName  = "Kai"         │
  │  const heroClass = "Wizard"      │
  │  let   health    = 100           │
  │  let   mana      = 50            │
  │                                  │
  │  OUTPUT:                         │
  │  > Kai the Wizard                │
  │  > HP: 100 | Mana: 50           │
  │  > Status: Alive                 │
  └──────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Variables Cheat Sheet

### let vs const

| Keyword | Can reassign? | When to use |
|---|---|---|
| \`const\` | No — sealed forever | Default choice. Use for values that won't change. |
| \`let\` | Yes — change anytime | Use when the value needs to update (scores, counters, HP). |
| \`var\` | Yes — but buggy | **Never use.** Old-school JavaScript with scoping problems. |

\`\`\`js
const maxLives = 3
let currentLives = maxLives

currentLives = currentLives - 1  // took damage, now 2
// maxLives = 5  ← ERROR! const can't be reassigned
\`\`\`

### Data Types

| Type | Example | How to spot it |
|---|---|---|
| **String** | \`"Hello"\`, \`'world'\`, \`\\\`backticks\\\`\` | Wrapped in quotes |
| **Number** | \`42\`, \`3.14\`, \`-7\`, \`0\` | No quotes, just digits |
| **Boolean** | \`true\`, \`false\` | Only two possible values |

\`\`\`js
const quest = "Defeat the Dragon"   // string
const reward = 500                    // number
const isComplete = false              // boolean
\`\`\`

### Template Literals

Use backticks (\\\`) and \`\${variable}\` to embed values inside strings:

\`\`\`js
const name = "Aria"
const level = 12

// Old way — messy concatenation
console.log("Player: " + name + " (Lvl " + level + ")")

// New way — template literal
console.log(\`Player: \${name} (Lvl \${level})\`)

// You can even do math inside \${}
console.log(\`Next level: \${level + 1}\`)
\`\`\`

### Naming Conventions

- **camelCase** for variables and functions: \`playerScore\`, \`isGameOver\`
- **UPPER_SNAKE_CASE** for true constants: \`MAX_HEALTH\`, \`API_URL\`
- Start with a letter, \`_\`, or \`$\` — never a number
- No spaces or special characters
- Be descriptive: \`enemyCount\` beats \`ec\` every time

### Common Mistakes

| Mistake | What happens |
|---|---|
| Forgetting quotes on a string: \`let name = Aria\` | Error — JavaScript thinks \`Aria\` is a variable name |
| Using \`=\` instead of \`===\`: \`if (x = 5)\` | Assigns 5 to x instead of comparing! Use \`===\` to compare. |
| Reassigning a \`const\`: \`const x = 1; x = 2\` | TypeError — const values can't be changed |
| Starting with a number: \`let 2fast = true\` | SyntaxError — variable names can't start with digits |
| Using regular quotes for templates: \`"\${name}"\` | Prints the literal text \`\${name}\` — must use backticks |`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Potion Labeling Practice",
      description:
        "Practice declaring variables, using template literals, and identifying data types!",
      steps: [
        {
          instruction:
            'Choose the right keyword to declare a variable that should never change.',
          type: "fill-blank",
          data: {
            template: '___ playerName = "Aria"',
            blanks: [{ id: "keyword", placeholder: "keyword" }],
          },
          solution: {
            keyword: ["const", "let"],
          },
          hint: "We want a sealed potion bottle — which keyword locks a value in place? (Both const and let work, but const is the better choice here.)",
        },
        {
          instruction:
            "Use a template literal to print the player's name. Fill in the variable name inside the ${}.",
          type: "fill-blank",
          data: {
            template: "console.log(`My name is ${___}`)",
            blanks: [{ id: "varname", placeholder: "variable" }],
          },
          solution: {
            varname: "playerName",
          },
          hint: "What variable did we just declare on the previous step? Its label is the name we gave it.",
        },
        {
          instruction: "What data type is `42`?",
          type: "multiple-choice",
          data: {
            options: ["String", "Number", "Boolean", "Undefined"],
          },
          solution: 1,
          hint: "There are no quotes around 42 — it's not text. It's a plain digit value.",
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
            "What is the difference between `let` and `const`?",
          type: "multiple-choice",
          options: [
            "`let` values can be changed later; `const` values cannot",
            "`const` is for numbers; `let` is for strings",
            "`let` is the old way; `const` is the new way — they do the same thing",
            "`const` values can be changed; `let` values cannot",
          ],
          correctAnswer: 0,
          explanation:
            "`let` declares a variable whose value can be reassigned. `const` declares a variable whose value is locked — any attempt to reassign it causes an error.",
        },
        {
          question: "Which of these is a **string**?",
          type: "multiple-choice",
          options: [
            "42",
            "true",
            '"hello"',
            "undefined",
          ],
          correctAnswer: 2,
          explanation:
            'Strings are text wrapped in quotes. "hello" has quotes around it, so it\'s a string. 42 is a number, true is a boolean, and undefined is its own special type.',
        },
        {
          question:
            "What does `${name}` do inside a template literal?",
          type: "multiple-choice",
          options: [
            "Prints the literal text ${name}",
            "Creates a new variable called name",
            "Inserts the current value of the variable `name` into the string",
            "Deletes the variable `name`",
          ],
          correctAnswer: 2,
          explanation:
            "Inside backtick strings, ${...} is replaced with the value of the expression inside it. So if name is \"Aria\", `Hello ${name}` becomes \"Hello Aria\".",
        },
        {
          question:
            "Which variable name follows JavaScript naming conventions?",
          type: "multiple-choice",
          options: [
            "player name",
            "2ndPlayer",
            "playerScore",
            "let",
          ],
          correctAnswer: 2,
          explanation:
            "`playerScore` uses camelCase, starts with a letter, and has no spaces. `player name` has a space, `2ndPlayer` starts with a number, and `let` is a reserved keyword.",
        },
        {
          question: "What data type is `false`?",
          type: "multiple-choice",
          options: [
            "String",
            "Number",
            "Boolean",
            "Null",
          ],
          correctAnswer: 2,
          explanation:
            "`true` and `false` are the two boolean values. Booleans represent yes/no, on/off, true/false — they're used everywhere in conditions and logic.",
        },
      ],
    },
  ],
};

export default lesson;
