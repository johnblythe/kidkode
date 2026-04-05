import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "loops",
  title: "Loops: The Enchanted Treadmill",
  description:
    "Make your code repeat actions without copying and pasting — but beware the infinite loop trap!",
  order: 10,
  realm: 2,
  estimatedMinutes: 14,
  xpReward: 110,
  icon: "🔄",
  boss: {
    name: "The Infinite Loop Worm",
    description:
      "A serpent that endlessly circles, growing longer with each pass — break the cycle or be consumed",
    sprite: "infiniteLoopWorm",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "while(true) Strike!",
      "Off-By-One Bite!",
      "Stack Overflow Crush!",
    ],
    defeatText:
      "You break the loop condition and the Worm uncoils into nothing — `i < worm.length` finally returns false!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "Why Loops?",
          content:
            "Imagine your hero needs to shout **\"Attack!\"** one hundred times to charge a spell. Would you really write `console.log(\"Attack!\")` a hundred times? That's a hundred lines of the *exact same thing*.\n\nOf course not. You'd enchant a **treadmill** — a magical device that repeats an action for you, over and over, until you tell it to stop.\n\nThat's what a **loop** is. One instruction, repeated as many times as you want. Loops are one of the most powerful spells in all of programming.",
          visual: `
  ┌──────────────────────────────────┐
  │  WITHOUT LOOPS:                  │
  │                                  │
  │  console.log("Attack!")  // 1    │
  │  console.log("Attack!")  // 2    │
  │  console.log("Attack!")  // 3    │
  │  ... 97 more times 😩           │
  │                                  │
  │  WITH A LOOP:                    │
  │                                  │
  │  🔄 repeat 100 times {          │
  │    console.log("Attack!")        │
  │  }  ✨ Done!                     │
  └──────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "The for Loop: Counting Spell",
          content:
            "The **`for` loop** is the most common loop. It has three parts separated by semicolons — think of them as the treadmill's controls:\n\n1. **Start** — `let i = 0` → set the counter to zero\n2. **Condition** — `i < 5` → keep going while this is true\n3. **Step** — `i++` → add 1 to the counter after each lap\n\nSo `for (let i = 0; i < 5; i++)` means: start at 0, keep going while i is less than 5, add 1 each time. That gives you 5 laps: 0, 1, 2, 3, 4.",
          visual: `
  ┌── The for Loop Machine ─────────┐
  │                                  │
  │  for (let i = 0; i < 5; i++) {  │
  │        ─┬──────  ──┬──  ─┬──    │
  │         │          │     │      │
  │       START     CONDITION STEP   │
  │     "Begin     "Keep     "Add   │
  │      at 0"     going?"    1"    │
  │                                  │
  │  Lap 0 → Lap 1 → Lap 2 →       │
  │  Lap 3 → Lap 4 → STOP ✋        │
  └──────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "The while Loop: Danger Spell",
          content:
            "The **`while` loop** is simpler — it just checks a condition and keeps looping as long as it's true.\n\n```\nwhile (health > 0) {\n  fight();\n}\n```\n\nThis says: *keep fighting while your health is above zero.* Simpler to write than a `for` loop, but also **more dangerous**. Why? Because if nothing inside the loop ever changes `health`, the condition stays true forever... and your program never stops.",
          visual: `
  ┌── The while Loop ───────────────┐
  │                                  │
  │  let health = 3;                 │
  │                                  │
  │  while (health > 0) { ──┐       │
  │    fight();              │ LOOP  │
  │    health--;    ←───────┘       │
  │  }                               │
  │                                  │
  │  Round 1: health = 3 → fight!   │
  │  Round 2: health = 2 → fight!   │
  │  Round 3: health = 1 → fight!   │
  │  health = 0 → STOP ✋            │
  └──────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "⚠️ The Infinite Loop Trap!",
          content:
            "Here's the scariest bug a new coder can hit: the **infinite loop**. It happens when the condition **never becomes false**.\n\n```\nwhile (true) {\n  console.log(\"HELP!\");\n}\n```\n\nYour program freezes. Your fan spins up. Nothing responds. Don't panic!\n\n**Press `Ctrl + C` in your terminal.** This is your **emergency brake** — it kills the runaway program immediately. Every developer has done this. You're not breaking anything. `Ctrl + C` is your best friend when loops go wrong.",
          visual: `
  ┌── INFINITE LOOP DETECTED! ──────┐
  │                                  │
  │  🐛 while (true) {              │
  │       console.log("HELP!");      │
  │     }                            │
  │                                  │
  │  HELP! HELP! HELP! HELP! HELP!  │
  │  HELP! HELP! HELP! HELP! HEL—  │
  │                                  │
  │  ┌────────────────────────────┐  │
  │  │  🛑 Press Ctrl + C  NOW!  │  │
  │  │     Emergency Brake!       │  │
  │  └────────────────────────────┘  │
  └──────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Reading Error Messages",
          content:
            "When your loop (or any code) breaks, the terminal spits out an **error message**. It looks scary, but it's actually a **treasure map** to the bug.\n\nEvery error tells you three things:\n1. **Error type** — `ReferenceError`, `TypeError`, `SyntaxError`\n2. **Message** — what went wrong, in English\n3. **Line number** — exactly where it happened\n\nSo `ReferenceError: count is not defined (line 3)` means: on line 3, you used a variable called `count` that doesn't exist. Maybe you misspelled it, or forgot to create it. **Don't panic — read the message.**",
          visual: `
  ┌── Error Messages = Treasure Map ┐
  │                                  │
  │  ❌ ReferenceError:              │
  │     count is not defined         │
  │       at loop.js:3:5             │
  │       ─────┬─── ┬ ┬             │
  │            │    │ └─ column      │
  │            │    └─── line 3      │
  │            └──────── file name   │
  │                                  │
  │  Translation:                    │
  │  "Line 3 uses 'count' but you   │
  │   never created that variable!"  │
  └──────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "for...of: The Friendly Loop",
          content:
            "When you have a **list of items** and just want to go through each one, there's an even easier loop: **`for...of`**.\n\n```\nconst spells = [\"fire\", \"ice\", \"heal\"];\nfor (const spell of spells) {\n  console.log(spell);\n}\n```\n\nNo counter. No `i++`. No off-by-one bugs. It just gives you each item, one at a time. We'll use this a lot when we learn about **arrays** in an upcoming lesson. For now, just know it exists — the friendliest loop in your spellbook.",
          visual: `
  ┌── for...of: The Friendly Loop ──┐
  │                                  │
  │  spells = ["fire","ice","heal"]  │
  │                                  │
  │  for (const spell of spells) {   │
  │    cast(spell);                  │
  │  }                               │
  │                                  │
  │  Round 1: spell = "fire"  🔥    │
  │  Round 2: spell = "ice"   🧊    │
  │  Round 3: spell = "heal"  💚    │
  │  Done! No counter needed.        │
  └──────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 5,
      content: `## Loops Cheat Sheet

### for Loop

\`\`\`js
for (let i = 0; i < 5; i++) {
  console.log("Lap " + i);
}
// Output: Lap 0, Lap 1, Lap 2, Lap 3, Lap 4
\`\`\`

| Part | What it does | Example |
|---|---|---|
| **Start** | Sets the counter | \`let i = 0\` |
| **Condition** | Checked before each lap — loop continues while true | \`i < 5\` |
| **Step** | Runs after each lap | \`i++\` (adds 1) |

### while Loop

\`\`\`js
let hp = 3;
while (hp > 0) {
  console.log("Fighting! HP: " + hp);
  hp--;  // ← DON'T FORGET THIS or it loops forever!
}
\`\`\`

Use **while** when you don't know how many times you'll loop. Use **for** when you do.

### for...of Loop

\`\`\`js
const items = ["sword", "shield", "potion"];
for (const item of items) {
  console.log("Found: " + item);
}
\`\`\`

Best for going through a list of items without needing a counter.

---

## 🛠️ Debugging: Your Survival Kit

### How to Read an Error Message

When your code breaks, the error has **three clues**:

\`\`\`
TypeError: Cannot read properties of undefined (reading 'name')
    at loop.js:7:15
\`\`\`

1. **Error type** — \`TypeError\` tells you the *category* of mistake
2. **Message** — \`Cannot read properties of undefined\` tells you *what* went wrong
3. **Location** — \`loop.js:7:15\` means file \`loop.js\`, line \`7\`, column \`15\`

**Step 1:** Read the message out loud. **Step 2:** Go to that line number. **Step 3:** Look at what's on that line and think about why it could be undefined/wrong.

### Ctrl + C: The Emergency Brake

| Situation | What to do |
|---|---|
| Program is frozen / printing forever | Press **Ctrl + C** in the terminal |
| Browser tab is frozen | Close the tab (Ctrl + W) |
| Nothing is responding at all | Close the terminal and open a new one |

\`Ctrl + C\` sends an "interrupt" signal — it's safe and it's what every professional developer uses. You're not breaking anything.

### Common Loop Bugs

| Bug | What happens | How to fix |
|---|---|---|
| **Forgot to increment** (\`i++\`) | Infinite loop — counter never changes | Add \`i++\` or \`counter++\` inside or in the for step |
| **Off-by-one error** | Loop runs one too many or one too few times | Check: should it be \`<\` or \`<=\`? Start at 0 or 1? |
| **Wrong comparison** | \`i < 5\` vs \`i > 5\` — loop never starts or never ends | Think: should the counter go up or down? |
| **Variable not declared** | \`ReferenceError: i is not defined\` | Make sure you wrote \`let i = 0\` in the for statement |
| **Changing the wrong variable** | Condition never changes, infinite loop | Make sure the variable in the condition is the one being updated |

### Common Loop Patterns

| Pattern | Code | Use case |
|---|---|---|
| Count up | \`for (let i = 0; i < n; i++)\` | Most common — do something n times |
| Count down | \`for (let i = n; i > 0; i--)\` | Countdown timer, reverse order |
| Loop through list | \`for (const x of list)\` | Process each item in a collection |
| Repeat until done | \`while (!done) { ... }\` | User input, game loops, searching |`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Loop Training Grounds",
      description:
        "Practice writing loops and escaping infinite ones!",
      steps: [
        {
          instruction:
            "Complete the for loop so it prints 0 through 4:",
          type: "fill-blank",
          data: {
            template:
              "for (let i = 0; i ___ 5; i++) { console.log(i); }",
            blanks: [{ id: "op", placeholder: "operator" }],
          },
          solution: { op: "<" },
          hint: "We want i to go 0, 1, 2, 3, 4 — that's 5 values. What comparison operator stops BEFORE 5?",
        },
        {
          instruction:
            "Your code is running forever and won't stop! The terminal is printing \"HELP!\" over and over. What keyboard shortcut should you press?",
          type: "multiple-choice",
          data: {
            options: [
              "Ctrl + Z",
              "Ctrl + C",
              "Ctrl + S",
              "Alt + F4",
            ],
          },
          solution: 1,
          hint: "It's the emergency brake we learned about — C stands for Cancel!",
        },
        {
          instruction:
            "Write the condition for a while loop that keeps fighting while health is greater than 0:",
          type: "type-command",
          data: {
            prompt:
              "# Write the condition for: while (___) { fight(); }",
            caseSensitive: false,
            acceptAlternatives: [
              "health>0",
              "health> 0",
              "health >0",
            ],
          },
          solution: "health > 0",
          hint: "Use the greater-than symbol (>) to check if health is above zero.",
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
            "In a for loop `for (let i = 0; i < 3; i++)`, how many times does the loop run?",
          type: "multiple-choice",
          options: ["1", "2", "3", "4"],
          correctAnswer: 2,
          explanation:
            "The loop starts at 0 and runs while i < 3, so it runs for i = 0, 1, 2 — that's 3 times. The value 3 itself fails the condition, so the loop stops.",
        },
        {
          question:
            "Which loop is best when you DON'T know how many times you need to repeat?",
          type: "multiple-choice",
          options: [
            "for loop",
            "while loop",
            "for...of loop",
            "None — you always need to know",
          ],
          correctAnswer: 1,
          explanation:
            "A while loop just checks a condition each time — it doesn't need a fixed count. It's perfect for situations like 'keep going until the player runs out of health' where you can't predict the number of laps.",
        },
        {
          question:
            "What causes an infinite loop?",
          type: "multiple-choice",
          options: [
            "Writing too many lines of code",
            "The loop condition never becomes false",
            "Using a for loop instead of a while loop",
            "Forgetting to write console.log",
          ],
          correctAnswer: 1,
          explanation:
            "An infinite loop happens when the condition never becomes false — the loop has no reason to stop. This usually means you forgot to update the variable the condition checks (like forgetting i++).",
        },
        {
          question:
            "Your program is stuck in an infinite loop. Pressing Ctrl + C in the terminal will stop it.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Ctrl + C sends an interrupt signal that stops the running program. It's the standard emergency brake every developer uses — safe, instant, and won't break anything.",
        },
        {
          question:
            "An error message says `ReferenceError: count is not defined (line 5)`. What should you do first?",
          type: "multiple-choice",
          options: [
            "Delete all your code and start over",
            "Go to line 5 and check if 'count' was created with let or const",
            "Ignore it — errors don't matter",
            "Press Ctrl + Z to undo everything",
          ],
          correctAnswer: 1,
          explanation:
            "The error tells you exactly where to look (line 5) and what's wrong ('count' doesn't exist). Go to that line and make sure you declared the variable with let or const before using it.",
        },
      ],
    },
  ],
};

export default lesson;
