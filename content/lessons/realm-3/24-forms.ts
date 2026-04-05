import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "forms-input",
  title: "Forms & Input: The Questionnaire Golem",
  description:
    "Build forms that collect user input — text fields, buttons, checkboxes, and more. Make your pages interactive!",
  order: 20,
  realm: 3,
  estimatedMinutes: 12,
  xpReward: 160,
  icon: "📝",
  boss: {
    name: "The Questionnaire Golem",
    description:
      "A form-obsessed creature that bombards you with invalid inputs and missing labels",
    sprite: "questionnaireGolem",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Missing Label Strike!",
      "Invalid Input Blast!",
      "Submit Without Validation!",
    ],
    defeatText:
      "The Golem's form validates perfectly — every field filled, every label linked!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "What Are Forms?",
          content:
            "Every login page, every search bar, every signup screen, every comment box — they all have one thing in common: an HTML **form**. Forms are how web pages **collect input** from the person using them.\n\nThink of a form like a **questionnaire in an RPG**. The innkeeper asks your name, your class, how many potions you want. You fill in the blanks and hit \"Submit.\" The innkeeper reads your answers and acts on them.\n\nWithout forms, websites would be read-only scrolls — pretty to look at, but you could never interact. Forms turn a static page into a **two-way conversation** between the user and the code.",
          visual: `
  ┌─── THE INNKEEPER'S FORM ────────┐
  │                                  │
  │  ┌────────────────────────────┐  │
  │  │ Name: [______________]    │  │
  │  │ Class: [Wizard     ▼]    │  │
  │  │ Potions: [3 ]             │  │
  │  │                            │  │
  │  │ [ Submit Quest Log ]       │  │
  │  └────────────────────────────┘  │
  │                                  │
  │  Login, search, signup, comment  │
  │  — ALL forms under the hood.     │
  └──────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "The <form> Element & Input Types",
          content:
            "Every form starts with the `<form>` tag — it wraps all your fields like a container. Inside, you place `<input>` elements, each with a **type** that controls what kind of data it collects.\n\n```html\n<form>\n  <input type=\"text\">        <!-- plain text -->\n  <input type=\"password\">    <!-- hidden dots -->\n  <input type=\"email\">       <!-- validates email format -->\n  <input type=\"number\">      <!-- only numbers -->\n  <textarea></textarea>       <!-- multi-line text -->\n  <select>                    <!-- dropdown -->\n    <option>Warrior</option>\n    <option>Wizard</option>\n  </select>\n</form>\n```\n\nEach input type gives the browser **built-in hints** — number fields show a spinner, email fields check for an `@` sign, password fields hide what you type. The browser does work for free when you pick the right type.",
          visual: `
  ┌─── INPUT TYPES ─────────────────┐
  │                                  │
  │  text     [Hello world____]      │
  │  password [••••••________]       │
  │  email    [hero@quest.com]       │
  │  number   [42  ↑↓]              │
  │  textarea ┌──────────────┐       │
  │           │ Multi-line   │       │
  │           │ text here... │       │
  │           └──────────────┘       │
  │  select   [Wizard       ▼]      │
  │                                  │
  │  Pick the right type → free      │
  │  validation from the browser!    │
  └──────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Labels: Accessibility Matters",
          content:
            "Every input should have a **label** — a visible name that tells the user what the field is for. But labels aren't just text sitting next to a box. The `<label>` element has a superpower: the **`for` attribute**.\n\n```html\n<label for=\"username\">Username:</label>\n<input id=\"username\" type=\"text\">\n```\n\nWhen `for` matches the input's `id`, clicking the label **focuses the input**. Screen readers announce the label when a user tabs to the field. Without labels, blind users have no idea what a field is asking for.\n\nLabels are like **name tags on treasure chests** — without them, you're just guessing what's inside. Always label your inputs. It's a small effort that makes your forms usable for *everyone*.",
          visual: `
  ┌─── LABELS + FOR ────────────────┐
  │                                  │
  │  <label for="username">          │
  │    Username:                     │
  │  </label>                        │
  │  <input id="username">           │
  │         ↑               ↑        │
  │         └── for ═══════ id ──┐   │
  │                              │   │
  │  CLICK label → focuses input │   │
  │  Screen reader → reads label │   │
  │                                  │
  │  No label = blind guessing!      │
  └──────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Buttons & Submit",
          content:
            "A form without a submit button is like a questionnaire with no \"Done\" button — you fill everything out but nothing happens. There are two main button types.\n\n```html\n<button type=\"submit\">Send Quest</button>\n<button type=\"button\">Just a Button</button>\n```\n\n**`type=\"submit\"`** sends the form. When clicked, the browser fires a **submit event** and (by default) reloads the page. This is the traditional behavior — the form data gets sent to a server.\n\n**`type=\"button\"`** does nothing on its own. It's a general-purpose button you wire up with JavaScript. Great for \"Cancel\" or \"Reset\" actions that shouldn't submit the form.\n\nYou might also see `<input type=\"submit\" value=\"Send\">` — it works the same as a submit button, just older syntax. The `<button>` tag is more flexible because you can put icons and styled text inside it.",
          visual: `
  ┌─── BUTTON TYPES ────────────────┐
  │                                  │
  │  type="submit"                   │
  │  ┌──────────────────────┐        │
  │  │   Send Quest Log     │ → FORM │
  │  └──────────────────────┘   SENT │
  │                                  │
  │  type="button"                   │
  │  ┌──────────────────────┐        │
  │  │   Cancel             │ → does │
  │  └──────────────────────┘ nothing│
  │                           by itself│
  │                                  │
  │  submit = fires form event       │
  │  button = manual JS only         │
  └──────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "JavaScript + Forms",
          content:
            "Here's where the real magic happens. You can **intercept** a form's submit event with JavaScript, stop the page from reloading, and handle the data yourself.\n\n```js\nconst form = document.querySelector(\"form\");\nform.addEventListener(\"submit\", (e) => {\n  e.preventDefault(); // STOP the page refresh!\n  const name = form.querySelector(\"#name\").value;\n  console.log(\"Hero name:\", name);\n});\n```\n\n**`e.preventDefault()`** is the key spell. Without it, the browser reloads the page and your JavaScript loses everything. With it, you stay on the page and can read every field's **`.value`** property.\n\nEvery input element has a `.value` — that's the text the user typed (or selected). Read it, use it, display it, send it to an API. The form collects, JavaScript processes.",
          visual: `
  ┌─── preventDefault FLOW ─────────┐
  │                                  │
  │  User clicks [Submit]            │
  │        │                         │
  │        ▼                         │
  │  "submit" event fires            │
  │        │                         │
  │   ┌────┴────┐                    │
  │   │ Without │  │ With            │
  │   │ prevent │  │ preventDefault  │
  │   ▼         │  ▼                 │
  │  PAGE       │  JS reads .value   │
  │  RELOADS    │  of each input     │
  │  (data lost)│  (data kept!)      │
  │             │                    │
  └──────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Basic Validation",
          content:
            "Never trust user input blindly — the Questionnaire Golem will send empty fields, nonsense emails, and numbers where names should be. **Validation** is your defense.\n\nHTML gives you free validation with attributes:\n```html\n<input type=\"email\" required>\n<input type=\"number\" min=\"1\" max=\"99\">\n<input type=\"text\" minlength=\"3\" maxlength=\"20\">\n```\n\nThe `required` attribute blocks submit if the field is empty. `type=\"email\"` checks for an `@` sign. `min`, `max`, `minlength`, `maxlength` set boundaries.\n\nFor custom rules, validate in JavaScript:\n```js\nif (name.value.trim() === \"\") {\n  alert(\"Name cannot be empty!\");\n  return;\n}\n```\n\nTwo layers of defense: HTML validation catches the obvious, JS validation handles the rest. Together they keep your forms bulletproof.",
          visual: `
  ┌─── VALIDATION LAYERS ───────────┐
  │                                  │
  │  LAYER 1: HTML attributes        │
  │  ┌────────────────────────────┐  │
  │  │ required    — not empty    │  │
  │  │ type=email  — has @        │  │
  │  │ min/max     — number range │  │
  │  │ minlength   — text length  │  │
  │  └────────────────────────────┘  │
  │                                  │
  │  LAYER 2: JavaScript checks      │
  │  ┌────────────────────────────┐  │
  │  │ if (val === "") { ... }    │  │
  │  │ Custom rules, regex, etc.  │  │
  │  └────────────────────────────┘  │
  │                                  │
  │  Both layers = bulletproof!      │
  └──────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Forms Cheat Sheet

### The Form Element

\`\`\`html
<form id="quest-form">
  <!-- inputs go here -->
  <button type="submit">Submit</button>
</form>
\`\`\`

The \`<form>\` tag wraps all your fields. It fires a **submit** event when the user clicks a submit button or presses Enter inside a text field.

### Input Types

| Type | Element | What It Collects |
|---|---|---|
| Plain text | \`<input type="text">\` | Any text |
| Password | \`<input type="password">\` | Hidden text (dots) |
| Email | \`<input type="email">\` | Email with @ validation |
| Number | \`<input type="number">\` | Numbers only (spinner) |
| Checkbox | \`<input type="checkbox">\` | On/off toggle |
| Radio | \`<input type="radio">\` | Pick one from a group |
| Multi-line | \`<textarea></textarea>\` | Paragraphs of text |
| Dropdown | \`<select><option>...</select>\` | Pick from a list |

### The Label + For Pattern

\`\`\`html
<label for="hero-name">Hero Name:</label>
<input id="hero-name" type="text">
\`\`\`

- The \`for\` attribute on \`<label>\` must match the \`id\` on the \`<input>\`
- Clicking the label focuses the input
- Screen readers announce the label — **essential for accessibility**
- Every visible input should have a label. No exceptions.

### Buttons

\`\`\`html
<!-- Submits the form -->
<button type="submit">Send</button>

<!-- Does nothing by default — wire with JS -->
<button type="button">Cancel</button>

<!-- Old-school submit (less flexible) -->
<input type="submit" value="Send">
\`\`\`

### Handling Submit with JavaScript

\`\`\`js
const form = document.querySelector("#quest-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page refresh!

  // Read values
  const name = document.querySelector("#hero-name").value;
  const level = document.querySelector("#hero-level").value;

  console.log(name, level);
});
\`\`\`

Key steps:
1. Select the form with \`querySelector\`
2. Listen for the \`"submit"\` event
3. Call \`e.preventDefault()\` to stop the page reload
4. Read each input's \`.value\` property

### The .value Property

Every form input has a \`.value\` that holds what the user typed or selected:

\`\`\`js
// Text, email, password, number, textarea
inputElement.value   // → "whatever the user typed"

// Checkbox
checkboxElement.checked  // → true or false

// Select dropdown
selectElement.value  // → the selected option's value
\`\`\`

### HTML Validation Attributes

| Attribute | What It Does | Example |
|---|---|---|
| \`required\` | Field cannot be empty | \`<input required>\` |
| \`type="email"\` | Must contain @ | \`<input type="email">\` |
| \`min\` / \`max\` | Number range | \`<input type="number" min="1" max="99">\` |
| \`minlength\` / \`maxlength\` | Text length limits | \`<input minlength="3" maxlength="20">\` |
| \`pattern\` | Regex pattern match | \`<input pattern="[A-Za-z]+">\` |

### JavaScript Validation

\`\`\`js
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#hero-name").value.trim();

  if (name === "") {
    alert("Name is required!");
    return; // Stop processing
  }

  if (name.length < 3) {
    alert("Name must be at least 3 characters!");
    return;
  }

  // All checks passed — safe to use the data
  console.log("Welcome,", name);
});
\`\`\`

### Common Mistakes

1. **Forgetting \`e.preventDefault()\`** — the page reloads and your JS data vanishes. Always call it first in your submit handler.
2. **Missing labels** — inputs without labels are inaccessible. Screen readers can't describe them. Use \`<label for="...">\` always.
3. **Mismatched \`for\` and \`id\`** — if \`for="name"\` but the input has \`id="username"\`, the link is broken. They must match exactly.
4. **Reading \`.value\` before submit** — the value is whatever the user has typed *at that moment*. Read it inside the event handler, not at page load.
5. **Trusting user input** — always validate. Users can type anything, and not all of it will be what you expect.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Form Builder Training",
      description:
        "Practice linking labels, preventing default, and reading form values — the core skills of form handling.",
      steps: [
        {
          instruction:
            "Link this label to the input. Fill in the attribute that connects a label to an input's id.",
          type: "fill-blank",
          data: {
            template:
              '<label ___="username">Username:</label>\n<input id="username" type="text">',
            blanks: [{ id: "attr", placeholder: "attribute" }],
          },
          solution: {
            attr: "for",
          },
          hint: "Labels use a special attribute that points to the input's id. It's a three-letter word.",
        },
        {
          instruction:
            "Stop the page from refreshing when the form is submitted. Fill in the method name.",
          type: "fill-blank",
          data: {
            template:
              'form.addEventListener("submit", (e) => {\n  e.___();\n  // now read the form values safely\n});',
            blanks: [{ id: "method", placeholder: "method" }],
          },
          solution: {
            method: "preventDefault",
          },
          hint: "You want to prevent the browser's default behavior of reloading the page. The method name says exactly that.",
        },
        {
          instruction:
            "How do you read the text a user typed into an input element?",
          type: "multiple-choice",
          data: {
            options: [
              "input.text",
              "input.content",
              "input.value",
              "input.data",
            ],
          },
          solution: 2,
          hint: "Every form input stores what the user typed in a property. Think about what the user's input is worth — its ___.",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What is the purpose of the <form> element in HTML?",
          type: "multiple-choice",
          options: [
            "It styles text in bold",
            "It groups inputs and handles submission of user data",
            "It creates a new page",
            "It adds images to the page",
          ],
          correctAnswer: 1,
          explanation:
            "The <form> element wraps input fields together and fires a submit event when the user submits — it's the container for collecting user data.",
        },
        {
          question:
            "Which input type would you use for a field where the user enters their email address?",
          type: "multiple-choice",
          options: [
            '<input type="text">',
            '<input type="password">',
            '<input type="email">',
            '<input type="number">',
          ],
          correctAnswer: 2,
          explanation:
            'type="email" tells the browser to validate that the input contains a proper email format (with an @ sign). It also shows the right keyboard on mobile devices.',
        },
        {
          question:
            'What does the `for` attribute on a <label> do?',
          type: "multiple-choice",
          options: [
            "It creates a for-loop",
            "It links the label to an input by matching the input's id",
            "It sets the font of the label",
            "It makes the label required",
          ],
          correctAnswer: 1,
          explanation:
            "The for attribute must match an input's id. This creates a link — clicking the label focuses the input, and screen readers announce the label when the input is focused.",
        },
        {
          question: "Why do you call `e.preventDefault()` in a form's submit handler?",
          type: "multiple-choice",
          options: [
            "To make the form look nicer",
            "To stop the browser from reloading the page",
            "To clear all the input fields",
            "To add validation to the form",
          ],
          correctAnswer: 1,
          explanation:
            "By default, submitting a form reloads the page (sending data to a server). e.preventDefault() stops that reload so your JavaScript can handle the form data without losing the page state.",
        },
        {
          question:
            "How do you read the text a user typed into `<input id=\"hero\" type=\"text\">`?",
          type: "multiple-choice",
          options: [
            'document.querySelector("#hero").innerHTML',
            'document.querySelector("#hero").value',
            'document.querySelector("#hero").text',
            'document.querySelector("#hero").content',
          ],
          correctAnswer: 1,
          explanation:
            "The .value property holds whatever the user typed into a form input. It works for text inputs, textareas, selects, and more. .innerHTML is for regular HTML elements, not form inputs.",
        },
      ],
    },
  ],
};

export default lesson;
