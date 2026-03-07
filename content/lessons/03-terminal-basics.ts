import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "terminal-basics",
  title: "Terminal: The Dungeon Console",
  description:
    "Learn how the terminal works — the command-line interface where you type instructions to control your computer like a dungeon narrator.",
  order: 3,
  estimatedMinutes: 12,
  xpReward: 100,
  icon: "⌨️",
  boss: {
    name: "Permission Denied Golem",
    description: "A stone guardian that blocks all unauthorized access",
    sprite: "golem",
    maxHp: 100,
    playerMaxHp: 3,
    damagePerCorrect: 20,
    attackNames: [
      "Permission Denied!",
      "Access Forbidden!",
      "Read-Only Strike!",
    ],
    defeatText: "The Golem crumbles as you master the command line!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "The Dungeon Console",
          content:
            "The **terminal** is how you TALK to your computer. No buttons, no menus — just you typing commands.\n\nThink of it like a **dungeon narrator** that only understands specific commands. Type the right words, and things happen.",
          visual: `
  ┌──────────────────────────────────┐
  │  ⌨️  THE DUNGEON CONSOLE        │
  │                                  │
  │  $  _                            │
  │                                  │
  │  You see a blinking cursor.      │
  │  The dungeon awaits your         │
  │  command...                      │
  │                                  │
  │  > Type wisely, adventurer.      │
  └──────────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "pwd — Where Am I?",
          content:
            "Lost in the dungeon? **`pwd`** (Print Working Directory) shows you exactly where you are.\n\nIt's like checking your **dungeon map** — it tells you which room (folder) you're currently standing in.",
          visual: `
  $ pwd
  /home/quest/dungeon/level-3

  ┌── Directory Map ──────────┐
  │  /home                    │
  │   └── quest               │
  │        └── dungeon        │
  │             └── level-3   │  ← YOU ARE HERE
  │                  ├── loot │
  │                  └── trap │
  └───────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "ls — What's Around Me?",
          content:
            "**`ls`** (list) shows you everything in the current room.\n\nFiles are like **items on the ground**. Folders are like **doors to other rooms**. Use `ls` to look around before you move.",
          visual: `
  $ ls
  treasure.txt  monsters/  potions/  map.png

  ┌── Room Contents ─────────────┐
  │                               │
  │  📄 treasure.txt  (item)      │
  │  📁 monsters/     (door →)    │
  │  📁 potions/      (door →)    │
  │  🖼️  map.png       (item)     │
  │                               │
  └───────────────────────────────┘`,
          animation: "slide-left",
        },
        {
          title: "cd — Move to Another Room",
          content:
            "**`cd`** (change directory) moves you through dungeon doors.\n\n- `cd monsters` — walk into the monsters room\n- `cd ..` — go BACK one room (retreat!)\n- `cd /` — teleport to the top of the dungeon",
          visual: `
  $ cd monsters
  $ pwd
  /home/quest/dungeon/level-3/monsters

  ┌────────┐     ┌────────────┐
  │level-3 │────→│ monsters/  │
  │  (old) │ cd  │  (new!)    │
  │        │     │            │
  └────────┘     │ dragon.txt │
      ↑          │ goblin.txt │
    cd ..        └────────────┘`,
          animation: "slide-up",
        },
        {
          title: "mkdir & touch — Create Things",
          content:
            "**`mkdir`** makes new folders (rooms). **`touch`** makes new files (items).\n\nYou're not just exploring the dungeon — you're **building** it!\n\n- `mkdir armory` — build a new room\n- `touch sword.txt` — create a new item",
          visual: `
  $ mkdir armory
  $ touch armory/sword.txt
  $ ls armory
  sword.txt

  BEFORE:              AFTER:
  ┌──────────┐        ┌──────────┐
  │ level-3  │        │ level-3  │
  │          │   →    │ armory/  │
  │          │        │  sword   │
  └──────────┘        └──────────┘`,
          animation: "swoosh",
        },
        {
          title: "rm — Destroy with Caution ⚠️",
          content:
            "**`rm`** removes files. **`rm -r`** removes folders and everything inside.\n\nThere is **no undo**. No recycle bin. No second chances.\n\n**DANGER ZONE:** `rm -rf /` would try to delete EVERYTHING on your entire computer. Never, ever run this. It's the self-destruct button of the terminal.",
          visual: `
  ┌─── DANGER ZONE ──────────────┐
  │                               │
  │  rm file.txt     ← OK        │
  │  rm -r folder/   ← Careful!  │
  │  rm -rf /        ← ☠️ NEVER! │
  │                               │
  │  There is NO recycle bin      │
  │  in the terminal.             │
  │  Deleted = GONE forever.      │
  │                               │
  └───────────────────────────────┘`,
          animation: "fade",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 4,
      content: `## Terminal Command Cheat Sheet

### Essential Commands

| Command | What it does | Example |
|---|---|---|
| \`pwd\` | Print your current directory | \`pwd\` → \`/home/quest\` |
| \`ls\` | List files and folders | \`ls\` → \`notes.txt  projects/\` |
| \`ls -la\` | List ALL files (including hidden) with details | \`ls -la\` → shows permissions, sizes, dates |
| \`cd\` | Change directory (move to a folder) | \`cd projects\` |
| \`cd ..\` | Go up one directory level | \`cd ..\` → moves to parent folder |
| \`mkdir\` | Make a new directory (folder) | \`mkdir my-game\` |
| \`touch\` | Create a new empty file | \`touch index.html\` |
| \`rm\` | Remove (delete) a file | \`rm old-notes.txt\` |
| \`rm -r\` | Remove a folder and everything inside it | \`rm -r old-project\` |

### Danger Zone: rm -rf

The \`-r\` flag means "recursive" — delete the folder AND everything inside it. The \`-f\` flag means "force" — don't ask for confirmation.

**\`rm -rf /\`** would try to delete your ENTIRE file system. This is the most destructive command in computing. Modern systems have safeguards, but you should **never** experiment with it.

**Safe rules:**
- Always double-check what you're deleting with \`ls\` first
- Never use \`rm -rf\` with \`/\` or \`~\` (your home directory)
- When in doubt, move files to a "trash" folder instead of deleting

### Shortcuts That Save Time

- **Tab completion** — Start typing a file name, press Tab, and the terminal finishes it for you
- **Up arrow** — Cycle through your previous commands
- **Ctrl+C** — Cancel/stop whatever is running
- **clear** — Clean up the terminal screen

### Pro Tip: AI + Terminal

AI assistants like Claude and Cursor can help you write terminal commands! If you're not sure how to do something:

1. Describe what you want in plain English
2. The AI will give you the exact command
3. **Read the command before running it** — understand what it does
4. Run it!

Example: "How do I find all .txt files in this folder?" → \`ls *.txt\` or \`find . -name "*.txt"\`

The terminal is powerful, and AI makes it even more accessible. But always read commands before running them — especially anything with \`rm\`!`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "Terminal Training Ground",
      description:
        "Practice your terminal commands in this simulated console!",
      steps: [
        {
          instruction:
            "You just landed in a mysterious directory. First, find out WHERE you are. Type the command to print your working directory.",
          type: "type-command",
          data: {
            prompt: "# Type a command to see your current location",
            expectedOutput: "/home/quest/dungeon",
            caseSensitive: false,
          },
          solution: "pwd",
          hint: "The command is three letters — it stands for Print Working Directory",
        },
        {
          instruction:
            "Good! Now let's look around. Type the command to LIST what's in this directory.",
          type: "type-command",
          data: {
            prompt: "# List the contents of this directory",
            expectedOutput: "treasure.txt  monsters/  potions/  map.png",
            caseSensitive: false,
          },
          solution: "ls",
          hint: "Two letters — it stands for 'list'",
        },
        {
          instruction:
            "You want to set up camp! Create a new directory called 'my-quest' to store your adventure files.",
          type: "type-command",
          data: {
            prompt: "# Create a new directory called 'my-quest'",
            caseSensitive: false,
            acceptAlternatives: [
              "mkdir ./my-quest",
              "mkdir 'my-quest'",
              'mkdir "my-quest"',
            ],
          },
          solution: "mkdir my-quest",
          hint: "The command to 'make directory' is mkdir followed by the name",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What does the `pwd` command do?",
          type: "multiple-choice",
          options: [
            "Shows your current directory location",
            "Creates a new password",
            "Deletes the current folder",
            "Lists all files on the computer",
          ],
          correctAnswer: 0,
          explanation:
            "pwd stands for 'Print Working Directory' — it shows you exactly which folder you're currently in.",
        },
        {
          question: "Which command lists files in a directory?",
          type: "multiple-choice",
          options: ["cd", "ls", "rm", "pwd"],
          correctAnswer: 1,
          explanation:
            "ls stands for 'list' — it shows you all the files and folders in your current directory.",
        },
        {
          question: "What does `cd ..` do?",
          type: "multiple-choice",
          options: [
            "Creates a new directory",
            "Deletes the current directory",
            "Moves up one directory level",
            "Lists hidden files",
          ],
          correctAnswer: 2,
          explanation:
            "The '..' means 'parent directory'. So `cd ..` moves you up one level in the folder tree — like going back through a dungeon door.",
        },
        {
          question: "Which command creates a new empty file?",
          type: "multiple-choice",
          options: ["mkdir", "rm", "touch", "cd"],
          correctAnswer: 2,
          explanation:
            "touch creates a new empty file. For example, `touch notes.txt` creates a blank file called notes.txt.",
        },
        {
          question: "Why is `rm -rf /` extremely dangerous?",
          type: "multiple-choice",
          options: [
            "It shuts down the computer",
            "It changes your password",
            "It deletes everything on the entire system",
            "It disconnects from the internet",
          ],
          correctAnswer: 2,
          explanation:
            "rm -rf / recursively force-deletes starting from the root directory (/), which means it tries to erase every single file on the entire system. There is no undo!",
        },
      ],
    },
  ],
};

export default lesson;
