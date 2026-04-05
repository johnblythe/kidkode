import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "layout-grid",
  title: "Layout: The Architect's Grid",
  description:
    "Master the art of arranging elements on a page — from simple rows to complex grid layouts.",
  order: 17,
  realm: 3,
  estimatedMinutes: 14,
  xpReward: 140,
  icon: "📐",
  boss: {
    name: "The Chaos Architect",
    description:
      "A mad builder whose layouts are pure chaos — elements scattered randomly with no alignment or order",
    sprite: "chaosArchitect",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Overflow Hidden Attack!",
      "Z-Index Confusion!",
      "Float Collapse Slam!",
    ],
    defeatText:
      "Order emerges from chaos as your Flexbox skills tame every element into perfect alignment!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Layout Problem",
          content:
            "Open any web page and you'll see content arranged in **rows**, **columns**, **sidebars**, and **grids**. A navbar stretches across the top. Cards sit side by side. A footer anchors the bottom. But HTML, by default, just **stacks everything vertically** — one block on top of another, like dropping stones into a well.\n\nSo how do real websites arrange things? They use **layout tools** built into CSS. Before these tools existed, developers used hacks — floats, tables, absolute positioning — and it was a nightmare. Today we have two powerful systems: **Flexbox** and **CSS Grid**.\n\nThink of it like building a castle. Without layout tools, you're just piling bricks. With them, you're an **architect** — placing walls, towers, and rooms exactly where you want them.",
          visual: `
  ┌─── DEFAULT HTML ──────────────────┐
  │                                   │
  │  ┌─────────────────────────────┐  │
  │  │   Header                    │  │
  │  └─────────────────────────────┘  │
  │  ┌─────────────────────────────┐  │
  │  │   Paragraph                 │  │
  │  └─────────────────────────────┘  │
  │  ┌─────────────────────────────┐  │
  │  │   Another Paragraph         │  │
  │  └─────────────────────────────┘  │
  │                                   │
  │   Everything stacks vertically!   │
  │   No columns, no rows, no grid.   │
  └───────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Flexbox: The Magic Rope",
          content:
            "**Flexbox** is CSS's one-dimensional layout system. Add `display: flex` to a container and something magical happens — all its children line up **in a row**, like beads strung on a rope.\n\n```css\n.container {\n  display: flex;\n}\n```\n\nThat single line transforms the container into a **flex parent**. Its direct children become **flex items** that automatically sit side by side. No floats, no hacks — just one declaration and you've gone from vertical stacking to horizontal layout.\n\nThe rope metaphor is key: Flexbox works along **one axis** at a time. By default that axis is horizontal (a row), but you can flip it to vertical (a column). You control how items are spaced, aligned, and sized along that rope.",
          visual: `
  ┌─── display: flex ─────────────────┐
  │                                   │
  │  BEFORE (default):                │
  │  ┌────────┐                       │
  │  │ Item A │                       │
  │  ├────────┤                       │
  │  │ Item B │                       │
  │  ├────────┤                       │
  │  │ Item C │                       │
  │  └────────┘                       │
  │                                   │
  │  AFTER (display: flex):           │
  │  ┌────────┬────────┬────────┐     │
  │  │ Item A │ Item B │ Item C │     │
  │  └────────┴────────┴────────┘     │
  │  ←———— like beads on a rope ———→  │
  └───────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Flex Properties: Controlling the Rope",
          content:
            "Once you've activated Flexbox, four properties give you full control over how items are arranged:\n\n**`justify-content`** — controls spacing along the **main axis** (horizontal by default). Values: `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`.\n\n**`align-items`** — controls alignment along the **cross axis** (vertical by default). Values: `flex-start`, `center`, `flex-end`, `stretch`.\n\n**`flex-direction`** — changes the rope's direction. `row` (default), `column`, `row-reverse`, `column-reverse`.\n\n**`gap`** — adds consistent spacing between items. Much cleaner than margins! `gap: 16px` puts 16 pixels of space between every item.\n\nThink of `justify-content` as sliding items left/right along the rope, and `align-items` as adjusting their height up/down.",
          visual: `
  ┌─── FLEX PROPERTIES ───────────────┐
  │                                   │
  │  justify-content: space-between   │
  │  ┌──────┐         ┌──────┐       │
  │  │  A   │         │  B   │       │
  │  └──────┘         └──────┘       │
  │  ←─ pushed to edges ──→          │
  │                                   │
  │  align-items: center              │
  │       ┌──┐                        │
  │  ┌──┐ │B │ ┌──┐  ← all centered │
  │  │A │ │  │ │C │     vertically   │
  │  └──┘ └──┘ └──┘                  │
  │                                   │
  │  gap: 16px                        │
  │  ┌──┐ 16px ┌──┐ 16px ┌──┐       │
  │  │A │ ···· │B │ ···· │C │       │
  │  └──┘      └──┘      └──┘       │
  └───────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Centering: The Holy Grail",
          content:
            "For years, centering things in CSS was a running joke among developers. Vertical centering especially was notoriously painful. Then Flexbox arrived and turned it into **three lines**:\n\n```css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n```\n\nThat's it. The child elements are now **perfectly centered** both horizontally and vertically. `justify-content: center` handles the horizontal axis. `align-items: center` handles the vertical axis. Together they pull everything to the exact middle.\n\nThis three-line trick is so famous it's become a meme. Developers used to need hacks involving `position: absolute`, `transform`, and `margin: auto` gymnastics. Now? Three lines. If there's one CSS pattern you memorize today, make it this one.",
          visual: `
  ┌─── THE 3-LINE CENTERING TRICK ───┐
  │                                   │
  │  .box {                           │
  │    display: flex;                 │
  │    justify-content: center; ←─┐  │
  │    align-items: center;    ←──┤  │
  │  }                             │  │
  │                                │  │
  │  ┌─────────────────────────┐   │  │
  │  │                         │   │  │
  │  │        ┌───────┐        │   │  │
  │  │        │ CHILD │ ← here!│  │  │
  │  │        └───────┘        │   │  │
  │  │                         │   │  │
  │  └─────────────────────────┘   │  │
  │   Centered both ways! 🎯       │  │
  └───────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "CSS Grid: The Blueprint",
          content:
            "Flexbox is great for **one-dimensional** layouts — a single row or a single column. But what about **two-dimensional** layouts where you need to control rows AND columns at the same time? Enter **CSS Grid**.\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}\n```\n\nThis creates a **3-column grid** where each column takes an equal fraction (`1fr`) of the available space. Items automatically flow into cells — first row fills up, then the next row starts.\n\n**Flex = rope (1D)**: items along one line.\n**Grid = blueprint (2D)**: items placed in rows AND columns simultaneously.\n\nFor now, just know Grid exists and what it's for. Flexbox will handle 80% of your layout needs. Grid is the heavy artillery for when you need a full page blueprint.",
          visual: `
  ┌─── FLEXBOX vs GRID ───────────────┐
  │                                   │
  │  FLEXBOX (1D — row OR column):    │
  │  ┌────┬────┬────┬────┐            │
  │  │ A  │ B  │ C  │ D  │            │
  │  └────┴────┴────┴────┘            │
  │  ←————— one direction ————→       │
  │                                   │
  │  GRID (2D — rows AND columns):    │
  │  ┌────┬────┬────┐                 │
  │  │ A  │ B  │ C  │  ← row 1       │
  │  ├────┼────┼────┤                 │
  │  │ D  │ E  │ F  │  ← row 2       │
  │  ├────┼────┼────┤                 │
  │  │ G  │ H  │ I  │  ← row 3       │
  │  └────┴────┴────┘                 │
  │  grid-template-columns: 1fr 1fr 1fr│
  └───────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Common Layout Patterns",
          content:
            "Now that you know Flexbox and Grid, here are the **four patterns** you'll use constantly. Each one is like a spell in your architect's spellbook.\n\n**Navbar** — `display: flex; justify-content: space-between; align-items: center;` puts a logo on the left and links on the right.\n\n**Card Grid** — `display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;` creates a responsive grid of cards.\n\n**Sidebar Layout** — `display: grid; grid-template-columns: 250px 1fr;` gives you a fixed sidebar and a fluid content area.\n\n**Centered Content** — the holy grail trick: `display: flex; justify-content: center; align-items: center;` with a set height on the container.\n\nEvery website you visit uses combinations of these patterns. Once you recognize them, you'll start seeing Flexbox and Grid everywhere — like an architect who can read blueprints in finished buildings.",
          visual: `
  ┌─── LAYOUT SPELLBOOK ─────────────┐
  │                                   │
  │  NAVBAR (flex):                   │
  │  ┌──────┐           ┌──┬──┬──┐   │
  │  │ Logo │           │A │B │C │   │
  │  └──────┘           └──┴──┴──┘   │
  │                                   │
  │  CARD GRID (grid):                │
  │  ┌─────┬─────┬─────┐             │
  │  │Card │Card │Card │             │
  │  ├─────┼─────┼─────┤             │
  │  │Card │Card │Card │             │
  │  └─────┴─────┴─────┘             │
  │                                   │
  │  SIDEBAR (grid):                  │
  │  ┌──────┬──────────────────┐      │
  │  │ Side │                  │      │
  │  │ bar  │     Content      │      │
  │  │      │                  │      │
  │  └──────┴──────────────────┘      │
  └───────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Layout Cheat Sheet

### Flexbox Properties

| Property | What It Does | Common Values |
|---|---|---|
| \`display: flex\` | Activates Flexbox on a container | — |
| \`flex-direction\` | Sets the main axis direction | \`row\`, \`column\`, \`row-reverse\`, \`column-reverse\` |
| \`justify-content\` | Spaces items along the **main axis** | \`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`, \`space-around\`, \`space-evenly\` |
| \`align-items\` | Aligns items along the **cross axis** | \`flex-start\`, \`center\`, \`flex-end\`, \`stretch\` |
| \`flex-wrap\` | Allows items to wrap to the next line | \`nowrap\` (default), \`wrap\` |
| \`gap\` | Adds spacing between flex items | Any length: \`8px\`, \`1rem\`, etc. |

### Flex Item Properties

\`\`\`css
.item {
  flex-grow: 1;    /* item can grow to fill space */
  flex-shrink: 0;  /* item won't shrink below its size */
  flex-basis: 200px; /* starting size before grow/shrink */

  /* shorthand: */
  flex: 1;         /* same as flex-grow: 1 */
}
\`\`\`

### Grid Basics

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* 3 equal columns */
  grid-template-columns: 250px 1fr;     /* sidebar + fluid */
  grid-template-columns: repeat(3, 1fr); /* shorthand for 3 equal */
  gap: 16px;                             /* spacing between cells */
}
\`\`\`

- \`fr\` = **fractional unit** — divides available space proportionally
- \`1fr 2fr\` = two columns, second is twice as wide
- Items flow into cells automatically, left to right, top to bottom

### The Centering Pattern

\`\`\`css
.center-everything {
  display: flex;
  justify-content: center;  /* horizontal center */
  align-items: center;      /* vertical center */
  height: 100vh;            /* needs a height to center vertically */
}
\`\`\`

Remember: vertical centering only works if the container has an explicit height. Without a height, there's no vertical space to center within.

### Flexbox vs Grid — When to Use Which

| Use **Flexbox** when… | Use **Grid** when… |
|---|---|
| Layout is one-dimensional (row OR column) | Layout is two-dimensional (rows AND columns) |
| Content size should determine layout | You want precise control over the grid structure |
| You're building a navbar, toolbar, or button group | You're building a card grid, page layout, or dashboard |
| Items need to wrap naturally | Items need to snap to a defined grid |

**Rule of thumb**: Start with Flexbox. If you find yourself nesting multiple flex containers to create rows and columns, switch to Grid.

### Common Layout Recipes

**Navbar:**
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}
\`\`\`

**Card Grid:**
\`\`\`css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
\`\`\`

**Sidebar Layout:**
\`\`\`css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}
\`\`\`

### Common Mistakes

1. **Forgetting \`display: flex\`** — Properties like \`justify-content\` do nothing without it.
2. **No height for vertical centering** — \`align-items: center\` needs the container to have a defined height.
3. **Confusing main axis and cross axis** — In \`flex-direction: row\`, main = horizontal. In \`column\`, main = vertical. \`justify-content\` always follows the main axis.
4. **Using Flexbox for everything** — Flexbox is great, but a 2D card grid is Grid's job.
5. **Adding \`display: flex\` to the items instead of the container** — Flex goes on the **parent**, not the children.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Architect's Workshop",
      description:
        "Practice the core layout properties that every front-end developer uses daily.",
      steps: [
        {
          instruction:
            "Turn a container into a flex layout. Fill in the missing value.",
          type: "fill-blank",
          data: {
            template:
              ".container {\n  display: ___;\n}",
            blanks: [{ id: "display", placeholder: "value" }],
          },
          solution: {
            display: "flex",
          },
          hint: "Which display value activates Flexbox on a container?",
        },
        {
          instruction:
            "Center items along the main axis. Fill in the missing property name.",
          type: "fill-blank",
          data: {
            template:
              ".container {\n  display: flex;\n  justify-___: center;\n}",
            blanks: [{ id: "prop", placeholder: "property" }],
          },
          solution: {
            prop: "content",
          },
          hint: "This property controls how items are spaced along the main axis. justify-??? : center.",
        },
        {
          instruction:
            "When should you use CSS Grid instead of Flexbox?",
          type: "multiple-choice",
          data: {
            options: [
              "When you only need items in a single row",
              "When you need to control rows AND columns simultaneously",
              "When you want to center a single element",
              "When you need to hide overflow",
            ],
          },
          solution: 1,
          hint: "Think about how many dimensions each layout system controls — Flexbox handles one, Grid handles…",
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
            "What does `display: flex` do to a container's children?",
          type: "multiple-choice",
          options: [
            "Hides them",
            "Stacks them vertically with extra spacing",
            "Lines them up in a row (by default)",
            "Makes them all the same size",
          ],
          correctAnswer: 2,
          explanation:
            "display: flex turns the container into a flex parent. By default, flex-direction is 'row', so children line up horizontally side by side.",
        },
        {
          question:
            "Which property controls spacing along the main axis in Flexbox?",
          type: "multiple-choice",
          options: [
            "align-items",
            "flex-direction",
            "justify-content",
            "gap",
          ],
          correctAnswer: 2,
          explanation:
            "justify-content distributes space along the main axis (horizontal in a row, vertical in a column). align-items handles the cross axis. gap adds fixed spacing between items but doesn't distribute space.",
        },
        {
          question:
            "Which property vertically centers items inside a flex container (assuming default flex-direction: row)?",
          type: "multiple-choice",
          options: [
            "justify-content: center",
            "align-items: center",
            "flex-direction: center",
            "vertical-align: center",
          ],
          correctAnswer: 1,
          explanation:
            "In a row layout, the cross axis is vertical. align-items controls the cross axis, so align-items: center vertically centers items. justify-content: center would center them horizontally.",
        },
        {
          question:
            "What is the key difference between Flexbox and CSS Grid?",
          type: "multiple-choice",
          options: [
            "Flexbox is newer than Grid",
            "Grid only works with images",
            "Flexbox is one-dimensional (row or column), Grid is two-dimensional (rows and columns)",
            "Grid cannot use the gap property",
          ],
          correctAnswer: 2,
          explanation:
            "Flexbox lays out items along a single axis — either a row or a column. CSS Grid controls both rows and columns at the same time, making it ideal for two-dimensional layouts like card grids and page blueprints.",
        },
        {
          question:
            "What three CSS lines center an element both horizontally and vertically?",
          type: "multiple-choice",
          options: [
            "display: block; margin: auto; text-align: center;",
            "display: flex; justify-content: center; align-items: center;",
            "display: grid; float: center; align: middle;",
            "position: absolute; top: 50%; left: 50%;",
          ],
          correctAnswer: 1,
          explanation:
            "The famous 3-line centering trick: display: flex activates Flexbox, justify-content: center centers horizontally, and align-items: center centers vertically. The container needs an explicit height for vertical centering to work.",
        },
      ],
    },
  ],
};

export default lesson;
