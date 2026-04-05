import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "arrays",
  title: "Arrays: The Treasure Chest",
  description:
    "Store collections of items in ordered lists — like a treasure chest that holds your loot in numbered slots.",
  order: 13,
  realm: 2,
  estimatedMinutes: 12,
  xpReward: 130,
  icon: "📦",
  boss: {
    name: "The Index Troll",
    description:
      "A grumpy troll that guards the treasure chest and trips you up with off-by-one errors",
    sprite: "indexTroll",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Off-By-One Smash!",
      "undefined Access!",
      "Array Overflow Crush!",
    ],
    defeatText:
      "The Troll retreats as you prove you can access any index without stumbling!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "What Are Arrays?",
          content:
            "So far every variable you've created holds **one** thing — a single number, a single string, a single boolean. But what if your hero picks up a sword, a shield, AND a potion? You'd need three separate variables just for one inventory.\n\nAn **array** is like a **treasure chest with numbered slots**. You can stuff as many items as you want into a single variable, and each item gets its own position number called an **index**.\n\n```js\nconst inventory = [\"sword\", \"shield\", \"potion\"];\n```\n\nOne variable. Three items. That's the power of arrays — they hold **collections** of things in a neat, ordered list.",
          visual: `
  ┌─── The Treasure Chest ─────────┐
  │                                 │
  │  const inventory = [            │
  │    "sword",  "shield", "potion" │
  │  ];                             │
  │                                 │
  │  Slot:  [0]      [1]     [2]    │
  │          │        │       │     │
  │         ⚔️       🛡️      🧪    │
  │                                 │
  │  📦 One chest, many treasures!  │
  └─────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Indexes Start at 0!",
          content:
            "Here's the **#1 gotcha** that trips up every adventurer. The first item in an array is at position **0**, not 1. The second item is at position **1**, and so on.\n\n```js\nconst inventory = [\"sword\", \"shield\", \"potion\"];\nconsole.log(inventory[0]); // \"sword\"\nconsole.log(inventory[1]); // \"shield\"\nconsole.log(inventory[2]); // \"potion\"\n```\n\nThink of it like floors in a building — in many countries the ground floor is floor **0**, and the next one up is floor **1**. Computers count from zero. It feels weird at first, but it'll become second nature after a few quests.",
          visual: `
  ┌─── Zero-Based Indexing ────────┐
  │                                 │
  │  inventory[0]  →  "sword"   ⚔️  │
  │  inventory[1]  →  "shield"  🛡️  │
  │  inventory[2]  →  "potion"  🧪  │
  │                                 │
  │  ⚠️  inventory[3]  →  undefined │
  │      (nothing there!)           │
  │                                 │
  │  🏢 Ground floor = 0           │
  │     First floor  = 1           │
  │     Second floor = 2           │
  └─────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Adding and Removing Items",
          content:
            "A treasure chest wouldn't be very useful if you couldn't toss in new loot or pull things out. Arrays have built-in methods for this.\n\n```js\nconst bag = [\"gem\", \"key\"];\nbag.push(\"map\");      // add to END   → [\"gem\", \"key\", \"map\"]\nbag.pop();            // remove from END → [\"gem\", \"key\"]\nbag.unshift(\"coin\");  // add to FRONT → [\"coin\", \"gem\", \"key\"]\nbag.shift();          // remove from FRONT → [\"gem\", \"key\"]\nconsole.log(bag.length); // 2\n```\n\n**`.push()`** and **`.pop()`** work from the back of the chest. **`.unshift()`** and **`.shift()`** work from the front. And **`.length`** tells you how many items are inside — no counting required.",
          visual: `
  ┌─── Push / Pop / Shift ─────────┐
  │                                 │
  │  FRONT ←──── bag ────→ BACK    │
  │                                 │
  │  unshift("coin")   push("map") │
  │     ↓                   ↓      │
  │  [ "coin", "gem", "key", "map"]│
  │     ↑                   ↑      │
  │   shift()            pop()     │
  │                                 │
  │  bag.length → 4                │
  │                                 │
  │  🎒 Front & back operations!   │
  └─────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Looping Through Arrays",
          content:
            "Having a treasure chest full of items is great, but you'll often want to **look at every item** — to display inventory, check for a specific weapon, or apply an effect to all potions.\n\n```js\n// for...of — cleanest and most readable\nfor (const item of inventory) {\n  console.log(item);\n}\n\n// .forEach() — array method, gives you the item\ninventory.forEach((item) => {\n  console.log(item);\n});\n\n// Classic for loop — when you need the index\nfor (let i = 0; i < inventory.length; i++) {\n  console.log(i, inventory[i]);\n}\n```\n\n**`for...of`** is the go-to for simple iteration. **`.forEach()`** is handy when chaining. The **classic for loop** shines when you need the index number.",
          visual: `
  ┌─── Looping Styles ─────────────┐
  │                                 │
  │  for...of          forEach()    │
  │  ┌──────────┐  ┌──────────────┐│
  │  │ Clean &  │  │ Array method ││
  │  │ readable │  │ + callbacks  ││
  │  └──────────┘  └──────────────┘│
  │                                 │
  │  Classic for (let i = 0; ...)   │
  │  ┌────────────────────────────┐│
  │  │ Full control + index      ││
  │  └────────────────────────────┘│
  │                                 │
  │  🔄 Pick the right tool!       │
  └─────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Useful Array Methods",
          content:
            "Arrays come loaded with helpful methods beyond push/pop. Here are three you'll use **all the time**.\n\n```js\nconst items = [\"sword\", \"shield\", \"potion\", \"gem\"];\n\nitems.includes(\"shield\");   // true — is it in the chest?\nitems.indexOf(\"potion\");    // 2 — what slot is it in?\nitems.indexOf(\"banana\");    // -1 — not found!\nitems.join(\", \");           // \"sword, shield, potion, gem\"\n```\n\n**`.includes()`** answers yes/no — does this item exist? **`.indexOf()`** tells you the position (or `-1` if it's missing). **`.join()`** glues all items into a single string with a separator of your choice. These are your everyday utility spells.",
          visual: `
  ┌─── Everyday Array Spells ──────┐
  │                                 │
  │  .includes("shield")  → true   │
  │  .includes("banana")  → false  │
  │                                 │
  │  .indexOf("potion")   → 2      │
  │  .indexOf("banana")   → -1     │
  │                                 │
  │  .join(" + ")                   │
  │  → "sword + shield + potion"   │
  │                                 │
  │  🔍 Search, find, combine!     │
  └─────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Arrays Everywhere",
          content:
            "Arrays aren't just a textbook concept — they're one of the **most-used structures in all of programming**. Every app you've ever used relies on them.\n\nA **todo list** is an array of tasks. A **leaderboard** is an array of scores. A **playlist** is an array of songs. A **chat app** is an array of messages. Even this lesson's quiz questions are stored in an array!\n\nWhenever you have a collection of similar things — inventory items, player names, quest steps — an array is your go-to. Master arrays, and you've unlocked one of the most essential building blocks in code.",
          visual: `
  ┌─── Arrays in the Wild ─────────┐
  │                                 │
  │  📋 Todo list    → ["Buy milk"] │
  │  🏆 Leaderboard → [500, 320]   │
  │  🎵 Playlist    → ["Song A"]   │
  │  💬 Chat        → ["Hi!", "Yo"]│
  │  ⚔️ Inventory   → ["Sword"]    │
  │  📝 Quiz        → [Q1, Q2, Q3] │
  │                                 │
  │  Collections of things?         │
  │  That's an array. Every time.   │
  │                                 │
  │  🌍 Arrays power the world!    │
  └─────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Arrays Cheat Sheet

### Creating Arrays

\`\`\`js
// Empty array
const empty = [];

// Array with items
const inventory = ["sword", "shield", "potion"];

// Arrays can hold any type — even mixed!
const mixed = ["Luna", 42, true, null];

// Array of numbers
const scores = [100, 85, 92, 78];
\`\`\`

### Accessing Items (0-Based Indexing)

\`\`\`js
const heroes = ["Link", "Zelda", "Ganon"];
heroes[0]  // "Link"   — first item
heroes[1]  // "Zelda"  — second item
heroes[2]  // "Ganon"  — third item
heroes[3]  // undefined — nothing there (no error!)
\`\`\`

| Index | 0 | 1 | 2 |
|---|---|---|---|
| Value | "Link" | "Zelda" | "Ganon" |

### Common Methods

| Method | What It Does | Example | Result |
|---|---|---|---|
| \`.push(item)\` | Add to end | \`arr.push("bow")\` | \`["sword", "bow"]\` |
| \`.pop()\` | Remove from end | \`arr.pop()\` | removes last item |
| \`.unshift(item)\` | Add to front | \`arr.unshift("hat")\` | \`["hat", "sword"]\` |
| \`.shift()\` | Remove from front | \`arr.shift()\` | removes first item |
| \`.length\` | Count items | \`arr.length\` | \`3\` |
| \`.includes(x)\` | Check if exists | \`arr.includes("sword")\` | \`true / false\` |
| \`.indexOf(x)\` | Find position | \`arr.indexOf("shield")\` | \`1\` (or \`-1\`) |
| \`.join(sep)\` | Combine to string | \`arr.join(", ")\` | \`"a, b, c"\` |

### Looping Through Arrays

\`\`\`js
const loot = ["gem", "coin", "ring"];

// for...of — cleanest, use by default
for (const item of loot) {
  console.log(item);
}

// .forEach() — array method with callback
loot.forEach((item, index) => {
  console.log(index + ": " + item);
});

// Classic for — when you need full index control
for (let i = 0; i < loot.length; i++) {
  console.log(i + ": " + loot[i]);
}
\`\`\`

| Style | Best When |
|---|---|
| \`for...of\` | You just need each item, no index |
| \`.forEach()\` | You want item + index, or chaining |
| Classic \`for\` | You need to skip items, go backwards, or use \`i\` for math |

### Common Mistakes

1. **Off-by-one errors** — The last item's index is \`array.length - 1\`, NOT \`array.length\`. An array of 3 items has indexes 0, 1, 2.
2. **Accessing beyond length** — \`inventory[99]\` returns \`undefined\`, not an error. Your code keeps running with a broken value — sneaky bug!
3. **Forgetting arrays are zero-indexed** — "The third item" is \`array[2]\`, not \`array[3]\`. Always subtract one from the human-friendly position.
4. **Confusing \`.length\` with last index** — \`.length\` is 3 for a 3-item array, but the last index is 2.

### Putting It All Together

\`\`\`js
const questLog = [];

// Add quests
questLog.push("Find the lost gem");
questLog.push("Defeat the goblin king");
questLog.push("Return the shield");

// Show all quests
console.log("=== Quest Log ===");
for (const quest of questLog) {
  console.log("• " + quest);
}

// Check for a quest
if (questLog.includes("Defeat the goblin king")) {
  console.log("Boss fight is on the list!");
}

// Complete the first quest
const done = questLog.shift();
console.log("Completed: " + done);
console.log("Remaining: " + questLog.length);
\`\`\`

Arrays are the **backbone of collections** in JavaScript. Master them and you can manage any list of data your program throws at you.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Treasure Chest Training",
      description:
        "Practice creating, accessing, and modifying arrays — the ordered containers that hold your data.",
      steps: [
        {
          instruction:
            "Access the second item in the array. Remember: indexes start at 0!",
          type: "fill-blank",
          data: {
            template:
              'const items = ["gem", "key", "map"];\nconsole.log(items[___]);',
            blanks: [{ id: "idx", placeholder: "index" }],
          },
          solution: {
            idx: "1",
          },
          hint: "The first item is at index 0, so the second item is at index...?",
        },
        {
          instruction:
            "Add 'potion' to the end of the inventory array.",
          type: "type-command",
          data: {
            prompt: "# Add 'potion' to the end of inventory",
            caseSensitive: false,
            acceptAlternatives: [
              "inventory.push('potion')",
              'inventory.push( "potion" )',
              "inventory.push( 'potion' )",
            ],
          },
          solution: 'inventory.push("potion")',
          hint: "The .push() method adds an item to the end of an array. Call it on inventory with \"potion\" as the argument.",
        },
        {
          instruction:
            'What does `["a", "b", "c"].length` return?',
          type: "multiple-choice",
          data: {
            options: ["0", "2", "3", "undefined"],
          },
          solution: 2,
          hint: "The .length property counts the total number of items in the array — not the last index.",
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
            'Given `const pets = ["cat", "dog", "fish"]`, what is `pets[0]`?',
          type: "multiple-choice",
          options: ["dog", "cat", "fish", "undefined"],
          correctAnswer: 1,
          explanation:
            "Arrays are zero-indexed, so the first item at index 0 is \"cat\".",
        },
        {
          question:
            'What does `.push("arrow")` do to an array?',
          type: "multiple-choice",
          options: [
            "Removes \"arrow\" from the array",
            "Adds \"arrow\" to the beginning",
            "Adds \"arrow\" to the end",
            "Replaces the first item with \"arrow\"",
          ],
          correctAnswer: 2,
          explanation:
            ".push() always adds the new item to the END of the array. Use .unshift() to add to the beginning.",
        },
        {
          question:
            'What is the `.length` of `["x", "y", "z", "w"]`?',
          type: "multiple-choice",
          options: ["3", "4", "5", "0"],
          correctAnswer: 1,
          explanation:
            ".length returns the total count of items. Four items means .length is 4. The last index would be 3 (length minus one).",
        },
        {
          question:
            "Which loop style is the cleanest for iterating over every item in an array?",
          type: "multiple-choice",
          options: [
            "while (true) { }",
            "for (const item of array) { }",
            "do { } while (array)",
            "if (array) { }",
          ],
          correctAnswer: 1,
          explanation:
            "for...of is the cleanest way to loop through every item in an array when you don't need the index. It reads almost like English: \"for each item of the array.\"",
        },
        {
          question:
            'What happens when you access an index that doesn\'t exist, like `["a", "b"][5]`?',
          type: "multiple-choice",
          options: [
            "It throws an error and crashes",
            "It returns null",
            "It returns undefined",
            "It returns an empty string",
          ],
          correctAnswer: 2,
          explanation:
            "Accessing an out-of-bounds index in JavaScript returns undefined — no error, no crash. This is a sneaky source of bugs because your code keeps running with a broken value.",
        },
      ],
    },
  ],
};

export default lesson;
