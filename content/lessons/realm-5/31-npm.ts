import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "npm-packages",
  title: "npm & Packages: The Potion Shop",
  description:
    "Visit the potion shop of the coding world — npm has packages for everything, so you don't have to brew every potion from scratch.",
  order: 31,
  realm: 5,
  estimatedMinutes: 12,
  xpReward: 200,
  icon: "🧴",
  boss: {
    name: "The Dependency Dragon",
    description:
      "A massive dragon made of tangled dependency chains — one wrong version and it all collapses",
    sprite: "dependencyDragon",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Version Conflict!",
      "Missing Peer Dependency!",
      "node_modules Avalanche!",
    ],
    defeatText:
      "You tame the dragon with a clean package.json — all dependencies resolved!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "Welcome to the Potion Shop",
          content:
            "Imagine you need a healing potion for your quest. You COULD spend hours gathering herbs, boiling cauldrons, and testing recipes... or you could just **visit the potion shop** and grab one off the shelf.\n\nThat's exactly what **npm** (Node Package Manager) is — a massive shop with over **2 million packages** (pre-made code) that other developers have built, tested, and shared for free.\n\nNeed to add colors to your terminal? There's a package for that (`chalk`). Need to build a web server? Package for that (`express`). Need to work with dates? Package for that (`date-fns`).\n\nWhy spend a week writing something someone else already perfected?",
          visual: `
  ┌─── THE POTION SHOP (npm) ───────┐
  │                                   │
  │   🧪 chalk      → colored text   │
  │   🧪 express    → web server     │
  │   🧪 date-fns   → date helpers   │
  │   🧪 axios      → HTTP requests  │
  │   🧪 zod        → validation     │
  │   🧪 uuid       → unique IDs     │
  │                                   │
  │   📦 2,000,000+ packages         │
  │   📥 30 BILLION downloads/week   │
  │                                   │
  │   🏪 Free & open source!         │
  └───────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "package.json — Your Recipe Book",
          content:
            "Every project that uses npm has a file called **`package.json`**. Think of it as your project's **recipe book** — it records who you are, what your project does, and which potions (packages) you've bought.\n\n```json\n{\n  \"name\": \"my-quest-app\",\n  \"version\": \"1.0.0\",\n  \"description\": \"An epic adventure game\",\n  \"scripts\": {\n    \"start\": \"node app.js\",\n    \"test\": \"jest\"\n  },\n  \"dependencies\": {\n    \"express\": \"^4.18.2\",\n    \"chalk\": \"^5.3.0\"\n  }\n}\n```\n\nThe `dependencies` section is your shopping list — it tells anyone looking at your project exactly which packages it needs to run. You create this file once with `npm init` and npm keeps it updated as you install packages.",
          visual: `
  ┌─── package.json ────────────────┐
  │                                   │
  │  📖 Your project's recipe book    │
  │                                   │
  │  name ────────→ project identity  │
  │  version ─────→ your version      │
  │  scripts ─────→ shortcut commands │
  │  dependencies → packages needed   │
  │                                   │
  │  Created with: npm init           │
  │  Updated by:   npm install <pkg>  │
  │                                   │
  │  📜 Every Node project has one!   │
  └───────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "npm install — Buying Potions",
          content:
            "To add a package to your project, you run **`npm install`** (or `npm i` for short):\n\n```bash\nnpm install chalk\n```\n\nThis does THREE things:\n1. **Downloads** the `chalk` package from the npm registry\n2. **Adds** it to your `dependencies` in `package.json`\n3. **Stores** the actual code in a `node_modules` folder\n\nWhen you clone someone else's project, it won't have `node_modules` — just the recipe book (`package.json`). Run `npm install` (no package name) and npm reads the recipe and downloads everything listed.",
          visual: `
  ┌─── npm install chalk ───────────┐
  │                                   │
  │  Step 1: 🌐 Download from npm    │
  │          registry.npmjs.org       │
  │              │                    │
  │              ▼                    │
  │  Step 2: 📝 Update package.json  │
  │          "chalk": "^5.3.0"       │
  │              │                    │
  │              ▼                    │
  │  Step 3: 📁 Save to node_modules │
  │          node_modules/chalk/      │
  │                                   │
  │  Clone a project? Just run:       │
  │  npm install  ← reads recipe      │
  └───────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "node_modules — The Potions Cabinet",
          content:
            "When you install packages, they go into a folder called **`node_modules`**. This is your potions cabinet — it holds ALL the downloaded code.\n\nHere's the thing: `node_modules` can get **HUGE**. A simple project might have 200MB of packages because each package can depend on other packages, which depend on other packages...\n\n**GOLDEN RULE:** Never commit `node_modules` to git! Add it to your `.gitignore` file:\n\n```\n# .gitignore\nnode_modules/\n```\n\nWhy? Because anyone can recreate it by running `npm install`. Committing it would be like mailing someone the entire potion shop instead of just the recipe.",
          visual: `
  ┌─── node_modules ────────────────┐
  │                                   │
  │  📁 node_modules/                 │
  │  ├── chalk/                       │
  │  ├── express/                     │
  │  │   ├── body-parser/             │
  │  │   ├── accepts/                 │
  │  │   ├── cookie/                  │
  │  │   └── ... 30 more deps         │
  │  └── ... hundreds of folders      │
  │                                   │
  │  ⚠️  Can be 200MB+ easily!       │
  │  🚫 NEVER commit to git          │
  │  ✅ Add to .gitignore             │
  │                                   │
  │  Anyone can recreate it:          │
  │  npm install  ← done!             │
  └───────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "npm Scripts — Custom Shortcuts",
          content:
            "The `scripts` section in `package.json` lets you create **shortcut commands** for your project. Instead of typing long commands, you give them short names:\n\n```json\n\"scripts\": {\n  \"start\": \"node app.js\",\n  \"dev\": \"node --watch app.js\",\n  \"test\": \"jest --verbose\",\n  \"build\": \"tsc && node dist/app.js\"\n}\n```\n\nRun them with **`npm run <name>`**:\n```bash\nnpm run dev      # runs: node --watch app.js\nnpm run test     # runs: jest --verbose\nnpm run build    # runs: tsc && node dist/app.js\n```\n\n**Shortcut:** `npm start` and `npm test` don't need `run` — they're special built-in aliases. Everything else requires `npm run`.",
          visual: `
  ┌─── npm Scripts ─────────────────┐
  │                                   │
  │  "scripts": {                     │
  │    "start": "node app.js",        │
  │    "dev":   "node --watch app.js",│
  │    "test":  "jest --verbose",     │
  │    "build": "tsc && node dist/"   │
  │  }                                │
  │                                   │
  │  ⌨️  npm run dev   → starts dev   │
  │  ⌨️  npm run test  → runs tests   │
  │  ⌨️  npm run build → builds app   │
  │                                   │
  │  ⚡ npm start & npm test          │
  │     skip the "run" keyword!       │
  └───────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Choosing Packages Wisely",
          content:
            "With 2 million packages, how do you pick good ones? Not every potion is safe to drink.\n\n**Check before you install:**\n- **Weekly downloads** — popular packages are battle-tested\n- **Last updated** — abandoned packages = potential bugs\n- **Bundle size** — don't add 500KB for one helper function\n- **GitHub stars & issues** — active community = good support\n\n**The `is-odd` rule:** If you can write it in one line, DON'T install a package for it. Yes, `is-odd` is a real npm package. No, you don't need it — just use `n % 2 !== 0`.\n\nAlso check out **`npx`** — it lets you run a package **once** without permanently installing it:\n```bash\nnpx create-next-app my-app\n```",
          visual: `
  ┌─── Package Checklist ───────────┐
  │                                   │
  │  ✅ CHECK BEFORE INSTALL:         │
  │                                   │
  │  📊 Weekly downloads  > 100K?     │
  │  🕐 Last updated     < 1 year?   │
  │  📦 Bundle size      reasonable?  │
  │  ⭐ GitHub stars     active?      │
  │                                   │
  │  🚫 THE is-odd RULE:             │
  │  Don't install a package for      │
  │  something you can write in       │
  │  one line of code!                │
  │                                   │
  │  🏃 npx = run once, no install   │
  │  npx create-next-app my-app       │
  └───────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## npm Cheat Sheet

### Essential Commands

| Command | What It Does | Example |
|---|---|---|
| \`npm init\` | Create a new package.json | \`npm init -y\` (skip questions) |
| \`npm install <pkg>\` | Install a package | \`npm install express\` |
| \`npm install\` | Install all deps from package.json | \`npm install\` (after cloning) |
| \`npm uninstall <pkg>\` | Remove a package | \`npm uninstall chalk\` |
| \`npm run <script>\` | Run a script from package.json | \`npm run dev\` |
| \`npm list\` | Show installed packages | \`npm list --depth=0\` |
| \`npx <pkg>\` | Run a package without installing | \`npx create-next-app\` |

### package.json Anatomy

\`\`\`json
{
  "name": "quest-tracker",
  "version": "1.0.0",
  "description": "Track your coding quests",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "chalk": "^5.3.0"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "typescript": "^5.3.0"
  }
}
\`\`\`

### dependencies vs devDependencies

| | dependencies | devDependencies |
|---|---|---|
| **What** | Packages your app NEEDS to run | Packages only needed during development |
| **Install** | \`npm install express\` | \`npm install --save-dev jest\` |
| **Examples** | express, chalk, axios | jest, typescript, eslint |
| **In production?** | Yes | No — stripped out for deployment |

Think of it this way: \`express\` is an ingredient IN the potion (dependency). \`jest\` is the cauldron you TEST the potion with (devDependency) — the customer doesn't need the cauldron.

### .gitignore & node_modules

**Always** add \`node_modules/\` to your \`.gitignore\`:

\`\`\`
# .gitignore
node_modules/
\`\`\`

Why?
1. **Size** — node_modules can be hundreds of MB
2. **Reproducible** — anyone can run \`npm install\` to recreate it
3. **Noise** — thousands of files that clutter your git history
4. **Platform-specific** — some packages compile differently per OS

The \`package-lock.json\` file (auto-generated) SHOULD be committed — it locks exact versions so everyone gets the same dependencies.

### Evaluating Packages

Before installing, check the package on [npmjs.com](https://npmjs.com):

1. **Weekly downloads** — is it widely used? (100K+ = solid)
2. **Last publish date** — updated in the last year? Abandoned packages accumulate security vulnerabilities
3. **Bundle size** — check on [bundlephobia.com](https://bundlephobia.com) — is the size worth it?
4. **GitHub issues** — are bugs being addressed?
5. **README quality** — good docs = good package (usually)

### npx — One-Off Commands

\`npx\` runs a package without permanently installing it. Perfect for:

\`\`\`bash
# Create a new project (you only do this once)
npx create-next-app my-app
npx create-react-app my-app

# Run a tool once
npx prettier --write .
npx eslint --init
\`\`\`

No need to clutter your project with packages you'll only use once.

### Common Mistakes

1. **Committing node_modules** — adds thousands of files to git. Always .gitignore it.
2. **Not running \`npm install\` after cloning** — you'll get "module not found" errors because node_modules doesn't exist yet.
3. **Installing everything globally** — use \`npm install\` (local) for project deps, not \`npm install -g\`. Global installs don't show up in package.json.
4. **Ignoring package-lock.json** — commit it! It ensures everyone on the team gets identical versions.
5. **Installing trivial packages** — if you can write it in 5 lines, just write it. Fewer dependencies = fewer security risks.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Potion Shop Training",
      description:
        "Practice essential npm commands — install packages, run scripts, and manage your project like a pro.",
      steps: [
        {
          instruction:
            "Install the `express` package into your project using npm.",
          type: "type-command",
          data: {
            prompt: "$ ",
            caseSensitive: false,
            acceptAlternatives: [
              "npm i express",
              "npm install express",
              "npm i express --save",
              "npm install express --save",
            ],
          },
          solution: "npm install express",
          hint: "The command is `npm install` followed by the package name. You can also use the shorthand `npm i`.",
        },
        {
          instruction:
            "Your package.json has a script called `dev`. Fill in the blank to run it.",
          type: "fill-blank",
          data: {
            template: "npm ___ dev",
            blanks: [{ id: "keyword", placeholder: "command", width: 6 }],
            caseSensitive: false,
          },
          solution: {
            keyword: "run",
          },
          hint: "To execute a custom script from package.json, you use `npm` followed by a keyword, then the script name.",
        },
        {
          instruction:
            "Why should you NOT commit `node_modules` to git?",
          type: "multiple-choice",
          data: {
            options: [
              "Because node_modules contains secret passwords",
              "Because it's huge, reproducible via npm install, and clutters git history",
              "Because git doesn't support folders, only files",
              "Because npm deletes node_modules automatically after each commit",
            ],
          },
          solution: 1,
          hint: "Think about the size of node_modules and whether other developers actually need those files in the repo.",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What is npm?",
          type: "multiple-choice",
          options: [
            "A programming language for building web apps",
            "A package manager that lets you install and share reusable code",
            "A text editor for writing JavaScript",
            "A browser extension for debugging",
          ],
          correctAnswer: 1,
          explanation:
            "npm (Node Package Manager) is a package manager — a tool for installing, sharing, and managing reusable code packages. It hosts over 2 million packages that developers can use in their projects.",
        },
        {
          question: "What does package.json do?",
          type: "multiple-choice",
          options: [
            "It stores all your JavaScript code in one file",
            "It records your project's metadata, dependencies, and scripts",
            "It compiles your code into a production build",
            "It replaces the need for a .gitignore file",
          ],
          correctAnswer: 1,
          explanation:
            "package.json is your project's recipe book — it stores the project name, version, list of dependencies (packages it needs), and scripts (shortcut commands). Anyone can read it to understand what your project requires.",
        },
        {
          question:
            "Which command installs a package called `axios`?",
          type: "multiple-choice",
          options: [
            "npm download axios",
            "npm install axios",
            "npm add axios",
            "npm get axios",
          ],
          correctAnswer: 1,
          explanation:
            "The command is `npm install axios` (or `npm i axios` for short). This downloads the package, adds it to your dependencies, and stores it in node_modules.",
        },
        {
          question: "What is the node_modules folder?",
          type: "multiple-choice",
          options: [
            "A folder where you write your own JavaScript modules",
            "A folder that stores all downloaded package code — and should be .gitignored",
            "A configuration folder that npm uses for settings",
            "A folder that must be manually created before using npm",
          ],
          correctAnswer: 1,
          explanation:
            "node_modules holds all the actual code for your installed packages. It can be huge (hundreds of MB) and should always be added to .gitignore because anyone can recreate it with `npm install`.",
        },
        {
          question:
            "How do you run a custom script called `build` from package.json?",
          type: "multiple-choice",
          options: [
            "npm build",
            "npm execute build",
            "npm run build",
            "node build",
          ],
          correctAnswer: 2,
          explanation:
            "Custom scripts are run with `npm run <name>`. So `npm run build` executes whatever command is defined under \"build\" in your package.json scripts. Note: `npm start` and `npm test` are special cases that don't need `run`.",
        },
      ],
    },
  ],
};

export default lesson;
