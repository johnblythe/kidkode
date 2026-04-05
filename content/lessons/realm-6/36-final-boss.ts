import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "final-boss",
  title: "The Final Boss: Full Stack Siege",
  description:
    "Everything you've learned comes together in the ultimate challenge — prove you're a full-stack hero!",
  order: 36,
  realm: 6,
  estimatedMinutes: 25,
  xpReward: 300,
  icon: "👑",
  boss: {
    name: "The Chaos Compiler",
    description:
      "The ultimate boss — a sentient compiler that throws every type of error, bug, and challenge at you",
    sprite: "chaosCompiler",
    maxHp: 140,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Syntax Error Storm!",
      "Runtime Exception!",
      "Logic Bug Barrage!",
      "Dependency Hell!",
      "Memory Leak Drain!",
    ],
    defeatText:
      "The Chaos Compiler bows before you — you are a true Full Stack Hero! Your journey has only just begun...",
  },
  sections: [
    // ========== PART 1: SLIDES — Frontend Review ==========
    {
      type: "slides",
      frames: [
        {
          title: "Six Realms, One Hero",
          content:
            "Look at how far you've come.\n\nYou started in **Realm 1** learning what code even *is* — the terminal, Git, and your first commands. You moved through **Realm 2** mastering JavaScript fundamentals — variables, conditions, loops, functions, arrays, objects. **Realm 3** taught you to build the web with HTML, CSS, and browser JavaScript.\n\nThen you leveled up. **Realm 4** took you server-side — APIs, databases, JSON, and auth. **Realm 5** introduced AI tools, npm, and the modern developer workflow.\n\nNow you stand at **Realm 6** — the final boss. Every skill, every concept, every lesson has led to this moment.",
          visual: `
  ┌─────────────────────────────────────┐
  │       YOUR JOURNEY SO FAR           │
  │                                     │
  │  Realm 1 ──► Realm 2 ──► Realm 3   │
  │  Terminal    JavaScript   HTML/CSS  │
  │  Git         Variables    Layout    │
  │  Commands    Functions    Browser   │
  │       \\          |          /       │
  │        ▼         ▼         ▼        │
  │  Realm 4 ──► Realm 5 ──► Realm 6   │
  │  Backend     AI Tools     FINAL    │
  │  APIs        npm          BOSS     │
  │  Auth        Claude       👑       │
  │                                     │
  │       36 lessons. 1 hero.           │
  └─────────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Frontend Arsenal",
          content:
            "Let's review the **frontend** — everything the user sees and interacts with.\n\n**HTML** gives pages structure — headings, paragraphs, lists, images, forms, buttons. It's the skeleton of every web page.\n\n**CSS** controls appearance — colors, fonts, layout (flexbox!), spacing, and responsive design with media queries. It's the skin and style.\n\n**JavaScript in the browser** adds behavior — `querySelector` to find elements, `addEventListener` to react to clicks and keypresses, `textContent` and `innerHTML` to update what users see. DOM manipulation is your frontend superpower.\n\nThese three languages work together on every website you've ever visited.",
          visual: `
  ┌─────────────────────────────────────┐
  │   FRONTEND TRINITY                  │
  │                                     │
  │   HTML ──────── Structure           │
  │   <h1>         headings, lists,     │
  │   <form>       buttons, images      │
  │                                     │
  │   CSS ───────── Style               │
  │   display:flex  colors, layout,     │
  │   @media        responsive design   │
  │                                     │
  │   JavaScript ── Behavior            │
  │   querySelector events, DOM,        │
  │   addEventListener interactivity    │
  │                                     │
  │   Together = every website ever     │
  └─────────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "What 'Full Stack' Means",
          content:
            "A **full-stack developer** builds both sides of an application:\n\n**Frontend** — the part users see and touch. HTML for structure, CSS for style, JavaScript for interactivity. This runs in the browser.\n\n**Backend** — the part users never see. Servers that handle requests, databases that store data, APIs that connect everything, and auth that keeps things secure. This runs on a server.\n\nThe \"stack\" is all the technology layers stacked together — from the user's browser all the way down to the database. Full-stack means you understand the whole picture, not just one side.\n\nYou've learned both. That makes you dangerous.",
          visual: `
  ┌─────────────────────────────────────┐
  │         THE FULL STACK              │
  │                                     │
  │  ┌───────────────────────┐          │
  │  │    FRONTEND (Browser) │  ◄─ You  │
  │  │  HTML + CSS + JS      │          │
  │  └───────────┬───────────┘          │
  │              │ HTTP requests         │
  │  ┌───────────▼───────────┐          │
  │  │    BACKEND (Server)   │  ◄─ You  │
  │  │  APIs + Auth + Logic  │          │
  │  └───────────┬───────────┘          │
  │              │ queries               │
  │  ┌───────────▼───────────┐          │
  │  │    DATABASE (Storage)  │  ◄─ You │
  │  │  Tables + Rows + SQL  │          │
  │  └───────────────────────┘          │
  └─────────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "The Final Challenge",
          content:
            "This lesson has **two parts** — double the usual.\n\n**Part 1** tests your frontend knowledge: HTML structure, CSS layout, DOM events, and how they all fit together.\n\n**Part 2** tests your backend and tools knowledge: APIs, Git, debugging, terminal commands, async code, and the developer mindset.\n\nAt the end, you'll face the **Chaos Compiler** — a boss with 140 HP that throws every type of error at you. Seven questions, each worth 20 damage. You need to land most of your hits.\n\nThis is everything you've learned, condensed into one ultimate test. Let's see what you're made of.",
          visual: `
  ┌─────────────────────────────────────┐
  │                                     │
  │     👑  THE FINAL CHALLENGE  👑     │
  │                                     │
  │  Part 1: Frontend Review            │
  │  ├─ HTML structure                  │
  │  ├─ CSS flexbox                     │
  │  └─ DOM event handling              │
  │                                     │
  │  Part 2: Backend & Tools            │
  │  ├─ APIs & fetch                    │
  │  ├─ Git commands                    │
  │  └─ Debugging mindset               │
  │                                     │
  │  BOSS: The Chaos Compiler (140 HP)  │
  │  "Show me everything you've got."   │
  └─────────────────────────────────────┘`,
          animation: "pop",
        },
      ],
    },

    // ========== PART 2: READING — Frontend Cheat Sheet ==========
    {
      type: "reading",
      estimatedMinutes: 3,
      content: `## Full Stack Cheat Sheet — Part 1: Frontend

A quick reference for everything you've learned about building the user-facing side of web applications.

---

### HTML — Structure

| Tag | Purpose | Example |
|---|---|---|
| \`<h1>\`–\`<h6>\` | Headings (biggest to smallest) | \`<h1>Welcome</h1>\` |
| \`<p>\` | Paragraph of text | \`<p>Hello world</p>\` |
| \`<ul>\` / \`<li>\` | Unordered list with items | \`<ul><li>Item</li></ul>\` |
| \`<a href="">\` | Link to another page | \`<a href="/about">About</a>\` |
| \`<img>\` | Display an image | \`<img src="pic.png" alt="desc">\` |
| \`<form>\` / \`<input>\` | Collect user data | \`<input type="text" name="q">\` |
| \`<button>\` | Clickable button | \`<button id="go">Go</button>\` |
| \`<div>\` / \`<section>\` | Generic containers | Group related content together |

**Key pattern:** HTML defines *what* is on the page. IDs and classes give CSS and JS hooks to target elements.

---

### CSS — Style & Layout

\`\`\`css
/* Flexbox — the layout workhorse */
.container {
  display: flex;
  justify-content: center;   /* horizontal alignment */
  align-items: center;        /* vertical alignment */
  gap: 16px;                  /* space between items */
}

/* Responsive design — adapt to screen size */
@media (max-width: 768px) {
  .container {
    flex-direction: column;   /* stack on small screens */
  }
}
\`\`\`

**Common pitfalls:**
- Forgetting \`box-sizing: border-box\` (padding adds to width otherwise)
- Not testing on mobile — always check responsive breakpoints
- Specificity wars — keep selectors simple, avoid \`!important\`

---

### JavaScript in the Browser — DOM Manipulation

\`\`\`js
// Find elements
const btn = document.querySelector("#my-button");
const output = document.querySelector(".output");

// React to user actions
btn.addEventListener("click", () => {
  output.textContent = "You clicked!";
});

// Change styles dynamically
output.style.color = "green";
\`\`\`

**Key patterns:**
- \`querySelector\` → find one element by CSS selector
- \`addEventListener\` → respond to click, keydown, submit, etc.
- \`textContent\` → safely update text (no HTML injection risk)
- \`classList.add/remove/toggle\` → change CSS classes dynamically

---

### How They Connect

\`\`\`
HTML  →  defines <button id="go">Click Me</button>
CSS   →  styles  #go { background: blue; color: white; }
JS    →  behavior  btn.addEventListener("click", handler)
\`\`\`

Three languages, three jobs, one page. That's the frontend.`,
    },

    // ========== PART 3: INTERACTIVE — Frontend Exercises ==========
    {
      type: "interactive",
      title: "Frontend Battle Drills",
      description:
        "Prove your frontend skills — HTML structure, CSS layout, and DOM events.",
      steps: [
        {
          instruction:
            "Build a basic page structure. Fill in the HTML tag that wraps the main heading of a page.",
          type: "fill-blank",
          data: {
            template:
              "<___>My Awesome Website</___>",
            blanks: [
              { id: "open", placeholder: "tag", width: 4 },
              { id: "close", placeholder: "tag", width: 4 },
            ],
            filename: "index.html",
          },
          solution: {
            open: "h1",
            close: "h1",
          },
          hint: "The largest heading tag — one letter and one number. It stands for 'heading 1'.",
        },
        {
          instruction:
            "Make items sit side by side using CSS flexbox. Fill in the display value.",
          type: "fill-blank",
          data: {
            template:
              ".hero-section {\n  display: ___;\n  justify-content: space-between;\n  align-items: center;\n}",
            blanks: [{ id: "display", placeholder: "value", width: 6 }],
            filename: "style.css",
          },
          solution: {
            display: "flex",
          },
          hint: "This CSS display value puts children in a row. Rhymes with 'hex'.",
        },
        {
          instruction:
            "A button should display an alert when clicked. Which method attaches the event?",
          type: "multiple-choice",
          data: {
            options: [
              'btn.addEventListener("click", handler)',
              'btn.onClick("click", handler)',
              'btn.attachEvent("click", handler)',
              'btn.listenFor("click", handler)',
            ],
          },
          solution: 0,
          hint: "The standard DOM method — add + event + listener, all one word in camelCase.",
        },
      ],
    },

    // ========== PART 4: QUIZ — Frontend Review ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question:
            "Which HTML tag creates a clickable link to another page?",
          type: "multiple-choice",
          options: [
            "<link>",
            "<a>",
            "<button>",
            "<nav>",
          ],
          correctAnswer: 1,
          explanation:
            "The <a> (anchor) tag creates hyperlinks. <link> is for stylesheets in the <head>, <button> is for actions, and <nav> is a semantic container for navigation.",
        },
        {
          question:
            "What does `display: flex` do to a container's children?",
          type: "multiple-choice",
          options: [
            "Hides them completely",
            "Stacks them vertically with no spacing",
            "Lays them out in a row (by default) with flexible sizing",
            "Makes them absolutely positioned",
          ],
          correctAnswer: 2,
          explanation:
            "Flexbox's default direction is row — children line up side by side. You control alignment, spacing, and wrapping with additional flex properties.",
        },
        {
          question:
            "Which CSS feature lets you change layout based on screen size?",
          type: "multiple-choice",
          options: [
            "display: responsive",
            "@media queries",
            "font-size: auto",
            "position: relative",
          ],
          correctAnswer: 1,
          explanation:
            "@media queries apply CSS rules conditionally based on viewport width (or other features). They're the foundation of responsive design.",
        },
        {
          question:
            "What does `document.querySelector('.output')` return?",
          type: "multiple-choice",
          options: [
            "All elements with class 'output'",
            "The first element matching the CSS selector '.output'",
            "A new element with class 'output'",
            "The text content of the output element",
          ],
          correctAnswer: 1,
          explanation:
            "querySelector returns the FIRST element that matches the CSS selector. To get all matches, you'd use querySelectorAll instead.",
        },
        {
          question:
            "Why is `textContent` safer than `innerHTML` for updating text on a page?",
          type: "multiple-choice",
          options: [
            "textContent is faster to type",
            "innerHTML doesn't work in modern browsers",
            "textContent treats input as plain text, preventing code injection attacks",
            "There is no difference between them",
          ],
          correctAnswer: 2,
          explanation:
            "innerHTML parses content as HTML, which can execute malicious scripts if user input is involved. textContent treats everything as plain text — safe by default.",
        },
      ],
    },

    // ========== PART 5: SLIDES — Backend & Tools Review ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Other Side: Backend",
          content:
            "The frontend is what users see. The **backend** is what makes it all work behind the scenes.\n\n**Client vs. Server** — your browser (client) sends requests; the server processes them and sends back data. Every time you load a page, submit a form, or fetch data — that's a client-server conversation.\n\n**APIs** — Application Programming Interfaces are how programs talk to each other. You send a request to an endpoint, and get structured data (usually JSON) back.\n\n**Databases** — persistent storage. User accounts, posts, scores — anything that needs to survive a page refresh lives in a database.\n\n**Auth** — authentication (\"who are you?\") and authorization (\"what can you do?\"). Passwords, tokens, sessions — keeping users safe.",
          visual: `
  ┌─────────────────────────────────────┐
  │   BACKEND WORLD                     │
  │                                     │
  │   Browser ──request──► Server       │
  │   (Client)              │           │
  │                    ┌────┴────┐      │
  │                    │  API    │      │
  │                    │ Routes  │      │
  │                    └────┬────┘      │
  │                         │           │
  │                    ┌────▼────┐      │
  │                    │Database │      │
  │                    │  Users  │      │
  │                    │  Posts  │      │
  │                    │  Scores │      │
  │                    └─────────┘      │
  │                                     │
  │   + Auth: who are you? what can     │
  │     you do? tokens, sessions, etc.  │
  └─────────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Your Developer Toolkit",
          content:
            "Beyond HTML/CSS/JS and backend code, you learned the **tools** that every developer uses daily:\n\n**Terminal** — the command line. `ls`, `cd`, `mkdir`, `rm`, `cat`. Faster than clicking through folders. Feels like a superpower once you're comfortable.\n\n**Git** — version control. `git add`, `git commit`, `git push`, `git branch`. Save points for your code. Never lose work. Collaborate with others.\n\n**npm** — Node Package Manager. Install libraries others have built so you don't reinvent the wheel. `npm install`, `package.json`, `node_modules`.\n\n**Debugging** — `console.log` is your best friend. Read error messages (they tell you *exactly* what's wrong). Use the browser DevTools. Break the problem into smaller pieces.",
          visual: `
  ┌─────────────────────────────────────┐
  │   DEVELOPER TOOLKIT                 │
  │                                     │
  │   Terminal ─── Command the machine  │
  │   $ ls  $ cd  $ mkdir  $ cat        │
  │                                     │
  │   Git ──────── Save points for code │
  │   $ git add    $ git commit         │
  │   $ git push   $ git branch         │
  │                                     │
  │   npm ──────── Borrow others' code  │
  │   $ npm install  package.json       │
  │                                     │
  │   Debugging ── Find & fix bugs      │
  │   console.log()  DevTools           │
  │   Read the error message!           │
  └─────────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "The Developer Mindset",
          content:
            "The most important thing you've learned isn't a language or a tool. It's a **way of thinking**.\n\n**Break big problems into small ones.** Every complex app is just a pile of simple pieces snapped together.\n\n**Read error messages.** They're not scary — they're clues. The computer is *telling you* what went wrong.\n\n**Google (and AI) are your allies.** Every professional developer looks things up constantly. It's not cheating — it's how the job works.\n\n**Build things.** Reading about code isn't coding. The best way to learn is to build, break, fix, repeat. Every bug you squash makes you stronger.\n\n**Never stop learning.** Technology evolves fast. The developers who thrive are the ones who stay curious.",
          visual: `
  ┌─────────────────────────────────────┐
  │   THE DEVELOPER MINDSET             │
  │                                     │
  │   1. Break big → small              │
  │      Complex app = simple pieces    │
  │                                     │
  │   2. Read error messages            │
  │      They're clues, not curses      │
  │                                     │
  │   3. Search + AI = normal           │
  │      Pros look stuff up constantly  │
  │                                     │
  │   4. Build > Read                   │
  │      Bugs make you stronger         │
  │                                     │
  │   5. Stay curious                   │
  │      The learning never stops       │
  │                                     │
  │   "The expert has failed more       │
  │    times than the beginner          │
  │    has tried."                      │
  └─────────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "You Made It",
          content:
            "Whatever happens in this final battle, know this: **you've already won.**\n\nYou learned the terminal when most adults are afraid of it. You learned Git when some professional developers still struggle with it. You built web pages, called APIs, worked with databases, and used AI as a coding partner.\n\nYou are no longer someone who *uses* technology. You are someone who **builds** it.\n\nThe Chaos Compiler is the last boss, but it's not the end of your journey. After this, the world of code is wide open — React, TypeScript, Node.js, mobile apps, game development, AI, robotics... wherever your curiosity takes you.\n\nBut first — let's finish this.",
          visual: `
  ┌─────────────────────────────────────┐
  │                                     │
  │       ⚔️  FULL STACK HERO  ⚔️      │
  │                                     │
  │            /|                        │
  │           / |  "I built this."      │
  │          /__|                        │
  │           /\\    👑                   │
  │          /  \\                        │
  │                                     │
  │    36 lessons completed.            │
  │    6 realms conquered.              │
  │    Infinite possibilities ahead.    │
  │                                     │
  │    The Chaos Compiler awaits...     │
  │                                     │
  │    [ Ready for the final fight? ]   │
  └─────────────────────────────────────┘`,
          animation: "pop",
        },
      ],
    },

    // ========== PART 6: READING — Backend & Tools Cheat Sheet ==========
    {
      type: "reading",
      estimatedMinutes: 3,
      content: `## Full Stack Cheat Sheet — Part 2: Backend & Tools

Everything you've learned about the server side, developer tools, and what comes next.

---

### Client-Server Model

\`\`\`
Browser (Client)                 Server
┌──────────┐   HTTP Request   ┌──────────┐
│  Your    │ ──────────────►  │  API     │
│  page    │                  │  Routes  │
│          │ ◄──────────────  │          │
└──────────┘   JSON Response  └────┬─────┘
                                   │
                              ┌────▼─────┐
                              │ Database │
                              └──────────┘
\`\`\`

The browser sends a request → the server processes it → queries the database if needed → sends back a response (usually JSON).

---

### APIs & Fetch

\`\`\`js
// GET data from an API
const response = await fetch("https://api.example.com/data");
const data = await response.json();
console.log(data);
\`\`\`

- \`fetch\` sends HTTP requests from JavaScript
- \`await\` pauses until the response arrives (async!)
- \`.json()\` parses the response body into a JavaScript object
- Always handle errors with try/catch in production code

---

### Git — Essential Commands

| Command | What It Does |
|---|---|
| \`git init\` | Start tracking a project |
| \`git add .\` | Stage all changes |
| \`git commit -m "msg"\` | Save a snapshot with a message |
| \`git push\` | Upload commits to GitHub |
| \`git pull\` | Download latest changes |
| \`git branch\` | List or create branches |
| \`git checkout -b name\` | Create and switch to a new branch |
| \`git log\` | View commit history |

---

### Debugging Checklist

1. **Read the error message** — it usually tells you the file, line, and what went wrong
2. **\`console.log\`** the suspicious variable — is it what you expect?
3. **Check the DevTools** Network tab — did the API call succeed?
4. **Rubber duck it** — explain the problem out loud (or to AI)
5. **Search the error** — someone has hit this before, guaranteed

---

### What to Learn Next

Your KidKode journey covered the fundamentals. Here's where the road branches:

| Path | Technologies | What You'd Build |
|---|---|---|
| **Frontend frameworks** | React, Vue, Svelte | Dynamic single-page apps |
| **TypeScript** | TypeScript | Safer, more maintainable JS |
| **Backend deep dive** | Node.js, Express, Prisma | Full server applications |
| **Mobile** | React Native, Flutter | Phone & tablet apps |
| **Game dev** | Phaser, Unity, Godot | 2D and 3D games |
| **AI/ML** | Python, TensorFlow | Intelligent applications |

Pick whatever excites you most. The fundamentals you've learned here apply everywhere. The hardest part — learning to think like a developer — is already done.`,
    },

    // ========== PART 7: INTERACTIVE — Backend & Tools Exercises ==========
    {
      type: "interactive",
      title: "Backend & Tools Battle Drills",
      description:
        "Prove your backend and tools knowledge — APIs, Git, and debugging.",
      steps: [
        {
          instruction:
            "Fetch data from an API. Fill in the method that sends an HTTP request in JavaScript.",
          type: "fill-blank",
          data: {
            template:
              'const response = await ___("https://api.example.com/users");\nconst users = await response.json();',
            blanks: [{ id: "method", placeholder: "function", width: 8 }],
            filename: "app.js",
          },
          solution: {
            method: "fetch",
          },
          hint: "The built-in browser function for making HTTP requests — five letters, starts with 'f'.",
        },
        {
          instruction:
            "Save your work with Git. Fill in the command that creates a snapshot of your staged changes.",
          type: "fill-blank",
          data: {
            template: 'git ___ -m "Add user login feature"',
            blanks: [{ id: "cmd", placeholder: "command", width: 8 }],
          },
          solution: {
            cmd: "commit",
          },
          hint: "This Git command saves a snapshot with a message. It rhymes with 'vomit'.",
        },
        {
          instruction:
            "Your app crashes with 'TypeError: Cannot read property of undefined'. What's the BEST first debugging step?",
          type: "multiple-choice",
          data: {
            options: [
              "Delete the entire file and start over",
              "console.log the variable to see what it actually contains",
              "Add try/catch around every single line",
              "Ignore it and hope it fixes itself",
            ],
          },
          solution: 1,
          hint: "When a variable is 'undefined', you need to figure out WHY — the simplest way to inspect it is...",
        },
      ],
    },

    // ========== PART 8: QUIZ — Cross-Realm Final Boss ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question:
            "What does the `cd` command do in the terminal?",
          type: "multiple-choice",
          options: [
            "Creates a new directory",
            "Changes to a different directory",
            "Copies a directory",
            "Deletes a directory",
          ],
          correctAnswer: 1,
          explanation:
            "cd stands for 'change directory'. It moves you into a different folder. mkdir creates directories, cp copies, and rm deletes.",
        },
        {
          question:
            "What does `git push` do?",
          type: "multiple-choice",
          options: [
            "Downloads the latest code from GitHub",
            "Creates a new branch",
            "Uploads your local commits to the remote repository",
            "Deletes your commit history",
          ],
          correctAnswer: 2,
          explanation:
            "git push sends your local commits to the remote repository (like GitHub). git pull does the opposite — it downloads changes.",
        },
        {
          question:
            "What keyword makes JavaScript wait for an API response before continuing?",
          type: "multiple-choice",
          options: [
            "wait",
            "pause",
            "async",
            "await",
          ],
          correctAnswer: 3,
          explanation:
            "The 'await' keyword pauses execution until a Promise resolves. It must be used inside an async function. This is how you handle asynchronous operations like API calls.",
        },
        {
          question:
            "In a REST API, what does a GET request do?",
          type: "multiple-choice",
          options: [
            "Creates new data on the server",
            "Retrieves (reads) data from the server",
            "Updates existing data",
            "Deletes data from the server",
          ],
          correctAnswer: 1,
          explanation:
            "GET retrieves data, POST creates, PUT/PATCH updates, and DELETE removes. These are the four main HTTP methods in REST APIs.",
        },
        {
          question:
            "Why do websites use authentication (login systems)?",
          type: "multiple-choice",
          options: [
            "To make the website load faster",
            "To verify who users are and control what they can access",
            "To improve CSS styling",
            "To make JavaScript run more efficiently",
          ],
          correctAnswer: 1,
          explanation:
            "Authentication verifies identity ('who are you?') and authorization controls access ('what can you do?'). Together they protect user data and restrict actions to the right people.",
        },
        {
          question:
            "You deployed your app but it shows a blank page. The console says 'Failed to fetch'. What's the most likely issue?",
          type: "multiple-choice",
          options: [
            "The CSS file is missing",
            "The HTML has a typo in a heading tag",
            "The API endpoint URL is wrong or the server is down",
            "The font size is too small to see",
          ],
          correctAnswer: 2,
          explanation:
            "'Failed to fetch' means the browser couldn't reach the API. Either the URL is wrong, the server isn't running, or there's a network/CORS issue. Always check the Network tab in DevTools.",
        },
        {
          question:
            "A senior developer tells you: 'The best debugger is your own brain.' What do they really mean?",
          type: "multiple-choice",
          options: [
            "Never use console.log or DevTools",
            "Understanding your code deeply matters more than any tool — read the error, trace the logic, think it through",
            "You should memorize every JavaScript method",
            "Debugging tools are useless",
          ],
          correctAnswer: 1,
          explanation:
            "Tools like console.log and DevTools are essential, but they only help if you understand what you're looking at. The real debugging skill is reading errors carefully, understanding data flow, and reasoning about what SHOULD happen vs. what IS happening.",
        },
      ],
    },
  ],
};

export default lesson;
