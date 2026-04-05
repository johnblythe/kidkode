import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "css-enchantment",
  title: "CSS: The Enchantment Layer",
  description:
    "Add colors, fonts, and style to your HTML skeleton — CSS is the enchantment that makes pages beautiful.",
  order: 16,
  realm: 3,
  estimatedMinutes: 14,
  xpReward: 130,
  icon: "🎨",
  boss: {
    name: "The Style Vampire",
    description:
      "A creature that drains all color and style from pages, leaving only ugly unstyled HTML",
    sprite: "styleVampire",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Color Drain!",
      "Font Corruption!",
      "Margin Collapse Bite!",
    ],
    defeatText:
      "Colors flood back as the Vampire dissolves — your CSS skills are too powerful!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "What Is CSS?",
          content:
            "Remember HTML? It builds the **skeleton** of a page — headings, paragraphs, images. But a skeleton with no skin, clothes, or paint is… well, terrifying. That's where **CSS** enters the dungeon.\n\n**CSS** stands for **Cascading Style Sheets**. It's a language that targets HTML elements and tells the browser *how they should look*. Font color, background, size, spacing — CSS controls all of it.\n\nThink of it this way: HTML is the **blueprint** of a castle, and CSS is the **enchantment layer** — the paint on the walls, the banners on the towers, the glow on the magic runes. Without CSS, every website would look like a plain text document from 1995.",
          visual: `
  ┌─── HTML vs CSS ─────────────────┐
  │                                 │
  │   HTML (skeleton)               │
  │   ┌──────────────┐              │
  │   │  <h1>Hello</h1> │            │
  │   │  <p>World</p>│              │
  │   └──────────────┘              │
  │          ↓ + CSS                │
  │   ┌──────────────┐              │
  │   │  ██ Hello ██ │  color!      │
  │   │  World       │  fonts!      │
  │   │  ░░░░░░░░░░  │  spacing!   │
  │   └──────────────┘              │
  └─────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Selectors & Properties",
          content:
            "A CSS rule has three parts: a **selector** (what to style), a **property** (what to change), and a **value** (what to change it to). They live inside curly braces.\n\n```css\nh1 { color: blue; font-size: 24px; }\n```\n\nThe **selector** `h1` targets every `<h1>` element on the page. Inside the braces, `color` is the property and `blue` is the value. The semicolon ends each declaration — like a period at the end of a spell.\n\nThere are three main selector types. **Element** selectors target a tag name: `p`, `h1`, `img`. **Class** selectors start with a dot: `.highlight` targets any element with `class=\"highlight\"`. **ID** selectors start with a hash: `#hero-banner` targets the one element with that unique ID. Classes are the workhorse — you'll use them constantly.",
          visual: `
  ┌─── ANATOMY OF A CSS RULE ───────┐
  │                                 │
  │  selector  property   value     │
  │     ↓         ↓         ↓      │
  │    h1  {  color:     blue;  }   │
  │         {  font-size: 24px; }   │
  │                                 │
  │  SELECTOR TYPES:                │
  │  h1          ← element (tag)    │
  │  .myClass    ← class (.)        │
  │  #myId       ← ID (#)           │
  │                                 │
  │  element = broad target         │
  │  .class  = reusable group       │
  │  #id     = one specific thing   │
  └─────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Colors & Fonts",
          content:
            "CSS gives you multiple ways to specify colors. The simplest: **named colors** like `red`, `blue`, `tomato`, `cornflowerblue` (yes, that's real). For precise control, use **hex codes** like `#ff0000` (red) or **rgb()** like `rgb(255, 0, 0)`.\n\nFor fonts, you have three key properties. **`font-family`** sets the typeface: `font-family: Arial, sans-serif;` (always include a fallback). **`font-size`** sets how big: `font-size: 18px;`. **`font-weight`** sets how bold: `font-weight: bold;` or a number like `700`.\n\nWatch the transformation — a single CSS rule can turn a boring heading into something that looks like it belongs in a spellbook.",
          visual: `
  ┌─── BEFORE CSS ──────────────────┐
  │                                 │
  │  Hello World                    │
  │  This is a paragraph.           │
  │                                 │
  ├─── AFTER CSS ───────────────────┤
  │                                 │
  │  ██████████████████████         │
  │  ██  Hello World  ██  #ff6600   │
  │  ██████████████████████         │
  │  This is a paragraph.           │
  │     font: Georgia, 18px        │
  │                                 │
  │  COLORS: red | #ff0000 | rgb()  │
  │  FONTS:  family | size | weight │
  └─────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "The Box Model",
          content:
            "This is **the most important concept in CSS**. Every single HTML element is an invisible box. That box has four layers, from inside out: **content**, **padding**, **border**, and **margin**.\n\n**Content** is the actual text or image. **Padding** is the space *between* the content and the border — like the cushion inside a treasure chest. **Border** is the visible edge. **Margin** is the space *outside* the border, pushing other elements away — like a force field.\n\nWhen something looks weirdly spaced on a page, 90% of the time it's a box model issue. Master this and you'll debug CSS like a pro.",
          visual: `
  ┌─── THE BOX MODEL ───────────────┐
  │                                 │
  │  ┌─ margin ────────────────┐    │
  │  │  ┌─ border ──────────┐  │    │
  │  │  │  ┌─ padding ───┐  │  │    │
  │  │  │  │             │  │  │    │
  │  │  │  │  CONTENT    │  │  │    │
  │  │  │  │  (text/img) │  │  │    │
  │  │  │  │             │  │  │    │
  │  │  │  └─────────────┘  │  │    │
  │  │  └───────────────────┘  │    │
  │  └─────────────────────────┘    │
  │                                 │
  │  content → padding → border     │
  │                    → margin     │
  └─────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Linking CSS to HTML",
          content:
            "You've written CSS rules — but how does the browser know to use them? There are two main ways to connect CSS to your HTML.\n\n**External stylesheet** (the best way): Create a separate `.css` file and link it in your HTML `<head>` with:\n```html\n<link rel=\"stylesheet\" href=\"style.css\">\n```\n\n**Internal style tag**: Write CSS directly inside a `<style>` tag in the `<head>`. Fine for small experiments, but external files are better for real projects — they keep your concerns **separated**.\n\nSeparation of concerns means HTML handles **structure**, CSS handles **presentation**. Like how a castle's architect doesn't also paint the murals — different skills, different scrolls.",
          visual: `
  ┌─── LINKING CSS ─────────────────┐
  │                                 │
  │  METHOD 1: External (best!)     │
  │  ┌── index.html ──────────┐     │
  │  │ <head>                 │     │
  │  │  <link rel="stylesheet"│     │
  │  │    href="style.css">   │     │
  │  │ </head>                │     │
  │  └────────────────────────┘     │
  │           ↕ linked              │
  │  ┌── style.css ───────────┐     │
  │  │ h1 { color: red; }    │     │
  │  └────────────────────────┘     │
  │                                 │
  │  METHOD 2: <style> tag          │
  │  (ok for experiments)           │
  └─────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Cascade: Why It's Called 'Cascading'",
          content:
            "The \"C\" in CSS stands for **Cascading** — and it's not just a cool word. It means styles **flow downward** and can be **overridden** by more specific rules. Like enchantments stacking on a weapon — the last, most targeted enchantment wins.\n\nIf you write `p { color: blue; }` and later write `p { color: red; }`, the paragraph turns red — the later rule overrides the earlier one. But **specificity** matters more than order: an ID selector (`#intro`) beats a class (`.highlight`), which beats an element (`p`).\n\nThis cascading behavior is what lets you set general styles for your whole site, then override specific elements without starting over. It's elegant — once you understand it.",
          visual: `
  ┌─── THE CASCADE ─────────────────┐
  │                                 │
  │  RULE 1: Styles flow down       │
  │  p { color: blue; }             │
  │  p { color: red;  }  ← WINS    │
  │                                 │
  │  RULE 2: Specificity ranks      │
  │                                 │
  │  #myId     → 100 pts  (strongest)│
  │  .myClass  →  10 pts            │
  │  p         →   1 pt   (weakest) │
  │                                 │
  │  Like enchantments stacking:    │
  │  🗡️ +fire +ice +legendary       │
  │  Most specific enchantment wins │
  └─────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## CSS Cheat Sheet

### Selector Types

| Selector | Example | What It Targets |
|---|---|---|
| **Element** | \`h1\` | All \`<h1>\` tags |
| **Class** | \`.highlight\` | Any element with \`class="highlight"\` |
| **ID** | \`#hero-banner\` | The one element with \`id="hero-banner"\` |
| **Group** | \`h1, h2, p\` | All \`<h1>\`, \`<h2>\`, and \`<p>\` tags |
| **Descendant** | \`nav a\` | All \`<a>\` tags inside a \`<nav>\` |

### Common Properties

| Property | Example | What It Does |
|---|---|---|
| \`color\` | \`color: red;\` | Text color |
| \`background-color\` | \`background-color: #333;\` | Background fill |
| \`font-family\` | \`font-family: Arial, sans-serif;\` | Typeface |
| \`font-size\` | \`font-size: 18px;\` | Text size |
| \`font-weight\` | \`font-weight: bold;\` | Boldness |
| \`text-align\` | \`text-align: center;\` | Horizontal alignment |
| \`margin\` | \`margin: 10px;\` | Space outside border |
| \`padding\` | \`padding: 15px;\` | Space inside border |
| \`border\` | \`border: 2px solid black;\` | Visible edge |
| \`width\` / \`height\` | \`width: 300px;\` | Element dimensions |

### The Box Model Diagram

\`\`\`
┌──────────────── margin ─────────────────┐
│  ┌──────────── border ──────────────┐   │
│  │  ┌──────── padding ──────────┐   │   │
│  │  │                           │   │   │
│  │  │       CONTENT             │   │   │
│  │  │    (text, images)         │   │   │
│  │  │                           │   │   │
│  │  └───────────────────────────┘   │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
\`\`\`

- **Content** — the actual stuff (text, images)
- **Padding** — cushion between content and border
- **Border** — visible edge around the element
- **Margin** — force field pushing other elements away

### Color Formats

| Format | Example | Notes |
|---|---|---|
| **Named** | \`red\`, \`tomato\`, \`cornflowerblue\` | ~140 built-in names |
| **Hex** | \`#ff0000\`, \`#f00\` | 6-digit (or 3-digit shorthand) |
| **RGB** | \`rgb(255, 0, 0)\` | Red, Green, Blue (0-255 each) |
| **RGBA** | \`rgba(255, 0, 0, 0.5)\` | RGB + alpha (transparency) |

### Linking CSS to HTML

**External stylesheet (recommended):**
\`\`\`html
<head>
  <link rel="stylesheet" href="style.css">
</head>
\`\`\`

**Internal style tag:**
\`\`\`html
<head>
  <style>
    h1 { color: red; }
  </style>
</head>
\`\`\`

**Inline style (avoid in most cases):**
\`\`\`html
<h1 style="color: red;">Hello</h1>
\`\`\`

External files are best — they keep HTML and CSS in separate files (separation of concerns) and can be shared across multiple pages.

### Specificity Rankings

| Priority | Selector Type | Example |
|---|---|---|
| Highest | Inline style | \`style="color:red"\` |
| High | ID | \`#myId\` |
| Medium | Class | \`.myClass\` |
| Low | Element | \`p\`, \`h1\` |

When two rules conflict, the more specific selector wins. If specificity is equal, the later rule wins.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Enchantment Practice",
      description:
        "Cast some CSS spells — select elements, set properties, and link your stylesheets.",
      steps: [
        {
          instruction:
            "Style a heading so its text turns red. Fill in the missing CSS property.",
          type: "fill-blank",
          data: {
            template: "h1 { ___: red; }",
            blanks: [{ id: "prop", placeholder: "property" }],
          },
          solution: {
            prop: "color",
          },
          hint: "Which CSS property changes the text color of an element?",
        },
        {
          instruction:
            "Link an external stylesheet called 'style.css' to your HTML. Fill in the missing attribute.",
          type: "fill-blank",
          data: {
            template: '<link rel="stylesheet" ___="style.css">',
            blanks: [{ id: "attr", placeholder: "attribute" }],
          },
          solution: {
            attr: "href",
          },
          hint: "This attribute tells the browser WHERE to find the file — the same attribute used in <a> tags for links.",
        },
        {
          instruction:
            "In the box model, what is the space BETWEEN the border and neighboring elements?",
          type: "multiple-choice",
          data: {
            options: ["Padding", "Margin", "Content", "Border"],
          },
          solution: 1,
          hint: "Think about which layer is on the OUTSIDE of the border — pushing other elements away like a force field.",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What does CSS stand for?",
          type: "multiple-choice",
          options: [
            "Cascading Style Sheets",
            "Computer Style System",
            "Creative Styling Syntax",
            "Coded Sheet Styles",
          ],
          correctAnswer: 0,
          explanation:
            "CSS stands for Cascading Style Sheets. 'Cascading' refers to how styles flow down and can be overridden by more specific rules.",
        },
        {
          question:
            "Which CSS selector targets an element with class=\"highlight\"?",
          type: "multiple-choice",
          options: [
            "highlight { }",
            "#highlight { }",
            ".highlight { }",
            "*highlight { }",
          ],
          correctAnswer: 2,
          explanation:
            "Class selectors start with a dot (.). So .highlight targets any element with class=\"highlight\". The # symbol is for IDs, not classes.",
        },
        {
          question:
            "In the box model, which layer sits directly between the content and the border?",
          type: "multiple-choice",
          options: ["Margin", "Padding", "Background", "Outline"],
          correctAnswer: 1,
          explanation:
            "The order from inside out is: content → padding → border → margin. Padding is the cushion between content and border.",
        },
        {
          question:
            "Two rules conflict: `p { color: blue; }` and `#intro { color: red; }`. Which color wins for a paragraph with id=\"intro\"?",
          type: "multiple-choice",
          options: [
            "Blue — element selectors always win",
            "Red — ID selectors are more specific than element selectors",
            "Neither — the browser picks randomly",
            "Both colors mix into purple",
          ],
          correctAnswer: 1,
          explanation:
            "ID selectors (#intro) are more specific than element selectors (p). In the cascade, higher specificity always wins regardless of order.",
        },
        {
          question:
            "What is the recommended way to add CSS to an HTML page?",
          type: "multiple-choice",
          options: [
            "Inline styles on every element",
            "A <style> tag in the body",
            "An external .css file linked with <link>",
            "JavaScript that changes styles at runtime",
          ],
          correctAnswer: 2,
          explanation:
            "An external stylesheet linked with <link rel=\"stylesheet\" href=\"style.css\"> is the best practice. It separates structure (HTML) from presentation (CSS) and can be reused across multiple pages.",
        },
      ],
    },
  ],
};

export default lesson;
