import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "json",
  title: "JSON: The Universal Scroll Language",
  description:
    "Learn the universal data format that lets servers, APIs, and apps talk to each other — like a scroll everyone can read.",
  order: 23,
  realm: 4,
  estimatedMinutes: 12,
  xpReward: 160,
  icon: "📜",
  boss: {
    name: "The Syntax Gremlin",
    description:
      "A tiny menace that sneaks trailing commas and missing quotes into your JSON",
    sprite: "syntaxGremlin",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Trailing Comma!",
      "Missing Quote!",
      "Wrong Bracket!",
    ],
    defeatText:
      "The Gremlin vanishes as your JSON validates perfectly!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Problem: Nobody Speaks the Same Language",
          content:
            "Imagine you're in a dungeon party with a wizard who speaks Elvish, a knight who speaks Dwarven, and a rogue who speaks Thieves' Cant. How do you share a treasure map everyone can read?\n\nYou need a **universal scroll language** — one format that every language, every server, and every app can read and write.\n\nThat language is **JSON** — JavaScript Object Notation. It looks almost exactly like the JavaScript objects you already know, but with a few strict rules that make it readable by *any* programming language, not just JavaScript.",
          visual: `
  ┌─────────────────────────────────────┐
  │  🧙 Python    🗡️ JavaScript   🏹 Go │
  │     \\           |            /      │
  │      \\          |           /       │
  │       ▼         ▼          ▼        │
  │      ┌─────────────────────┐        │
  │      │  📜  J S O N        │        │
  │      │  {                  │        │
  │      │    "hp": 100,       │        │
  │      │    "name": "Luna"   │        │
  │      │  }                  │        │
  │      └─────────────────────┘        │
  │   Everyone can read this scroll!    │
  └─────────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "JSON Syntax: The Strict Rules",
          content:
            "JSON looks like a JS object, but it's **stricter**. Here are the rules carved into the scroll:\n\n1. **Keys MUST be in double quotes** — `\"name\"`, not `name`\n2. **Strings MUST use double quotes** — `\"hello\"`, not `'hello'`\n3. **No trailing commas** — the last item can't have a comma after it\n4. **No comments** — no `//` or `/* */` allowed\n5. **No functions** — data only, no methods\n\nBreak any rule and the scroll self-destructs (a parse error). The Syntax Gremlin *loves* when you forget these.",
          visual: `
  ┌─── JSON vs JS OBJECT ───────────────┐
  │                                     │
  │  ✅ Valid JSON:                      │
  │  {                                  │
  │    "name": "Luna",                  │
  │    "level": 5,                      │
  │    "active": true                   │
  │  }                                  │
  │                                     │
  │  ❌ NOT valid JSON:                  │
  │  {                                  │
  │    name: "Luna",    ← no quotes!   │
  │    level: 5,                        │
  │    active: true,    ← trailing ,   │
  │    // a comment     ← not allowed  │
  │  }                                  │
  └─────────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "JSON Data Types: What Can Go in a Scroll?",
          content:
            "JSON supports exactly **six** data types. No more, no less.\n\n- **String** — `\"hello\"` (always double-quoted)\n- **Number** — `42`, `3.14` (no quotes)\n- **Boolean** — `true` or `false` (no quotes)\n- **null** — `null` (the \"nothing\" value)\n- **Array** — `[1, 2, 3]` (ordered list)\n- **Object** — `{ \"key\": \"value\" }` (nested structure)\n\nNotice what's **missing**: no `undefined`, no functions, no dates, no `NaN`. JSON is simple on purpose — that's what makes it universal.",
          visual: `
  ┌─── THE SIX SACRED TYPES ────────────┐
  │                                     │
  │  "text"        → String             │
  │   42           → Number             │
  │   true/false   → Boolean            │
  │   null         → Null               │
  │   [1, 2, 3]    → Array             │
  │   {"a": "b"}   → Object            │
  │                                     │
  │  ❌ undefined  — NOT in JSON        │
  │  ❌ function() — NOT in JSON        │
  │  ❌ NaN        — NOT in JSON        │
  │  ❌ new Date() — NOT in JSON        │
  │                                     │
  │  Simple = universal. That's the     │
  │  point.                             │
  └─────────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "JSON.parse() — Reading the Scroll",
          content:
            "When data arrives from an API or a file, it comes as a **string** — just text. You can't do `data.name` on a string. You need to **parse** it into a real JavaScript object.\n\n```js\nconst scrollText = '{\"name\": \"Luna\", \"hp\": 100}';\nconst hero = JSON.parse(scrollText);\nconsole.log(hero.name); // \"Luna\"\nconsole.log(hero.hp);   // 100\n```\n\n`JSON.parse()` takes a JSON string and turns it into a usable JS object. It's like unrolling a scroll and reading the words — turning text into knowledge.",
          visual: `
  ┌─── JSON.parse() ────────────────────┐
  │                                     │
  │  STRING (raw text from server)      │
  │  '{"name":"Luna","hp":100}'         │
  │          │                          │
  │          ▼  JSON.parse()            │
  │                                     │
  │  OBJECT (usable in JavaScript)      │
  │  { name: "Luna", hp: 100 }         │
  │                                     │
  │  Now you can do:                    │
  │    hero.name  → "Luna"             │
  │    hero.hp    → 100                │
  └─────────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "JSON.stringify() — Writing the Scroll",
          content:
            "The reverse! When you need to **send** data to a server or save it to a file, you turn your JS object back into a JSON string.\n\n```js\nconst hero = { name: \"Luna\", hp: 100, class: \"wizard\" };\nconst scrollText = JSON.stringify(hero);\nconsole.log(scrollText);\n// '{\"name\":\"Luna\",\"hp\":100,\"class\":\"wizard\"}'\n```\n\n`JSON.stringify()` takes a JS object and turns it into a JSON string. It's like writing your data onto a scroll so it can travel to another server.\n\nBonus: `JSON.stringify(hero, null, 2)` pretty-prints it with indentation — great for debugging!",
          visual: `
  ┌─── JSON.stringify() ────────────────┐
  │                                     │
  │  OBJECT (your JS data)              │
  │  { name: "Luna", hp: 100 }         │
  │          │                          │
  │          ▼  JSON.stringify()        │
  │                                     │
  │  STRING (ready to send)             │
  │  '{"name":"Luna","hp":100}'         │
  │                                     │
  │  Pretty-print:                      │
  │  JSON.stringify(hero, null, 2)      │
  │  {                                  │
  │    "name": "Luna",                  │
  │    "hp": 100                        │
  │  }                                  │
  └─────────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "JSON Is EVERYWHERE",
          content:
            "You've been using JSON this whole time without knowing it!\n\n- **APIs** — when you `fetch()` data, the response is JSON\n- **package.json** — every Node.js project has one (your project config!)\n- **Config files** — VS Code settings, ESLint, Prettier, tsconfig\n- **Databases** — many store and return data as JSON\n- **localStorage** — browser storage uses JSON strings\n\nJSON is the **lingua franca** of the internet. Master it, and you can talk to any server, any API, any app.",
          visual: `
  ┌─── JSON IN THE WILD ───────────────┐
  │                                     │
  │  📦 package.json                    │
  │  {                                  │
  │    "name": "my-app",                │
  │    "version": "1.0.0",              │
  │    "scripts": {                     │
  │      "dev": "next dev",             │
  │      "build": "next build"          │
  │    },                               │
  │    "dependencies": {                │
  │      "react": "^18.0.0"            │
  │    }                                │
  │  }                                  │
  │                                     │
  │  You've seen this file before!      │
  │  It's been JSON all along. 📜       │
  └─────────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## JSON Cheat Sheet

### Syntax Rules

| Rule | Example | Why? |
|---|---|---|
| Keys in **double quotes** | \`"name": "Luna"\` | Single quotes and bare keys aren't valid |
| Strings in **double quotes** | \`"hello"\` not \`'hello'\` | JSON only recognizes double quotes |
| **No trailing commas** | \`{ "a": 1, "b": 2 }\` | The last item must NOT have a comma after it |
| **No comments** | — | JSON is pure data, no annotations |
| **No functions** | — | Data only — no \`function()\` or methods |

### The Six Valid Types

\`\`\`json
{
  "string": "hello",
  "number": 42,
  "decimal": 3.14,
  "boolean": true,
  "nothing": null,
  "array": [1, "two", false],
  "nested": {
    "deep": "value"
  }
}
\`\`\`

### JSON.parse() and JSON.stringify()

\`\`\`js
// String → Object (reading a scroll)
const text = '{"name": "Luna", "hp": 100}';
const hero = JSON.parse(text);
hero.name  // "Luna"

// Object → String (writing a scroll)
const data = { level: 5, class: "wizard" };
const json = JSON.stringify(data);
// '{"level":5,"class":"wizard"}'

// Pretty-print with 2-space indent
JSON.stringify(data, null, 2);
// {
//   "level": 5,
//   "class": "wizard"
// }
\`\`\`

### JSON vs JavaScript Objects

| Feature | JSON | JS Object |
|---|---|---|
| Keys | Must be **double-quoted** strings | Can be unquoted identifiers |
| Strings | Double quotes only | Single or double quotes |
| Trailing commas | **Not allowed** | Allowed in modern JS |
| Comments | **Not allowed** | Allowed (\`//\` and \`/* */\`) |
| Functions/methods | **Not allowed** | Allowed |
| \`undefined\` | **Not a valid value** | Valid |
| Use case | Data exchange between systems | In-memory data in your code |

### Nested Structures

JSON can nest objects inside objects and arrays inside arrays — as deep as you want:

\`\`\`json
{
  "guild": "Starweavers",
  "members": [
    {
      "name": "Luna",
      "skills": ["fireball", "heal"],
      "stats": { "hp": 100, "mp": 80 }
    },
    {
      "name": "Kai",
      "skills": ["slash", "block"],
      "stats": { "hp": 150, "mp": 30 }
    }
  ]
}
\`\`\`

Access nested data by chaining: \`guild.members[0].stats.hp\` → \`100\`

### Common Mistakes

1. **Forgetting quotes on keys** — \`{ name: "Luna" }\` is valid JS but **invalid JSON**
2. **Using single quotes** — \`{ 'name': 'Luna' }\` fails in JSON
3. **Trailing comma** — \`{ "a": 1, }\` the comma after the last item breaks parsing
4. **Including undefined** — \`JSON.stringify\` silently drops \`undefined\` values
5. **Parsing non-JSON** — \`JSON.parse("hello")\` throws an error — the string must be valid JSON`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Scroll Scribe Workshop",
      description:
        "Practice reading and writing JSON — the universal data format.",
      steps: [
        {
          instruction:
            "In JSON, all keys must be wrapped in a specific type of quote. Fill in the correct quotes around the key.",
          type: "fill-blank",
          data: {
            template:
              '{\n  ___name___: "Luna",\n  ___hp___: 100\n}',
            blanks: [
              { id: "q1", placeholder: "quote", width: 1 },
              { id: "q2", placeholder: "quote", width: 1 },
            ],
            filename: "hero.json",
          },
          solution: {
            q1: '"',
            q2: '"',
          },
          hint: "JSON requires all keys to be surrounded by double quotes — not single quotes, not bare names.",
        },
        {
          instruction:
            "You received JSON text from an API. Fill in the method that converts this string into a JavaScript object.",
          type: "fill-blank",
          data: {
            template:
              'const text = \'{"name": "Luna", "hp": 100}\';\nconst hero = JSON.___(text);',
            blanks: [
              { id: "method", placeholder: "method name" },
            ],
          },
          solution: {
            method: "parse",
          },
          hint: "Which JSON method reads/decodes a string into an object? Think of parsing a scroll...",
        },
        {
          instruction:
            "Which of these is valid JSON?",
          type: "multiple-choice",
          data: {
            options: [
              '{ name: "Luna", hp: 100 }',
              '{ "name": "Luna", "hp": 100 }',
              "{ \"name\": 'Luna', \"hp\": 100 }",
              '{ "name": "Luna", "hp": 100, }',
            ],
          },
          solution: 1,
          hint: "Remember the three big rules: double-quoted keys, double-quoted strings, no trailing commas.",
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
            "Which of these is NOT valid in JSON?",
          type: "multiple-choice",
          options: [
            '"hello"',
            "42",
            "undefined",
            "null",
          ],
          correctAnswer: 2,
          explanation:
            "undefined is not a valid JSON value. JSON supports strings, numbers, booleans, null, arrays, and objects — but NOT undefined, functions, or NaN.",
        },
        {
          question:
            "What does JSON.parse() do?",
          type: "multiple-choice",
          options: [
            "Converts a JS object into a JSON string",
            "Converts a JSON string into a JS object",
            "Validates whether JSON is correct",
            "Deletes invalid JSON properties",
          ],
          correctAnswer: 1,
          explanation:
            "JSON.parse() takes a JSON-formatted string and converts it into a JavaScript object you can work with — like unrolling a scroll to read it.",
        },
        {
          question:
            "What does JSON.stringify() do?",
          type: "multiple-choice",
          options: [
            "Converts a JSON string into a JS object",
            "Makes JSON text bold",
            "Converts a JS object into a JSON string",
            "Checks if a string is valid JSON",
          ],
          correctAnswer: 2,
          explanation:
            "JSON.stringify() takes a JavaScript object and turns it into a JSON string — the reverse of JSON.parse(). Use it when you need to send data to a server or save it.",
        },
        {
          question:
            "How are JSON keys different from JavaScript object keys?",
          type: "multiple-choice",
          options: [
            "JSON keys must be numbers",
            "JSON keys must be wrapped in double quotes",
            "JSON keys can be functions",
            "There is no difference",
          ],
          correctAnswer: 1,
          explanation:
            "In JSON, every key MUST be a double-quoted string. In JavaScript objects, keys can be unquoted identifiers like { name: \"Luna\" }. This is the most common JSON mistake!",
        },
        {
          question:
            "Where would you encounter JSON in the real world?",
          type: "multiple-choice",
          options: [
            "Only in JavaScript programs",
            "Only in databases",
            "In API responses, config files (package.json), localStorage, and data exchange between any languages",
            "Only when building websites",
          ],
          correctAnswer: 2,
          explanation:
            "JSON is everywhere — API responses, package.json, VS Code settings, database records, localStorage, and data exchange between servers written in any language. That's why it's called the universal scroll language!",
        },
      ],
    },
  ],
};

export default lesson;
