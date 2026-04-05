import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "deployment",
  title: "Deployment: Launching the Airship",
  description:
    "Take your project from localhost to the real internet — deploy your code so the whole world can see it!",
  order: 33,
  realm: 5,
  estimatedMinutes: 12,
  xpReward: 240,
  icon: "🚀",
  boss: {
    name: "The Build Failure Demon",
    description:
      "A fiery demon that appears when your build breaks in production",
    sprite: "buildFailureDemon",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Build Error Blast!",
      "Missing Env Variable!",
      "Production 500 Crash!",
    ],
    defeatText:
      "Green checkmarks cascade as your build succeeds — the Demon is vanquished!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "From Localhost to the World",
          content:
            "Right now your projects live on **localhost** — your own computer. Nobody else can see them.\n\n**Deployment** is the act of putting your code on a server so anyone with a URL can visit it. It's like building an airship in your workshop, then **launching it into the sky** for the whole world to see.\n\nEvery website you've ever visited — Google, YouTube, Wikipedia — started as someone's localhost project that got deployed.",
          visual: `
  ┌───────────────────────────────────┐
  │  🏠 YOUR COMPUTER (localhost)     │
  │  ─────────────────────────────    │
  │                                   │
  │    localhost:3000                  │
  │    Only YOU can see it             │
  │         │                         │
  │         │  🚀 DEPLOY              │
  │         ▼                         │
  │                                   │
  │  🌍 THE INTERNET                   │
  │    myapp.vercel.app               │
  │    EVERYONE can see it!           │
  │                                   │
  │  Workshop ──→ Airship launched!   │
  └───────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Hosting Platforms: Pick Your Launchpad",
          content:
            "You need a **hosting platform** — a company that runs servers 24/7 so your site stays online even when your laptop is closed.\n\n**Vercel** — built for Next.js / React. Push to GitHub → auto-deploy. Free tier is generous.\n**Netlify** — great for static sites, forms, and serverless functions. Similar push-to-deploy flow.\n**GitHub Pages** — free hosting for static HTML/CSS/JS straight from your repo. No server-side code.\n\nAll three are **free** for personal projects. Pick one and you're flying in minutes.",
          visual: `
  ┌───────────────────────────────────┐
  │  🛫 HOSTING PLATFORMS             │
  │                                   │
  │  ┌──────────┐  ┌──────────┐      │
  │  │  VERCEL  │  │ NETLIFY  │      │
  │  │ Next.js  │  │ Static + │      │
  │  │ React    │  │ Serverless│     │
  │  │ Auto-    │  │ Forms +  │      │
  │  │ deploy   │  │ Functions│      │
  │  └──────────┘  └──────────┘      │
  │  ┌──────────────────────┐        │
  │  │    GITHUB PAGES      │        │
  │  │  Free static hosting │        │
  │  │  HTML / CSS / JS     │        │
  │  └──────────────────────┘        │
  │                                   │
  │  All FREE for personal projects!  │
  └───────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "The Build Process: Forging the Airship",
          content:
            "Before your code can fly, it needs to be **built** — transformed from your dev-friendly source code into optimized files a browser can run fast.\n\nThe **build step** typically:\n1. **Compiles** TypeScript → JavaScript\n2. **Bundles** hundreds of files → a few optimized files\n3. **Minifies** code — removes whitespace, shortens variable names\n4. **Optimizes** images, fonts, and assets\n\nYou trigger this with `npm run build`. If it fails, your deploy fails. The Build Failure Demon strikes!",
          visual: `
  ┌───────────────────────────────────┐
  │  🔨 THE BUILD PROCESS             │
  │                                   │
  │  SOURCE CODE          PRODUCTION  │
  │  ┌──────────┐        ┌─────────┐ │
  │  │ app.tsx  │        │ app.js  │ │
  │  │ style.css│ BUILD  │ (50KB)  │ │
  │  │ utils.ts │ ─────▶ │ all-in- │ │
  │  │ page.tsx │        │ one     │ │
  │  │ ...50+   │        │ fast!   │ │
  │  └──────────┘        └─────────┘ │
  │  readable             optimized   │
  │  big files            tiny files  │
  │                                   │
  │  npm run build  ← triggers it     │
  └───────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Environment Variables: Secret Scrolls",
          content:
            "Your app needs secrets — API keys, database URLs, auth tokens. You **never** put these in your code (anyone on GitHub could steal them).\n\nInstead, you use **environment variables** stored in a `.env` file locally, and in your platform's settings for production.\n\n```bash\n# .env (local — NEVER commit this!)\nDATABASE_URL=postgres://...\nAPI_KEY=sk_live_abc123\nNEXT_PUBLIC_SITE_URL=https://myapp.com\n```\n\nYour code reads them with `process.env.API_KEY`. The values change per environment — local vs production — but the code stays the same.",
          visual: `
  ┌───────────────────────────────────┐
  │  🔐 ENVIRONMENT VARIABLES         │
  │                                   │
  │  LOCAL (.env file)                │
  │  ┌─────────────────────────┐     │
  │  │ API_KEY=test_key_123    │     │
  │  │ DB_URL=localhost:5432   │     │
  │  └─────────────────────────┘     │
  │                                   │
  │  PRODUCTION (platform settings)   │
  │  ┌─────────────────────────┐     │
  │  │ API_KEY=sk_live_real    │     │
  │  │ DB_URL=prod-db.aws.com  │     │
  │  └─────────────────────────┘     │
  │                                   │
  │  ⚠️  .env goes in .gitignore!    │
  │  Code reads: process.env.API_KEY  │
  └───────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Domain Names: Naming Your Airship",
          content:
            "When you deploy, you get a free URL like `my-app.vercel.app`. But you can also connect a **custom domain** — your own `.com` or `.dev` address.\n\n**How it works:**\n1. **Buy a domain** from a registrar (Namecheap, Google Domains, Cloudflare)\n2. **Point DNS** at your hosting platform (add an A or CNAME record)\n3. **Configure** the domain in your platform's dashboard\n4. **HTTPS** is usually automatic — free SSL certificates\n\nDNS is like the internet's phone book: it translates `mycoolsite.com` → the server's IP address.",
          visual: `
  ┌───────────────────────────────────┐
  │  🌐 DOMAIN NAMES                   │
  │                                   │
  │  FREE:   my-app.vercel.app        │
  │  CUSTOM: mycoolsite.com           │
  │                                   │
  │  DNS = Internet's Phone Book      │
  │  ┌─────────────────────────────┐  │
  │  │ mycoolsite.com              │  │
  │  │      │                      │  │
  │  │      ▼  DNS lookup          │  │
  │  │ 76.76.21.21 (server IP)     │  │
  │  └─────────────────────────────┘  │
  │                                   │
  │  🔒 HTTPS = auto SSL (free!)      │
  │  📝 Setup: buy → point → config   │
  └───────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "The Deploy Workflow: Push → Build → Live",
          content:
            "Modern deployment is **automatic**. Here's the typical flow:\n\n1. **Push** your code to GitHub\n2. Platform **detects** the push (webhook)\n3. Platform runs **`npm run build`**\n4. If build passes → new version goes **live**\n5. If build fails → old version stays, you get an error log\n\nThis is called **CI/CD** — Continuous Integration / Continuous Deployment. Every `git push` triggers a fresh deploy. No FTP, no manual uploads, no prayers.",
          visual: `
  ┌───────────────────────────────────┐
  │  🔄 DEPLOY WORKFLOW (CI/CD)       │
  │                                   │
  │  git push origin main             │
  │       │                           │
  │       ▼                           │
  │  ┌─────────┐                      │
  │  │ GitHub  │ webhook fires        │
  │  └────┬────┘                      │
  │       ▼                           │
  │  ┌─────────┐                      │
  │  │  BUILD  │ npm run build        │
  │  └────┬────┘                      │
  │       ▼                           │
  │  ┌─────────┐    ┌──────────┐     │
  │  │  PASS ✅ │───▶│  LIVE!  │     │
  │  │  FAIL ❌ │───▶│ rollback│     │
  │  └─────────┘    └──────────┘     │
  │                                   │
  │  Every push = auto deploy 🚀      │
  └───────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Deployment Cheat Sheet

### Platform Comparison

| | **Vercel** | **Netlify** | **GitHub Pages** |
|---|---|---|---|
| **Best for** | Next.js, React apps | Static sites, JAMstack | Simple HTML/CSS/JS |
| **Server-side code** | Yes (serverless functions) | Yes (serverless functions) | No — static only |
| **Deploy trigger** | Git push | Git push | Git push (Actions) |
| **Free tier** | Generous — hobby projects | Generous — 100GB bandwidth | Unlimited for public repos |
| **Custom domains** | Yes — free SSL | Yes — free SSL | Yes — free SSL |
| **Preview deploys** | Every PR gets a preview URL | Every PR gets a preview URL | No |

### The Build Process

When you run \`npm run build\`, your framework compiles everything into production-ready files:

\`\`\`
SOURCE CODE                    PRODUCTION OUTPUT
──────────────                 ──────────────────
src/app/page.tsx     ──→      .next/static/chunks/page-abc123.js
src/styles/main.css  ──→      .next/static/css/layout-def456.css
public/logo.png      ──→      .next/static/media/logo-ghi789.png

TypeScript  → JavaScript
JSX/TSX     → optimized HTML + JS
CSS modules → scoped, minified CSS
Images      → compressed, resized
\`\`\`

**Common build failures:**
- TypeScript errors (type mismatches, missing imports)
- Missing environment variables
- Importing a file that doesn't exist
- Using Node.js APIs in browser code

### Environment Variables Guide

\`\`\`bash
# .env.local (your machine — NEVER commit!)
DATABASE_URL=postgres://localhost:5432/mydb
API_KEY=sk_test_abc123
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

**Rules:**
1. **\`.env\` files go in \`.gitignore\`** — always
2. **Production values** are set in your platform's dashboard (Vercel → Settings → Environment Variables)
3. **\`NEXT_PUBLIC_\` prefix** = visible to the browser. Without the prefix = server-only
4. **Never hardcode secrets** in source code — even "temporarily"
5. **Different values per environment** — local, staging, production

### Deploy Workflow: Step by Step

\`\`\`
1. Write code locally          (localhost:3000)
2. git add + git commit         (save your work)
3. git push origin main         (send to GitHub)
4. Platform detects the push    (webhook)
5. Platform runs npm run build  (compile + optimize)
6. Build passes? → Deploy!      (new version live)
7. Build fails? → Rollback      (old version stays)
8. You get notified either way  (email/Slack/dashboard)
\`\`\`

This is **CI/CD** — Continuous Integration / Continuous Deployment. No manual uploads. No FTP. Just push and the pipeline handles everything.

### Common Deployment Failures

| Symptom | Likely Cause | Fix |
|---|---|---|
| "Module not found" | Missing dependency | Run \`npm install\`, check package.json |
| "Environment variable is undefined" | Forgot to add it on platform | Add in Vercel/Netlify dashboard |
| "Type error" | TypeScript strict mode | Fix the type error locally first |
| Works locally, broken in prod | Different env variables or Node version | Match versions, check all env vars |
| 404 on page refresh | Client-side routing not configured | Check framework's deploy docs |

### Pre-Deploy Checklist

- [ ] \`npm run build\` succeeds locally
- [ ] All environment variables are set on the platform
- [ ] \`.env\` is in \`.gitignore\`
- [ ] No secrets hardcoded in source code
- [ ] Tested the production URL after deploy
- [ ] Custom domain DNS is pointed correctly (if applicable)`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Airship Launch Sequence",
      description:
        "Prepare your project for deployment — order the workflow, configure env vars, and prove you're ready to launch!",
      steps: [
        {
          instruction:
            "Put the deployment workflow steps in the correct order — from writing code to your site being live!",
          type: "sequence",
          data: {
            items: [
              {
                id: "push",
                text: "git push to GitHub",
                description:
                  "Send your committed code to the remote repository",
              },
              {
                id: "build",
                text: "Platform runs npm run build",
                description:
                  "The hosting platform compiles and optimizes your code",
              },
              {
                id: "detect",
                text: "Platform detects the push",
                description:
                  "A webhook notifies the hosting platform about new code",
              },
              {
                id: "live",
                text: "New version goes live",
                description:
                  "If the build passes, the new version replaces the old one",
              },
              {
                id: "commit",
                text: "git add + git commit",
                description:
                  "Stage and save your changes locally before pushing",
              },
            ],
            correctOrder: ["commit", "push", "detect", "build", "live"],
          },
          hint: "Start with saving your code locally, then sending it to GitHub. The platform takes over from there.",
        },
        {
          instruction:
            "Your app needs a database URL in production but you must NOT put it in your code. Complete the .env file syntax:",
          type: "fill-blank",
          data: {
            template: "___=postgres://prod-db.example.com:5432/myapp",
            blanks: [
              {
                id: "varname",
                placeholder: "VARIABLE_NAME",
                width: 14,
              },
            ],
            filename: ".env",
            caseSensitive: false,
          },
          solution: {
            varname: ["DATABASE_URL", "DB_URL", "DATABASE_URI", "DB_URI"],
          },
          hint: "Environment variables use UPPER_SNAKE_CASE names. A common name for a database connection string is DATABASE_URL.",
        },
        {
          instruction:
            "Why should you NEVER commit your `.env` file to git?",
          type: "multiple-choice",
          data: {
            options: [
              "Because .env files are too large for GitHub",
              "Because it contains secrets like API keys and database passwords that anyone on GitHub could steal",
              "Because git doesn't support files that start with a dot",
              "Because .env files only work on macOS, not Windows",
            ],
          },
          solution: 1,
          hint: "Think about what's inside a .env file — API keys, database URLs, secret tokens. Who can see a public GitHub repo?",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What is deployment?",
          type: "multiple-choice",
          options: [
            "Installing npm packages in your project",
            "Putting your code on a server so anyone on the internet can access it",
            "Writing CSS to make your site look better",
            "Creating a new GitHub repository",
          ],
          correctAnswer: 1,
          explanation:
            "Deployment is the process of taking your code from your local machine (localhost) and putting it on a server connected to the internet, so anyone with the URL can visit your site.",
        },
        {
          question:
            "Which platform is best for deploying a Next.js app for free?",
          type: "multiple-choice",
          options: [
            "Microsoft Word Online",
            "Vercel — built specifically for Next.js with auto-deploy from GitHub",
            "Google Docs",
            "Adobe Photoshop",
          ],
          correctAnswer: 1,
          explanation:
            "Vercel was created by the same team that built Next.js. It has first-class support for Next.js apps, automatic deployments on git push, preview URLs for pull requests, and a generous free tier.",
        },
        {
          question: "What does `npm run build` do?",
          type: "multiple-choice",
          options: [
            "Deletes node_modules and reinstalls everything",
            "Compiles, bundles, and optimizes your source code into production-ready files",
            "Starts a local development server on localhost",
            "Pushes your code to GitHub automatically",
          ],
          correctAnswer: 1,
          explanation:
            "The build step transforms your development source code (TypeScript, JSX, CSS modules) into optimized, minified production files that browsers can load quickly. If the build fails, the deploy fails.",
        },
        {
          question:
            "Where should you store API keys and database passwords for a deployed app?",
          type: "multiple-choice",
          options: [
            "Hardcoded in your JavaScript source files",
            "In a comment at the top of your main file",
            "In environment variables — .env locally, platform dashboard in production",
            "In the README.md so your team can find them",
          ],
          correctAnswer: 2,
          explanation:
            "Secrets belong in environment variables — a .env file locally (which is .gitignored) and in the platform's settings dashboard for production. Never hardcode secrets in source code or commit them to git.",
        },
        {
          question:
            "In a modern CI/CD workflow, what triggers a new deployment?",
          type: "multiple-choice",
          options: [
            "Manually uploading files via FTP every time",
            "Sending an email to the hosting company",
            "Pushing code to GitHub — the platform auto-detects and deploys",
            "Restarting your computer",
          ],
          correctAnswer: 2,
          explanation:
            "CI/CD (Continuous Integration / Continuous Deployment) means every git push triggers an automatic build and deploy. The platform uses a webhook to detect new pushes, runs the build, and if it passes, the new version goes live — no manual steps needed.",
        },
      ],
    },
  ],
};

export default lesson;
