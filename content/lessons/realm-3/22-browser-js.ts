import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "browser-js",
  title: "JavaScript in the Browser: The Puppet Strings",
  description:
    "Connect JavaScript to your HTML — select elements, change content, and make pages respond to clicks and actions.",
  order: 18,
  realm: 3,
  estimatedMinutes: 14,
  xpReward: 150,
  icon: "🎭",
  boss: {
    name: "The Static Gargoyle",
    description:
      "A frozen page that refuses to move or respond — no interactivity, no life, just dead HTML",
    sprite: "staticGargoyle",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Static Page Freeze!",
      "Null Reference Slam!",
      "Event Bubble Burst!",
    ],
    defeatText:
      "The Gargoyle springs to life as your event listeners bring interactivity to every element!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "JavaScript Meets HTML",
          content:
            "Up until now, your JavaScript has lived in the **terminal** — a text-only realm where `console.log()` was your only window to the world. But JavaScript was *born* in the browser. Its original quest? To make web pages **come alive**.\n\nThe secret is the **DOM** — the Document Object Model. When a browser loads HTML, it builds a hidden tree of every element on the page. JavaScript can reach into that tree, grab any element, and pull its strings like a **puppet master**.\n\nEvery button you've ever clicked, every menu that opened on hover, every form that validated your input — that was JavaScript manipulating the DOM. You're about to learn the same spells.",
          visual: `
  ┌─── THE DOM: YOUR PUPPET STAGE ──┐
  │                                 │
  │  HTML File         DOM Tree     │
  │  ──────────       ──────────    │
  │  <html>           document      │
  │    <body>           └─ body     │
  │      <h1>              ├─ h1    │
  │      <p>               ├─ p     │
  │      <button>          └─ btn   │
  │                                 │
  │  JS pulls the strings:         │
  │  🎭 ──→ grabs h1 ──→ changes! │
  └─────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Selecting Elements",
          content:
            "Before you can control a puppet, you need to **grab its strings**. In DOM terms, that means **selecting** an element.\n\n`document.querySelector()` is your main spell. Pass it any CSS selector and it returns the first matching element:\n```js\nconst btn = document.querySelector(\"#myButton\");\nconst title = document.querySelector(\".hero-title\");\nconst firstParagraph = document.querySelector(\"p\");\n```\n\nNeed *all* matches instead of just the first? Use `document.querySelectorAll(\"p\")` — it returns a list of every matching element, like rounding up every puppet of a certain type.\n\nThe selectors are the same ones you already know from CSS: `#id`, `.class`, `tag`. Your CSS knowledge just became a superpower in JavaScript.",
          visual: `
  ┌─── SELECTING PUPPETS ───────────┐
  │                                 │
  │  querySelector("#myBtn")        │
  │    → grabs ONE element by ID    │
  │                                 │
  │  querySelector(".card")         │
  │    → grabs FIRST .card element  │
  │                                 │
  │  querySelectorAll("p")          │
  │    → grabs ALL <p> elements     │
  │                                 │
  │  CSS Selector    JS Target      │
  │  ───────────     ─────────      │
  │  #hero       →   <div id="hero">│
  │  .enemy      →   <span class=…>│
  │  button      →   <button>       │
  └─────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Changing Content & Style",
          content:
            "Now that you've grabbed an element, time to **pull the strings**. Three properties you'll use constantly:\n\n**`.textContent`** — change the text inside an element:\n```js\ntitle.textContent = \"Quest Complete!\";\n```\n\n**`.style`** — change inline CSS properties:\n```js\ntitle.style.color = \"gold\";\ntitle.style.fontSize = \"2rem\";\n```\n\n**`.classList`** — add, remove, or toggle CSS classes (the cleanest approach):\n```js\ncard.classList.add(\"active\");\ncard.classList.remove(\"hidden\");\ncard.classList.toggle(\"highlighted\");\n```\n\nUsing `classList` is like swapping a puppet's costume — you prepare outfits (CSS classes) ahead of time, then JS just switches them on and off.",
          visual: `
  ┌─── PULLING THE STRINGS ─────────┐
  │                                 │
  │  BEFORE          AFTER          │
  │  ──────          ─────          │
  │  Hello World  →  Quest Complete!│
  │  (black text)    (gold text)    │
  │  [no class]      [.active]      │
  │                                 │
  │  el.textContent = "new text"    │
  │  el.style.color = "gold"        │
  │  el.classList.add("active")     │
  │                                 │
  │  classList > style               │
  │  (cleaner, reusable!)           │
  └─────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Event Listeners: Responding to Actions",
          content:
            "A puppet that only poses is boring — it needs to **react**. That's where **event listeners** come in. They tell the browser: \"when *this* happens to *this* element, run *this* function.\"\n\n```js\nbutton.addEventListener(\"click\", () => {\n  alert(\"You clicked the button!\");\n});\n```\n\nThe pattern is always: **element → event name → callback function**. Some events you'll use all the time:\n- `\"click\"` — user clicks the element\n- `\"input\"` — user types in a text field\n- `\"submit\"` — a form is submitted\n- `\"keydown\"` — any key is pressed\n- `\"mouseover\"` — cursor hovers over the element\n\nEvent listeners are the nervous system of every interactive web page. Without them, HTML is a painting. With them, it's a living world.",
          visual: `
  ┌─── EVENT LISTENERS ─────────────┐
  │                                 │
  │  btn.addEventListener(          │
  │    "click",      ← event type   │
  │    () => {       ← callback     │
  │      // react!                  │
  │    }                            │
  │  );                             │
  │                                 │
  │  EVENT        FIRES WHEN…       │
  │  ─────        ───────────       │
  │  click        user clicks       │
  │  input        user types        │
  │  submit       form submitted    │
  │  keydown      key pressed       │
  │  mouseover    cursor hovers     │
  └─────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Creating Elements",
          content:
            "So far you've changed *existing* elements. But what if you want to add **new ones** to the page? Time to **summon new puppets onto the stage**.\n\n```js\nconst newCard = document.createElement(\"div\");\nnewCard.textContent = \"A new quest appears!\";\nnewCard.classList.add(\"quest-card\");\ndocument.body.appendChild(newCard);\n```\n\nThe flow is always: **create → configure → attach**. `createElement` builds the element in memory, you set its content and styles, then `appendChild` places it on the page.\n\nFor now, `createElement` + `textContent` is the safe, reliable path for building dynamic pages. As you level up, you'll learn more advanced techniques for injecting HTML content — and the security considerations that come with them.",
          visual: `
  ┌─── SUMMONING NEW ELEMENTS ──────┐
  │                                 │
  │  1. CREATE                      │
  │  const el = document            │
  │    .createElement("div")        │
  │                                 │
  │  2. CONFIGURE                   │
  │  el.textContent = "Hello!"      │
  │  el.classList.add("card")       │
  │                                 │
  │  3. ATTACH                      │
  │  document.body.appendChild(el)  │
  │                                 │
  │  Page: [...existing...]         │
  │         + [new div] ← appears!  │
  └─────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "The Script Tag: Connecting JS to HTML",
          content:
            "One last piece of the puzzle: **how does your JavaScript file actually connect to your HTML?** Through the `<script>` tag.\n\n```html\n<body>\n  <h1>My Page</h1>\n  <script src=\"app.js\"></script>\n</body>\n```\n\n**Placement matters.** If you put `<script>` in the `<head>`, it runs *before* the HTML body exists — and `querySelector` will find nothing. Two fixes:\n- Place `<script>` at the **bottom of `<body>`** (classic approach)\n- Add the **`defer`** attribute: `<script src=\"app.js\" defer></script>` — this tells the browser \"load this script, but wait until the HTML is fully parsed before running it.\"\n\nMost modern projects use `defer`. It's like telling the puppet master: \"wait until the stage is built before you start pulling strings.\"",
          visual: `
  ┌─── SCRIPT PLACEMENT ────────────┐
  │                                 │
  │  BAD (runs before HTML)         │
  │  <head>                         │
  │    <script src="app.js">        │
  │  </head>                        │
  │  <body>...</body>               │
  │                                 │
  │  GOOD (bottom of body)          │
  │  <body>                         │
  │    <h1>Hello</h1>               │
  │    <script src="app.js">        │
  │  </body>                        │
  │                                 │
  │  BEST (defer attribute)         │
  │  <head>                         │
  │    <script src="app.js" defer>  │
  │  </head>                        │
  └─────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## DOM Manipulation Cheat Sheet

### Selecting Elements

\`\`\`js
// Select ONE element (first match)
document.querySelector("#myId");       // by ID
document.querySelector(".myClass");    // by class
document.querySelector("p");          // by tag

// Select ALL matching elements
document.querySelectorAll(".card");    // returns NodeList
document.querySelectorAll("li");
\`\`\`

\`querySelectorAll\` returns a **NodeList**, not an array. You can loop over it with \`forEach\`, but it doesn't have \`.map()\` or \`.filter()\`. To convert: \`Array.from(nodeList)\`.

### Modifying Content

\`\`\`js
// Text content (safe — no HTML parsing)
el.textContent = "New text here";
\`\`\`

Use \`textContent\` for plain text. It's the safest approach because it treats everything as text, never as executable HTML.

### Modifying Styles

\`\`\`js
// Inline styles (use sparingly)
el.style.color = "red";
el.style.backgroundColor = "navy";   // camelCase, not kebab-case!
el.style.display = "none";           // hide an element

// CSS classes (preferred approach)
el.classList.add("active");           // add a class
el.classList.remove("hidden");        // remove a class
el.classList.toggle("open");          // add if missing, remove if present
el.classList.contains("active");      // check → true/false
\`\`\`

Note: CSS property names in JS use **camelCase** — \`background-color\` becomes \`backgroundColor\`.

### Event Listeners

| Event | Fires When... | Common Use |
|---|---|---|
| \`click\` | Element is clicked | Buttons, links, cards |
| \`input\` | Value changes (as you type) | Text fields, sliders |
| \`change\` | Value changes (on blur) | Dropdowns, checkboxes |
| \`submit\` | Form is submitted | Form validation |
| \`keydown\` | A key is pressed | Keyboard shortcuts |
| \`keyup\` | A key is released | Detecting key combos |
| \`mouseover\` | Cursor enters element | Hover effects |
| \`mouseout\` | Cursor leaves element | Undo hover effects |
| \`focus\` | Element gains focus | Input field highlighting |
| \`blur\` | Element loses focus | Input validation |

\`\`\`js
element.addEventListener("click", (event) => {
  console.log("Clicked!", event.target);
});

// Remove a listener (must reference the same function)
function handleClick() { /* ... */ }
element.addEventListener("click", handleClick);
element.removeEventListener("click", handleClick);
\`\`\`

The \`event\` object passed to your callback contains useful info: \`event.target\` (the clicked element), \`event.key\` (for keyboard events), \`event.preventDefault()\` (stop default browser behavior, e.g., form submission).

### Creating & Removing Elements

\`\`\`js
// Create
const div = document.createElement("div");
div.textContent = "New element!";
div.classList.add("card");

// Attach to the page
document.body.appendChild(div);          // at the end
parent.insertBefore(div, referenceEl);    // before another element

// Remove
div.remove();                             // modern way
parent.removeChild(div);                  // older way (same result)
\`\`\`

### Script Placement

\`\`\`html
<!-- Option 1: Bottom of body (classic) -->
<body>
  <h1>Page content</h1>
  <script src="app.js"></script>
</body>

<!-- Option 2: Defer attribute (modern, preferred) -->
<head>
  <script src="app.js" defer></script>
</head>
<body>
  <h1>Page content</h1>
</body>
\`\`\`

Both ensure the DOM is ready before your JS runs. \`defer\` downloads the script in parallel with HTML parsing, so it's slightly faster.

### Common Mistakes

1. **Script in \`<head>\` without \`defer\`** — JS runs before the DOM exists, \`querySelector\` returns \`null\`.
2. **Forgetting that \`style\` uses camelCase** — \`el.style.background-color\` is a syntax error; use \`el.style.backgroundColor\`.
3. **Trying array methods on \`querySelectorAll\`** — it returns a NodeList, not an array. Use \`Array.from()\` first.
4. **Anonymous functions with \`removeEventListener\`** — you can't remove a listener if you used an inline arrow function, because there's no reference to pass.
5. **Selecting elements that don't exist yet** — if your script runs before the HTML is parsed, elements won't be found.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "DOM Manipulation Workshop",
      description:
        "Practice selecting elements, wiring up events, and changing content — the core skills of browser JavaScript.",
      steps: [
        {
          instruction:
            "Select a button element by its ID. Fill in the method name.",
          type: "fill-blank",
          data: {
            template: 'const btn = document.___("#myButton");',
            blanks: [{ id: "method", placeholder: "method name" }],
          },
          solution: {
            method: "querySelector",
          },
          hint: "This method takes a CSS selector string and returns the first matching element.",
        },
        {
          instruction:
            "Add a click event listener to the button. Fill in the event name.",
          type: "fill-blank",
          data: {
            template: 'button.addEventListener("___", handleClick);',
            blanks: [{ id: "event", placeholder: "event name" }],
          },
          solution: {
            event: "click",
          },
          hint: "What event fires when a user clicks on something? It's the most common event name.",
        },
        {
          instruction:
            "What does the `.textContent` property do when you assign a value to it?",
          type: "multiple-choice",
          data: {
            options: [
              "Deletes the element from the page",
              "Gets or sets the text inside an element",
              "Changes the element's CSS class",
              "Adds an event listener to the element",
            ],
          },
          solution: 1,
          hint: "Think about what 'text' and 'content' mean together — it's about the words *inside* an element.",
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
            "What does `document.querySelector(\".hero\")` return?",
          type: "multiple-choice",
          options: [
            "All elements with the class \"hero\"",
            "The first element with the class \"hero\"",
            "The element with the ID \"hero\"",
            "A new element with the class \"hero\"",
          ],
          correctAnswer: 1,
          explanation:
            "querySelector returns the FIRST element matching the CSS selector. The dot (.) targets a class. Use querySelectorAll to get all matches.",
        },
        {
          question:
            "Which property would you use to change the visible text inside a `<p>` element?",
          type: "multiple-choice",
          options: [
            ".value",
            ".innerText",
            ".textContent",
            ".className",
          ],
          correctAnswer: 2,
          explanation:
            "textContent is the safest way to get or set the plain text inside an element. The .value property is for form inputs like <input> and <textarea>.",
        },
        {
          question:
            "What does `element.addEventListener(\"click\", myFunc)` do?",
          type: "multiple-choice",
          options: [
            "Clicks the element automatically",
            "Runs myFunc once immediately",
            "Calls myFunc every time the element is clicked",
            "Removes the click behavior from the element",
          ],
          correctAnswer: 2,
          explanation:
            "addEventListener registers a callback function that fires every time the specified event occurs on that element. It doesn't run the function immediately — it waits for the event.",
        },
        {
          question:
            "What is the DOM?",
          type: "multiple-choice",
          options: [
            "A JavaScript library for animations",
            "The browser's tree representation of the HTML document that JS can manipulate",
            "A special type of CSS selector",
            "A server that hosts web pages",
          ],
          correctAnswer: 1,
          explanation:
            "The Document Object Model (DOM) is the browser's internal tree structure built from your HTML. JavaScript uses the DOM API to read, change, add, and remove elements on the page.",
        },
        {
          question:
            "Why should you place `<script>` at the bottom of `<body>` or use the `defer` attribute?",
          type: "multiple-choice",
          options: [
            "Scripts run faster at the bottom of the page",
            "It prevents the browser from caching the script",
            "It ensures the HTML elements exist before the script tries to select them",
            "The script tag is invalid inside <head>",
          ],
          correctAnswer: 2,
          explanation:
            "If a script runs before the HTML is parsed, querySelector will find nothing — the elements don't exist yet. Placing the script at the bottom or using defer ensures the DOM is fully built first.",
        },
      ],
    },
  ],
};

export default lesson;
