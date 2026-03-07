import { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "asking-ai",
  title: "Asking AI: The Genie's Rules",
  description:
    "Learn how to talk to AI coding assistants effectively — because a vague wish gets a vague result!",
  order: 7,
  estimatedMinutes: 12,
  xpReward: 200,
  icon: "🤖",
  boss: {
    name: "The Hallucination Phantom",
    description:
      "A glitchy, shifting creature that blends truth with fiction",
    sprite: "hallucinationPhantom",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Hallucination Blast!",
      "Vague Response Cloud!",
      "Context Overflow!",
      "Token Limit Exceeded!",
    ],
    defeatText:
      "The Phantom glitches out as your precise prompts cut through the noise!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Genie Problem",
          content:
            "AI is like a **genie**: incredibly powerful but VERY literal.\n\nWish for \"a million bucks\" and you might get a million male deer. 🦌🦌🦌\n\n**Vague input → vague output.** The quality of what you get back depends entirely on the quality of what you ask.",
          visual: `
  ┌───────────────────────────────────┐
  │        🪔 AI GENIE LAMP          │
  │                                   │
  │     ╱╲    "Your wish is my       │
  │    ╱  ╲    command... but I      │
  │   ╱ 🤖 ╲   take things          │
  │  ╱______╲   VERY literally."    │
  │                                   │
  │  YOU: "Make it better"           │
  │  AI:  "Better... how? 🤷"       │
  │                                   │
  │  YOU: "Add TypeScript types to   │
  │        this React component"     │
  │  AI:  "On it! ✅"               │
  └───────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Vague vs Specific",
          content:
            "The difference between a useless answer and a perfect one is **how you ask**.\n\n**Bad:** \"Make my code better.\"\n**Good:** \"Refactor this function to use `array.map` instead of a for loop, and add TypeScript types.\"\n\nThe more **specific** your request, the better the result. Every. Single. Time.",
          visual: `
  ┌───────────────────────────────────┐
  │  ❌ VAGUE              ✅ SPECIFIC │
  │  ─────────            ──────────  │
  │                                   │
  │  "Fix this"     →  "Fix the null │
  │                     reference on  │
  │                     line 42"      │
  │                                   │
  │  "Make it       →  "Add loading  │
  │   look nice"        spinner and   │
  │                     error state"  │
  │                                   │
  │  "Help me       →  "Write a Jest │
  │   with tests"       test for the  │
  │                     login form    │
  │                     submit handler│
  │                     "             │
  └───────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Context is Everything",
          content:
            "AI doesn't know your project, your language, or your framework unless you **TELL** it.\n\nAlways include:\n- **What** you're building\n- **What language/framework** you're using\n- **What you've tried** already\n- **What error** you're seeing",
          visual: `
  ┌───────────────────────────────────┐
  │  🧠 AI's BRAIN                    │
  │                                   │
  │  Without context:                 │
  │  ┌─────────────────────┐         │
  │  │  ???  ???  ???  ???  │         │
  │  │  "I have NO idea    │         │
  │  │   what you mean"    │         │
  │  └─────────────────────┘         │
  │                                   │
  │  With context:                    │
  │  ┌─────────────────────┐         │
  │  │  Next.js + React    │         │
  │  │  Auth login form    │         │
  │  │  TypeError on L.42  │         │
  │  │  "I know EXACTLY    │         │
  │  │   how to help!" ✅  │         │
  │  └─────────────────────┘         │
  └───────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Show Don't Tell",
          content:
            "Instead of **describing** your code, **PASTE** your code.\n\nInstead of saying \"it doesn't work\", paste the **ERROR MESSAGE**.\n\nGive the AI the same info you'd give a senior developer sitting next to you. Real code + real errors = real solutions.",
          visual: `
  ┌───────────────────────────────────┐
  │  ❌ TELLING:                      │
  │  "My function doesn't return     │
  │   the right thing"               │
  │                                   │
  │  ✅ SHOWING:                      │
  │  ┌─────────────────────────┐     │
  │  │ function add(a, b) {    │     │
  │  │   return a - b; // BUG! │     │
  │  │ }                       │     │
  │  │                         │     │
  │  │ Error: Expected 5,      │     │
  │  │        got -1            │     │
  │  └─────────────────────────┘     │
  │                                   │
  │  AI: "You're using - instead     │
  │       of +  on line 2!" 🎯       │
  └───────────────────────────────────┘`,
          animation: "swoosh",
        },
        {
          title: "The CRISP Framework",
          content:
            "Use **CRISP** to write great prompts every time:\n\n- **C** = Context (what project/tech)\n- **R** = Request (what you want)\n- **I** = Input (your code/error)\n- **S** = Specificity (exact details)\n- **P** = Parameters (constraints/preferences)",
          visual: `
  ┌───────────────────────────────────┐
  │  🧊 THE CRISP FRAMEWORK          │
  │  ═══════════════════════          │
  │                                   │
  │  C │ Context     │ "React/Next"  │
  │  ──┼─────────────┼──────────────  │
  │  R │ Request     │ "Fix bug"     │
  │  ──┼─────────────┼──────────────  │
  │  I │ Input       │ [paste code]  │
  │  ──┼─────────────┼──────────────  │
  │  S │ Specificity │ "line 42,     │
  │    │             │  null ref"    │
  │  ──┼─────────────┼──────────────  │
  │  P │ Parameters  │ "use TS,     │
  │    │             │  no lodash"   │
  │  ─────────────────────────────    │
  │       = PERFECT PROMPT ✨         │
  └───────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Iterate, Don't Give Up",
          content:
            "First response not perfect? That's **NORMAL**.\n\nSay: \"That's close but change X to Y\" or \"That broke because Z, try again with...\"\n\nAI conversations are like sculpting — you start rough and refine. It's a **CONVERSATION**, not one question.",
          visual: `
  ┌───────────────────────────────────┐
  │  🔄 THE ITERATION LOOP           │
  │                                   │
  │  Ask ──▶ Get response             │
  │   ▲          │                    │
  │   │          ▼                    │
  │   │     Good enough? ──▶ ✅ Done! │
  │   │          │                    │
  │   │          ▼ No                 │
  │   │     Give feedback             │
  │   │     "Close, but..."          │
  │   └──────────┘                    │
  │                                   │
  │  Round 1: "Here's a function"    │
  │  Round 2: "Added error handling" │
  │  Round 3: "Added types + tests"  │
  │  Round 4: "Perfect! 🎯"          │
  └───────────────────────────────────┘`,
          animation: "page-flip",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Mastering AI Prompts

### The CRISP Prompt Template

Here's a real example using the CRISP framework:

\`\`\`
CONTEXT: I'm building a React Next.js app for a school project.
         Using TypeScript and Tailwind CSS.

REQUEST: I need help fixing a bug in my login form component.

INPUT:
\`\`\`tsx
function LoginForm() {
  const [email, setEmail] = useState()
  const handleSubmit = () => {
    fetch('/api/login', { method: 'POST', body: email })
  }
  return <input onChange={e => setEmail(e.target.value)} />
}
\`\`\`

Error: "TypeError: Cannot read properties of undefined"

SPECIFICITY: The error happens when I click submit without
             typing anything first. Line 4.

PARAMETERS: Please keep using functional components.
            Add proper TypeScript types.
\`\`\`

### Before & After: Bad Prompt → Good Prompt

**Example 1:**
- ❌ "My code doesn't work"
- ✅ "My Python sort function returns the list in the wrong order. Here's the code: [paste]. I expected [1,2,3] but got [3,2,1]. I think the comparison is backwards."

**Example 2:**
- ❌ "How do I make a website?"
- ✅ "I want to build a personal portfolio website using HTML and CSS. I need a header with my name, a section showing 3 projects with images, and a contact form. Can you give me the HTML structure?"

**Example 3:**
- ❌ "Fix the bug"
- ✅ "In my JavaScript calculator app, the multiply function returns NaN when one input is a string. Here's the function: [paste]. How do I add input validation to convert strings to numbers first?"

### ⚠️ Hallucination Alert

AI can **confidently make up things that don't exist**. It might:

- Invent a function that isn't in the library
- Reference documentation that doesn't exist
- Give you code that LOOKS right but has subtle bugs
- Make up package names that sound real

**Always verify that AI-generated code actually RUNS.** Test it. Read through it. If something sounds too good to be true, double-check the docs yourself.

### 📏 Token Limits

AI has a **memory window** called a "context window." Think of it like a whiteboard — there's only so much space.

- Very long conversations = AI forgets earlier context
- If AI starts contradicting itself or forgetting what you said, **start a fresh conversation**
- Copy the important context into your new prompt
- Keep prompts focused — don't ask 10 things at once

### 🎓 Ethics Corner

AI helps you **LEARN**, not replace learning.

- **DO:** Ask AI to explain code line by line
- **DO:** Use AI to debug by understanding the WHY
- **DO:** Ask AI to teach you a concept with examples
- **DON'T:** Copy-paste without understanding
- **DON'T:** Submit AI code as "your work" without learning from it
- **DON'T:** Skip the learning just because AI can do it faster

The goal isn't to get the answer — it's to **understand** the answer. Use AI as a tutor, not a shortcut.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Prompt Mastery",
      description: "Learn to craft better prompts for AI assistants!",
      steps: [
        {
          instruction:
            "Which is a BETTER prompt for an AI coding assistant?",
          type: "multiple-choice",
          data: {
            options: [
              "Fix my code",
              "My React component throws 'Cannot read property of undefined' when I click the submit button. Here's the component code: [code]. How do I fix the null reference?",
              "Why doesn't this work?",
              "Help me with JavaScript",
            ],
          },
          solution: 1,
          hint: "The best prompt includes WHAT is broken, WHERE the error happens, and SHOWS the code",
        },
        {
          instruction:
            "The AI gives you code that looks right but you're not sure it works. What should you do?",
          type: "multiple-choice",
          data: {
            options: [
              "Trust it — AI is always correct",
              "Delete it and write everything yourself",
              "Test the code, verify it runs, and understand what each line does",
              "Ask the AI if its own code is correct",
            ],
          },
          solution: 2,
          hint: "AI can 'hallucinate' — confidently give wrong answers. Always verify!",
        },
        {
          instruction:
            "Put these prompt improvement steps in the right order!",
          type: "sequence",
          data: {
            items: [
              {
                id: "context",
                text: "Add context",
                description: "Tell the AI what project/tech you're using",
              },
              {
                id: "specific",
                text: "Be specific",
                description: "Describe exactly what you want",
              },
              {
                id: "input",
                text: "Include your code",
                description: "Paste the relevant code or error",
              },
              {
                id: "iterate",
                text: "Iterate on the response",
                description: "Refine based on what you get back",
              },
            ],
            correctOrder: ["context", "specific", "input", "iterate"],
          },
          hint: "Start broad (what project), get specific (what you want), show evidence (code), then refine",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What does the C in CRISP stand for?",
          type: "multiple-choice",
          options: ["Code", "Context", "Command", "Compile"],
          correctAnswer: 1,
          explanation:
            "C stands for Context — telling the AI what project, language, and framework you're working with so it can give relevant answers.",
        },
        {
          question:
            "Why should you paste error messages instead of describing them?",
          type: "multiple-choice",
          options: [
            "It's faster to type",
            "AI can analyze exact error text better than vague descriptions",
            "Error messages are always short",
            "It looks more professional",
          ],
          correctAnswer: 1,
          explanation:
            "AI can analyze exact error text better than vague descriptions. The precise error message contains critical details like line numbers, error types, and stack traces that help AI pinpoint the problem.",
        },
        {
          question: "What is an AI 'hallucination'?",
          type: "multiple-choice",
          options: [
            "When AI crashes and stops responding",
            "When AI confidently generates incorrect or made-up information",
            "When AI takes too long to respond",
            "When AI asks too many questions",
          ],
          correctAnswer: 1,
          explanation:
            "A hallucination is when AI confidently generates incorrect or made-up information — like inventing functions that don't exist or referencing fake documentation. Always verify AI output!",
        },
        {
          question:
            "What should you do when AI's first response isn't perfect?",
          type: "multiple-choice",
          options: [
            "Give up and search Google instead",
            "Accept it as-is — AI knows best",
            "Start an entirely new conversation from scratch",
            "Iterate — give feedback and ask it to adjust",
          ],
          correctAnswer: 3,
          explanation:
            "Iterate! Give feedback like 'That's close but change X to Y' or 'That broke because Z, try again.' AI conversations are meant to be refined over multiple exchanges.",
        },
        {
          question:
            "Why is it important to understand code AI generates for you?",
          type: "multiple-choice",
          options: [
            "So you can impress your friends",
            "Because AI code always has exactly one bug",
            "So you can debug it, modify it, and actually learn from it",
            "Because teachers can tell if AI wrote it",
          ],
          correctAnswer: 2,
          explanation:
            "Understanding AI-generated code is crucial so you can debug it when it breaks, modify it for your needs, and actually learn programming concepts. AI is a tutor, not a replacement for learning.",
        },
      ],
    },
  ],
};

export default lesson;
