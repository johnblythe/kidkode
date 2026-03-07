import { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "sync-vs-async",
  title: "Sync vs Async: Time Magic",
  description:
    "Master the art of doing things in order vs doing multiple things at once — the time magic of programming!",
  order: 6,
  estimatedMinutes: 18,
  xpReward: 175,
  icon: "⚡",
  boss: {
    name: "The Callback Serpent",
    description:
      "A tangled serpent of nested callbacks and broken promises",
    sprite: "callbackSerpent",
    maxHp: 120,
    playerMaxHp: 3,
    damagePerCorrect: 24,
    attackNames: [
      "Callback Hell!",
      "Unhandled Rejection!",
      "Race Condition Strike!",
      "Infinite Loop Constrict!",
    ],
    defeatText:
      "The Serpent untangles as your async code resolves perfectly!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Cash Register vs The Restaurant",
          content:
            "Two places, two styles of waiting.\n\n**Cash register (sync):** Each person waits for the one in front to finish. Nobody moves until it's their turn.\n\n**Restaurant (async):** You order, sit down, and do other stuff while the kitchen works. They call your name when it's ready!",
          visual: `
  SYNC — Cash Register          ASYNC — Restaurant
  ┌──────────────────┐          ┌──────────────────┐
  │  🧑 ← waiting    │          │  🧑 → orders     │
  │  🧑 ← waiting    │          │  🧑 → sits down  │
  │  🧑 ← waiting    │          │  🧑 → reads menu │
  │  🧑 ← being      │          │                  │
  │       served      │          │  🍳 Kitchen works │
  │                   │          │  📢 "Order 42!"  │
  └──────────────────┘          └──────────────────┘
  One at a time!                Everyone does stuff!`,
          animation: "fade",
        },
        {
          title: "Synchronous = One at a Time",
          content:
            "Synchronous code runs **LINE BY LINE**, top to bottom. Each line **waits** for the previous one to finish before starting.\n\nLike a single-file line — everyone waits their turn. Simple, predictable, but sometimes **slow**.",
          visual: `
  LINE 1: doTask('A')   ██████████ done!
  LINE 2: doTask('B')            ██████████ done!
  LINE 3: doTask('C')                      ██████████ done!
  ─────────────────────────────────────────────→ time
           ↑ each line waits for the previous one`,
          animation: "slide-left",
        },
        {
          title: "Asynchronous = Don't Wait!",
          content:
            "Some tasks take a **long time** — loading data from the internet, fetching images, waiting for a timer.\n\nAsync says: **\"Start that task, I'll keep going, come back to me when it's done.\"**\n\nYour code doesn't freeze while waiting!",
          visual: `
  LINE 1: startTask('A')  ██ started!
  LINE 2: startTask('B')  ██ started!
  LINE 3: startTask('C')  ██ started!
  ─────────────────────────────────────→ time
  ...later...
  Task B finished! ✅
  Task A finished! ✅
  Task C finished! ✅  (order may vary!)`,
          animation: "slide-up",
        },
        {
          title: "Promises: A Pinky Swear",
          content:
            'A **Promise** is JavaScript saying: "I PROMISE I\'ll give you a result... eventually."\n\nIt can be in one of three states:\n- **Pending** — still waiting\n- **Fulfilled** — success! Here\'s your data\n- **Rejected** — something went wrong',
          visual: `
            ┌───────────┐
            │  PENDING  │
            │  ⏳ ...   │
            └─────┬─────┘
              ┌───┴───┐
              ▼       ▼
        ┌──────────┐  ┌──────────┐
        │FULFILLED │  │ REJECTED │
        │  ✅ data │  │  ❌ err  │
        └──────────┘  └──────────┘`,
          animation: "pop",
        },
        {
          title: "async/await: Making It Readable",
          content:
            "**`async`** marks a function as asynchronous.\n**`await`** says \"pause here until this Promise resolves.\"\n\nIt makes async code **look** synchronous — easier to read and write!",
          visual: `
  BEFORE (Promise chains):
  ┌──────────────────────────────┐
  │ fetch(url)                   │
  │   .then(res => res.json())   │
  │   .then(data => show(data))  │
  │   .catch(err => handle(err)) │
  └──────────────────────────────┘

  AFTER (async/await):
  ┌──────────────────────────────┐
  │ async function getData() {   │
  │   const res = await fetch()  │
  │   const data = await .json() │
  │   show(data)                 │
  │ }                            │
  └──────────────────────────────┘
  ↑ Same thing, way cleaner!`,
          animation: "typewriter",
        },
        {
          title: "The Classic Gotcha",
          content:
            "What does this code print?\n\n```\nconsole.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nconsole.log(\"C\");\n```\n\nAnswer: **A, C, B!**\n\nEven with **0ms** delay, `setTimeout` sends B to the **async queue**. Synchronous code (A and C) always runs first!",
          visual: `
  CALL STACK          ASYNC QUEUE
  ┌───────────┐       ┌───────────┐
  │ log("A")  │──→ A  │           │
  │ setTimeout│──────→ │ log("B") │
  │ log("C")  │──→ C  │     ↓     │
  │           │       │     B     │
  └───────────┘       └───────────┘
  Output: A → C → B`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 6,
      content: `## Sync vs Async: The Full Picture

### Comparison Table

| | **Synchronous** | **Asynchronous** |
|---|---|---|
| **Blocking?** | Yes — waits for each task | No — starts tasks and moves on |
| **Order** | Always runs in order | Results may arrive out of order |
| **Speed** | Slower for I/O tasks | Faster for I/O tasks |
| **Use case** | Simple calculations, math | Network requests, file I/O, timers |
| **Complexity** | Simple to understand | Requires Promises or callbacks |

### Promise Chains

When you fetch data from the internet, it takes time. Promises let you handle this:

\`\`\`javascript
fetch('https://api.example.com/pokemon')
  .then(response => response.json())
  .then(data => {
    console.log('Got Pokemon:', data.name);
  })
  .catch(error => {
    console.log('Something went wrong:', error);
  });
\`\`\`

Each \`.then()\` runs when the previous step finishes. \`.catch()\` handles errors.

### async/await: The Modern Way

The same code with async/await is **much** cleaner:

\`\`\`javascript
async function getPokemon() {
  try {
    const response = await fetch('https://api.example.com/pokemon');
    const data = await response.json();
    console.log('Got Pokemon:', data.name);
  } catch (error) {
    console.log('Something went wrong:', error);
  }
}
\`\`\`

- \`async\` tells JavaScript this function will use \`await\`
- \`await\` pauses the function until the Promise resolves
- \`try/catch\` handles errors (replaces \`.catch()\`)

### Common Gotchas

**Forgetting \`await\`:**
\`\`\`javascript
// ❌ Wrong — data is a Promise, not the actual data!
const data = fetch('https://api.example.com/pokemon');

// ✅ Right — await gets the actual value
const data = await fetch('https://api.example.com/pokemon');
\`\`\`

**Unhandled Rejections:**
Always wrap async code in try/catch, or add \`.catch()\` to your Promises. Otherwise errors disappear silently!

**Race Conditions:**
If two async tasks modify the same data, the result depends on which finishes first — that's unpredictable!

### When to Use Which

- **Sync** — math, string manipulation, simple logic, anything that's instant
- **Async** — fetching data from APIs, reading files, timers, anything that takes time`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Async Arena",
      description:
        "Test your understanding of synchronous and asynchronous code!",
      steps: [
        {
          instruction:
            "What will this code print? Put the outputs in the correct order!\n\n```\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');\n```",
          type: "sequence",
          data: {
            items: [
              { id: "a", text: "A", description: "First console.log" },
              { id: "b", text: "B", description: "Inside setTimeout" },
              { id: "c", text: "C", description: "Last console.log" },
            ],
            correctOrder: ["a", "c", "b"],
          },
          hint: "setTimeout ALWAYS goes to the async queue, even with 0ms delay. Synchronous code runs first!",
        },
        {
          instruction: "What is a Promise in JavaScript?",
          type: "multiple-choice",
          data: {
            options: [
              "A function that runs immediately",
              "An object representing a future value that may or may not resolve",
              "A way to make code run faster",
              "A type of loop that repeats until complete",
            ],
          },
          solution: 1,
          hint: "Think about the word 'promise' in real life — it's about something that WILL happen later",
        },
        {
          instruction: "What does the `await` keyword do?",
          type: "multiple-choice",
          data: {
            options: [
              "Makes the code run faster",
              "Skips the current line of code",
              "Pauses the async function until the Promise resolves",
              "Converts synchronous code to asynchronous",
            ],
          },
          solution: 2,
          hint: "Await literally means to wait for something",
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
            "What's the main difference between sync and async code?",
          type: "multiple-choice",
          options: [
            "Sync is faster than async",
            "Sync waits for each operation; async continues while waiting",
            "Async code always runs first",
            "There is no difference",
          ],
          correctAnswer: 1,
          explanation:
            "Sync waits for each operation; async continues while waiting. Synchronous code blocks until a task completes, while asynchronous code moves on and handles results later.",
        },
        {
          question: "What are the three states of a Promise?",
          type: "multiple-choice",
          options: [
            "Start, Middle, End",
            "Open, Closed, Error",
            "Pending, Fulfilled, Rejected",
            "Loading, Success, Timeout",
          ],
          correctAnswer: 2,
          explanation:
            "Pending (waiting), Fulfilled (success), Rejected (failed) — those are the three states every Promise goes through.",
        },
        {
          question:
            "In the code: console.log('A'); setTimeout(()=>console.log('B'),0); console.log('C'); — what prints second?",
          type: "multiple-choice",
          options: ["A", "B", "C", "Nothing"],
          correctAnswer: 2,
          explanation:
            "C prints second! Even though setTimeout has a 0ms delay, it goes to the async queue. Synchronous code (A then C) runs first, then B.",
        },
        {
          question:
            "What happens if you forget the `await` keyword before a fetch() call?",
          type: "multiple-choice",
          options: [
            "The code crashes immediately",
            "You get a Promise object instead of the actual value",
            "The fetch doesn't happen at all",
            "Nothing — it works the same",
          ],
          correctAnswer: 1,
          explanation:
            "Without await, you get the Promise itself rather than the resolved value. Your variable will be a Promise object, not the data you wanted!",
        },
        {
          question: "When should you use async code?",
          type: "multiple-choice",
          options: [
            "For simple math like 2 + 2",
            "For every single line of code",
            "When dealing with network requests, file operations, or timers",
            "Only when working with arrays",
          ],
          correctAnswer: 2,
          explanation:
            "Async is for tasks that take time — network requests, file operations, and timers. Simple calculations should stay synchronous.",
        },
      ],
    },
  ],
};

export default lesson;
