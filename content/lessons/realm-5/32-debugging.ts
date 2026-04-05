import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "debugging",
  title: "Debugging: The Bug Exterminator",
  description:
    "Master the art of hunting and squashing bugs — with DevTools, breakpoints, and a systematic approach to finding what went wrong.",
  order: 32,
  realm: 5,
  estimatedMinutes: 14,
  xpReward: 220,
  icon: "🐛",
  boss: {
    name: "The Bug Swarm",
    description:
      "A swarm of tiny bugs that multiply when you fix them wrong — only systematic debugging can clear them all",
    sprite: "bugSwarm",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Stack Overflow Swarm!",
      "Silent Failure Sting!",
      "Race Condition Buzz!",
    ],
    defeatText:
      "The swarm disperses as you systematically squash every bug — your DevTools mastery is complete!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "Debugging Is Detective Work",
          content:
            "Here's the truth every pro developer knows: **bugs are not failures** — they're mysteries to solve. Finding a bug doesn't mean you're bad at coding. It means you're doing exactly what every developer does, every single day.\n\nIn Lesson 10, you learned the basics: pressing Ctrl+C and reading error messages. Now it's time to level up. Professional debugging means **using real tools** to track down bugs systematically instead of guessing.\n\nThink of yourself as a detective, not a janitor. You're not just cleaning up messes — you're investigating crime scenes, gathering clues, and catching the culprit.\n\nThe best debuggers aren't the ones who write bug-free code. They're the ones who **find and fix bugs fastest**.",
          visual: `
  ┌─── DEBUGGING MINDSET ───────────┐
  │                                   │
  │   🔍 Bugs ≠ Failure              │
  │   🔍 Bugs = Mystery to Solve     │
  │                                   │
  │   ❌ OLD: "I broke something"    │
  │   ✅ NEW: "Time to investigate"  │
  │                                   │
  │   🕵️  You are the detective.     │
  │   🐛  The bug is the suspect.    │
  │   🔧  DevTools are your kit.     │
  │                                   │
  │   The best devs aren't bug-free  │
  │   — they're bug-FAST.            │
  └───────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Browser DevTools — Your Investigation Kit",
          content:
            "Every modern browser has **DevTools** built in — a full investigation lab hiding behind one key: **F12** (or Ctrl+Shift+I on Windows, Cmd+Option+I on Mac).\n\nDevTools has several tabs, each for a different type of investigation:\n\n- **Console** — where errors, warnings, and your `console.log()` messages appear. This is your interrogation room.\n- **Elements** — lets you inspect and edit HTML/CSS live. Like X-ray vision for web pages.\n- **Sources** — where you set breakpoints and step through code line by line. This is your magnifying glass.\n- **Network** — shows every file loaded and every API call made. Your surveillance camera.\n\nYou'll use **Console** and **Sources** the most when debugging JavaScript. Open DevTools right now with F12 and explore!",
          visual: `
  ┌─── BROWSER DEVTOOLS (F12) ──────┐
  │                                   │
  │  📋 Console    Error messages,    │
  │                logs, warnings     │
  │                                   │
  │  🏗️  Elements   Inspect HTML/CSS  │
  │                live editing       │
  │                                   │
  │  📂 Sources    Breakpoints,       │
  │                step through code  │
  │                                   │
  │  🌐 Network    API calls,         │
  │                file loading       │
  │                                   │
  │  ⌨️  Open: F12 / Ctrl+Shift+I    │
  │            Cmd+Option+I (Mac)     │
  └───────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Console Methods — Beyond console.log",
          content:
            "You already know `console.log()`. But the Console has a whole arsenal of methods that make debugging much clearer:\n\n**`console.warn()`** — prints a yellow warning. Use it for \"this works, but something seems off\" situations.\n\n**`console.error()`** — prints a red error with a stack trace. Use it when something definitely went wrong.\n\n**`console.table()`** — displays arrays and objects as a beautiful, sortable table. Way easier to read than a giant JSON blob.\n\n**`console.time()` / `console.timeEnd()`** — measures how long code takes to run. Great for finding slow spots.\n\n```js\nconsole.log(\"Normal message\");\nconsole.warn(\"Hmm, this might be a problem\");\nconsole.error(\"Something broke!\");\nconsole.table([{name: \"Aria\", hp: 100}, {name: \"Kai\", hp: 75}]);\n```\n\nStop flooding your code with `console.log()` for everything — pick the right tool!",
          visual: `
  ┌─── CONSOLE METHODS ─────────────┐
  │                                   │
  │  console.log()   📝 Normal info   │
  │  console.warn()  ⚠️  Yellow warn  │
  │  console.error() 🔴 Red error     │
  │  console.table() 📊 Pretty table  │
  │  console.time()  ⏱️  Start timer  │
  │  console.timeEnd() ⏱️ Stop timer  │
  │                                   │
  │  console.table(players):          │
  │  ┌───┬────────┬─────┐            │
  │  │ # │ name   │ hp  │            │
  │  ├───┼────────┼─────┤            │
  │  │ 0 │ Aria   │ 100 │            │
  │  │ 1 │ Kai    │  75 │            │
  │  └───┴────────┴─────┘            │
  └───────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Breakpoints — Freeze Time and Inspect",
          content:
            "Here's where debugging gets **really** powerful. A **breakpoint** pauses your code at a specific line so you can inspect every variable, see the call stack, and step through execution one line at a time.\n\n**How to set a breakpoint:**\n1. Open DevTools → Sources tab\n2. Find your file in the left panel\n3. Click the **line number** where you want to pause\n4. A blue marker appears — that's your breakpoint\n5. Reload or trigger the code — execution **freezes** there\n\n**Once paused, you can:**\n- Hover over any variable to see its current value\n- Use the **Scope** panel to see all variables\n- **Step Over** (F10) — run the current line, move to the next\n- **Step Into** (F11) — dive into a function call\n- **Resume** (F8) — continue running until the next breakpoint\n\nBreakpoints beat `console.log` when you need to see **many variables at once** or trace the flow of your program.",
          visual: `
  ┌─── BREAKPOINTS ─────────────────┐
  │                                   │
  │  Sources Tab → Click Line Number  │
  │                                   │
  │   5 │ function heal(player) {     │
  │  🔵6 │   let newHp = player.hp;  │  ← PAUSED
  │   7 │   newHp += 20;             │
  │   8 │   return newHp;            │
  │   9 │ }                          │
  │                                   │
  │  CONTROLS:                        │
  │  ▶️  F8  Resume (continue)        │
  │  ⏭️  F10 Step Over (next line)   │
  │  ⤵️  F11 Step Into (enter func)  │
  │                                   │
  │  SCOPE PANEL:                     │
  │  player → {name: "Aria", hp: 80} │
  │  newHp  → 80                      │
  └───────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Reading Stack Traces — Follow the Trail",
          content:
            "When an error happens, JavaScript gives you a **stack trace** — a trail of breadcrumbs showing exactly which functions were called and in what order.\n\n```\nUncaught TypeError: Cannot read properties of undefined\n    at calculateDamage (battle.js:42)\n    at attackEnemy (combat.js:18)\n    at handleClick (app.js:7)\n```\n\n**How to read it:**\n- The **top line** is the error message — what went wrong\n- The **first entry** is WHERE it crashed (`battle.js`, line 42)\n- Read **top to bottom** = most recent call first\n- Look for **YOUR files** — skip anything in `node_modules` or browser internals\n\nIn this example, `handleClick` called `attackEnemy`, which called `calculateDamage`, which crashed on line 42. That's where you start investigating!\n\nThe stack trace is the single most valuable clue in any debugging case. **Always read it first.**",
          visual: `
  ┌─── STACK TRACE ─────────────────┐
  │                                   │
  │  🔴 TypeError: Cannot read       │
  │     properties of undefined       │
  │                                   │
  │  WHERE IT CRASHED:                │
  │  → at calculateDamage (battle:42) │
  │                                   │
  │  WHO CALLED IT:                   │
  │    at attackEnemy (combat:18)      │
  │    at handleClick (app:7)         │
  │                                   │
  │  READ: Top → Bottom               │
  │  (most recent call first)         │
  │                                   │
  │  SKIP: node_modules, internals    │
  │  FIND: YOUR code files            │
  │                                   │
  │  Start investigating at line 42!  │
  └───────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "The Systematic Debugging Process",
          content:
            "Random guessing wastes hours. Systematic debugging solves bugs in minutes. Here's the five-step process that professionals follow:\n\n**1. Reproduce** — Make the bug happen again. If you can't reproduce it, you can't fix it. Note the exact steps.\n\n**2. Isolate** — Narrow down WHERE. Comment out code, add breakpoints, use binary search (disable half the code — is the bug in the first half or the second?).\n\n**3. Identify** — Find the ROOT CAUSE, not just the symptom. \"The variable is undefined\" is a symptom. \"I forgot to pass it as an argument\" is the cause.\n\n**4. Fix** — Change the minimum amount of code needed. Don't \"fix\" things by rewriting everything.\n\n**5. Verify** — Test that the fix works AND that you didn't break anything else.\n\nThis process works for every bug, every language, every project. Memorize it.",
          visual: `
  ┌─── THE 5-STEP PROCESS ──────────┐
  │                                   │
  │  1️⃣  REPRODUCE                   │
  │     Make the bug happen again     │
  │              ↓                    │
  │  2️⃣  ISOLATE                     │
  │     Narrow down where it lives    │
  │              ↓                    │
  │  3️⃣  IDENTIFY                    │
  │     Find the root cause           │
  │              ↓                    │
  │  4️⃣  FIX                         │
  │     Minimum change needed         │
  │              ↓                    │
  │  5️⃣  VERIFY                      │
  │     Test fix + check for regressions│
  │                                   │
  │  🔁 Works for EVERY bug, EVER.   │
  └───────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 5,
      content: `## Advanced Debugging Reference

### DevTools Tabs at a Glance

| Tab | Purpose | When to Use |
|---|---|---|
| **Console** | View errors, warnings, and log output | First stop for any bug — check for red errors |
| **Elements** | Inspect and live-edit HTML & CSS | Layout bugs, missing styles, wrong classes |
| **Sources** | Set breakpoints, step through JS | Logic bugs, wrong variable values, flow issues |
| **Network** | Monitor HTTP requests and responses | API bugs, missing data, slow loading |

**Pro tip:** Right-click any element on a page → "Inspect" jumps straight to it in the Elements tab.

### Console Methods Reference

| Method | Output | Best For |
|---|---|---|
| \`console.log(x)\` | Normal text | General-purpose logging |
| \`console.warn(x)\` | ⚠️ Yellow warning | "Works but suspicious" situations |
| \`console.error(x)\` | 🔴 Red with stack trace | Definite errors you want to stand out |
| \`console.table(arr)\` | Sortable table | Arrays of objects, comparing data |
| \`console.time("label")\` | Starts timer | Performance measurement |
| \`console.timeEnd("label")\` | Prints elapsed ms | Pair with console.time |
| \`console.group("label")\` | Indented group | Organizing related logs |
| \`console.groupEnd()\` | Ends group | Pair with console.group |
| \`console.count("label")\` | Increments counter | "How many times does this run?" |
| \`console.clear()\` | Clears console | Fresh start before a test |

### Breakpoint Types

There are several ways to pause code:

1. **Line breakpoint** — Click a line number in Sources. Pauses every time that line runs.
2. **Conditional breakpoint** — Right-click a line number → "Add conditional breakpoint." Only pauses when your condition is true (e.g., \`i === 50\`).
3. **\`debugger\` statement** — Write \`debugger;\` directly in your code. Pauses there when DevTools is open.
4. **Exception breakpoint** — Click the ⏸ icon in Sources to pause on any uncaught exception automatically.
5. **DOM breakpoint** — Right-click an element in Elements → "Break on..." to pause when that element changes.

\`\`\`js
// The debugger statement — a breakpoint in your code
function calculateScore(hits, misses) {
  debugger; // Execution pauses here when DevTools is open
  const accuracy = hits / (hits + misses);
  return Math.round(accuracy * 100);
}
\`\`\`

### Reading Stack Traces

\`\`\`
Uncaught TypeError: Cannot read properties of undefined (reading 'name')
    at renderPlayer (game.js:34)
    at updateUI (game.js:78)
    at handleTurn (game.js:112)
    at HTMLButtonElement.<anonymous> (game.js:5)
\`\`\`

**Step-by-step:**
1. **Error type:** \`TypeError\` — you tried to use something that doesn't exist
2. **Error detail:** \`Cannot read properties of undefined (reading 'name')\` — something is \`undefined\` and you tried to access \`.name\` on it
3. **Crash location:** \`renderPlayer\` in \`game.js\`, line 34 — start here
4. **Call chain:** \`handleTurn\` → \`updateUI\` → \`renderPlayer\` — the button click triggered a chain that ended in a crash
5. **Your fix:** Go to line 34 and figure out WHY the variable is \`undefined\`

### Systematic Debugging Steps

1. **Reproduce** — Write down exact steps to trigger the bug. "Click the attack button when inventory is empty." If it's intermittent, note conditions.
2. **Isolate** — Use binary search: comment out half the code. Bug still there? It's in the remaining half. Repeat until you narrow it to a few lines.
3. **Identify** — Find the root cause. Ask: "What did I EXPECT this value to be? What is it ACTUALLY?" Use breakpoints to compare.
4. **Fix** — Change only what's needed. A targeted fix is easier to verify and less likely to introduce new bugs.
5. **Verify** — Test the original reproduction steps. Also test nearby features to make sure you didn't break anything else (regression testing).

### Common Bug Patterns

| Bug Pattern | Symptom | Typical Cause |
|---|---|---|
| **Off-by-one** | Loop runs one too many/few times | Using \`<=\` instead of \`<\`, or starting at 1 instead of 0 |
| **Null/undefined** | "Cannot read properties of undefined" | Forgot to initialize, API returned nothing, typo in property name |
| **Async timing** | Data is undefined even though you fetched it | Forgot \`await\`, or using data before the promise resolves |
| **Scope issues** | Variable has wrong value or is undefined | Declared in wrong scope, or shadowed by same-named variable |
| **Type coercion** | \`"5" + 3\` gives \`"53"\` instead of \`8\` | String + number = string concatenation, not addition |
| **Stale closure** | Old value used inside a callback | Closure captured the variable at creation time, not current time |

### When to Use What

- **console.log** — Quick check of a single value
- **console.table** — Comparing objects or array contents
- **Breakpoints** — Need to inspect MANY variables, or trace execution flow
- **Network tab** — API responses are wrong or missing
- **Elements tab** — Something looks wrong on the page visually`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Bug Exterminator Training",
      description:
        "Test your debugging knowledge — from DevTools shortcuts to systematic strategies.",
      steps: [
        {
          instruction:
            "What keyboard shortcut opens Browser DevTools in most browsers?",
          type: "multiple-choice",
          data: {
            options: [
              "Ctrl+D (Cmd+D on Mac)",
              "F12 (or Ctrl+Shift+I / Cmd+Option+I)",
              "Alt+F4 (Option+Cmd+Esc on Mac)",
              "Ctrl+Z (Cmd+Z on Mac)",
            ],
          },
          solution: 1,
          hint: "It's a function key at the top of your keyboard — the same one in Chrome, Firefox, and Edge.",
        },
        {
          instruction:
            "Put the systematic debugging steps in the correct order!",
          type: "sequence",
          data: {
            items: [
              {
                id: "reproduce",
                text: "Reproduce",
                description:
                  "Make the bug happen again with specific, repeatable steps",
              },
              {
                id: "isolate",
                text: "Isolate",
                description:
                  "Narrow down where the bug lives — comment out code, use binary search",
              },
              {
                id: "identify",
                text: "Identify",
                description:
                  "Find the root cause, not just the symptom",
              },
              {
                id: "fix",
                text: "Fix",
                description:
                  "Make the minimum change needed to resolve the root cause",
              },
              {
                id: "verify",
                text: "Verify",
                description:
                  "Confirm the fix works and nothing else broke",
              },
            ],
            correctOrder: ["reproduce", "isolate", "identify", "fix", "verify"],
          },
          hint: "You can't fix what you can't find, and you can't find what you can't reproduce. Start from the beginning.",
        },
        {
          instruction:
            "When is setting a BREAKPOINT better than using console.log?",
          type: "multiple-choice",
          data: {
            options: [
              "When you only need to check one variable's value",
              "When you want to inspect many variables at once and step through execution line by line",
              "When you want to permanently log output for users to see",
              "When the bug is in your CSS styles",
            ],
          },
          solution: 1,
          hint: "Breakpoints let you pause execution and explore the entire state of your program — every variable, every scope — without adding a single line of code.",
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
            "Which DevTools tab should you check FIRST when your JavaScript has an error?",
          type: "multiple-choice",
          options: [
            "Elements",
            "Network",
            "Console",
            "Application",
          ],
          correctAnswer: 2,
          explanation:
            "The Console tab is your first stop — it shows JavaScript errors (in red), warnings (in yellow), and any output from console.log/warn/error. Red error messages with stack traces tell you exactly what went wrong and where.",
        },
        {
          question:
            "What does console.table() do that console.log() doesn't?",
          type: "multiple-choice",
          options: [
            "It makes the output appear in red",
            "It displays arrays and objects as a formatted, sortable table",
            "It sends the data to a database for storage",
            "It only works in Node.js, not in the browser",
          ],
          correctAnswer: 1,
          explanation:
            "console.table() takes an array or object and renders it as a clean, sortable table in the console. This makes it much easier to compare data than squinting at a giant JSON blob from console.log().",
        },
        {
          question:
            "What happens when execution hits a breakpoint in the Sources tab?",
          type: "multiple-choice",
          options: [
            "The browser deletes that line of code",
            "The code skips that line and continues",
            "Execution pauses so you can inspect variables and step through code",
            "The page automatically reloads",
          ],
          correctAnswer: 2,
          explanation:
            "A breakpoint pauses execution at that exact line. While paused, you can hover over variables to see their values, inspect the Scope panel, and use Step Over (F10) or Step Into (F11) to move through your code one line at a time.",
        },
        {
          question:
            "In a stack trace, where do you find the line that CAUSED the error?",
          type: "multiple-choice",
          options: [
            "The very last line of the stack trace",
            "The first line after the error message — the top of the stack",
            "Stack traces don't show line numbers",
            "You have to search through every line equally",
          ],
          correctAnswer: 1,
          explanation:
            "The first entry after the error message shows where the crash happened (most recent call). Read top to bottom — the top is where it broke, and the entries below show the chain of function calls that led there. Look for YOUR files, skip node_modules.",
        },
        {
          question:
            "What is the FIRST step in systematic debugging?",
          type: "multiple-choice",
          options: [
            "Rewrite the entire function from scratch",
            "Reproduce the bug with specific, repeatable steps",
            "Add console.log to every line of code",
            "Ask someone else to fix it",
          ],
          correctAnswer: 1,
          explanation:
            "Always start by reproducing the bug — make it happen again on purpose with specific steps. If you can't reproduce it reliably, you can't verify your fix works. The full process: Reproduce → Isolate → Identify → Fix → Verify.",
        },
      ],
    },
  ],
};

export default lesson;
