import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "responsive-design",
  title: "Responsive Design: The Shapeshifter's Cloak",
  description:
    "Make your pages look great on any screen — from phones to tablets to giant monitors. Your layout adapts like a shapeshifter!",
  order: 21,
  realm: 3,
  estimatedMinutes: 12,
  xpReward: 170,
  icon: "📱",
  boss: {
    name: "The Shapeshifter",
    description:
      "A creature that constantly changes size — your layout must adapt or break",
    sprite: "shapeshifter",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Screen Resize Slam!",
      "Overflow Scroll Attack!",
      "Tiny Viewport Crush!",
    ],
    defeatText:
      "The Shapeshifter shifts through every screen size but your layout holds perfect — responsive mastery!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Problem: One Size Does NOT Fit All",
          content:
            "You've built a beautiful page on your laptop. It looks amazing. Then you open it on your phone and — disaster. Text overflows. Images spill off the edge. Buttons are microscopic.\n\nThis isn't a rare problem. **Over 60% of all web traffic comes from mobile devices.** Phones, tablets, smart watches, TVs — people browse the web on screens from 3 inches to 65 inches wide. Your page MUST adapt to all of them.\n\n**Responsive design** is the art of building pages that reshape themselves to fit any screen. Think of it as a shapeshifter's cloak — one garment that morphs to fit any body. By the end of this lesson, your layouts will be unstoppable on every device.",
          visual: `
  ┌─── THE PROBLEM ──────────────────┐
  │                                  │
  │  LAPTOP (1440px)                 │
  │  ┌──────────────────────────┐    │
  │  │  NAV  │  CONTENT  │ SIDE │    │
  │  │       │           │      │    │
  │  └──────────────────────────┘    │
  │       ✅ Looks great!            │
  │                                  │
  │  PHONE (375px)                   │
  │  ┌──────┐                        │
  │  │NAV│CO│NTENT OVERFLOWS →→→→    │
  │  │   │  │                        │
  │  └──────┘                        │
  │       ❌ Total disaster!         │
  └──────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "The Viewport Meta Tag: Your First Shield",
          content:
            "Before any CSS tricks, you need one critical line in your HTML `<head>`. Without it, phones pretend to be desktop screens and show your page zoomed way out — tiny and unreadable.\n\n```html\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n```\n\nThis tag tells the browser: \"My page width should match the device's actual screen width. Don't zoom out.\" It's like telling the Shapeshifter: \"Show me your TRUE size — no illusions.\"\n\n**Every responsive page starts here.** Without this tag, all the media queries and flexible units in the world won't save you. It's the enchantment that activates the cloak.",
          visual: `
  ┌─── VIEWPORT META TAG ────────────┐
  │                                  │
  │  <head>                          │
  │    <meta name="viewport"         │
  │      content="width=device-width,│
  │      initial-scale=1">           │
  │  </head>                         │
  │                                  │
  │  WITHOUT IT:          WITH IT:   │
  │  ┌──────────┐        ┌──────┐   │
  │  │ tiny tiny │        │ NICE │   │
  │  │ zoomed   │        │ AND  │   │
  │  │ out page │        │ BIG! │   │
  │  └──────────┘        └──────┘   │
  │  (faking 1440px)   (real 375px) │
  └──────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Media Queries: The Cloak's Transformation Spells",
          content:
            "**Media queries** let you write CSS rules that only activate at certain screen sizes. They're the core spell of responsive design — the part that makes the cloak actually shapeshift.\n\n```css\n/* These styles only apply on screens 768px wide or less */\n@media (max-width: 768px) {\n  .sidebar { display: none; }\n  .content { width: 100%; }\n}\n```\n\nThe browser constantly checks: \"Is the screen this wide?\" If yes, those styles activate. If the screen changes size (rotating a tablet, resizing a window), the browser re-checks instantly.\n\nThink of each `@media` block as a different form of the cloak — one for phone, one for tablet, one for desktop. The cloak senses the environment and transforms.",
          visual: `
  ┌─── MEDIA QUERIES ────────────────┐
  │                                  │
  │  @media (max-width: 768px) {     │
  │    /* Phone/tablet styles */      │
  │  }                               │
  │                                  │
  │  DESKTOP (>768px)  MOBILE (≤768) │
  │  ┌────────────┐    ┌──────┐      │
  │  │ NAV │ SIDE │    │ NAV  │      │
  │  │     │      │    ├──────┤      │
  │  │ CONTENT   │    │CONTENT│      │
  │  └────────────┘    │      │      │
  │  sidebar visible   └──────┘      │
  │                    sidebar hidden │
  └──────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Mobile-First: The Professional Approach",
          content:
            "There are two ways to write responsive CSS. **Desktop-first** means you design for big screens and then *undo* things for small screens using `max-width`. **Mobile-first** means you design for small screens and then *add* things for big screens using `min-width`.\n\n```css\n/* Mobile-first: base styles are for phones */\n.grid { display: block; }\n\n/* Then ADD complexity for bigger screens */\n@media (min-width: 768px) {\n  .grid { display: grid; grid-template-columns: 1fr 1fr; }\n}\n```\n\nMobile-first is the professional standard. Why? Mobile layouts are simpler — single column, stacked content. It's easier to **add** layout than **remove** it. Start simple, layer on complexity. The Shapeshifter's cloak begins as a simple tunic and gains features as it grows.",
          visual: `
  ┌─── MOBILE-FIRST ─────────────────┐
  │                                  │
  │  ❌ DESKTOP-FIRST (max-width):   │
  │  Start complex → remove stuff    │
  │                                  │
  │  ✅ MOBILE-FIRST (min-width):    │
  │  Start simple  → add stuff       │
  │                                  │
  │  BASE (mobile):    @media ≥768:  │
  │  ┌──────┐          ┌──────────┐  │
  │  │ ITEM │          │ITEM│ITEM │  │
  │  ├──────┤    →     ├────┼─────┤  │
  │  │ ITEM │          │ITEM│ITEM │  │
  │  ├──────┤          └──────────┘  │
  │  │ ITEM │          2-column grid  │
  │  └──────┘                        │
  │  stacked                         │
  └──────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Responsive Units: Ditch the Pixels",
          content:
            "Hard-coded pixel widths are the enemy of responsive design. If you set `width: 800px`, that box will be 800px on a 375px phone — overflowing everywhere. Instead, use **responsive units**.\n\n| Unit | Relative to | Example |\n|---|---|---|\n| `%` | Parent element | `width: 50%` = half of parent |\n| `vw` | Viewport width | `width: 100vw` = full screen width |\n| `vh` | Viewport height | `height: 100vh` = full screen height |\n| `rem` | Root font size (16px default) | `font-size: 1.5rem` = 24px |\n| `em` | Parent font size | `padding: 2em` = 2× parent font |\n\nThe golden rule: use `max-width` instead of `width`. `max-width: 800px` says \"be 800px wide, but shrink if the screen is smaller.\" The container bends instead of breaking.",
          visual: `
  ┌─── RESPONSIVE UNITS ─────────────┐
  │                                  │
  │  ❌ width: 800px;               │
  │  → ALWAYS 800px. Overflows!      │
  │                                  │
  │  ✅ max-width: 800px;           │
  │  → Up to 800px. Shrinks down!   │
  │                                  │
  │  ┌──────────────────────────┐    │
  │  │    max-width: 800px      │    │
  │  │   ← shrinks on mobile → │    │
  │  └──────────────────────────┘    │
  │                                  │
  │  50%   = half of parent          │
  │  100vw = full viewport width     │
  │  1rem  = 16px (scales!)          │
  └──────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Responsive Images: No More Broken Layouts",
          content:
            "Images are one of the biggest layout-breakers on mobile. A 2000px-wide hero image will blow right past a 375px phone screen. The fix is simple — two CSS lines every web developer memorizes:\n\n```css\nimg {\n  max-width: 100%;\n  height: auto;\n}\n```\n\nThis tells every image: \"Never be wider than your container, and keep your proportions.\" The image scales down on small screens and stays full-size on big ones.\n\nFor extra power, always set `width` and `height` attributes in your HTML — even with responsive CSS. This prevents **layout shift** (that annoying jump when images load). The browser reserves the right amount of space before the image downloads.\n\n```html\n<img src=\"hero.jpg\" width=\"800\" height=\"400\" alt=\"Hero banner\">\n```\n\nThe cloak wraps images perfectly — no overflow, no distortion, no layout jank.",
          visual: `
  ┌─── RESPONSIVE IMAGES ────────────┐
  │                                  │
  │  img {                           │
  │    max-width: 100%;              │
  │    height: auto;                 │
  │  }                               │
  │                                  │
  │  DESKTOP:          MOBILE:       │
  │  ┌────────────┐    ┌──────┐      │
  │  │            │    │      │      │
  │  │   IMAGE    │    │ IMG  │      │
  │  │  800×400   │    │ auto │      │
  │  │            │    │      │      │
  │  └────────────┘    └──────┘      │
  │  full size         scaled down   │
  │                                  │
  │  + Always set width/height in    │
  │    HTML to prevent layout shift! │
  └──────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Responsive Design Cheat Sheet

### The Viewport Meta Tag

Always include this in your HTML \`<head>\`:

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1">
\`\`\`

Without it, mobile browsers fake a wide viewport and zoom out. With it, the browser uses the real device width.

### Media Query Syntax

\`\`\`css
/* Mobile-first: base styles are for small screens */
.container { padding: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
}
\`\`\`

### Common Breakpoints

| Name | min-width | Typical Devices |
|---|---|---|
| **Small mobile** | 0px (base) | Phones in portrait |
| **Large mobile** | 480px | Phones in landscape |
| **Tablet** | 768px | iPads, tablets |
| **Desktop** | 1024px | Laptops, desktops |
| **Wide** | 1280px | Large monitors |

These are guidelines, not rules. Pick breakpoints where YOUR layout breaks — not based on specific devices.

### Responsive Units Comparison

| Unit | Relative To | Best For |
|---|---|---|
| \`%\` | Parent element | Widths, padding |
| \`vw\` | Viewport width | Full-width sections |
| \`vh\` | Viewport height | Full-screen heroes |
| \`rem\` | Root font size (16px) | Font sizes, spacing |
| \`em\` | Parent font size | Component-level scaling |
| \`px\` | Nothing (absolute) | Borders, shadows, tiny details |

**Rule of thumb:** Use \`rem\` for typography, \`%\` or \`fr\` for widths, \`px\` only for fine details like borders.

### The Mobile-First Pattern

\`\`\`css
/* 1. Base = mobile (single column, simple) */
.grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 2. Tablet = side-by-side */
@media (min-width: 768px) {
  .grid {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .grid > * {
    width: 48%;
  }
}

/* 3. Desktop = three columns */
@media (min-width: 1024px) {
  .grid > * {
    width: 31%;
  }
}
\`\`\`

### Responsive Images

\`\`\`css
/* Make ALL images responsive by default */
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

\`\`\`html
<!-- Always set width/height to prevent layout shift -->
<img src="hero.jpg" width="800" height="400" alt="Hero banner">

<!-- <picture> for different sources -->
<picture>
  <source media="(min-width: 768px)" srcset="hero-large.jpg">
  <source media="(min-width: 480px)" srcset="hero-medium.jpg">
  <img src="hero-small.jpg" alt="Hero banner" width="400" height="200">
</picture>
\`\`\`

### Common Mistakes

1. **Forgetting the viewport meta tag** — nothing else works without it.
2. **Using \`width\` instead of \`max-width\`** — causes overflow on small screens.
3. **Desktop-first media queries** — harder to maintain. Start mobile, add up.
4. **Fixed pixel widths on containers** — use \`%\`, \`max-width\`, or \`fr\` units.
5. **Not testing on real devices** — browser DevTools are good, but real phones reveal hidden bugs.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Shapeshifter Training Grounds",
      description:
        "Practice the core responsive design techniques — media queries, responsive units, and mobile-first thinking.",
      steps: [
        {
          instruction:
            "Complete this media query so it applies styles when the screen is 768px wide or less.",
          type: "fill-blank",
          data: {
            template: "@media (max-___: 768px) {\n  .sidebar { display: none; }\n}",
            blanks: [{ id: "prop", placeholder: "property" }],
          },
          solution: {
            prop: "width",
          },
          hint: "Media queries check screen dimensions. Which dimension are we limiting here — width or height?",
        },
        {
          instruction:
            "Make this image responsive so it never overflows its container.",
          type: "fill-blank",
          data: {
            template: "img {\n  max-___: 100%;\n  height: auto;\n}",
            blanks: [{ id: "prop", placeholder: "property" }],
          },
          solution: {
            prop: "width",
          },
          hint: "We want to limit the image's horizontal size to 100% of its parent. Which CSS property controls horizontal size?",
        },
        {
          instruction:
            "What does 'mobile-first' mean in responsive design?",
          type: "multiple-choice",
          data: {
            options: [
              "Only design for mobile phones, ignore desktops",
              "Design for mobile screens first, then add styles for larger screens",
              "Use the smallest font sizes possible",
              "Always hide the sidebar on every screen size",
            ],
          },
          solution: 1,
          hint: "Mobile-first is about the ORDER you write your CSS — start with the simplest layout and build up.",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "Why is responsive design important?",
          type: "multiple-choice",
          options: [
            "It makes your code run faster",
            "Over 60% of web traffic is mobile — pages must work on all screen sizes",
            "It adds animations to your page",
            "It is only needed for tablet devices",
          ],
          correctAnswer: 1,
          explanation:
            "Most web traffic comes from mobile devices. Responsive design ensures your page looks good and works well on screens of every size — phones, tablets, laptops, and desktops.",
        },
        {
          question:
            "What does the viewport meta tag do?",
          type: "multiple-choice",
          options: [
            "It makes your page load faster",
            "It adds a scrollbar to the page",
            "It tells mobile browsers to use the real device width instead of faking a desktop viewport",
            "It prevents users from zooming in",
          ],
          correctAnswer: 2,
          explanation:
            "Without the viewport meta tag, mobile browsers pretend the screen is ~980px wide and zoom out. The tag tells the browser to use the actual device width, which is essential for responsive design to work.",
        },
        {
          question:
            "Which CSS rule applies styles ONLY when the screen is 768px wide or narrower?",
          type: "multiple-choice",
          options: [
            "@media (min-width: 768px) { ... }",
            "@media (max-width: 768px) { ... }",
            "@media (width: 768px) { ... }",
            "@screen (768px) { ... }",
          ],
          correctAnswer: 1,
          explanation:
            "`max-width: 768px` means 'if the screen is at most 768px wide' — so it targets phones and small tablets. `min-width` would target screens 768px and ABOVE.",
        },
        {
          question:
            "In mobile-first responsive design, which type of media query do you primarily use?",
          type: "multiple-choice",
          options: [
            "@media (max-width: ...)",
            "@media (min-width: ...)",
            "@media (exact-width: ...)",
            "@media (device-width: ...)",
          ],
          correctAnswer: 1,
          explanation:
            "Mobile-first means your base CSS is for small screens. You then use `min-width` media queries to ADD styles for larger screens. Start simple, layer on complexity.",
        },
        {
          question:
            "Which CSS declaration makes an image scale down on small screens without distortion?",
          type: "multiple-choice",
          options: [
            "width: 100%; height: 100%;",
            "max-width: 100%; height: auto;",
            "min-width: 100%; height: fixed;",
            "width: auto; height: auto;",
          ],
          correctAnswer: 1,
          explanation:
            "`max-width: 100%` prevents the image from exceeding its container width, and `height: auto` preserves the aspect ratio so the image scales proportionally without distortion.",
        },
      ],
    },
  ],
};

export default lesson;
