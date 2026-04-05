import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "apis",
  title: "APIs: The Messenger Ravens",
  description:
    "Send requests and receive data from faraway servers — APIs are the messenger ravens that connect your code to the world.",
  order: 25,
  realm: 4,
  estimatedMinutes: 14,
  xpReward: 180,
  icon: "🐦",
  boss: {
    name: "The Raven Interceptor",
    description:
      "A dark creature that intercepts API calls and returns corrupted data",
    sprite: "ravenInterceptor",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "403 Forbidden!",
      "CORS Block!",
      "Rate Limit Exceeded!",
    ],
    defeatText:
      "Your fetch calls fly true — the Interceptor can't catch a well-formed request!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "What Is an API?",
          content:
            "Imagine a restaurant. You sit at a table, look at the menu, but you can't walk into the kitchen and cook your own food. You need a **waiter** to take your order to the kitchen and bring back your meal.\n\nAn **API** (Application Programming Interface) is that waiter. It sits between your code and a server's data. You **send a request** (your order), and the API **returns a response** (your food).\n\nEvery time you check the weather on your phone, load a Pokémon in a game, or see a joke-of-the-day — an API delivered that data.",
          visual: `
  ┌─────────────┐     ┌──────────┐     ┌─────────────┐
  │  YOUR CODE  │────→│   API    │────→│   SERVER    │
  │  (Customer) │     │ (Waiter) │     │  (Kitchen)  │
  │             │←────│          │←────│             │
  │  Gets data! │     │ Delivers │     │  Has data!  │
  └─────────────┘     └──────────┘     └─────────────┘

  🧑 "I'd like the weather for Tokyo, please."
  🐦 *flies to server, returns with data*
  📦 { temp: 22, condition: "sunny" }`,
          animation: "fade",
        },
        {
          title: "HTTP Methods: The Four Commands",
          content:
            "When you send a raven, you need to tell it **what to do** when it gets there. HTTP methods are those instructions.\n\n- **GET** — \"Bring me data.\" (Read)\n- **POST** — \"Here's new data, store it.\" (Create)\n- **PUT** — \"Replace this data with new data.\" (Update)\n- **DELETE** — \"Destroy this data.\" (Remove)\n\nMost of the time you'll use **GET** (fetching info) and **POST** (sending info). They're the bread and butter of web communication.",
          visual: `
  ┌──────────────────────────────────────────┐
  │          HTTP METHOD SCROLL              │
  │                                          │
  │  GET     📖  "Read me a story"           │
  │  POST    ✉️   "Here, take this letter"    │
  │  PUT     🔄  "Replace the old scroll"    │
  │  DELETE  🗑️   "Burn this message"         │
  │                                          │
  │  GET /api/pokemon/pikachu                │
  │  → { name: "Pikachu", type: "electric" } │
  │                                          │
  │  POST /api/messages                      │
  │  → sends { text: "Hello!" } to server   │
  └──────────────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "fetch() — Sending Your Raven",
          content:
            "JavaScript has a built-in function called **`fetch()`** that sends API requests. Pair it with **`async/await`** (which you already know!) and it's clean and readable.\n\n```js\nasync function getPokemon() {\n  const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');\n  const data = await response.json();\n  console.log(data.name); // \"pikachu\"\n}\n```\n\nTwo awaits — one to **send the request and wait for the response**, another to **parse the JSON body**. That's the pattern you'll use a hundred times.",
          visual: `
  ┌─── THE FETCH PATTERN ────────────────┐
  │                                      │
  │  // Step 1: Send the raven           │
  │  const res = await fetch(url);       │
  │         ↓                            │
  │  // Step 2: Read the scroll it       │
  │  //         brought back             │
  │  const data = await res.json();      │
  │         ↓                            │
  │  // Step 3: Use the data!            │
  │  console.log(data);                  │
  │                                      │
  │  🐦──→ 🌐 ──→ 🐦 ──→ 📦            │
  │  send   server  return  JSON data    │
  └──────────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Status Codes: The Raven's Report",
          content:
            "When the raven returns, it carries a **status code** — a number that tells you how the mission went.\n\n- **200** — OK. Mission success. Data delivered.\n- **201** — Created. New resource was created.\n- **404** — Not Found. The thing you asked for doesn't exist.\n- **403** — Forbidden. You're not allowed.\n- **500** — Server Error. The kitchen is on fire.\n\nCodes starting with **2xx** = good, **4xx** = you messed up, **5xx** = server messed up.",
          visual: `
  ┌─── STATUS CODE FIELD GUIDE ──────────┐
  │                                      │
  │  2xx ✅ SUCCESS                      │
  │    200 OK         "Here's your data" │
  │    201 Created    "Made it for you"  │
  │                                      │
  │  4xx ⚠️  CLIENT ERROR                │
  │    400 Bad Request  "What?"          │
  │    403 Forbidden    "Not allowed"    │
  │    404 Not Found    "Doesn't exist"  │
  │                                      │
  │  5xx 🔥 SERVER ERROR                 │
  │    500 Internal     "Kitchen fire!"  │
  │    503 Unavailable  "Closed today"   │
  └──────────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Reading the Response",
          content:
            "API responses almost always come back as **JSON** — the same format you learned in the objects lesson. It's just key-value pairs that both humans and computers can read.\n\n```js\n// What the API sends back:\n{\n  \"name\": \"pikachu\",\n  \"id\": 25,\n  \"types\": [\"electric\"],\n  \"hp\": 35\n}\n```\n\nOnce you call `response.json()`, you can access properties with dot notation: `data.name`, `data.types[0]`, `data.hp`. It's just an object!",
          visual: `
  ┌─── API RESPONSE ANATOMY ─────────────┐
  │                                      │
  │  const data = await res.json();      │
  │                                      │
  │  data.name       → "pikachu"         │
  │  data.id         → 25                │
  │  data.types[0]   → "electric"        │
  │  data.hp         → 35                │
  │                                      │
  │  It's just an object!                │
  │  Same dot notation you already know. │
  └──────────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Public APIs You Can Try!",
          content:
            "The best part? Tons of APIs are **free and open** for you to play with right now.\n\n- **PokéAPI** — `pokeapi.co/api/v2/pokemon/ditto` — every Pokémon ever\n- **Official Joke API** — `official-joke-api.appspot.com/random_joke` — random jokes\n- **Open-Meteo** — `open-meteo.com/` — weather data, no key needed\n- **Dog CEO** — `dog.ceo/api/breeds/image/random` — random dog pics\n\nAll you need is `fetch()` and curiosity. Try swapping URLs and see what comes back!",
          visual: `
  ┌─── FREE APIs TO EXPLORE ─────────────┐
  │                                      │
  │  🎮 PokéAPI                          │
  │     fetch('pokeapi.co/.../pikachu')  │
  │                                      │
  │  😂 Joke API                         │
  │     fetch('.../random_joke')         │
  │                                      │
  │  🌤️  Open-Meteo Weather              │
  │     fetch('open-meteo.com/...')      │
  │                                      │
  │  🐕 Dog CEO                          │
  │     fetch('dog.ceo/.../random')      │
  │                                      │
  │  No API key needed — just fetch()!   │
  └──────────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## API Cheat Sheet

### HTTP Methods

| Method | Purpose | Example | Analogy |
|---|---|---|---|
| **GET** | Read data | \`fetch('/api/users')\` | "Show me the menu" |
| **POST** | Create data | \`fetch('/api/users', { method: 'POST', body: ... })\` | "I'd like to place an order" |
| **PUT** | Replace data | \`fetch('/api/users/1', { method: 'PUT', body: ... })\` | "Change my entire order" |
| **DELETE** | Remove data | \`fetch('/api/users/1', { method: 'DELETE' })\` | "Cancel my order" |

### The Fetch Pattern

Every API call follows the same two-step pattern:

\`\`\`javascript
// Step 1 — send the request, wait for the response
const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');

// Step 2 — parse the JSON body
const data = await response.json();

// Now use it!
console.log(data.name);  // "pikachu"
\`\`\`

**Why two awaits?** The first \`await\` waits for the server to respond (headers arrive). The second \`await\` waits for the full body to download and be parsed into a JavaScript object.

### Status Codes at a Glance

| Code | Meaning | Remember It As |
|---|---|---|
| **200** | OK | "Here's your data!" |
| **201** | Created | "New thing made!" |
| **400** | Bad Request | "I don't understand your order" |
| **401** | Unauthorized | "Show me your ID first" |
| **403** | Forbidden | "You're not allowed in here" |
| **404** | Not Found | "That doesn't exist" |
| **500** | Server Error | "The kitchen is on fire" |

### Error Handling with try/catch

Always wrap fetch calls in try/catch — networks are unreliable!

\`\`\`javascript
async function getJoke() {
  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!res.ok) {
      throw new Error('Raven returned with bad news: ' + res.status);
    }
    const joke = await res.json();
    console.log(joke.setup);
    console.log(joke.punchline);
  } catch (error) {
    console.log('Request failed:', error.message);
  }
}
\`\`\`

**Pro tip:** \`fetch()\` only throws on network failures (server unreachable). A 404 response does NOT throw — you have to check \`response.ok\` yourself!

### Sending Data with POST

GET reads data. POST sends data:

\`\`\`javascript
const response = await fetch('https://api.example.com/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Hello from my code!' })
});
\`\`\`

Three extra pieces: \`method\`, \`headers\` (tells the server it's JSON), and \`body\` (the data, stringified).

### Public APIs for Practice

- **PokéAPI** — \`https://pokeapi.co/api/v2/pokemon/{name}\` — Pokémon data
- **Joke API** — \`https://official-joke-api.appspot.com/random_joke\` — random jokes
- **Dog CEO** — \`https://dog.ceo/api/breeds/image/random\` — random dog images
- **Open-Meteo** — \`https://api.open-meteo.com/v1/forecast?latitude=35.6&longitude=139.7&current_weather=true\` — weather`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Raven Training Grounds",
      description:
        "Practice sending API requests and reading the responses!",
      steps: [
        {
          instruction:
            "Complete the fetch call to get data from an API. Remember: fetch returns a Promise, so you need a special keyword before it!",
          type: "fill-blank",
          data: {
            template:
              "const response = ___ fetch('https://pokeapi.co/api/v2/pokemon/pikachu');",
            blanks: [
              { id: "await1", placeholder: "keyword", width: 5 },
            ],
            filename: "api.js",
          },
          solution: {
            await1: "await",
          },
          hint: "You need to wait for the server to respond. What keyword pauses an async function until a Promise resolves?",
        },
        {
          instruction:
            "The raven returned with a response! Now parse the JSON body so you can read the data as a JavaScript object.",
          type: "fill-blank",
          data: {
            template:
              "const data = await response.___()",
            blanks: [
              { id: "json", placeholder: "method", width: 4 },
            ],
            filename: "api.js",
          },
          solution: {
            json: "json",
          },
          hint: "API responses come back as JSON. What method on the response object parses it?",
        },
        {
          instruction:
            "Your fetch raven returned with status code 404. What does that mean?",
          type: "multiple-choice",
          data: {
            options: [
              "The request was successful",
              "The server is broken",
              "The resource you asked for was not found",
              "You need to log in first",
            ],
          },
          solution: 2,
          hint: "Think of a missing page on a website — you've probably seen this number before!",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What is an API?",
          type: "multiple-choice",
          options: [
            "A programming language",
            "A way for programs to communicate with servers and exchange data",
            "A type of database",
            "A CSS framework for styling websites",
          ],
          correctAnswer: 1,
          explanation:
            "An API (Application Programming Interface) is a way for programs to communicate with servers and exchange data — like a waiter carrying orders between you and the kitchen.",
        },
        {
          question:
            "Which HTTP method would you use to READ data from a server?",
          type: "multiple-choice",
          options: ["POST", "DELETE", "GET", "PUT"],
          correctAnswer: 2,
          explanation:
            "GET is for reading data. POST creates, PUT updates, DELETE removes. GET is like asking the waiter to show you the menu.",
        },
        {
          question:
            "What does the following code do?\n`const data = await response.json();`",
          type: "multiple-choice",
          options: [
            "Sends a new request to the server",
            "Converts the response body from JSON text into a JavaScript object",
            "Checks if the response was successful",
            "Deletes the response data",
          ],
          correctAnswer: 1,
          explanation:
            "response.json() parses the raw JSON text from the server's response into a JavaScript object you can work with — like translating a scroll from a foreign language.",
        },
        {
          question: "What does a 500 status code mean?",
          type: "multiple-choice",
          options: [
            "Everything is OK",
            "The resource was not found",
            "You are not authorized",
            "Something went wrong on the server",
          ],
          correctAnswer: 3,
          explanation:
            "500 means Internal Server Error — something broke on the server's side. Codes starting with 5xx always mean the server had a problem, not you.",
        },
        {
          question: "Why do most APIs use JSON for their responses?",
          type: "multiple-choice",
          options: [
            "JSON is the fastest data format",
            "JSON is easy for both humans and machines to read, and JavaScript can parse it natively",
            "JSON is required by all web browsers",
            "JSON is the only format that supports numbers",
          ],
          correctAnswer: 1,
          explanation:
            "JSON is lightweight, human-readable, and JavaScript can parse it with a single method call (.json()). It's the lingua franca of web APIs.",
        },
      ],
    },
  ],
};

export default lesson;
