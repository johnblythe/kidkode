import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "authentication",
  title: "Authentication: The Gatekeeper's Key",
  description:
    "Learn how apps verify who you are — passwords, sessions, tokens, and the difference between 'who are you?' and 'what can you do?'",
  order: 28,
  realm: 4,
  estimatedMinutes: 12,
  xpReward: 200,
  icon: "🔑",
  boss: {
    name: "The Identity Thief",
    description:
      "A shapeshifter that impersonates users — only proper authentication can expose the fraud",
    sprite: "identityThief",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Stolen Session!",
      "Brute Force Attack!",
      "Phishing Lure!",
    ],
    defeatText:
      "Your auth checks expose every disguise — the Identity Thief is locked out forever!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Castle Gate",
          content:
            "Imagine you're entering a castle. A guard blocks the gate and asks:\n\n**\"Who are you? Prove it.\"**\n\nThat's **authentication** — proving your identity before you're allowed in.\n\nEvery app does this. When you log in with a username and password, you're showing the guard your ID.",
          visual: `
  ┌──────────────────────────────────┐
  │         🏰 THE CASTLE            │
  │                                  │
  │    ┌─────┐                       │
  │    │GUARD│  "Who goes there?"    │
  │    │ ⚔️  │                       │
  │    └──┬──┘                       │
  │       │                          │
  │   🧑 "I'm Alex, here's my ID"   │
  │                                  │
  │   ✅ Identity confirmed → ENTER  │
  │   ❌ Wrong ID → GET LOST         │
  └──────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Passwords & Hashing: The Secret Scramble",
          content:
            "Apps **never** store your password as plain text. That would be like writing your secret on a billboard!\n\nInstead they **hash** it — a one-way scramble that turns your password into a jumbled mess. Even the app can't un-scramble it.\n\nWhen you log in, the app hashes what you typed and compares the two hashes.",
          visual: `
  YOUR PASSWORD         HASHED VERSION
  ┌──────────────┐      ┌──────────────────┐
  │ dragon123    │ ───→ │ a4f2e8c1b9d37... │
  └──────────────┘      └──────────────────┘
       readable              unreadable!

  LOGIN CHECK:
  ┌──────────────┐      ┌──────────────────┐
  │ dragon123    │ ───→ │ a4f2e8c1b9d37... │
  └──────────────┘      └──────────────────┘
         hash(input)  ==  stored hash?  ✅`,
          animation: "slide-left",
        },
        {
          title: "Sessions & Cookies: Your Wristband",
          content:
            "You wouldn't want to show your ID to the guard **every single time** you walk between rooms.\n\nSo after you prove who you are, the server gives you a **session** — like a wristband at a theme park. Your browser stores it as a **cookie**.\n\nEvery request you make, the cookie rides along: *\"I already proved who I am!\"*",
          visual: `
  LOGIN:
  🧑 ──→ 🏰 "Here's my password"
  🏰 ──→ 🧑 "Welcome! Here's your wristband"

  EVERY REQUEST AFTER:
  🧑 🎫 ──→ 🏰 "I have my wristband"
  🏰 ──→ 🧑 "Go right ahead!"

  ┌─────────────────────────────┐
  │ COOKIE: session_id=x7k9m2  │
  │ Stored in your browser      │
  │ Sent automatically          │
  └─────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Tokens: The Sealed Letter",
          content:
            "A **token** (like a JWT) is a different approach. Instead of the server remembering your session, it gives you a **sealed letter** with your identity inside.\n\n**JWT** = JSON Web Token. It contains:\n- **Who** you are (payload)\n- **When** it expires\n- A **signature** so nobody can forge it",
          visual: `
  ┌────────────────────────────────┐
  │  📜 JWT — The Sealed Letter    │
  │                                │
  │  HEADER:  { alg: "HS256" }    │
  │  PAYLOAD: { user: "Alex",     │
  │             role: "knight",   │
  │             exp: 1700000000 } │
  │  SIGNATURE: ██████████████    │
  │                                │
  │  ⚠️  Anyone can READ it       │
  │  🔒 But nobody can FORGE it   │
  └────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Authentication vs Authorization",
          content:
            "These two words sound alike but mean **very** different things:\n\n**Authentication** = \"Who ARE you?\" — proving your identity\n**Authorization** = \"What CAN you do?\" — checking your permissions\n\nYou authenticate first (prove who you are), then the system authorizes what you're allowed to do.",
          visual: `
  AUTHENTICATION (AuthN)     AUTHORIZATION (AuthZ)
  ┌─────────────────────┐    ┌─────────────────────┐
  │ "Who are you?"      │    │ "What can you do?"  │
  │                     │    │                     │
  │ 🧑 "I'm Alex"      │    │ 🧑 "Can I enter     │
  │ 🔑 password check   │    │     the vault?"     │
  │ ✅ Identity proved  │    │ 🛡️  role: knight    │
  │                     │    │ ❌ Vault = admin    │
  └─────────────────────┘    │    only!            │
         STEP 1              └─────────────────────┘
                                    STEP 2`,
          animation: "swoosh",
        },
        {
          title: "Staying Safe: Security Basics",
          content:
            "Authentication is only as strong as its weakest link. Here are the essentials:\n\n- **HTTPS** — encrypts data in transit so nobody can eavesdrop\n- **Strong passwords** — longer is better, avoid common words\n- **2FA** (Two-Factor Auth) — a second proof, like a code texted to your phone\n- **Never share passwords** — not even with \"support\"\n- **Watch for phishing** — fake login pages that steal your credentials",
          visual: `
  🛡️  SECURITY CHECKLIST
  ┌──────────────────────────────┐
  │ ✅ HTTPS (padlock in URL)   │
  │ ✅ Strong, unique passwords │
  │ ✅ 2FA enabled              │
  │ ✅ Never share credentials  │
  │ ✅ Check URLs for phishing  │
  │                              │
  │  COMMON ATTACKS:             │
  │  🎣 Phishing — fake pages   │
  │  🔨 Brute force — guessing  │
  │  🕵️  Session hijack — theft │
  └──────────────────────────────┘`,
          animation: "page-flip",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Authentication Cheat Sheet

### Authentication vs Authorization

| | **Authentication (AuthN)** | **Authorization (AuthZ)** |
|---|---|---|
| **Question** | "Who are you?" | "What can you do?" |
| **When** | At login | After login, on every action |
| **How** | Password, fingerprint, 2FA | Roles, permissions, access rules |
| **Example** | Logging into your account | Admin can delete posts, user can't |

### Password Rules

1. **Never store plain text** — always hash passwords before saving
2. **Hashing is one-way** — you can't reverse a hash back to the password
3. **Use salt** — add random data before hashing so identical passwords get different hashes
4. **Longer = stronger** — "correct-horse-battery-staple" beats "P@ss1"
5. **Never reuse passwords** — if one site gets hacked, the rest stay safe

### Session Flow

\`\`\`
1. User sends username + password
2. Server checks: does the hash match?
3. YES → Server creates a session, sends a cookie
4. Browser stores the cookie automatically
5. Every future request includes the cookie
6. Server looks up the session → knows who you are
\`\`\`

### Token Flow (JWT)

\`\`\`
1. User sends username + password
2. Server checks credentials
3. YES → Server creates a signed JWT, sends it back
4. Client stores the token (localStorage or cookie)
5. Every future request includes the token in a header
6. Server verifies the signature → trusts the payload
\`\`\`

**Sessions vs Tokens:**
| | **Sessions** | **Tokens (JWT)** |
|---|---|---|
| **Stored on** | Server (session store) | Client (browser) |
| **Scalability** | Harder — server must track all sessions | Easier — server is stateless |
| **Revocation** | Easy — delete the session | Harder — token valid until it expires |

### Common Attacks & Defenses

- **Phishing** — fake login pages that look real. *Defense: always check the URL, use bookmarks*
- **Brute force** — trying millions of passwords. *Defense: rate limiting, account lockout, long passwords*
- **Session hijacking** — stealing someone's cookie. *Defense: HTTPS, secure cookie flags, short expiry*
- **Credential stuffing** — using leaked passwords from other sites. *Defense: unique passwords, 2FA*

### Security Best Practices

- Always use **HTTPS** — never send passwords over plain HTTP
- Enable **2FA** wherever possible — even if someone steals your password, they need your phone
- Use a **password manager** — it remembers strong, unique passwords for you
- **Log out** on shared devices — don't leave your session open`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Gatekeeper Trials",
      description:
        "Prove you understand authentication by passing the Gatekeeper's three challenges!",
      steps: [
        {
          instruction:
            'A user logs in with their password. The server then checks if they\'re allowed to delete other users\' posts. Which step is **authentication** and which is **authorization**?\n\nThe server checking the password is:',
          type: "multiple-choice",
          data: {
            options: [
              "Authorization — it checks what you can do",
              "Authentication — it verifies who you are",
              "Neither — passwords aren't related to auth",
              "Both at the same time",
            ],
          },
          solution: 1,
          hint: "Authentication = proving identity. A password proves WHO you are.",
        },
        {
          instruction:
            "Passwords should never be stored in plain text. They're converted using a one-way function so even the database can't reveal them. Complete the sentence:\n\nPasswords are never stored in ___ — they are always ___.",
          type: "fill-blank",
          data: {
            template: "Passwords are never stored in ___ — they are always ___.",
            blanks: [
              { id: "plaintext", placeholder: "format?", width: 10 },
              { id: "method", placeholder: "processed how?", width: 6 },
            ],
          },
          solution: {
            plaintext: ["plain text", "plaintext", "plain-text", "cleartext"],
            method: ["hashed", "encrypted", "scrambled"],
          },
          hint: "The raw password text should never be saved. Instead, a one-way scramble is applied.",
        },
        {
          instruction:
            "After you log in, the server gives your browser something so you don't have to enter your password on every page. What does a **session cookie** do?",
          type: "multiple-choice",
          data: {
            options: [
              "It stores your password so the browser can resend it",
              "It tells the server you already proved your identity",
              "It encrypts all your data permanently",
              "It blocks other users from logging in",
            ],
          },
          solution: 1,
          hint: "Think of the wristband at a theme park — once you're in, you just flash it at every ride.",
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
            "What is the difference between authentication and authorization?",
          type: "multiple-choice",
          options: [
            "They are the same thing",
            "Authentication verifies who you are; authorization determines what you can do",
            "Authorization verifies who you are; authentication determines what you can do",
            "Authentication is for admins; authorization is for users",
          ],
          correctAnswer: 1,
          explanation:
            "Authentication (AuthN) proves your identity — 'who are you?' Authorization (AuthZ) checks your permissions — 'what can you do?' They're two separate steps.",
        },
        {
          question: "Why are passwords hashed instead of stored as plain text?",
          type: "multiple-choice",
          options: [
            "Hashing makes passwords easier to type",
            "Plain text takes up too much storage space",
            "If the database is breached, hashed passwords can't be read directly",
            "It's just a tradition with no real benefit",
          ],
          correctAnswer: 2,
          explanation:
            "Hashing is a one-way function — even if hackers steal the database, they can't reverse the hashes back into passwords. Plain text would give them every password instantly.",
        },
        {
          question: "What does a session cookie do after you log in?",
          type: "multiple-choice",
          options: [
            "It stores your username and password in the browser",
            "It proves to the server that you already authenticated",
            "It prevents anyone else from using the website",
            "It automatically changes your password every hour",
          ],
          correctAnswer: 1,
          explanation:
            "A session cookie is like a wristband at a theme park. After you prove who you are once, the cookie is sent with every request so the server knows it's still you — no need to re-enter your password.",
        },
        {
          question: "What is a JWT (JSON Web Token)?",
          type: "multiple-choice",
          options: [
            "A type of password that changes every second",
            "A signed token containing your identity info that the server can verify",
            "A special cookie that only works on mobile devices",
            "A JavaScript function for creating users",
          ],
          correctAnswer: 1,
          explanation:
            "A JWT is a signed, self-contained token. It carries a payload (who you are, when it expires) plus a cryptographic signature. The server verifies the signature without needing to store session data.",
        },
        {
          question:
            "Which of these is a security best practice for authentication?",
          type: "multiple-choice",
          options: [
            "Use the same password for every site so you don't forget it",
            "Share your password with friends so they can help if you're locked out",
            "Enable two-factor authentication (2FA) and use unique passwords",
            "Write your password on a sticky note next to your monitor",
          ],
          correctAnswer: 2,
          explanation:
            "2FA adds a second layer of proof (like a phone code) on top of your password. Unique passwords per site mean one breach doesn't compromise everything. Never share or write down passwords in the open.",
        },
      ],
    },
  ],
};

export default lesson;
