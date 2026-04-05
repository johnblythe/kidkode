import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "code-forge",
  title: "The Code Forge: Your First Editor",
  description:
    "Meet your most powerful tool — the code editor. Learn how VS Code helps you write, organize, and debug code like a pro.",
  order: 4,
  realm: 1,
  estimatedMinutes: 10,
  xpReward: 80,
  icon: "⚒️",
  boss: {
    name: "The Extension Mimic",
    description:
      "A shapeshifting creature disguised as a helpful extension — but it's actually bloatware in disguise",
    sprite: "extensionMimic",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Bloatware Blast!",
      "Dependency Overload!",
      "Config Corruption!",
    ],
    defeatText:
      "The Mimic reverts to its true form and slinks away — your editor stays lean and fast!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "What IS a Code Editor?",
          content:
            "A **code editor** is your workbench — the forge where you craft every spell, script, and program.\n\nSure, you *could* write code in Notepad. You could also fight a dragon with a butter knife. It would technically work, but you'd have a very bad time.\n\nA real code editor gives you **superpowers**: color-coded syntax, auto-complete, error detection, and a built-in terminal. It's the difference between scribbling on parchment and wielding an enchanted quill.",
          visual: `
  ┌──────────────────────────────────┐
  │  ⚒️  THE CODE FORGE              │
  │                                  │
  │  Notepad:          VS Code:      │
  │  ┌──────────┐    ┌──────────┐   │
  │  │ plain    │    │ colorful │   │
  │  │ boring   │ vs │ helpful  │   │
  │  │ nothing  │    │ powerful │   │
  │  └──────────┘    └──────────┘   │
  │                                  │
  │  🗡️ Butter knife vs ⚔️ Enchanted│
  └──────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "VS Code: The Adventurer's Forge",
          content:
            "**Visual Studio Code** (VS Code) is the most popular code editor in the world — and it's completely **free**.\n\nWhen you open it, you'll see four key areas: the **sidebar** (your file explorer — like an inventory screen), the **editor** (the big area where you actually write code), the **terminal** (a built-in command line!), and the **extensions panel** (your power-up shop).\n\nMillions of developers use VS Code every day, from beginners to the wizards who build entire operating systems.",
          visual: `
  ┌────────┬─────────────────────────┐
  │ FILES  │  editor.ts        ×     │
  │        │─────────────────────────│
  │ 📁 src │  1 │ function hello() { │
  │  📄 app│  2 │   console.log(     │
  │  📄 css│  3 │     "Adventure!"   │
  │ 📁 img │  4 │   );               │
  │        │  5 │ }                  │
  │        │─────────────────────────│
  │ 🔌 EXT │  $ node editor.ts ▊    │
  └────────┴─────────────────────────┘
   SIDEBAR    EDITOR       TERMINAL`,
          animation: "slide-left",
        },
        {
          title: "Syntax Highlighting: Color-Coded Spells",
          content:
            "Open a file in VS Code and your code lights up in **color**. This is called **syntax highlighting** — the editor recognizes different parts of your code and paints them.\n\n**Keywords** like `function` and `if` get one color. **Strings** like `\"hello\"` get another. **Numbers** get their own shade too. It's like reading from a color-coded spell book where you can instantly spot what each ingredient does.\n\nWithout it, code is a wall of grey text. With it, patterns jump out at you and errors are easier to find.",
          visual: `
  ┌── Color-Coded Spell Book ──────┐
  │                                 │
  │  🟣 function  castSpell(name) { │
  │  🔵   const   power = 42;       │
  │  🟢   console.log(              │
  │  🟠     "Casting " + name       │
  │  🟢   );                        │
  │  🟣 }                           │
  │                                 │
  │  🟣 Keywords  🔵 Variables      │
  │  🟠 Strings   🟢 Built-ins      │
  └─────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Extensions: Power-Ups for Your Forge",
          content:
            "VS Code has a **marketplace** full of extensions — think of them as power-ups you install to make your editor even stronger.\n\nSome essentials: **Prettier** auto-formats your messy code into clean, readable spells. **ESLint** catches bugs and bad patterns before they bite you. **Themes** let you customize your forge's look — dark mode, neon colors, whatever suits your style.\n\nBut beware! Installing too many extensions is like carrying too many potions — it slows you down. Start with a few essentials and add more as you need them.",
          visual: `
  ┌── Extension Power-Up Shop ─────┐
  │                                 │
  │  ⭐ Prettier      Auto-format   │
  │  ⭐ ESLint        Error catcher │
  │  🎨 Themes        Custom look   │
  │  📝 GitLens       Git superpwr  │
  │                                 │
  │  ⚠️  WARNING:                   │
  │  Too many extensions =          │
  │  SLOW FORGE! Pick wisely.       │
  │                                 │
  └─────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Keyboard Shortcuts: Speed Casting",
          content:
            "Master forgesmiths don't click through menus — they use **keyboard shortcuts** to work at lightning speed.\n\nThe most important ones to learn first:\n- **Ctrl/Cmd + S** — Save your file (do this constantly!)\n- **Ctrl/Cmd + P** — Quick Open — jump to any file by name\n- **Ctrl/Cmd + Shift + P** — Command Palette — search for ANY action\n- **Ctrl/Cmd + /** — Toggle comment on/off for selected code\n\nThe **Command Palette** is your ultimate power. Forgot where a setting is? Cmd+Shift+P and type what you want. It's like a search engine for your entire editor.",
          visual: `
  ┌── Speed Casting Shortcuts ─────┐
  │                                 │
  │  ⚡ Ctrl/Cmd + S     Save       │
  │  ⚡ Ctrl/Cmd + P     Quick Open │
  │  ⚡ Ctrl/Cmd + ⇧ + P Cmd Palette│
  │  ⚡ Ctrl/Cmd + /     Comment    │
  │                                 │
  │  ┌──────────────────────────┐   │
  │  │ > Command Palette...     │   │
  │  │   Format Document        │   │
  │  │   Toggle Terminal        │   │
  │  │   Change Theme           │   │
  │  └──────────────────────────┘   │
  └─────────────────────────────────┘`,
          animation: "swoosh",
        },
        {
          title: "The Integrated Terminal",
          content:
            "Remember the terminal from last lesson? VS Code has one **built right in**. Press **Ctrl/Cmd + `** (the backtick key, above Tab) to toggle it open and closed.\n\nThis means you never have to leave your forge. Write code in the editor, run it in the terminal below — all in one window. It's like having your workbench and your testing range in the same room.\n\nYou can even open **multiple terminals** at once — one running your app, one for git commands, one for anything else you need.",
          visual: `
  ┌─────────────────────────────────┐
  │  editor.ts                      │
  │  1 │ console.log("Forged!");    │
  │  2 │                            │
  │─────────────────────────────────│
  │  TERMINAL  [+]  [split]  [×]   │
  │  $ node editor.ts               │
  │  Forged!                        │
  │  $  ▊                           │
  │                                 │
  │  ⌨️  Ctrl/Cmd + \` to toggle     │
  └─────────────────────────────────┘`,
          animation: "slide-up",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 3,
      content: `## Code Editor Cheat Sheet

### Editor Anatomy

\`\`\`
┌──────────┬──────────────────────────┐
│ SIDEBAR  │  EDITOR AREA             │
│          │                          │
│ Explorer │  Where you write code.   │
│ Search   │  Tabs at top for open    │
│ Git      │  files. Line numbers on  │
│ Debug    │  the left.               │
│ Extns    │                          │
│          ├──────────────────────────│
│          │  INTEGRATED TERMINAL     │
│          │  $ commands go here      │
└──────────┴──────────────────────────┘
 Activity    Status Bar (bottom)
 Bar (left)
\`\`\`

### Essential Keyboard Shortcuts

| Action | Mac | Windows/Linux |
|---|---|---|
| Save file | Cmd + S | Ctrl + S |
| Quick Open file | Cmd + P | Ctrl + P |
| Command Palette | Cmd + Shift + P | Ctrl + Shift + P |
| Toggle comment | Cmd + / | Ctrl + / |
| Toggle terminal | Cmd + \` | Ctrl + \` |
| Find in file | Cmd + F | Ctrl + F |
| Find in all files | Cmd + Shift + F | Ctrl + Shift + F |
| Undo | Cmd + Z | Ctrl + Z |
| Redo | Cmd + Shift + Z | Ctrl + Shift + Z |
| Duplicate line | Opt + Shift + Down | Alt + Shift + Down |

### Recommended Starter Extensions

| Extension | What it does |
|---|---|
| **Prettier** | Auto-formats your code so it's clean and consistent |
| **ESLint** | Catches common JavaScript/TypeScript mistakes |
| **Error Lens** | Shows errors inline, right next to the problem line |
| **Auto Rename Tag** | Rename one HTML tag and the matching tag updates |
| **GitHub Copilot** | AI-powered code suggestions as you type |

### Pro Tips

- **Save often!** Cmd/Ctrl + S should become muscle memory. Better yet, turn on **Auto Save** in settings.
- **Use the Command Palette** when you can't find something — Cmd/Ctrl + Shift + P and type what you need.
- **Split the editor** to view two files side by side — drag a tab to the right edge.
- **Minimap** on the right side of the editor is a zoomed-out view of your whole file — click to jump around.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Forge Training",
      description:
        "Test your knowledge of VS Code and code editors!",
      steps: [
        {
          instruction:
            "Which keyboard shortcut opens the Command Palette in VS Code?",
          type: "multiple-choice",
          data: {
            options: [
              "Ctrl/Cmd + S",
              "Ctrl/Cmd + P",
              "Ctrl/Cmd + Shift + P",
              "Ctrl/Cmd + /",
            ],
          },
          solution: 2,
          hint: "It's the shortcut with the most keys — you need three keys at once!",
        },
        {
          instruction:
            "Put these steps in order for creating a new project in VS Code.",
          type: "sequence",
          data: {
            items: [
              {
                id: "open-vscode",
                text: "Open VS Code",
                description: "Launch the editor application",
              },
              {
                id: "open-folder",
                text: "Open a folder",
                description:
                  "Use File → Open Folder to choose your project directory",
              },
              {
                id: "create-file",
                text: "Create a new file",
                description:
                  "Click the new file icon or use Ctrl/Cmd + N",
              },
              {
                id: "start-coding",
                text: "Start coding!",
                description:
                  "Write your first lines of code in the editor",
              },
            ],
            correctOrder: [
              "open-vscode",
              "open-folder",
              "create-file",
              "start-coding",
            ],
          },
          hint: "Think about what you need to do before you can write code — you need the app open and a place to save your files first!",
        },
        {
          instruction: "Fill in the missing key to complete this shortcut.",
          type: "fill-blank",
          data: {
            template: "To save your file in VS Code, press ___ + S",
            blanks: [{ id: "key", placeholder: "key" }],
          },
          solution: {
            key: ["Ctrl", "Cmd", "ctrl", "cmd", "CTRL", "CMD"],
          },
          hint: "On Mac it's Cmd, on Windows/Linux it's Ctrl — either answer works!",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What is a code editor?",
          type: "multiple-choice",
          options: [
            "A specialized tool for writing, editing, and organizing code",
            "A web browser for viewing websites",
            "A program that only runs code but can't edit it",
            "A drawing application for designing interfaces",
          ],
          correctAnswer: 0,
          explanation:
            "A code editor is a specialized tool designed specifically for writing, editing, and organizing code — with features like syntax highlighting, auto-complete, and debugging tools.",
        },
        {
          question:
            "Which of these is NOT a built-in feature of VS Code?",
          type: "multiple-choice",
          options: [
            "Syntax highlighting",
            "Integrated terminal",
            "File explorer sidebar",
            "Automatic website hosting",
          ],
          correctAnswer: 3,
          explanation:
            "VS Code includes syntax highlighting, an integrated terminal, and a file explorer sidebar. Website hosting requires separate tools or services — it's not built into the editor.",
        },
        {
          question: "What is the purpose of syntax highlighting?",
          type: "multiple-choice",
          options: [
            "To make code run faster",
            "To color-code different parts of your code so it's easier to read",
            "To automatically fix errors in your code",
            "To encrypt your code so others can't read it",
          ],
          correctAnswer: 1,
          explanation:
            "Syntax highlighting color-codes keywords, strings, numbers, and other code elements so you can quickly identify different parts of your code and spot patterns or errors.",
        },
        {
          question:
            "What does the keyboard shortcut Ctrl/Cmd + Shift + P do in VS Code?",
          type: "multiple-choice",
          options: [
            "Pastes text from clipboard",
            "Prints the current file",
            "Opens the Command Palette",
            "Creates a new project",
          ],
          correctAnswer: 2,
          explanation:
            "Ctrl/Cmd + Shift + P opens the Command Palette — a searchable list of every action VS Code can perform. It's the most powerful shortcut to learn!",
        },
        {
          question:
            "Why should you be careful about installing too many extensions?",
          type: "multiple-choice",
          options: [
            "Extensions cost money after a free trial",
            "Too many extensions can slow down your editor",
            "Extensions delete your code automatically",
            "You can only install 5 extensions total",
          ],
          correctAnswer: 1,
          explanation:
            "Each extension adds extra processing work for VS Code. Too many can slow down startup time and make the editor laggy. Install only what you need and remove extensions you don't use.",
        },
      ],
    },
  ],
};

export default lesson;
