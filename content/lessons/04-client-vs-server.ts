import { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "client-vs-server",
  title: "Client vs Server: The Two Kingdoms",
  description:
    "Discover how the internet works behind the scenes — the client requests, the server delivers!",
  order: 4,
  estimatedMinutes: 15,
  xpReward: 125,
  icon: "🌐",
  boss: {
    name: "The 404 Phantom",
    description: "A ghostly entity that makes pages vanish into thin air",
    sprite: "phantom404",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Page Not Found!",
      "Connection Timeout!",
      "502 Bad Gateway!",
      "DNS Resolution Failed!",
    ],
    defeatText:
      "The Phantom dissolves as every request finds its response!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Restaurant of the Internet",
          content:
            "You walk into a restaurant. You (the **client**) sit at a table. You give your ORDER (a **request**) to the waiter. The kitchen (the **server**) prepares your food (the **data**). The waiter brings it back (the **response**).\n\nThe whole internet works just like this!",
          visual: `
  ┌─────────────────────────────────────┐
  │  🍽️  THE INTERNET RESTAURANT       │
  │                                     │
  │   😊 ──📋──▶ 🧑‍🍳 ──🍕──▶ 😊     │
  │  CLIENT  request  SERVER  response  │
  │  (you)            (kitchen)         │
  │                                     │
  │  "I'd like the       "Here's your  │
  │   homepage please!"   homepage!"   │
  └─────────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Client = Your Browser",
          content:
            "The **client** is YOUR device — phone, laptop, tablet.\n\nYour browser (Chrome, Safari, Firefox) is the **waiter** that carries messages back and forth between you and the server.\n\nEvery time you click a link or type a URL, your browser sends a **request** to a server somewhere in the world.",
          visual: `
  ┌───────────────────────────────────┐
  │  📱 Phone    💻 Laptop   🖥️ PC   │
  │     \\          |          /      │
  │      \\         |         /       │
  │       ▼        ▼        ▼        │
  │    ┌──────────────────────┐      │
  │    │  🌐 BROWSER          │      │
  │    │  "Your personal      │      │
  │    │   waiter for the     │      │
  │    │   internet"          │      │
  │    └──────────────────────┘      │
  └───────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Server = The Kitchen",
          content:
            "A **server** is a powerful computer somewhere in the world. It:\n\n- **Stores data** (websites, images, videos)\n- **Runs code** (processes your requests)\n- **Sends responses** (delivers what you asked for)\n\nIt never sleeps — always ready for orders, 24/7!",
          visual: `
  ┌───────────────────────────────────┐
  │  🏗️ SERVER ROOM                   │
  │  ┌─────┐ ┌─────┐ ┌─────┐        │
  │  │ ▓▓▓ │ │ ▓▓▓ │ │ ▓▓▓ │        │
  │  │ ▓▓▓ │ │ ▓▓▓ │ │ ▓▓▓ │        │
  │  │ ▓▓▓ │ │ ▓▓▓ │ │ ▓▓▓ │        │
  │  └──┬──┘ └──┬──┘ └──┬──┘        │
  │     └───────┼───────┘            │
  │         ⚡ ALWAYS ON ⚡           │
  │    "Ready to serve requests"     │
  └───────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "The Request-Response Cycle",
          content:
            "Every web interaction follows the same pattern:\n\n1. **Client sends a REQUEST** — URL + method (what page? what action?)\n2. **Server processes it** — finds the data, runs the code\n3. **Server sends a RESPONSE** — status code + data\n\nThis cycle happens billions of times every second across the internet!",
          visual: `
  ┌─────────────────────────────────────┐
  │                                     │
  │  CLIENT                  SERVER     │
  │  ┌─────┐   REQUEST →   ┌─────┐    │
  │  │ 💻  │ ─────────────▶│ 🖥️  │    │
  │  │     │   URL + GET    │     │    │
  │  │     │                │     │    │
  │  │     │  ← RESPONSE   │     │    │
  │  │     │ ◀─────────────│     │    │
  │  └─────┘  200 + Data   └─────┘    │
  │                                     │
  └─────────────────────────────────────┘`,
          animation: "swoosh",
        },
        {
          title: "Status Codes: The Server's Replies",
          content:
            "When the server responds, it always includes a **status code** — a number that tells you what happened:\n\n- **200** = \"Here's your food!\" ✅\n- **404** = \"We don't have that\" 🤷\n- **500** = \"Kitchen is on fire!\" 🔥\n- **301** = \"We moved, follow me\" 🏃\n\nYou've probably seen **404** before — that's the server saying \"I can't find what you're looking for.\"",
          visual: `
  ┌──────────────────────────────────┐
  │  STATUS CODE MENU                │
  │  ────────────────                │
  │  2xx ✅ Success                  │
  │    200 OK — "Here you go!"       │
  │    201 Created — "Made it!"      │
  │                                  │
  │  3xx 🔀 Redirect                 │
  │    301 Moved — "Over here now"   │
  │                                  │
  │  4xx ❌ Client Error             │
  │    404 Not Found — "Doesn't      │
  │                     exist"       │
  │  5xx 💥 Server Error             │
  │    500 Internal — "We broke"     │
  └──────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "APIs: The Menu",
          content:
            "An **API** (Application Programming Interface) is like the **MENU** at the restaurant. It tells the client:\n\n- **What** you can order (endpoints)\n- **How** to order it (HTTP methods)\n- **What** you'll get back (JSON data)\n\nWithout a menu, you'd be yelling random things at the kitchen. APIs keep things organized!",
          visual: `
  ┌──────────────────────────────────┐
  │  📜 API MENU                     │
  │  ════════════                    │
  │                                  │
  │  GET  /users      → list users   │
  │  GET  /users/42   → get user 42  │
  │  POST /users      → create user  │
  │  PUT  /users/42   → update user  │
  │  DELETE /users/42 → delete user  │
  │                                  │
  │  Response format: JSON           │
  │  { "name": "Ada", "level": 5 }  │
  └──────────────────────────────────┘`,
          animation: "page-flip",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 5,
      content: `## Client vs Server: The Full Picture

### Side by Side

| | Client | Server |
|---|---|---|
| **What is it?** | Your device + browser | A computer in a data center |
| **Role** | Sends requests, displays results | Processes requests, sends responses |
| **Location** | Right in front of you | Could be anywhere in the world |
| **Examples** | Chrome, Safari, Firefox, your phone | Google's servers, Amazon AWS, your school's server |
| **Runs** | HTML, CSS, JavaScript | Python, JavaScript (Node.js), Java, Go, etc. |

### HTTP Verbs: The Language of Requests

Think of HTTP verbs like actions at a restaurant:

| HTTP Verb | What It Does | Restaurant Analogy |
|---|---|---|
| **GET** | Read / fetch data | "Can I see the menu?" |
| **POST** | Create something new | "I'd like to place a NEW order" |
| **PUT** | Update / replace something | "Actually, change my order to pizza" |
| **DELETE** | Remove something | "Cancel my order please" |

### Real-World Examples

**Loading Instagram:**
1. You open the app (client)
2. Your phone sends a GET request to Instagram's servers
3. The server finds your feed, stories, and messages
4. It sends back all that data as a response
5. The app displays it on your screen

**Sending a message:**
1. You type "hey!" and hit send (client)
2. Your phone sends a POST request with the message data
3. The server saves the message and notifies the other person
4. Server responds with "message sent!" (200 OK)

**Watching YouTube:**
1. You click a video (client)
2. Browser sends GET request for that video's data
3. YouTube's servers find the video file
4. Server streams the video back as a response
5. Your browser plays it

### The Journey of a URL

What REALLY happens when you type \`https://www.google.com\` and hit Enter?

1. **DNS Lookup** — Your browser asks "What's the IP address for google.com?" DNS is like the phone book of the internet — it translates human-readable names into number addresses (like 142.250.80.46).

2. **TCP Connection** — Your browser opens a connection to that IP address. Think of it as dialing the phone number.

3. **HTTP Request** — Your browser sends a GET request: "Hey Google server, give me your homepage!"

4. **Server Processing** — Google's server receives your request, figures out what to send you, and prepares the response.

5. **HTTP Response** — The server sends back HTML, CSS, JavaScript, and images — everything your browser needs to show the page.

6. **Rendering** — Your browser takes all that code and paints the page on your screen. Done!

All of this happens in **less than a second**. Every. Single. Time. 🤯`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "HTTP Quest",
      description: "Test your knowledge of how the web works!",
      steps: [
        {
          instruction:
            "Put the HTTP request lifecycle in the correct order!",
          type: "sequence",
          data: {
            items: [
              {
                id: "type-url",
                text: "Type URL in browser",
                description: "You enter the address",
              },
              {
                id: "dns-lookup",
                text: "DNS looks up IP address",
                description: "Translating the name to numbers",
              },
              {
                id: "send-request",
                text: "Browser sends HTTP request",
                description: "The order goes to the kitchen",
              },
              {
                id: "server-process",
                text: "Server processes request",
                description: "The kitchen prepares your food",
              },
              {
                id: "send-response",
                text: "Server sends response",
                description: "Food is ready!",
              },
              {
                id: "render-page",
                text: "Browser renders the page",
                description: "You see the result",
              },
            ],
            correctOrder: [
              "type-url",
              "dns-lookup",
              "send-request",
              "server-process",
              "send-response",
              "render-page",
            ],
          },
          hint: "Think about it like ordering food — what's the very first thing YOU do?",
        },
        {
          instruction:
            "Which HTTP status code means 'everything is OK, here's your data'?",
          type: "multiple-choice",
          data: {
            options: [
              "404 - Not Found",
              "200 - OK",
              "500 - Internal Server Error",
              "301 - Moved Permanently",
            ],
          },
          solution: 1,
          hint: "It's the happiest number — the one you always want to see",
        },
        {
          instruction:
            "Which HTTP verb would you use to CREATE a new user account?",
          type: "multiple-choice",
          data: {
            options: ["GET", "DELETE", "POST", "PUT"],
          },
          solution: 2,
          hint: "Think about mailing a letter — you POST it",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What is the client in web development?",
          type: "multiple-choice",
          options: [
            "A powerful computer in a data center",
            "Your browser/device that makes requests",
            "The Wi-Fi router in your house",
            "A programming language",
          ],
          correctAnswer: 1,
          explanation:
            "The client is your device and browser — it's the thing that sends requests and displays the results you see on screen.",
        },
        {
          question: "What does a 404 status code mean?",
          type: "multiple-choice",
          options: [
            "The server is broken",
            "You need to log in",
            "The requested page/resource was not found",
            "Your internet is too slow",
          ],
          correctAnswer: 2,
          explanation:
            "404 means 'Not Found' — the server looked for what you asked for but couldn't find it. It's the most famous error code on the web!",
        },
        {
          question: "What HTTP method is used to READ data?",
          type: "multiple-choice",
          options: ["POST", "DELETE", "PUT", "GET"],
          correctAnswer: 3,
          explanation:
            "GET is used to read/fetch data — like asking to see the menu. It doesn't change anything on the server.",
        },
        {
          question:
            "What does an API do in simple terms?",
          type: "multiple-choice",
          options: [
            "It makes your computer faster",
            "It's a menu/interface that tells clients what they can request",
            "It stores all your passwords",
            "It blocks hackers from your computer",
          ],
          correctAnswer: 1,
          explanation:
            "An API is like a menu at a restaurant — it defines what the client can order (request) and how to order it, so the server knows what to do.",
        },
        {
          question:
            "What happens first when you type a URL into your browser?",
          type: "multiple-choice",
          options: [
            "The server sends you HTML",
            "Your browser renders the page",
            "DNS looks up the IP address of the domain",
            "JavaScript starts executing",
          ],
          correctAnswer: 2,
          explanation:
            "Before anything else, DNS translates the human-readable domain name (like google.com) into a number address (IP) so your browser knows WHERE to send the request.",
        },
      ],
    },
  ],
};

export default lesson;
