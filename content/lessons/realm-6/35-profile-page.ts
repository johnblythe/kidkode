import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "profile-page",
  title: "Build a Profile Page: The Hero's Banner",
  description:
    "Build your own developer profile page — showcase who you are, what you've learned, and what you can build!",
  order: 35,
  realm: 6,
  estimatedMinutes: 18,
  xpReward: 250,
  icon: "\u{1F3D7}\uFE0F", // 🏗️
  boss: {
    name: "The Blank Page Dragon",
    description:
      "A terrifying beast that paralyzes coders with a blank editor — overcome it by just starting!",
    sprite: "blankPageDragon",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Writer's Block Breath!",
      "Empty Div Slam!",
      "Cursor Blink Hypnosis!",
    ],
    defeatText:
      "You type the first line and the Dragon shrinks — momentum defeats perfection!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Quest",
          content:
            "Every hero needs a **banner** — a place where the world can see who they are, what they've conquered, and what they can build.\n\nYou're creating a **developer profile page**. One HTML file. One CSS file. One JS file. Five sections that tell YOUR story:\n\n1. **Hero header** — your name, title, and a bold intro\n2. **About me** — who you are beyond the code\n3. **Skills list** — the technologies you've learned\n4. **Projects showcase** — things you've built\n5. **Contact footer** — how to reach you\n\nThis is the **Realm 6 capstone**. Everything you've learned across all five realms comes together here.",
          visual: `
  ┌─────────────────────────────────────┐
  │  🏗️  THE HERO'S BANNER              │
  │                                     │
  │  ┌─────────────────────────────┐    │
  │  │  ⚔️ Hero Header             │    │
  │  ├─────────────────────────────┤    │
  │  │  📖 About Me                │    │
  │  ├─────────────────────────────┤    │
  │  │  🛡️ Skills List             │    │
  │  ├─────────────────────────────┤    │
  │  │  🏰 Projects Showcase       │    │
  │  ├─────────────────────────────┤    │
  │  │  📬 Contact Footer          │    │
  │  └─────────────────────────────┘    │
  │                                     │
  │  HTML + CSS + JS = YOUR page        │
  └─────────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "The Sections",
          content:
            "Let's break down each section so you know exactly what to build:\n\n**Hero Header** — A full-width banner with your name in a big `<h1>`, a subtitle like \"Aspiring Web Developer\", and maybe a background color or gradient. First impressions matter.\n\n**About Me** — A `<section>` with a short paragraph. Who are you? What do you like? What got you into coding? Keep it real.\n\n**Skills** — An unordered list or a grid of badges showing languages and tools: HTML, CSS, JavaScript, Git, npm, APIs — all the realms you've conquered.\n\n**Projects** — A CSS Grid of cards, each with a project title, description, and a link. Even if it's \"Fan Page\" and \"Weather Dashboard\" — those count!\n\n**Contact** — A footer with links (GitHub, email) and a simple copyright line.",
          visual: `
  ┌─── PAGE BLUEPRINT ─────────────────┐
  │                                     │
  │  HERO ──── h1 + subtitle + bg      │
  │  │                                  │
  │  ABOUT ─── section + paragraph     │
  │  │                                  │
  │  SKILLS ── ul/grid + badges        │
  │  │         HTML CSS JS Git npm     │
  │  │                                  │
  │  PROJECTS  grid of cards           │
  │  │         ┌────┐ ┌────┐ ┌────┐    │
  │  │         │proj│ │proj│ │proj│    │
  │  │         └────┘ └────┘ └────┘    │
  │  │                                  │
  │  CONTACT ─ footer + links          │
  └─────────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "The Tech Stack",
          content:
            "You already know everything you need. Here's how the three languages divide the work:\n\n**HTML** — Semantic tags: `<header>`, `<section>`, `<main>`, `<footer>`. These aren't just containers — they tell browsers and screen readers what each part of the page *means*.\n\n**CSS** — Flexbox for the header layout, CSS Grid for the project cards, media queries for responsive design. A color scheme that feels like *you*.\n\n**JavaScript** — A dark mode toggle (classList + localStorage), a project filter that shows/hides cards by category, and maybe a smooth scroll effect. Small touches that make a static page feel alive.",
          visual: `
  ┌─── TECH STACK ─────────────────────┐
  │                                     │
  │  HTML ─── Semantic Structure        │
  │  ├─ <header>  hero banner           │
  │  ├─ <section> about / skills        │
  │  ├─ <main>    project cards         │
  │  └─ <footer>  contact links         │
  │                                     │
  │  CSS ──── Layout & Style            │
  │  ├─ Flexbox   → header alignment    │
  │  ├─ Grid      → project cards       │
  │  └─ @media    → responsive          │
  │                                     │
  │  JS ───── Interactivity             │
  │  ├─ classList → dark mode toggle    │
  │  ├─ filter()  → project filtering   │
  │  └─ localStorage → save preference  │
  └─────────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Design Tips",
          content:
            "Before you code, three design principles that separate good pages from great ones:\n\n**1. Keep it simple.** White space is your friend. Don't cram everything together — let each section breathe. A clean page with three projects looks better than a cluttered page with ten.\n\n**2. Make it yours.** Pick colors YOU like. Write about things YOU care about. The best portfolio pages have personality — not just code.\n\n**3. Start ugly, polish later.** Get the HTML structure right first. Make it work. THEN make it pretty. The Blank Page Dragon wins when you try to make everything perfect before writing a single line.\n\nRemember: **shipped beats perfect**. A live profile page with three sections is worth more than a \"perfect\" design that never gets built.",
          visual: `
  ┌─── DESIGN PRINCIPLES ──────────────┐
  │                                     │
  │  1️⃣  SIMPLE                         │
  │     White space > clutter           │
  │     Less sections, more impact      │
  │                                     │
  │  2️⃣  PERSONAL                       │
  │     Your colors. Your words.        │
  │     Personality > templates.        │
  │                                     │
  │  3️⃣  ITERATE                        │
  │     Structure → Function → Style    │
  │     Ugly first. Polish second.      │
  │                                     │
  │  ⚔️  SHIPPED BEATS PERFECT          │
  └─────────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Build Time!",
          content:
            "The Blank Page Dragon **feeds on hesitation**. The longer you stare at an empty editor, the stronger it gets.\n\nYour weapon? **Just start typing.** The first `<header>` tag breaks the spell. After that, momentum takes over.\n\nIn the next sections, you'll build your profile page piece by piece — HTML skeleton, CSS layout, JS interactivity. Every step uses skills you've practiced across Realms 1 through 5.\n\nThis isn't a tutorial you follow and forget. This is **your page**. When you're done, you'll have something you can actually put on the internet. Let's go.",
          visual: `
  ┌─────────────────────────────────────┐
  │                                     │
  │       🏗️  THE HERO'S BANNER  🏗️     │
  │                                     │
  │    5 realms of training.            │
  │    1 page to prove it.              │
  │    Time to build.                   │
  │                                     │
  │  ┌──────┐ ┌──────┐ ┌──────┐        │
  │  │ HTML │+│ CSS  │+│  JS  │ = 🌐   │
  │  └──────┘ └──────┘ └──────┘        │
  │                                     │
  │    Defeat the Blank Page Dragon!    │
  └─────────────────────────────────────┘`,
          animation: "pop",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Profile Page Blueprint

Build your profile page in five sections. Read through the structure and patterns — you'll assemble the key pieces in the interactive section.

### Section 1 — Hero Header

\`\`\`html
<header class="hero">
  <h1>Your Name</h1>
  <p class="subtitle">Aspiring Web Developer</p>
  <button id="dark-mode-btn">🌙 Dark Mode</button>
</header>
\`\`\`

\`\`\`css
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}
\`\`\`

The \`<header>\` is semantic — it tells browsers "this is the top section." Flexbox with \`flex-direction: column\` stacks the elements vertically and centers them. The gradient background adds personality without needing an image.

### Section 2 — About Me

\`\`\`html
<section id="about" class="about">
  <h2>About Me</h2>
  <p>I'm a young developer who loves building things for the web.
     I started coding with KidKode and now I can build real projects
     with HTML, CSS, and JavaScript!</p>
</section>
\`\`\`

Use \`<section>\` — it's more meaningful than a bare \`<div>\`. Screen readers and search engines understand that this is a distinct content area. Keep the text personal and genuine.

### Section 3 — Skills List

\`\`\`html
<section id="skills" class="skills">
  <h2>My Skills</h2>
  <ul class="skill-list">
    <li>HTML</li>
    <li>CSS & Flexbox</li>
    <li>JavaScript</li>
    <li>Git & GitHub</li>
    <li>APIs & JSON</li>
    <li>npm</li>
  </ul>
</section>
\`\`\`

\`\`\`css
.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  padding: 0;
}

.skill-list li {
  background: #e8f4f8;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
}
\`\`\`

Flexbox with \`flex-wrap: wrap\` turns a plain list into a row of badges that wrap naturally on smaller screens. The rounded corners (\`border-radius: 20px\`) give each skill a pill/badge shape.

### Section 4 — Projects Showcase (CSS Grid)

\`\`\`html
<section id="projects" class="projects">
  <h2>My Projects</h2>
  <div class="project-grid">
    <div class="project-card" data-category="web">
      <h3>Fan Page</h3>
      <p>A tribute page built with HTML, CSS, and JS.</p>
    </div>
    <div class="project-card" data-category="api">
      <h3>Weather Dashboard</h3>
      <p>Live weather data fetched from an API.</p>
    </div>
    <div class="project-card" data-category="web">
      <h3>Profile Page</h3>
      <p>This page! My developer portfolio.</p>
    </div>
  </div>
</section>
\`\`\`

\`\`\`css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.project-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.2s;
}

.project-card:hover {
  transform: translateY(-4px);
}
\`\`\`

CSS Grid with \`repeat(auto-fit, minmax(250px, 1fr))\` is the magic line — it creates as many columns as will fit, each at least 250px wide. On a phone, that's one column. On a laptop, two or three. Responsive without a single media query.

### Section 5 — Contact Footer

\`\`\`html
<footer class="contact">
  <h2>Get In Touch</h2>
  <p>Find me on <a href="#">GitHub</a> · <a href="#">Email</a></p>
  <p class="copyright">&copy; 2026 Your Name</p>
</footer>
\`\`\`

Semantic \`<footer>\` at the bottom. Simple links, a copyright line. Done.

### JavaScript Interactivity — Dark Mode Toggle

\`\`\`javascript
const darkBtn = document.querySelector("#dark-mode-btn");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference so it persists across page loads
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  darkBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// On page load, check saved preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkBtn.textContent = "☀️ Light Mode";
}
\`\`\`

\`classList.toggle()\` adds the class if missing, removes it if present — perfect for a toggle button. \`localStorage\` saves the preference so refreshing the page doesn't reset the theme.

### Responsive Considerations

The project grid handles itself with \`auto-fit\`. For the rest:

\`\`\`css
@media (max-width: 600px) {
  .hero h1 { font-size: 1.8rem; }
  .about, .skills, .projects { padding: 20px 16px; }
}
\`\`\`

One media query. Shrink the hero title and tighten padding on mobile. That's all you need when your layout is already flex/grid-based.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Forge the Hero's Banner",
      description:
        "Build your profile page piece by piece — semantic HTML, CSS Grid, dark mode toggle, and project planning.",
      steps: [
        {
          instruction:
            "The about section needs a semantic HTML tag that tells browsers 'this is a distinct content area.' Fill in the tag name.",
          type: "fill-blank",
          data: {
            template:
              '<___ id="about" class="about">\n  <h2>About Me</h2>\n  <p>I love building things for the web!</p>\n</___>',
            blanks: [
              { id: "openTag", placeholder: "tag", width: 8 },
              { id: "closeTag", placeholder: "tag", width: 8 },
            ],
            filename: "index.html",
          },
          solution: {
            openTag: ["section", "div"],
            closeTag: ["section", "div"],
          },
          hint: "This semantic tag literally means 'a section of content.' It's more meaningful than a <div>.",
        },
        {
          instruction:
            "Create a responsive project grid that automatically fits as many 250px-wide columns as possible. Fill in the CSS Grid property.",
          type: "fill-blank",
          data: {
            template:
              ".project-grid {\n  display: grid;\n  grid-template-columns: repeat(___, minmax(250px, 1fr));\n  gap: 20px;\n}",
            blanks: [
              { id: "fitMode", placeholder: "keyword", width: 10 },
            ],
            filename: "style.css",
          },
          solution: {
            fitMode: "auto-fit",
          },
          hint: "This keyword tells CSS Grid to automatically fit as many columns as the container allows. Two words joined by a hyphen.",
        },
        {
          instruction:
            "Wire up the dark mode toggle. When clicked, it should add or remove the 'dark-mode' class on the body. Fill in the classList method.",
          type: "fill-blank",
          data: {
            template:
              "darkBtn.addEventListener(\"click\", () => {\n  document.body.classList.___(\"dark-mode\");\n});",
            blanks: [
              { id: "method", placeholder: "method", width: 8 },
            ],
            filename: "script.js",
          },
          solution: {
            method: "toggle",
          },
          hint: "This method adds the class if it's missing, removes it if it's present. Like a light switch — on or off.",
        },
        {
          instruction:
            "When building a page from scratch, which approach leads to the best results?",
          type: "multiple-choice",
          data: {
            options: [
              "Write all the CSS first, then add HTML to match",
              "Build HTML structure first, then style with CSS, then add JS",
              "Start with JavaScript interactivity, then add HTML around it",
              "Design everything in your head before writing any code",
            ],
          },
          solution: 1,
          hint: "Think about it: you can't style something that doesn't exist yet. Structure comes first.",
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
            "A profile page has a header, about section, skills, projects, and footer. What is the correct top-level HTML structure?",
          type: "multiple-choice",
          options: [
            "<div> for everything — semantics don't matter",
            "<header>, <section>, <main>, <footer> — semantic tags that describe each part",
            "<span> containers for each section",
            "<table> rows for each section of content",
          ],
          correctAnswer: 1,
          explanation:
            "Semantic HTML tags like <header>, <section>, <main>, and <footer> tell browsers and screen readers what each part of the page means. This improves accessibility, SEO, and code readability — all for free.",
        },
        {
          question:
            "You want the hero header to stack the title, subtitle, and button vertically and center them. Which CSS approach works best?",
          type: "multiple-choice",
          options: [
            "display: block with text-align: center",
            "display: flex with flex-direction: column and align-items: center",
            "display: grid with 3 rows",
            "position: absolute for each element",
          ],
          correctAnswer: 1,
          explanation:
            "Flexbox with flex-direction: column stacks items vertically, and align-items: center centers them horizontally. It's the cleanest solution for this layout — no hacks, no magic numbers.",
        },
        {
          question:
            "The project cards use `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`. What does this achieve?",
          type: "multiple-choice",
          options: [
            "Creates exactly 3 columns that are always 250px wide",
            "Creates a single column that's always the full width",
            "Creates as many columns as fit, each at least 250px — responsive without media queries",
            "Creates columns that shrink below 250px on small screens",
          ],
          correctAnswer: 2,
          explanation:
            "auto-fit tells Grid to create as many columns as the container allows, with each one at least 250px wide. On a phone that's 1 column, on a laptop maybe 3 — all automatic. One of the most powerful CSS Grid patterns.",
        },
        {
          question:
            "The dark mode toggle uses `document.body.classList.toggle(\"dark-mode\")`. What does `toggle` do?",
          type: "multiple-choice",
          options: [
            "Always adds the class, never removes it",
            "Removes the class permanently",
            "Adds the class if it's missing, removes it if it's present",
            "Creates a new HTML element with that class name",
          ],
          correctAnswer: 2,
          explanation:
            "classList.toggle() is a switch — if the class exists, it removes it; if it doesn't exist, it adds it. Perfect for features like dark mode where you flip between two states with one button.",
        },
        {
          question:
            "Why does the dark mode toggle save the user's preference to `localStorage`?",
          type: "multiple-choice",
          options: [
            "localStorage makes the page load faster",
            "Without localStorage, the browser would crash",
            "So the theme choice persists when the user refreshes or revisits the page",
            "localStorage is required for classList.toggle to work",
          ],
          correctAnswer: 2,
          explanation:
            "Without localStorage, refreshing the page would reset the theme to default every time. localStorage saves small pieces of data in the browser that persist across page loads — perfect for user preferences like dark mode.",
        },
      ],
    },
  ],
};

export default lesson;
