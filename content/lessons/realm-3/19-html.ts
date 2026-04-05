import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "html-skeleton",
  title: "HTML: The Skeleton Scroll",
  description:
    "Learn the language that gives every webpage its structure — like a skeleton that holds everything in place.",
  order: 15,
  realm: 3,
  estimatedMinutes: 12,
  xpReward: 120,
  icon: "🦴",
  boss: {
    name: "The Tag Lich",
    description:
      "An undead creature made of mismatched, unclosed HTML tags — a nightmare of broken markup",
    sprite: "tagLich",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Unclosed Tag Curse!",
      "Missing Attribute Hex!",
      "Broken Nesting Strike!",
    ],
    defeatText:
      "You close every tag and the Lich's body collapses into valid, beautiful HTML!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "What Is HTML?",
          content:
            "Every website you've ever visited — every game wiki, every social media page, every online store — is built on **HTML**. It stands for **HyperText Markup Language**, and it's the skeleton of the web.\n\nHTML isn't a programming language like JavaScript. It's a **markup language** — it doesn't *do* things, it *describes* things. It tells the browser \"this is a heading,\" \"this is a paragraph,\" \"this is a link.\" JavaScript is the brain; HTML is the bones.\n\nThink of it like an ancient scroll. The scroll itself — its sections, its headers, its structure — that's HTML. The enchantments written on it? That's JavaScript and CSS. Without the scroll, there's nothing to enchant.",
          visual: `
  ┌─── THE WEB'S SKELETON ──────────┐
  │                                 │
  │   Every webpage is built on:    │
  │                                 │
  │   HTML  ──→  Structure (bones)  │
  │   CSS   ──→  Style (skin)       │
  │   JS    ──→  Behavior (brain)   │
  │                                 │
  │   ┌───────────────────┐         │
  │   │  <html>           │ ← HTML  │
  │   │    <h1>Hello</h1> │         │
  │   │    <p>World!</p>  │         │
  │   │  </html>          │         │
  │   └───────────────────┘         │
  └─────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Tags: The Building Blocks",
          content:
            "HTML is made of **tags** — little labels wrapped in angle brackets. Most tags come in pairs: an **opening tag** and a **closing tag** with a forward slash.\n\n```html\n<p>This is a paragraph.</p>\n```\n\nThe opening `<p>` says \"start a paragraph.\" The closing `</p>` says \"end the paragraph.\" Everything between them is the **content**. Together — opening tag, content, closing tag — they form an **element**.\n\nSome tags are **self-closing** — they don't wrap content. Images, for example: `<img />`. There's nothing to put *inside* an image tag, so it closes itself. Think of self-closing tags like standalone runes — they work on their own, no pairing needed.",
          visual: `
  ┌─── ANATOMY OF AN ELEMENT ───────┐
  │                                 │
  │  opening tag    content    closing tag
  │      │            │            │
  │      ▼            ▼            ▼
  │    <h1>    My Cool Page     </h1>
  │                                 │
  │    ╰──────── element ──────────╯│
  │                                 │
  │  Self-closing (no content):     │
  │                                 │
  │    <img />    <br />    <hr />  │
  │      ↑ stands alone — no pair   │
  └─────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Page Structure: The Skeleton Scroll",
          content:
            "Every HTML page follows the same blueprint — like a scroll with specific sections. At the very top, a **doctype** declaration tells the browser \"this is HTML5.\" Then the whole page lives inside an `<html>` tag.\n\nInside `<html>` there are exactly two sections: `<head>` and `<body>`. The **head** holds invisible metadata — the page title, links to stylesheets, character encoding. The **body** holds everything the user actually sees.\n\nThink of it like a real scroll: the `<head>` is the seal and label on the outside. The `<body>` is what you read when you unroll it. Every single webpage on the internet has this structure — no exceptions.",
          visual: `
  ┌─── PAGE STRUCTURE ──────────────┐
  │                                 │
  │  <!DOCTYPE html>    ← "I'm HTML5"
  │  <html>                         │
  │   ┌─────────────────────┐       │
  │   │ <head>              │ hidden│
  │   │   <title>My Page</title>    │
  │   │ </head>             │       │
  │   ├─────────────────────┤       │
  │   │ <body>              │visible│
  │   │   <h1>Hello!</h1>   │       │
  │   │   <p>Welcome.</p>   │       │
  │   │ </body>             │       │
  │   └─────────────────────┘       │
  │  </html>                        │
  └─────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Essential Tags: Your Starter Spellbook",
          content:
            "Here are the tags you'll use constantly — your starter spellbook for building pages.\n\n**Headings**: `<h1>` through `<h6>` — six levels from biggest to smallest. `<h1>` is the main title, `<h2>` is a subtitle, and so on.\n\n**Paragraphs**: `<p>` wraps a block of text. Browsers add spacing around paragraphs automatically.\n\n**Links**: `<a href=\"https://example.com\">Click me</a>` — the `href` attribute tells the browser where to go.\n\n**Images**: `<img src=\"cat.png\" alt=\"A cute cat\" />` — `src` is the image file, `alt` describes it for screen readers.\n\n**Lists**: `<ul>` for bullet lists, `<ol>` for numbered lists. Each item goes in `<li>`. Nest them inside the list tag.",
          visual: `
  ┌─── ESSENTIAL TAGS ──────────────┐
  │                                 │
  │  <h1>Big Title</h1>            │
  │  <h2>Subtitle</h2>             │
  │  <p>A paragraph of text.</p>   │
  │                                 │
  │  <a href="url">Link text</a>   │
  │  <img src="pic.png" alt="..." />
  │                                 │
  │  <ul>              <ol>         │
  │    <li>Bullet</li>   <li>One</li>
  │    <li>Bullet</li>   <li>Two</li>
  │  </ul>             </ol>        │
  │                                 │
  │  <div>  ← groups block content  │
  │  <span> ← groups inline content │
  └─────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Attributes: Tag Power-Ups",
          content:
            "Tags on their own are useful, but **attributes** make them powerful. Attributes are extra info you write inside the opening tag — like enchantments on your skeleton bones.\n\n```html\n<a href=\"https://example.com\" class=\"nav-link\">Home</a>\n```\n\nEvery attribute has a **name** and a **value**, connected by `=`. The value goes in quotes. Some common attributes:\n\n- `href` — where a link goes\n- `src` — the source file for images, scripts, etc.\n- `alt` — alternative text describing an image\n- `class` — a CSS styling hook (you can have multiple)\n- `id` — a unique identifier (only one per page)\n\nAttributes never go in the closing tag — only the opening one. Think of them as settings you configure when you create the element.",
          visual: `
  ┌─── ATTRIBUTE ANATOMY ───────────┐
  │                                 │
  │  <a href="url" class="btn">    │
  │   │  │          │               │
  │   │  │          └─ class attr   │
  │   │  └─ href attribute          │
  │   └─ tag name                   │
  │                                 │
  │  Common attributes:             │
  │  ┌──────────┬─────────────────┐ │
  │  │ href     │ link destination│ │
  │  │ src      │ file source    │ │
  │  │ alt      │ image description│ │
  │  │ class    │ CSS styling    │ │
  │  │ id       │ unique name    │ │
  │  └──────────┴─────────────────┘ │
  └─────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Nesting: Tags Inside Tags",
          content:
            "The real power of HTML comes from **nesting** — putting tags inside other tags. A list has items inside it. A `<body>` has headings and paragraphs inside it. The whole page is nested tags all the way down.\n\nBut nesting has one iron rule: **close tags in the reverse order you opened them.** If you open `<div>` then `<p>`, you must close `</p>` before `</div>`. Think of it like stacking boxes — you can't pull out a box from the middle.\n\n```html\n<!-- Correct -->\n<div><p>Hello</p></div>\n\n<!-- WRONG — tags overlap! -->\n<div><p>Hello</div></p>\n```\n\nIndentation is your best friend here. Each level of nesting gets another indent. It makes the structure visible — and helps you spot the Tag Lich's curse of broken nesting before it strikes.",
          visual: `
  ┌─── NESTING RULES ───────────────┐
  │                                 │
  │  CORRECT (last opened = first   │
  │           closed):              │
  │                                 │
  │  <div>                          │
  │    <ul>                         │
  │      <li>Item</li>   ← closes  │
  │    </ul>              ← closes  │
  │  </div>               ← closes  │
  │                                 │
  │  WRONG (overlapping):           │
  │                                 │
  │  <div><p>Oops!</div></p>       │
  │       ╰──── overlapping! ──╯   │
  │                                 │
  │  Indent each level to see it!   │
  └─────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## HTML Cheat Sheet

### Essential Tags

| Tag | Purpose | Example |
|---|---|---|
| \`<h1>\` - \`<h6>\` | Headings (biggest to smallest) | \`<h1>Main Title</h1>\` |
| \`<p>\` | Paragraph of text | \`<p>Some text here.</p>\` |
| \`<a>\` | Link to another page | \`<a href="url">Click</a>\` |
| \`<img />\` | Display an image | \`<img src="pic.png" alt="desc" />\` |
| \`<ul>\` | Unordered (bullet) list | \`<ul><li>Item</li></ul>\` |
| \`<ol>\` | Ordered (numbered) list | \`<ol><li>First</li></ol>\` |
| \`<li>\` | List item (inside ul/ol) | \`<li>An item</li>\` |
| \`<div>\` | Generic block container | \`<div>...block content...</div>\` |
| \`<span>\` | Generic inline container | \`<span>...inline...</span>\` |
| \`<br />\` | Line break (self-closing) | \`Line one<br />Line two\` |
| \`<hr />\` | Horizontal rule (self-closing) | \`<hr />\` |
| \`<strong>\` | Bold / important text | \`<strong>Bold!</strong>\` |
| \`<em>\` | Italic / emphasized text | \`<em>Emphasis</em>\` |

### Page Structure Template

Every HTML file follows this skeleton:

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My Awesome Page</title>
  </head>
  <body>
    <h1>Welcome, Adventurer!</h1>
    <p>This is the visible content.</p>
  </body>
</html>
\`\`\`

- \`<!DOCTYPE html>\` — tells the browser this is HTML5
- \`<html>\` — the root element wrapping everything
- \`<head>\` — metadata, not visible on the page
- \`<title>\` — the text shown in the browser tab
- \`<body>\` — everything the user sees

### Common Attributes

| Attribute | Used On | Purpose |
|---|---|---|
| \`href\` | \`<a>\` | URL the link points to |
| \`src\` | \`<img>\`, \`<script>\` | Source file path or URL |
| \`alt\` | \`<img>\` | Text description of the image |
| \`class\` | Any element | CSS class name(s) for styling |
| \`id\` | Any element | Unique identifier (one per page) |
| \`style\` | Any element | Inline CSS (use sparingly) |
| \`target\` | \`<a>\` | Where to open link (\`_blank\` = new tab) |

### Nesting Rules

1. **Close in reverse order** — last opened tag must be closed first
2. **Indent nested tags** — makes structure visible
3. **Block inside block is OK** — \`<div>\` inside \`<div>\` is fine
4. **Inline inside block is OK** — \`<span>\` inside \`<p>\` is fine
5. **Block inside inline is NOT OK** — don't put \`<div>\` inside \`<span>\`

### Complete Mini-Page Example

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Hero Profile</title>
  </head>
  <body>
    <h1>Luna the Wizard</h1>
    <img src="luna.png" alt="Luna casting a spell" />
    <p>Luna is a <strong>level 5 wizard</strong> who specializes in fire magic.</p>

    <h2>Abilities</h2>
    <ul>
      <li>Fireball</li>
      <li>Ice Shield</li>
      <li>Teleport</li>
    </ul>

    <h2>Links</h2>
    <p>Visit the <a href="https://guild.example.com">Adventurer's Guild</a> for quests.</p>
  </body>
</html>
\`\`\`

This page has headings, an image, bold text, a list, and a link — all properly nested and indented. Every tag that opens also closes. The skeleton is complete!`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Skeleton Assembly",
      description:
        "Practice the fundamentals of HTML — tags, attributes, and structure.",
      steps: [
        {
          instruction:
            "Complete the heading tag so this becomes a top-level heading.",
          type: "fill-blank",
          data: {
            template: "<___>Welcome to my page</h1>",
            blanks: [{ id: "tag", placeholder: "tag name" }],
          },
          solution: {
            tag: "h1",
          },
          hint: "The closing tag is </h1>, so the opening tag should match — without the slash.",
        },
        {
          instruction:
            "Add the correct attribute to make this link point to a URL.",
          type: "fill-blank",
          data: {
            template:
              '<a ___="https://example.com">Click here</a>',
            blanks: [{ id: "attr", placeholder: "attribute" }],
          },
          solution: {
            attr: "href",
          },
          hint: "Links use an attribute that stands for 'hypertext reference.'",
        },
        {
          instruction: "Which of these tags is self-closing (no closing tag needed)?",
          type: "multiple-choice",
          data: {
            options: [
              "<p>",
              "<img />",
              "<h1>",
              "<div>",
            ],
          },
          solution: 1,
          hint: "Self-closing tags don't wrap any content — they stand alone. Which tag displays something without needing text inside it?",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What does HTML stand for?",
          type: "multiple-choice",
          options: [
            "Hyper Transfer Markup Language",
            "HyperText Markup Language",
            "High Tech Modern Language",
            "HyperText Making Links",
          ],
          correctAnswer: 1,
          explanation:
            "HTML stands for HyperText Markup Language. It's a markup language that describes the structure of web pages, not a programming language.",
        },
        {
          question:
            "What is the difference between an opening tag and a closing tag?",
          type: "multiple-choice",
          options: [
            "Opening tags use < > and closing tags use ( )",
            "Closing tags have a forward slash: </tag>",
            "There is no difference",
            "Closing tags use uppercase letters",
          ],
          correctAnswer: 1,
          explanation:
            "A closing tag looks just like an opening tag but with a forward slash before the tag name: <p> opens, </p> closes.",
        },
        {
          question:
            "Which section of an HTML page holds the content visible to the user?",
          type: "multiple-choice",
          options: [
            "<head>",
            "<title>",
            "<body>",
            "<html>",
          ],
          correctAnswer: 2,
          explanation:
            "The <body> element contains everything that's visible on the page. The <head> holds invisible metadata like the title and stylesheets.",
        },
        {
          question: "What does the `alt` attribute on an `<img>` tag do?",
          type: "multiple-choice",
          options: [
            "Sets the image size",
            "Provides a text description of the image",
            "Changes the image color",
            "Links the image to another page",
          ],
          correctAnswer: 1,
          explanation:
            "The alt attribute provides alternative text that describes the image. It's shown when the image can't load and is read aloud by screen readers for accessibility.",
        },
        {
          question: "Which of these shows correct nesting?",
          type: "multiple-choice",
          options: [
            "<div><p>Hello</div></p>",
            "<div><p>Hello</p></div>",
            "<div><p>Hello</p><div>",
            "</div><p>Hello</p><div>",
          ],
          correctAnswer: 1,
          explanation:
            "Tags must close in reverse order. <div> opens first, then <p>, so <p> must close first (</p>), then <div> closes (</div>). Last opened = first closed.",
        },
      ],
    },
  ],
};

export default lesson;
