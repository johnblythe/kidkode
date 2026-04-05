import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "objects",
  title: "Objects: The Character Sheet",
  description:
    "Group related data together with named properties — like a character sheet that holds your hero's stats, gear, and abilities.",
  order: 14,
  realm: 2,
  estimatedMinutes: 14,
  xpReward: 140,
  icon: "📋",
  boss: {
    name: "The Shapeless Ooze",
    description:
      "A formless blob with no structure — it can't be defeated until you give it properties and shape",
    sprite: "shapelessOoze",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Undefined Property Splash!",
      "Missing Key Strike!",
      "Prototype Pollution!",
    ],
    defeatText:
      "You define the Ooze's properties — `{ status: 'defeated' }` — and it solidifies into harmless stone!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "What Are Objects?",
          content:
            "You already know arrays — they hold **lists** of things in numbered slots. But what if you want to describe a *character*? A character has a name, hit points, a class, a level… things with **names**, not just numbers.\n\nThat's what an **object** is: a collection of **key-value pairs** wrapped in curly braces. Each key is a label and each value is the data attached to that label — just like a character sheet.\n\n```js\nconst hero = { name: \"Luna\", hp: 100, class: \"wizard\" };\n```\n\nArrays say \"here's item #0, item #1…\" — objects say \"here's the `name`, here's the `hp`.\" When your data has **meaning behind each piece**, reach for an object.",
          visual: `
  ┌─── CHARACTER SHEET ─────────────┐
  │                                 │
  │  const hero = {                 │
  │    name:  "Luna",      ← key   │
  │    hp:    100,         ← key   │
  │    class: "wizard"     ← key   │
  │  };                             │
  │                                 │
  │  Array:  [ "Luna", 100 ]        │
  │          slot 0   slot 1        │
  │                                 │
  │  Object: { name: "Luna" }       │
  │           named properties      │
  └─────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Accessing Properties",
          content:
            "You've written the character sheet. Now how do you **read** it? Two ways.\n\n**Dot notation** — the easy way. Just type the object name, a dot, and the key:\n```js\nhero.name   // \"Luna\"\nhero.hp     // 100\n```\n\n**Bracket notation** — use when the key is stored in a variable, or when the key name has spaces or weird characters:\n```js\nhero[\"name\"]         // \"Luna\"\nconst stat = \"hp\";\nhero[stat]           // 100\n```\n\nDot notation is cleaner and what you'll use 90% of the time. Brackets are the fallback when dots won't work — like accessing a treasure chest with an oddly-shaped key.",
          visual: `
  ┌─── TWO WAYS TO READ ───────────┐
  │                                 │
  │  hero.name          → "Luna"   │
  │       ·                         │
  │    dot notation (clean!)        │
  │                                 │
  │  hero["name"]       → "Luna"   │
  │       [  ]                      │
  │    bracket notation (flexible!) │
  │                                 │
  │  const key = "hp";              │
  │  hero[key]          → 100      │
  │    ↑ dynamic key — dots can't! │
  └─────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Adding and Changing Properties",
          content:
            "Objects aren't frozen scrolls — they're **living documents**. You can add new properties or change existing ones at any time.\n\n```js\nhero.level = 5;     // adds a new property\nhero.hp = 80;       // updates an existing one\n```\n\nEven though we declared `hero` with `const`, we can still change what's *inside* the object. `const` only prevents you from reassigning the variable itself (`hero = somethingElse` would fail). The contents are fair game.\n\nYou can also **delete** a property: `delete hero.class;` — poof, it's gone from the sheet. But be careful — accessing a property that doesn't exist returns `undefined`, not an error. The game doesn't crash, it just shrugs.",
          visual: `
  ┌─── MUTATING OBJECTS ────────────┐
  │                                 │
  │  hero.level = 5;    ← ADD      │
  │  hero.hp    = 80;   ← UPDATE   │
  │  delete hero.class; ← REMOVE   │
  │                                 │
  │  BEFORE:                        │
  │  { name: "Luna", hp: 100,      │
  │    class: "wizard" }            │
  │                                 │
  │  AFTER:                         │
  │  { name: "Luna", hp: 80,       │
  │    level: 5 }                   │
  └─────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Nested Objects",
          content:
            "Objects can hold *other* objects inside them — like sub-sections on a character sheet. Your hero doesn't just have a weapon name; they have a whole **inventory** with multiple items.\n\n```js\nconst hero = {\n  name: \"Luna\",\n  inventory: {\n    weapon: \"staff\",\n    armor: \"robe\",\n    potion: \"mana elixir\"\n  }\n};\n```\n\nTo reach nested data, just chain the dots: `hero.inventory.weapon` → `\"staff\"`. Think of it as opening a folder inside a folder — each dot opens one more layer.\n\nThis is how real game data is structured. A single object can describe an *entire* character — stats, gear, abilities, quest log — all organized into neat sub-objects.",
          visual: `
  ┌─── NESTED OBJECTS ──────────────┐
  │                                 │
  │  hero                           │
  │   ├── name: "Luna"              │
  │   ├── hp: 100                   │
  │   └── inventory                 │
  │        ├── weapon: "staff"      │
  │        ├── armor:  "robe"       │
  │        └── potion: "mana elixir"│
  │                                 │
  │  hero.inventory.weapon          │
  │  → "staff"                      │
  │                                 │
  │  📂 Folders inside folders!     │
  └─────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Methods: Objects That DO Things",
          content:
            "So far, objects hold **data**. But they can also hold **functions** — and a function that lives inside an object is called a **method**.\n\n```js\nconst hero = {\n  name: \"Luna\",\n  hp: 100,\n  attack() {\n    return \"Fireball!\";\n  }\n};\nhero.attack(); // \"Fireball!\"\n```\n\nNotice the syntax: you write the function name directly inside the object, followed by `()` and the body. No `function` keyword needed.\n\nMethods let objects **do things**, not just **be things**. A character sheet that can attack, heal, and level up — that's the foundation of object-oriented programming. You'll see methods everywhere: `console.log()`, `Math.round()`, `array.push()` — they're all methods on objects.",
          visual: `
  ┌─── METHODS ─────────────────────┐
  │                                 │
  │  const hero = {                 │
  │    name: "Luna",     ← data    │
  │    hp: 100,          ← data    │
  │    attack() {        ← METHOD  │
  │      return "Fireball!";       │
  │    }                            │
  │  };                             │
  │                                 │
  │  hero.attack()  → "Fireball!"  │
  │                                 │
  │  Data + behavior = power! ⚔️    │
  └─────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Objects + Arrays = Power",
          content:
            "Here's the final combo: **arrays of objects**. Instead of one hero, imagine a whole adventuring party — a list where each item is a character sheet.\n\n```js\nconst party = [\n  { name: \"Luna\", class: \"wizard\", hp: 100 },\n  { name: \"Kai\",  class: \"knight\", hp: 150 },\n  { name: \"Zara\", class: \"elf\",    hp: 90  }\n];\nparty[0].name;  // \"Luna\"\nparty[1].hp;    // 150\n```\n\nArray index gets you the object, dot notation gets you the property. This pattern — arrays of objects — is how **every real app** stores data. User lists, product catalogs, game inventories, chat messages… all arrays of objects.\n\nMaster this combo and you've unlocked the same data structure that powers every app on your phone.",
          visual: `
  ┌─── ARRAY OF OBJECTS ────────────┐
  │                                 │
  │  const party = [                │
  │    [0] { name: "Luna", hp:100 } │
  │    [1] { name: "Kai",  hp:150 } │
  │    [2] { name: "Zara", hp: 90 } │
  │  ];                             │
  │                                 │
  │  party[0].name  → "Luna"       │
  │  party[2].hp    → 90           │
  │                                 │
  │  index ──→ object ──→ property │
  │  [1]         .         name    │
  └─────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Objects Cheat Sheet

### Creating an Object

\`\`\`js
const hero = {
  name: "Luna",
  hp: 100,
  class: "wizard",
  level: 1
};
\`\`\`

- Wrapped in curly braces \`{ }\`
- Each property is a **key: value** pair
- Properties are separated by **commas**
- Keys are strings (quotes optional when they're simple names)
- Values can be anything: strings, numbers, booleans, arrays, other objects, functions

### Dot vs Bracket Notation

| Style | Syntax | When to Use |
|---|---|---|
| **Dot** | \`hero.name\` | Most of the time — clean and readable |
| **Bracket** | \`hero["name"]\` | Dynamic keys, keys with spaces/special chars |

\`\`\`js
hero.name          // "Luna"
hero["name"]       // "Luna"

const key = "hp";
hero[key]          // 100  — dot can't do this!

// Keys with spaces (rare, but possible)
const item = { "full name": "Luna Starweaver" };
item["full name"]  // dot notation won't work here
\`\`\`

### Adding, Updating, and Deleting

\`\`\`js
// Add a new property
hero.weapon = "staff";

// Update an existing property
hero.hp = 80;

// Delete a property
delete hero.class;

// Check if a property exists
"weapon" in hero   // true
"armor" in hero    // false
\`\`\`

### Nested Objects

\`\`\`js
const hero = {
  name: "Luna",
  inventory: {
    weapon: "staff",
    armor: "robe",
    potions: ["mana", "health"]
  }
};

hero.inventory.weapon       // "staff"
hero.inventory.potions[0]   // "mana"
\`\`\`

Chain dots to dig deeper. Mix with array indexes when objects contain arrays.

### Methods (Functions Inside Objects)

\`\`\`js
const hero = {
  name: "Luna",
  hp: 100,
  attack() {
    return "Fireball deals 25 damage!";
  },
  heal(amount) {
    this.hp += amount;
    return this.hp;
  }
};

hero.attack()    // "Fireball deals 25 damage!"
hero.heal(20)    // 120
\`\`\`

\`this\` inside a method refers to the object itself — so \`this.hp\` means \`hero.hp\`.

### Objects vs Arrays — When to Use Which

| Use an **Array** when… | Use an **Object** when… |
|---|---|
| Items are ordered (a list) | Items have named properties |
| You access by position: \`arr[0]\` | You access by name: \`obj.name\` |
| All items are similar | Each property means something different |
| Example: inventory list | Example: one character's stats |

The power move: **arrays of objects** — a list where each item is a rich, named data structure.

### Common Mistakes

1. **Accessing a property that doesn't exist** — returns \`undefined\`, no error. Silent bugs!
2. **Forgetting commas** between properties — causes a syntax error.
3. **Using dot notation with variables** — \`hero.key\` looks for a property literally named "key". Use \`hero[key]\` for dynamic access.
4. **Confusing arrays and objects** — \`[]\` is an array, \`{}\` is an object. They look similar but behave differently.
5. **Thinking \`const\` freezes the object** — \`const\` prevents reassigning the variable, not changing properties inside.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Character Sheet Workshop",
      description:
        "Practice creating and reading objects — the building blocks of structured data.",
      steps: [
        {
          instruction:
            "Access the hero's name using dot notation. Fill in the property name.",
          type: "fill-blank",
          data: {
            template:
              'const hero = { name: "Luna", hp: 100 };\nconsole.log(hero.___)',
            blanks: [{ id: "prop", placeholder: "property" }],
          },
          solution: {
            prop: "name",
          },
          hint: "Which property holds the hero's name? Look at the keys inside the object.",
        },
        {
          instruction:
            "Add a new property to give the hero a class. Fill in the property name.",
          type: "fill-blank",
          data: {
            template: 'hero.___ = "wizard"',
            blanks: [{ id: "key", placeholder: "property name" }],
          },
          solution: {
            key: ["class", "heroClass", "role", "type"],
          },
          hint: "Pick a property name that describes what kind of hero they are — like 'class' or 'role'.",
        },
        {
          instruction:
            "What does `hero.weapon` return if the `weapon` property was never defined on the object?",
          type: "multiple-choice",
          data: {
            options: [
              "It throws an error",
              "undefined",
              "null",
              "0",
            ],
          },
          solution: 1,
          hint: "JavaScript doesn't crash when you ask for something that doesn't exist — it gives you a special 'nothing' value.",
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
            "Which of these correctly creates an object with a `name` property?",
          type: "multiple-choice",
          options: [
            'const hero = { name: "Luna" };',
            'const hero = [ name: "Luna" ];',
            'const hero = ( name: "Luna" );',
            'const hero = name: "Luna";',
          ],
          correctAnswer: 0,
          explanation:
            "Objects use curly braces { } with key: value pairs. Square brackets are for arrays, and parentheses don't create data structures.",
        },
        {
          question:
            "What is the difference between `hero.name` and `hero[\"name\"]`?",
          type: "multiple-choice",
          options: [
            "Dot notation is faster",
            "Bracket notation only works with numbers",
            "They do the same thing, but brackets also work with variables and special keys",
            "Dot notation returns a string, brackets return a number",
          ],
          correctAnswer: 2,
          explanation:
            "Both access the same property. Bracket notation is more flexible — it works with dynamic keys stored in variables and with key names that have spaces or special characters.",
        },
        {
          question:
            "Given `const hero = { stats: { str: 10, dex: 15 } }`, how do you access `dex`?",
          type: "multiple-choice",
          options: [
            "hero.dex",
            "hero.stats.dex",
            "hero[stats][dex]",
            "hero->stats->dex",
          ],
          correctAnswer: 1,
          explanation:
            "For nested objects, chain dot notation: hero.stats gets the inner object, then .dex gets the property inside it.",
        },
        {
          question: "What is a method?",
          type: "multiple-choice",
          options: [
            "A special type of array",
            "A function that lives inside an object",
            "A way to delete properties",
            "A CSS style for objects",
          ],
          correctAnswer: 1,
          explanation:
            "A method is a function defined as a property of an object. You call it with dot notation: object.method(). Examples you already know: console.log(), array.push().",
        },
        {
          question:
            "Given `const party = [{ name: \"Luna\" }, { name: \"Kai\" }]`, what is `party[1].name`?",
          type: "multiple-choice",
          options: [
            '"Luna"',
            '"Kai"',
            "undefined",
            "It throws an error",
          ],
          correctAnswer: 1,
          explanation:
            "party[1] gets the second object (index starts at 0), and .name gets its name property — which is \"Kai\".",
        },
      ],
    },
  ],
};

export default lesson;
