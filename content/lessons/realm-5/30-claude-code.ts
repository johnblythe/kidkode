import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "claude-code",
  title: "Claude Code: The AI Familiar",
  description:
    "Level up with an AI coding companion — learn to pair-program with Claude Code to write, debug, and understand code faster.",
  order: 30,
  realm: 5,
  estimatedMinutes: 12,
  xpReward: 200,
  icon: "🦉",
  boss: {
    name: "Hallucination Phantom II",
    description:
      "A more cunning version of the phantom — it generates plausible but subtly wrong code",
    sprite: "hallucinationPhantom2",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Plausible Nonsense!",
      "Confident Wrong Answer!",
      "Outdated API Suggestion!",
    ],
    defeatText:
      "You verify every suggestion and the Phantom's illusions shatter against your critical thinking!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "Meet Your AI Familiar",
          content:
            "In the old days, wizards had **familiars** — magical companions that helped with spells.\n\n**Claude Code** is YOUR familiar. It lives right in your terminal and helps you write, debug, and understand code.\n\nIt's not a search engine. It's not autocomplete. It's a **thinking partner** that reads your code and talks back.",
          visual: `
  ┌───────────────────────────────────┐
  │  🦉 YOUR AI FAMILIAR              │
  │  ═════════════════════            │
  │                                   │
  │    You ──── Claude Code           │
  │     🧙       🦉                   │
  │     │         │                   │
  │     │  "Hey, this function        │
  │     │   has a bug on line 12"     │
  │     │         │                   │
  │     └────── "Show me!" ──────┘    │
  │                                   │
  │  Lives in your TERMINAL           │
  │  Reads your CODEBASE              │
  │  Thinks about your PROBLEM        │
  └───────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "What Can It Do?",
          content:
            "Claude Code is a **Swiss army knife** for coding. You can:\n\n- **Generate** code from a description\n- **Explain** code you don't understand\n- **Debug** errors by pasting them in\n- **Refactor** messy code into clean code\n- **Write tests** for your functions\n\nAll by typing plain English in your terminal.",
          visual: `
  ┌───────────────────────────────────┐
  │  🔧 CLAUDE CODE TOOLKIT           │
  │                                   │
  │  ┌─────────┐  ┌─────────────┐    │
  │  │ GENERATE │  │   EXPLAIN   │    │
  │  │ "Build a │  │ "What does  │    │
  │  │  login   │  │  this regex │    │
  │  │  form"   │  │  do?"       │    │
  │  └─────────┘  └─────────────┘    │
  │  ┌─────────┐  ┌─────────────┐    │
  │  │  DEBUG   │  │  REFACTOR   │    │
  │  │ "Why is  │  │ "Clean up   │    │
  │  │  this    │  │  this messy │    │
  │  │  null?"  │  │  function"  │    │
  │  └─────────┘  └─────────────┘    │
  │  ┌──────────────────────────┐    │
  │  │      WRITE TESTS         │    │
  │  │  "Add tests for submit"  │    │
  │  └──────────────────────────┘    │
  └───────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Writing Good Prompts",
          content:
            "The #1 skill with AI coding tools: **writing good prompts**.\n\n**Bad:** \"make it work\"\n**Good:** \"Fix the TypeError in handleSubmit — the user object is null when not logged in\"\n\nBe **specific**, give **context**, and show **examples** of what you want. The more detail, the better the result.",
          visual: `
  ┌───────────────────────────────────┐
  │  📝 PROMPT QUALITY METER          │
  │                                   │
  │  "fix it"                         │
  │  ░░░░░░░░░░░░░░░░░░░░  💀 BAD    │
  │                                   │
  │  "fix the login bug"              │
  │  ████░░░░░░░░░░░░░░░░  😐 MEH    │
  │                                   │
  │  "fix the null error in           │
  │   handleSubmit when user          │
  │   is not logged in — here's       │
  │   the code: [paste]"              │
  │  ████████████████████  🎯 GREAT   │
  │                                   │
  │  SPECIFICITY = QUALITY            │
  └───────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "ALWAYS Review Before Running",
          content:
            "This is the **most important rule**: never blindly copy-paste AI code.\n\n**Read it.** Do you understand every line? **Check it.** Does it match what you asked for? **Test it.** Does it actually work?\n\nAI is confident even when it's WRONG. Your job is to be the **quality gate**.",
          visual: `
  ┌───────────────────────────────────┐
  │  🛡️ THE REVIEW SHIELD             │
  │                                   │
  │  AI Output                        │
  │    │                              │
  │    ▼                              │
  │  ┌──────────────────────┐        │
  │  │ 1. READ every line   │        │
  │  │ 2. CHECK the logic   │        │
  │  │ 3. TEST it runs      │        │
  │  │ 4. VERIFY the output │        │
  │  └──────────────────────┘        │
  │    │                              │
  │    ▼                              │
  │  ✅ Safe to use!                   │
  │                                   │
  │  Skip this and you WILL get       │
  │  bitten by subtle bugs. 🐛        │
  └───────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "The Pair Programming Workflow",
          content:
            "Think of Claude Code as a **pair programmer**. The best workflow:\n\n1. **You think** — decide what you want to build\n2. **AI writes** — describe it and let Claude draft code\n3. **You review** — read, understand, and check the code\n4. **Iterate** — ask for changes, fixes, improvements\n\nYOU are the pilot. AI is the co-pilot.",
          visual: `
  ┌───────────────────────────────────┐
  │  ✈️ PAIR PROGRAMMING COCKPIT      │
  │                                   │
  │  PILOT (You)    CO-PILOT (AI)     │
  │  ──────────     ─────────────     │
  │  Think 💭  ──▶  Write ⌨️          │
  │       ◀──────  Draft ready        │
  │  Review 🔍 ──▶  Explain 💬        │
  │       ◀──────  Clarification      │
  │  Approve ✅ ──▶  Refine 🔧        │
  │       ◀──────  Final version      │
  │  Ship! 🚀                         │
  │                                   │
  │  YOU decide WHAT to build.        │
  │  AI helps with HOW to build it.   │
  └───────────────────────────────────┘`,
          animation: "swoosh",
        },
        {
          title: "When NOT to Trust AI",
          content:
            "AI is powerful but NOT perfect. Be **extra skeptical** when:\n\n- Code involves **security** (passwords, auth, encryption)\n- AI suggests **packages/APIs** you've never heard of\n- The answer seems **too easy** for a hard problem\n- AI references **specific docs** — it might be hallucinating\n\nThe mantra: **Trust, but verify.** Always.",
          visual: `
  ┌───────────────────────────────────┐
  │  ⚠️ DANGER ZONES                   │
  │                                   │
  │  🔴 Security code                  │
  │     "Just use md5 to hash         │
  │      passwords" ← WRONG!          │
  │                                   │
  │  🔴 Made-up packages               │
  │     "npm install super-auth-pro"  │
  │     ← DOESN'T EXIST              │
  │                                   │
  │  🔴 Outdated APIs                  │
  │     "Use componentWillMount()"    │
  │     ← DEPRECATED in React 18     │
  │                                   │
  │  🔴 Confident nonsense             │
  │     "This is O(1) complexity"     │
  │     ← Actually O(n²) 😱           │
  │                                   │
  │  🟢 TRUST BUT VERIFY 🟢            │
  └───────────────────────────────────┘`,
          animation: "page-flip",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Claude Code Cheat Sheet

### Good vs Bad Prompts

| ❌ Bad Prompt | ✅ Good Prompt | Why It's Better |
|---|---|---|
| "Fix this" | "Fix the null reference on line 12 of UserCard.tsx — the user prop can be undefined" | Specific location + cause |
| "Write a function" | "Write a TypeScript function that takes an array of numbers and returns the top 3 highest values, sorted descending" | Clear input, output, and behavior |
| "Why doesn't this work?" | "This fetch call returns 403. Here's my code: [paste]. I expected 200. My auth token is set in headers." | Shows code, error, and what was tried |
| "Make it better" | "Refactor this to use async/await instead of .then() chains, and add try/catch error handling" | Exact refactoring goal |

### The Review Checklist

Before using ANY AI-generated code, ask yourself:

1. **Do I understand it?** — Can you explain every line to a friend?
2. **Does it match my request?** — Did the AI solve what you actually asked?
3. **Are the imports real?** — Do those packages/functions actually exist?
4. **Is it secure?** — No hardcoded secrets, no known vulnerable patterns?
5. **Does it run?** — Test it. Does it actually produce the expected output?

### Common Use Cases

**Generate:** "Create a React component that displays a user profile card with name, avatar, and bio props"

**Explain:** "Explain what this regex does line by line: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/"

**Debug:** "I get 'Cannot read properties of undefined (reading map)' on line 8. Here's my code: [paste]. The data comes from an API call."

**Refactor:** "Convert this class component to a functional component with hooks. Keep the same behavior."

### Limitations & Gotchas

- **Hallucinations:** AI can invent functions, packages, and APIs that don't exist. It will sound 100% confident doing so.
- **Outdated info:** AI's training data has a cutoff. It might suggest deprecated methods or old syntax.
- **Context limits:** Very long conversations cause AI to "forget" earlier messages. Start fresh if it gets confused.
- **Security blind spots:** AI doesn't know YOUR threat model. Never trust AI alone for auth, encryption, or access control.
- **Copy-paste debt:** Code you don't understand is code you can't debug. Always read before you run.

### The "Trust But Verify" Approach

Think of AI like a **very smart junior developer** who just joined your team. They're enthusiastic, fast, and usually right — but they:

- Sometimes make confident mistakes
- Occasionally use outdated approaches
- Don't know your specific project's quirks
- Need you to review their pull requests

You wouldn't merge a junior dev's code without review. Same rule applies to AI code. **You are the senior developer. Act like one.**`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "AI Pair Programming",
      description: "Practice using Claude Code like a pro!",
      steps: [
        {
          instruction:
            "Which prompt would get the BEST result from Claude Code?",
          type: "multiple-choice",
          data: {
            options: [
              "Help me with my project",
              "Write code for a button",
              "In my Next.js app, create a Button component in TypeScript that accepts label, onClick, and disabled props, uses Tailwind for styling, and shows a loading spinner when isLoading is true",
              "I need a component that does stuff",
            ],
          },
          solution: 2,
          hint: "The best prompt specifies the framework, language, exact props, styling approach, and behavior",
        },
        {
          instruction:
            "Put the AI-assisted coding workflow in the correct order!",
          type: "sequence",
          data: {
            items: [
              {
                id: "describe",
                text: "Describe the problem",
                description:
                  "Tell Claude Code what you want to build or fix, with context",
              },
              {
                id: "get-code",
                text: "Get code from AI",
                description:
                  "Claude Code generates a solution based on your prompt",
              },
              {
                id: "review",
                text: "Review the output",
                description:
                  "Read every line, check logic, verify imports are real",
              },
              {
                id: "test",
                text: "Test it",
                description:
                  "Run the code and verify it produces the expected result",
              },
              {
                id: "iterate",
                text: "Iterate",
                description:
                  "Ask for changes, fixes, or improvements if needed",
              },
            ],
            correctOrder: ["describe", "get-code", "review", "test", "iterate"],
          },
          hint: "Start by explaining what you need, then let AI draft, then YOU check it before running",
        },
        {
          instruction:
            "When should you be MOST skeptical of AI-generated code?",
          type: "multiple-choice",
          data: {
            options: [
              "When it writes a simple for-loop",
              "When it suggests an npm package you've never heard of for handling passwords",
              "When it adds comments to your code",
              "When it formats your code with proper indentation",
            ],
          },
          solution: 1,
          hint: "Security-sensitive code + unfamiliar packages = high risk of hallucinated or dangerous suggestions",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What is Claude Code?",
          type: "multiple-choice",
          options: [
            "A search engine for code snippets",
            "An AI coding assistant that lives in your terminal and helps you write, debug, and understand code",
            "A code formatter that auto-fixes syntax errors",
            "A website where you copy-paste solutions",
          ],
          correctAnswer: 1,
          explanation:
            "Claude Code is an AI coding assistant that runs in your terminal. It can read your codebase, generate code, explain concepts, debug errors, and have a back-and-forth conversation about your code — like a thinking partner, not just a search engine.",
        },
        {
          question:
            "What makes a prompt 'good' when asking Claude Code for help?",
          type: "multiple-choice",
          options: [
            "Keeping it as short as possible",
            "Using technical jargon and abbreviations",
            "Being specific about what you want, giving context, and showing relevant code or errors",
            "Asking multiple unrelated questions at once",
          ],
          correctAnswer: 2,
          explanation:
            "Good prompts are specific, include context (language, framework, what you're building), and show the actual code or error messages. The more detail you give, the more accurate and useful the response will be.",
        },
        {
          question:
            "What should you ALWAYS do before using AI-generated code in your project?",
          type: "multiple-choice",
          options: [
            "Immediately commit it to git",
            "Read it, understand it, and test that it actually works",
            "Share it on social media",
            "Assume it's correct because AI is always right",
          ],
          correctAnswer: 1,
          explanation:
            "Always read, understand, and test AI-generated code before using it. AI can produce code that looks correct but has subtle bugs, uses non-existent packages, or has security vulnerabilities. You are the quality gate.",
        },
        {
          question:
            "Which is a known limitation of AI coding assistants?",
          type: "multiple-choice",
          options: [
            "They can only write Python",
            "They can't read your code",
            "They can confidently suggest packages, functions, or APIs that don't actually exist",
            "They only work on weekdays",
          ],
          correctAnswer: 2,
          explanation:
            "AI hallucinations are a real and common problem. AI can confidently invent package names, function signatures, and API endpoints that don't exist. Always verify that suggested imports and packages are real before using them.",
        },
        {
          question:
            "In the pair programming workflow with AI, what is YOUR role?",
          type: "multiple-choice",
          options: [
            "Just press enter and accept everything AI writes",
            "The pilot — you decide what to build, review AI's work, and make final decisions",
            "The spectator — watch AI code and learn passively",
            "The typist — retype whatever AI suggests without thinking",
          ],
          correctAnswer: 1,
          explanation:
            "You are the pilot and AI is the co-pilot. You decide what to build, describe the problem, review the generated code, test it, and make the final call on what ships. AI helps with the 'how', but you own the 'what' and the quality.",
        },
      ],
    },
  ],
};

export default lesson;
