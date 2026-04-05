import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "weather-dashboard",
  title: "The Workshop: Weather Dashboard",
  description:
    "Build a weather dashboard that fetches real data from an API — combining everything you've learned about servers, JSON, and async code!",
  order: 26,
  realm: 4,
  estimatedMinutes: 18,
  xpReward: 200,
  icon: "\u{1F324}\uFE0F", // sun behind small cloud
  boss: {
    name: "The API Hydra",
    description:
      "A multi-headed beast — each head represents a different API challenge: auth, rate limits, errors",
    sprite: "apiHydra",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Timeout Attack!",
      "Malformed Response!",
      "Network Error Slam!",
    ],
    defeatText:
      "Every head falls as your API calls return 200 OK — clean data flows through your dashboard!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Project",
          content:
            "Time for a **real-world build**. You're creating a **Weather Dashboard** — an app that fetches **live weather data** from a free API and displays it on screen.\n\nThis project pulls together **everything** from Realm 4: client/server communication, JSON data, and async/await. No new concepts — pure application of skills you already have.\n\nBy the end, you'll have a working dashboard that shows a city's temperature, conditions, and forecast — all fetched from the internet in real time.",
          visual: `
  ┌─────────────────────────────────────┐
  │  🌤️  WEATHER DASHBOARD              │
  │                                     │
  │  ┌─────────────────────────────┐    │
  │  │  📍 Search: [  Tokyo     ]  │    │
  │  ├─────────────────────────────┤    │
  │  │                             │    │
  │  │  🌡️  72°F / 22°C            │    │
  │  │  ☀️  Clear sky               │    │
  │  │  💨 Wind: 5 mph             │    │
  │  │  💧 Humidity: 45%           │    │
  │  │                             │    │
  │  └─────────────────────────────┘    │
  │                                     │
  │  fetch() → JSON → DOM → Dashboard!  │
  └─────────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "The Blueprint",
          content:
            "Your dashboard follows a clear data pipeline:\n\n**1. User types a city** → an input field captures the search\n**2. fetch() calls the API** → sends a request to the weather server\n**3. Server returns JSON** → structured data with temp, conditions, wind\n**4. Parse + display** → extract what you need and update the DOM\n\nThis is the same pattern behind every weather app, social feed, and search engine you use daily. The only difference? You're building it yourself.",
          visual: `
  ┌──── DATA PIPELINE ─────────────────┐
  │                                     │
  │  USER          FETCH         SERVER │
  │  ┌────┐       ┌────┐       ┌────┐  │
  │  │Type│──────→│Send│──────→│ API│  │
  │  │city│       │req │       │    │  │
  │  └────┘       └────┘       └──┬─┘  │
  │                                │    │
  │  DISPLAY       PARSE        JSON   │
  │  ┌────┐       ┌────┐       ┌──┴─┐  │
  │  │ DOM│←──────│Read│←──────│data│  │
  │  │updt│       │JSON│       │    │  │
  │  └────┘       └────┘       └────┘  │
  │                                     │
  │  User → fetch → JSON → parse → DOM │
  └─────────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Building Blocks",
          content:
            "Quick inventory of tools you already know:\n\n**`fetch(url)`** — sends an HTTP request to a server and returns a Promise\n**`async/await`** — lets you write async code that reads like sync code\n**`response.json()`** — parses the JSON body from a fetch response\n**`document.querySelector()`** — grabs DOM elements to update\n**`textContent`** — changes what an element displays\n**`try/catch`** — handles errors gracefully when the network fails\n\nAll learned. All practiced. Time to combine them.",
          visual: `
  ┌──── YOUR TOOLKIT ──────────────────┐
  │                                     │
  │  ⚔️  fetch()         → call the API │
  │  ⚔️  async/await     → wait cleanly │
  │  ⚔️  response.json() → parse data   │
  │  ⚔️  querySelector() → find element │
  │  ⚔️  textContent     → update text  │
  │  🛡️  try/catch       → handle errors│
  │                                     │
  │  All skills acquired in Realm 4.    │
  │  No new spells — just forging.      │
  └─────────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Build Time!",
          content:
            "The API Hydra guards this workshop with three heads: **Timeout**, **Malformed Response**, and **Network Error**. Every API developer faces these beasts.\n\nYour weapons? Clean async functions, proper error handling, and solid JSON parsing. You've trained for this.\n\nLet's build the dashboard in four steps — HTML structure, the fetch function, JSON parsing, and DOM display. Each step scaffolded, with room for you to write the key lines yourself.",
          visual: `
  ┌─────────────────────────────────────┐
  │                                     │
  │       🌤️  THE WORKSHOP  🌤️          │
  │                                     │
  │    You have the skills.             │
  │    You have the blueprint.          │
  │    Time to forge.                   │
  │                                     │
  │  ┌──────┐ ┌──────┐ ┌──────┐        │
  │  │fetch │+│ JSON │+│ DOM  │ = 🌤️    │
  │  └──────┘ └──────┘ └──────┘        │
  │                                     │
  │    Build your Weather Dashboard!    │
  └─────────────────────────────────────┘`,
          animation: "pop",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 3,
      content: `## Project Blueprint: Weather Dashboard

Build your dashboard in four steps. Read through the patterns — you'll assemble each piece in the interactive section.

### Step 1 — HTML Structure

\`\`\`html
<div class="dashboard">
  <h1>Weather Dashboard</h1>
  <input id="city-input" placeholder="Enter a city..." />
  <button id="search-btn">Search</button>

  <div id="weather-display">
    <p id="city-name">---</p>
    <p id="temperature">--°F</p>
    <p id="conditions">--</p>
    <p id="wind">Wind: -- mph</p>
  </div>

  <p id="error-msg" class="hidden"></p>
</div>
\`\`\`

Standard HTML — an input for the city, a button to trigger the search, and placeholder elements that JavaScript will fill with real data. The \`id\` attributes give your JS hooks to target each element.

### Step 2 — The Async Fetch Function

\`\`\`javascript
async function getWeather(city) {
  const url = \`https://api.weather.example/data?q=\${city}\`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
\`\`\`

Three lines inside the function: build the URL with the city name, \`await\` the fetch, then \`await\` the JSON parsing. The function returns structured data ready to display.

### Step 3 — Parse the JSON Response

A weather API returns JSON like this:

\`\`\`json
{
  "city": "Tokyo",
  "temp": 72,
  "conditions": "Clear sky",
  "wind": { "speed": 5, "unit": "mph" },
  "humidity": 45
}
\`\`\`

You access nested values with dot notation: \`data.city\`, \`data.temp\`, \`data.wind.speed\`. JSON is just JavaScript objects — you already know how to read them.

### Step 4 — Display Data in the DOM

\`\`\`javascript
async function showWeather() {
  try {
    const city = document.querySelector("#city-input").value;
    const data = await getWeather(city);

    document.querySelector("#city-name").textContent = data.city;
    document.querySelector("#temperature").textContent = data.temp + "°F";
    document.querySelector("#conditions").textContent = data.conditions;
    document.querySelector("#wind").textContent = "Wind: " + data.wind.speed + " mph";
  } catch (error) {
    document.querySelector("#error-msg").textContent = "Could not fetch weather data!";
  }
}
\`\`\`

Fetch → parse → display → handle errors. The \`try/catch\` block ensures a bad network or invalid city doesn't crash the whole dashboard — it shows a friendly error message instead.

### How the Pieces Connect

| Step | Tool | Purpose |
|---|---|---|
| **HTML** | Input + display elements | Structure for user interaction and data display |
| **fetch()** | \`await fetch(url)\` | Send request to weather API |
| **JSON** | \`await response.json()\` | Parse structured data from server |
| **DOM** | \`querySelector + textContent\` | Show the data to the user |
| **Error handling** | \`try/catch\` | Graceful failure when things go wrong |

Five tools, one dashboard. That's the pattern behind every data-driven web app.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Forge the Weather Dashboard",
      description:
        "Build your weather dashboard piece by piece — async function, fetch call, JSON parsing, and error handling.",
      steps: [
        {
          instruction:
            "To call an API without freezing the browser, we need an asynchronous function. Fill in the keyword that marks a function as async.",
          type: "fill-blank",
          data: {
            template:
              "___ function getWeather(city) {\n  // fetch weather data here\n}",
            blanks: [{ id: "keyword", placeholder: "keyword", width: 6 }],
            filename: "weather.js",
          },
          solution: {
            keyword: "async",
          },
          hint: "It's 5 letters and literally means 'not synchronous' — shortened.",
        },
        {
          instruction:
            "Inside the async function, we need to call the weather API and wait for the response. Fill in the keyword that pauses until the Promise resolves.",
          type: "fill-blank",
          data: {
            template:
              'async function getWeather(city) {\n  const response = ___ fetch(url);\n  return response;\n}',
            blanks: [{ id: "pause", placeholder: "keyword", width: 6 }],
            filename: "weather.js",
          },
          solution: {
            pause: "await",
          },
          hint: "This keyword literally means 'wait for' — it pauses the function until the fetch completes.",
        },
        {
          instruction:
            "The server sends back raw text. We need to parse it as JSON. Fill in the method that converts the response body to a JavaScript object.",
          type: "fill-blank",
          data: {
            template:
              "const response = await fetch(url);\nconst data = await response.___();",
            blanks: [{ id: "method", placeholder: "method", width: 6 }],
            filename: "weather.js",
          },
          solution: {
            method: ["json", "json()"],
          },
          hint: "The data format is JSON — and the method is named after it. Three letters, no capitals.",
        },
        {
          instruction:
            "API calls can fail — bad network, invalid city, server down. Which approach lets us handle errors gracefully in async code?",
          type: "multiple-choice",
          data: {
            options: [
              "Wrap everything in an if/else checking response.ok",
              "Wrap the async code in a try/catch block",
              "Add .then() after every line",
              "Ignore errors — they rarely happen",
            ],
          },
          solution: 1,
          hint: "This block literally tries to run code, and catches any errors that happen. Two keywords, one pattern.",
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
            "Why do we use `async/await` when calling a weather API instead of regular synchronous code?",
          type: "multiple-choice",
          options: [
            "Synchronous code can't make network requests",
            "async/await prevents the browser from freezing while waiting for the server's response",
            "async/await makes the API respond faster",
            "It's just a style preference — both work the same way",
          ],
          correctAnswer: 1,
          explanation:
            "Network requests take time. Synchronous code would freeze the entire page while waiting. async/await lets the browser stay responsive — other code keeps running while the fetch completes in the background.",
        },
        {
          question:
            "A weather API returns this JSON: `{ \"city\": \"Tokyo\", \"temp\": 72, \"wind\": { \"speed\": 5 } }`. How do you access the wind speed?",
          type: "multiple-choice",
          options: [
            "data[\"wind speed\"]",
            "data.wind.speed",
            "data.speed.wind",
            "data->wind->speed",
          ],
          correctAnswer: 1,
          explanation:
            "JSON objects use dot notation to access nested values. `wind` is an object inside `data`, and `speed` is a property inside `wind`, so it's `data.wind.speed`.",
        },
        {
          question:
            "What happens if the API returns an error and your code does NOT have a try/catch block?",
          type: "multiple-choice",
          options: [
            "The browser automatically shows a friendly error message",
            "The error is silently swallowed and nothing happens",
            "An unhandled rejection occurs — the app may break with no useful feedback",
            "JavaScript retries the request automatically",
          ],
          correctAnswer: 2,
          explanation:
            "Without try/catch, a rejected Promise causes an unhandled rejection. The user sees nothing useful — or worse, the app breaks silently. Always wrap API calls in try/catch for graceful error handling.",
        },
        {
          question:
            "Your weather dashboard uses fetch(), async/await, JSON parsing, and DOM manipulation. Which of these concepts is NEW in this lesson?",
          type: "multiple-choice",
          options: [
            "fetch() — we haven't used it before",
            "JSON parsing — this is the first time",
            "DOM manipulation — this is brand new",
            "None — this lesson combines concepts from previous lessons",
          ],
          correctAnswer: 3,
          explanation:
            "This is a PRACTICAL lesson! Every concept — fetch, async/await, JSON, DOM updates — was taught in earlier Realm 4 lessons. The challenge here is combining them into a working project.",
        },
        {
          question:
            "In the dashboard code, what does `document.querySelector(\"#temperature\").textContent = data.temp + \"°F\"` do?",
          type: "multiple-choice",
          options: [
            "Creates a new HTML element called 'temperature'",
            "Finds the element with id='temperature' and updates its displayed text with the temperature value",
            "Sends the temperature data back to the API server",
            "Stores the temperature in the browser's local storage",
          ],
          correctAnswer: 1,
          explanation:
            "querySelector finds the element by its CSS selector (#temperature = id). Then textContent changes what the user sees on screen — replacing the placeholder with real data from the API.",
        },
      ],
    },
  ],
};

export default lesson;
