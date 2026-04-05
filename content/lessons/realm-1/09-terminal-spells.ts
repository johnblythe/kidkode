import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "terminal-spells",
  title: "Terminal II: Spells & Shortcuts",
  description:
    "Level up your terminal skills with wildcards, pipes, redirects, and shortcuts that make you 10x faster.",
  order: 3,
  realm: 1,
  estimatedMinutes: 12,
  xpReward: 70,
  icon: "✨",
  boss: {
    name: "The Wildcard Wraith",
    description:
      "A shifting specter that matches everything and nothing — master of patterns and chaos",
    sprite: "wildcardWraith",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Glob Pattern Strike!",
      "Pipe Overflow!",
      "Redirect to /dev/null!",
    ],
    defeatText:
      "The Wraith dissolves as your pattern-matching skills prove too precise!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "Tab Completion & History",
          content:
            "Your keyboard has **secret spells** built right in. The most important one? **Tab**.\n\nStart typing a file name and press **Tab** — the terminal finishes it for you. No more typos, no more guessing. Press **Up Arrow** to recall your last command, and **Ctrl+R** to search through your entire command history.\n\nThese three shortcuts alone will save you **hours** of typing over a lifetime of coding.",
          visual: `
  ┌── Tab Completion ────────────────┐
  │                                  │
  │  $ cd Docu[TAB]                  │
  │  $ cd Documents/    ← auto!     │
  │                                  │
  │  ↑  = last command               │
  │  Ctrl+R = search history         │
  │                                  │
  │  ⌨️  Less typing = more questing │
  └──────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Wildcards: Pattern Magic",
          content:
            "Wildcards are **pattern spells** — they match file names without typing each one.\n\n**`*`** matches anything: `*.txt` grabs every text file. `project*` grabs everything starting with \"project\". **`?`** matches exactly one character: `file?.txt` matches `file1.txt` and `fileA.txt` but not `file10.txt`.\n\nThink of `*` as a greedy dragon that devours all characters, and `?` as a picky goblin that only takes one.",
          visual: `
  ┌── Wildcard Spells ───────────────┐
  │                                  │
  │  $ ls *.txt                      │
  │  notes.txt  quest.txt  loot.txt  │
  │                                  │
  │  $ ls file?.log                  │
  │  file1.log  fileA.log            │
  │                                  │
  │  *  = match ANYTHING (greedy)    │
  │  ?  = match ONE char (picky)     │
  └──────────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "Pipes: Chaining Spells Together",
          content:
            "The **pipe** (`|`) is one of Unix's most powerful inventions. It takes the **output** of one command and feeds it as **input** to the next.\n\n`ls | grep txt` — first list all files, then filter to only show ones containing \"txt\". You're chaining simple spells into a **combo attack**.\n\nEach command does one thing well. Pipes let you combine them into something greater than the sum of their parts.",
          visual: `
  ┌── Pipe Combo Attack ─────────────┐
  │                                  │
  │  ls ──→ grep txt                 │
  │   │       │                      │
  │   │   ┌───┴────┐                 │
  │   │   │ filter │                 │
  │   │   └───┬────┘                 │
  │   ▼       ▼                      │
  │  ALL    ONLY                     │
  │  files  .txt files               │
  │                                  │
  │  Command1 | Command2 | Command3  │
  └──────────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "Redirects: Saving Spell Output",
          content:
            "Normally, command output appears on screen and vanishes. **Redirects** let you capture it.\n\n**`>`** writes output to a file (overwrites it). **`>>`** appends to a file (adds to the end). It's like bottling a spell's effect for later.\n\n`echo \"Hello World\" > greeting.txt` — creates a file with that text inside. `echo \"Line 2\" >> greeting.txt` — adds a second line without erasing the first.",
          visual: `
  ┌── Redirect Runes ────────────────┐
  │                                  │
  │  >   OVERWRITE (replace all)     │
  │  echo "hi" > note.txt            │
  │                                  │
  │  >>  APPEND (add to end)         │
  │  echo "bye" >> note.txt          │
  │                                  │
  │  note.txt now contains:          │
  │    hi                            │
  │    bye                           │
  └──────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "Ctrl Shortcuts: Emergency Spells",
          content:
            "Sometimes you need to **bail out fast**. These keyboard shortcuts are your emergency toolkit.\n\n**Ctrl+C** — cancel whatever is running (the \"panic button\"). **Ctrl+L** — clear the screen (fresh start). **Ctrl+A** — jump to the start of the line. **Ctrl+E** — jump to the end.\n\nMemorise Ctrl+C above all else. It's the escape hatch you'll use a thousand times.",
          visual: `
  ┌── Emergency Shortcuts ───────────┐
  │                                  │
  │  Ctrl+C  ⛔ STOP / CANCEL       │
  │  Ctrl+L  🧹 CLEAR SCREEN        │
  │  Ctrl+A  ⏪ JUMP TO START       │
  │  Ctrl+E  ⏩ JUMP TO END         │
  │                                  │
  │  Ctrl+C is your PANIC BUTTON.   │
  │  When in doubt, mash it.        │
  └──────────────────────────────────┘`,
          animation: "typewriter",
        },
        {
          title: "Combining Powers",
          content:
            "Now the real magic: **combining everything** you've learned into a single powerful incantation.\n\n`cat *.log | grep ERROR > errors.txt` — this reads ALL log files, filters for lines containing \"ERROR\", and saves the results to a file. Three concepts — wildcards, pipes, redirects — fused into one spell.\n\nThis is how power users think: small tools, chained together, solving big problems.",
          visual: `
  ┌── The Ultimate Combo ────────────┐
  │                                  │
  │  cat *.log | grep ERROR > err.txt│
  │   │          │           │       │
  │   ▼          ▼           ▼       │
  │  READ all   FILTER for  SAVE    │
  │  log files  "ERROR"     to file │
  │                                  │
  │  🌟 Wildcard + Pipe + Redirect  │
  │     = Terminal Mastery           │
  └──────────────────────────────────┘`,
          animation: "swoosh",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Advanced Terminal Cheat Sheet

### Wildcards

| Pattern | Matches | Example |
|---|---|---|
| \`*\` | Any characters (zero or more) | \`*.txt\` → all text files |
| \`?\` | Exactly one character | \`file?.log\` → \`file1.log\`, \`fileA.log\` |
| \`*.js\` | All JavaScript files | \`ls *.js\` → \`app.js  index.js\` |
| \`project*\` | Anything starting with "project" | \`rm project*\` → deletes \`project1\`, \`project-old\`, etc. |

### Pipes

The pipe (\`|\`) sends the output of one command into the input of the next. This is one of the most powerful concepts in Unix.

| Command | What it does |
|---|---|
| \`ls \\| grep txt\` | List files, then filter to lines containing "txt" |
| \`cat log.txt \\| grep error\` | Show only lines with "error" from a file |
| \`ls \\| wc -l\` | Count how many files are in the directory |
| \`history \\| grep git\` | Find all your past commands that used "git" |

You can chain as many pipes as you want: \`cat data.csv | grep "2026" | sort | head -5\` reads a file, filters to 2026, sorts alphabetically, and shows the first 5 results.

### Redirects

| Symbol | Effect | Example |
|---|---|---|
| \`>\` | Write to file (overwrites!) | \`echo "hello" > greet.txt\` |
| \`>>\` | Append to file (adds to end) | \`echo "world" >> greet.txt\` |
| \`2>\` | Redirect errors to a file | \`ls /fake 2> errors.txt\` |

**Warning:** \`>\` destroys existing content! Use \`>>\` when you want to keep what's already there.

### Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| **Tab** | Auto-complete file/folder names |
| **Up Arrow** | Previous command from history |
| **Ctrl+R** | Search through command history |
| **Ctrl+C** | Cancel / stop the current command |
| **Ctrl+L** | Clear the terminal screen |
| **Ctrl+A** | Move cursor to start of line |
| **Ctrl+E** | Move cursor to end of line |
| **Ctrl+D** | Exit the terminal session |

### Why Pipes Matter

Pipes embody the **Unix philosophy**: each tool does one thing well, and you combine them for complex tasks. Instead of building one giant program that does everything, Unix gives you tiny, sharp tools that snap together like LEGO bricks.

This philosophy shaped how ALL of modern computing works — from command lines to web APIs. Learning pipes isn't just a terminal trick; it's learning how programmers think.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Spell Casting Practice",
      description:
        "Test your new terminal spells in these challenges!",
      steps: [
        {
          instruction:
            "You have a folder full of mixed files. Find all the .txt files using a wildcard.",
          type: "type-command",
          data: {
            prompt: "# List only .txt files in this directory",
            expectedOutput: "notes.txt  quest.txt  loot.txt",
            caseSensitive: false,
            acceptAlternatives: ["ls ./*.txt"],
          },
          solution: "ls *.txt",
          hint: "Use ls with a wildcard pattern — the * matches any characters before .txt",
        },
        {
          instruction:
            "Complete the pipe command to search for \"error\" inside a log file.",
          type: "fill-blank",
          data: {
            template: "cat log.txt | ___ \"error\"",
            blanks: [{ id: "cmd", placeholder: "command" }],
          },
          solution: { cmd: ["grep", "GREP"] },
          hint: "The command that filters text by a search term starts with 'g'",
        },
        {
          instruction:
            "What does `>` do in `echo hello > file.txt`?",
          type: "multiple-choice",
          data: {
            options: [
              "Writes \"hello\" to file.txt (overwrites any existing content)",
              "Appends \"hello\" to the end of file.txt",
              "Deletes file.txt",
              "Compares \"hello\" with file.txt",
            ],
          },
          solution: 0,
          hint: "There are two redirect symbols: > and >>. One overwrites, one appends.",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What does pressing Tab in the terminal do?",
          type: "multiple-choice",
          options: [
            "Auto-completes file and folder names",
            "Deletes the current line",
            "Opens a new terminal window",
            "Runs the previous command",
          ],
          correctAnswer: 0,
          explanation:
            "Tab completion finishes file and folder names for you. Start typing, press Tab, and the terminal fills in the rest — saving time and preventing typos.",
        },
        {
          question: "What does the wildcard `*.js` match?",
          type: "multiple-choice",
          options: [
            "Only the file named *.js",
            "All files ending in .js",
            "All files containing the letter j",
            "Only JavaScript files in subdirectories",
          ],
          correctAnswer: 1,
          explanation:
            "The * wildcard matches any characters, so *.js matches every file whose name ends with .js — like app.js, index.js, utils.js, etc.",
        },
        {
          question:
            "In `ls | grep log`, what does the pipe (`|`) do?",
          type: "multiple-choice",
          options: [
            "Deletes files matching 'log'",
            "Creates a file called 'log'",
            "Sends the output of ls into grep as input",
            "Runs both commands at the same time",
          ],
          correctAnswer: 2,
          explanation:
            "The pipe takes everything ls outputs and feeds it into grep, which then filters to only show lines containing 'log'. It's a chain: output of one becomes input of the next.",
        },
        {
          question:
            "What's the difference between `>` and `>>`?",
          type: "multiple-choice",
          options: [
            "> reads from a file, >> writes to a file",
            "> overwrites a file, >> appends to a file",
            "> is for text, >> is for binary files",
            "There is no difference",
          ],
          correctAnswer: 1,
          explanation:
            "> overwrites the entire file with new content. >> adds new content to the end without erasing what was already there. Use >> when you want to keep existing data!",
        },
        {
          question: "What does Ctrl+C do in the terminal?",
          type: "multiple-choice",
          options: [
            "Copies selected text",
            "Clears the screen",
            "Cancels / stops the currently running command",
            "Closes the terminal",
          ],
          correctAnswer: 2,
          explanation:
            "Ctrl+C sends an interrupt signal that stops whatever is currently running. It's your panic button — if a command is stuck or running too long, Ctrl+C kills it.",
        },
      ],
    },
  ],
};

export default lesson;
