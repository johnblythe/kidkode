import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "fan-page",
  title: "The Forge: Build a Fan Page",
  description:
    "Combine HTML, CSS, and JavaScript to build a fan page for your favorite game, show, or hobby!",
  order: 19,
  realm: 3,
  estimatedMinutes: 18,
  xpReward: 180,
  icon: "\u{1F525}",
  boss: {
    name: "The Pixel Perfectionist",
    description:
      "A nitpicking creature that demands every pixel be perfect \u2014 but sometimes done is better than perfect",
    sprite: "pixelPerfectionist",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "1px Off Strike!",
      "Missing Alt Text Blast!",
      "Inconsistent Spacing Crush!",
    ],
    defeatText:
      "The Perfectionist admits your page looks great \u2014 shipped beats perfect every time!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Project",
          content:
            "Time to build something **real**. You're creating a **fan page** \u2014 a single web page dedicated to your favorite game, anime, show, or hobby.\n\nYour fan page will have a **header** with a title and tagline, a **hero section** with an image and description, a **facts list**, and an interactive **like button** that counts clicks.\n\nThis project uses everything you've learned in Realm 3: HTML for structure, CSS for layout and style, and JavaScript for interactivity. No new concepts \u2014 pure application.",
          visual: `
  \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
  \u2502  \u{1F525} MY FAN PAGE               \u2502
  \u2502                                 \u2502
  \u2502  \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510  \u2502
  \u2502  \u2502  Header + Tagline          \u2502  \u2502
  \u2502  \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524  \u2502
  \u2502  \u2502  [\u{1F5BC}\uFE0F Image] Description   \u2502  \u2502
  \u2502  \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524  \u2502
  \u2502  \u2502  \u2022 Fact 1                  \u2502  \u2502
  \u2502  \u2502  \u2022 Fact 2                  \u2502  \u2502
  \u2502  \u2502  \u2022 Fact 3                  \u2502  \u2502
  \u2502  \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524  \u2502
  \u2502  \u2502  [\u2764\uFE0F Like] 0 likes          \u2502  \u2502
  \u2502  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518  \u2502
  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`,
          animation: "fade",
        },
        {
          title: "The Blueprint",
          content:
            "Every project starts with a plan. Here's the structure of your fan page:\n\n**HTML (structure):** A `<header>` with `<h1>` and `<p>` tagline, a `<div class=\"hero-section\">` with an image placeholder and description, a `<ul>` with fun facts, and a `<button>` for likes.\n\n**CSS (style):** Flexbox for layout, custom colors and fonts, spacing with padding/margin, and a hover effect on the button.\n\n**JavaScript (behavior):** `querySelector` to grab the button and counter, `addEventListener` to detect clicks, and `textContent` to update the like count.",
          visual: `
  \u250C\u2500\u2500\u2500 Fan Page Blueprint \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
  \u2502                                 \u2502
  \u2502  HTML \u2500\u2500\u2500 Structure             \u2502
  \u2502  \u251C\u2500 <header>  title + tagline  \u2502
  \u2502  \u251C\u2500 <div>     hero section      \u2502
  \u2502  \u251C\u2500 <ul>      facts list        \u2502
  \u2502  \u2514\u2500 <button>  like button       \u2502
  \u2502                                 \u2502
  \u2502  CSS \u2500\u2500\u2500\u2500 Style                \u2502
  \u2502  \u251C\u2500 display: flex             \u2502
  \u2502  \u251C\u2500 colors + fonts            \u2502
  \u2502  \u2514\u2500 padding + hover           \u2502
  \u2502                                 \u2502
  \u2502  JS \u2500\u2500\u2500\u2500\u2500 Behavior             \u2502
  \u2502  \u251C\u2500 querySelector             \u2502
  \u2502  \u251C\u2500 addEventListener          \u2502
  \u2502  \u2514\u2500 textContent update        \u2502
  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`,
          animation: "slide-left",
        },
        {
          title: "Your Toolkit",
          content:
            "Quick recap of the three languages working together \u2014 you already know all of these:\n\n**HTML** gives your page **structure**. Tags like `<h1>`, `<p>`, `<ul>`, `<li>`, `<img>`, and `<button>` define what's on the page. Think of it as the skeleton.\n\n**CSS** controls how the page **looks**. Flexbox for layout, colors for personality, font-size for readability, and padding/margin for breathing room. The skin and clothes.\n\n**JavaScript** adds **behavior**. `document.querySelector()` finds elements, `.addEventListener(\"click\", ...)` reacts to user actions, and `.textContent` changes what the user sees. The brain and muscles.",
          visual: `
  \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
  \u2502  HTML         CSS          JS    \u2502
  \u2502  \u250C\u2500\u2500\u2500\u2500\u2500\u2510   \u250C\u2500\u2500\u2500\u2500\u2500\u2510   \u250C\u2500\u2500\u2500\u2500\u2500\u2510  \u2502
  \u2502  \u2502Bones\u2502   \u2502Style\u2502   \u2502Brain\u2502  \u2502
  \u2502  \u2514\u2500\u2500\u252C\u2500\u2500\u2518   \u2514\u2500\u2500\u252C\u2500\u2500\u2518   \u2514\u2500\u2500\u252C\u2500\u2500\u2518  \u2502
  \u2502     \u2502         \u2502         \u2502       \u2502
  \u2502     \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518       \u2502
  \u2502               \u2502                 \u2502
  \u2502          \u250C\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2510            \u2502
  \u2502          \u2502 FAN PAGE \u2502            \u2502
  \u2502          \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518            \u2502
  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`,
          animation: "slide-up",
        },
        {
          title: "Build Time!",
          content:
            "You have the skills. You have the blueprint. Now it's time to **forge your fan page**.\n\nIn the next sections, you'll build it piece by piece \u2014 HTML skeleton first, CSS styling second, then wire up the JavaScript interactivity. Each step uses something you've already practiced.\n\nDon't worry about making it \"perfect.\" The Pixel Perfectionist boss will try to make you obsess over every detail \u2014 but remember: **shipped beats perfect**. A working fan page you built is worth more than a flawless one you never finished.",
          visual: `
  \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
  \u2502                                 \u2502
  \u2502      \u{1F525}  THE FORGE  \u{1F525}            \u2502
  \u2502                                 \u2502
  \u2502    You have the skills.         \u2502
  \u2502    You have the plan.           \u2502
  \u2502    Time to build.               \u2502
  \u2502                                 \u2502
  \u2502  \u250C\u2500\u2500\u2500\u2500\u2510 \u250C\u2500\u2500\u2500\u2500\u2510 \u250C\u2500\u2500\u2500\u2500\u2510           \u2502
  \u2502  \u2502HTML\u2502+\u2502 CSS\u2502+\u2502 JS \u2502 = \u{1F310}      \u2502
  \u2502  \u2514\u2500\u2500\u2500\u2500\u2518 \u2514\u2500\u2500\u2500\u2500\u2518 \u2514\u2500\u2500\u2500\u2500\u2518           \u2502
  \u2502                                 \u2502
  \u2502    Forge your fan page!         \u2502
  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`,
          animation: "pop",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 3,
      content: `## Project Blueprint: Fan Page

Build your fan page in four steps. Read through the patterns \u2014 you'll assemble each piece in the interactive section.

### Step 1 \u2014 HTML Skeleton

\`\`\`html
<header>
  <h1>My Fan Page</h1>
  <p>The ultimate tribute to my favorite thing!</p>
</header>

<div class="hero-section">
  <img src="hero.png" alt="My favorite thing">
  <p>A short description of why this is awesome.</p>
</div>

<ul class="facts-list">
  <li>Fun fact #1</li>
  <li>Fun fact #2</li>
  <li>Fun fact #3</li>
</ul>

<button id="like-btn">Like</button>
<span id="like-count">0</span> likes
\`\`\`

Standard HTML tags you already know. The \`class\` and \`id\` attributes give CSS and JavaScript hooks to target specific elements.

### Step 2 \u2014 CSS Styling (Flexbox + Colors)

\`\`\`css
.hero-section {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.hero-section img {
  width: 200px;
  border-radius: 12px;
}

#like-btn {
  background-color: #ff4757;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

#like-btn:hover {
  background-color: #ff6b81;
}
\`\`\`

Flexbox lines up the image and description side by side. The button gets a bold red style with a hover effect \u2014 small touches that make a page feel alive.

### Step 3 \u2014 Add Content

Replace the placeholder text with real content about your favorite game, show, or hobby. Pick 3\u20135 fun facts. Use an image URL or a placeholder. Make it yours \u2014 the code structure stays the same regardless of topic.

### Step 4 \u2014 JavaScript Interactivity

\`\`\`js
const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");
let count = 0;

likeBtn.addEventListener("click", () => {
  count++;
  likeCount.textContent = count;
});
\`\`\`

Three lines of setup, one event listener. When the button is clicked, bump the counter and update the display. That's all it takes to make a page interactive.

### How the Pieces Connect

| Language | Role | Example |
|---|---|---|
| **HTML** | Structure | \`<button id="like-btn">\` defines the element |
| **CSS** | Style | \`#like-btn { background-color: red }\` makes it look good |
| **JavaScript** | Behavior | \`likeBtn.addEventListener("click", ...)\` makes it do something |

Three languages, one page. Each has a clear job. That's web development.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Forge the Fan Page",
      description:
        "Build your fan page piece by piece \u2014 HTML structure, CSS layout, JS interactivity, and putting it all together.",
      steps: [
        {
          instruction:
            "Set up the hero section. Which HTML tag wraps a group of related content together?",
          type: "fill-blank",
          data: {
            template: "<___ class=\"hero-section\">",
            blanks: [{ id: "tag", placeholder: "tag name", width: 8 }],
            filename: "index.html",
          },
          solution: {
            tag: ["div", "section"],
          },
          hint: "It's the most common generic container tag \u2014 three letters, starts with 'd'. (Or a semantic alternative that starts with 's'.)",
        },
        {
          instruction:
            "Style the hero section so the image and description sit side by side. Fill in the CSS display value.",
          type: "fill-blank",
          data: {
            template:
              ".hero-section {\n  display: ___;\n  justify-content: center;\n  align-items: center;\n}",
            blanks: [{ id: "display", placeholder: "value", width: 6 }],
            filename: "style.css",
          },
          solution: {
            display: "flex",
          },
          hint: "Which CSS display value lets you lay items out in a row? It rhymes with 'hex'.",
        },
        {
          instruction:
            "Wire up the like button. When clicked, the counter should go up by one. Fill in the operator.",
          type: "fill-blank",
          data: {
            template:
              "likeBtn.addEventListener(\"click\", () => {\n  count___;\n  likeCount.textContent = count;\n});",
            blanks: [{ id: "operator", placeholder: "op", width: 3 }],
            filename: "script.js",
          },
          solution: {
            operator: "++",
          },
          hint: "Which operator adds 1 to a number? Two characters, same symbol twice.",
        },
        {
          instruction:
            "Which file controls how the page LOOKS \u2014 colors, fonts, layout, and spacing?",
          type: "multiple-choice",
          data: {
            options: [
              "index.html",
              "style.css",
              "script.js",
              "package.json",
            ],
          },
          solution: 1,
          hint: "Cascading Style Sheets \u2014 the clue is in the name.",
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
            "Which language defines the STRUCTURE of a web page \u2014 headings, paragraphs, images, and buttons?",
          type: "multiple-choice",
          options: ["JavaScript", "CSS", "HTML", "Python"],
          correctAnswer: 2,
          explanation:
            "HTML (HyperText Markup Language) defines the structure and content of a page. Tags like <h1>, <p>, <img>, and <button> are all HTML.",
        },
        {
          question:
            "You want your hero image and description to sit side by side. Which CSS property and value achieves this?",
          type: "multiple-choice",
          options: [
            "display: block",
            "display: flex",
            "position: absolute",
            "float: both",
          ],
          correctAnswer: 1,
          explanation:
            "display: flex turns a container into a flex container, laying its children out in a row by default. Perfect for side-by-side layouts.",
        },
        {
          question:
            "What does `document.querySelector(\"#like-btn\")` do?",
          type: "multiple-choice",
          options: [
            "Creates a new button element",
            "Deletes the button from the page",
            "Finds the element with id=\"like-btn\" in the page",
            "Changes the button's color to red",
          ],
          correctAnswer: 2,
          explanation:
            "querySelector searches the page for the first element matching the CSS selector. The # symbol means 'find by id', so it locates the element with id=\"like-btn\".",
        },
        {
          question:
            "Why do web developers keep HTML, CSS, and JavaScript in separate files instead of mixing them all together?",
          type: "multiple-choice",
          options: [
            "The browser requires them to be separate",
            "Separation makes code easier to read, maintain, and reuse",
            "CSS files load faster than inline styles",
            "JavaScript can't run inside an HTML file",
          ],
          correctAnswer: 1,
          explanation:
            "Separation of concerns! Keeping structure (HTML), style (CSS), and behavior (JS) separate makes your code cleaner, easier to debug, and lets team members work on different parts without conflicts.",
        },
        {
          question:
            "What makes a fan page feel interactive rather than just a static document?",
          type: "multiple-choice",
          options: [
            "Adding more HTML tags",
            "Using brighter CSS colors",
            "JavaScript event listeners that respond to user actions",
            "Making the text bigger with font-size",
          ],
          correctAnswer: 2,
          explanation:
            "Interactivity comes from JavaScript. Event listeners detect user actions (clicks, hovers, key presses) and run code in response \u2014 like updating a like counter when a button is clicked.",
        },
      ],
    },
  ],
};

export default lesson;
