import { Lesson } from "@/lib/types";

const lesson: Lesson = {
  slug: "databases",
  title: "Databases: The Inventory System",
  description:
    "Learn how apps store and retrieve data using databases — the ultimate inventory management system!",
  order: 5,
  estimatedMinutes: 15,
  xpReward: 150,
  icon: "\u{1F5C4}\uFE0F",
  boss: {
    name: "The Null Pointer",
    description: "A void entity that consumes data into nothingness",
    sprite: "nullPointer",
    maxHp: 120,
    playerMaxHp: 3,
    damagePerCorrect: 24,
    attackNames: [
      "NULL Reference!",
      "Data Corruption!",
      "Table Drop!",
      "Syntax Error Storm!",
    ],
    defeatText:
      "The void collapses as your queries return perfect results!",
  },
  sections: [
    // ========== SLIDES ==========
    {
      type: "slides",
      frames: [
        {
          title: "Your Game's Inventory",
          content:
            "Every RPG has an inventory system. Swords, potions, gold — where does the game **store** all that stuff?\n\nThe answer: a **DATABASE**.\n\nA database is just an organized place to keep information so you can find it again later.",
          visual: `
  ┌──────────────────────────────┐
  │  ⚔️  INVENTORY              │
  │ ┌──────┬──────┬──────┐      │
  │ │Sword │Potion│Shield│      │
  │ │ x1   │ x5   │ x2   │      │
  │ ├──────┼──────┼──────┤      │
  │ │Bow   │Gold  │Ring  │      │
  │ │ x1   │ x340 │ x1   │      │
  │ └──────┴──────┴──────┘      │
  │  Where does all this live?  │
  └──────────────────────────────┘`,
          animation: "fade",
        },
        {
          title: "Tables = Organized Chests",
          content:
            "A database **table** is like a spreadsheet or an organized chest.\n\n**Columns** = what info to track (name, type, power)\n**Rows** = individual items (each sword, each potion)\n\nEvery item gets its own row. Every detail gets its own column.",
          visual: `
  ┌────────────────────────────────────┐
  │  TABLE: inventory                  │
  ├──────┬─────────┬────────┬──────┤
  │  id  │  name   │  type  │ power│
  ├──────┼─────────┼────────┼──────┤
  │  1   │ Flame   │ sword  │  85  │
  │  2   │ Mega    │ potion │  75  │
  │  3   │ Iron    │ shield │  60  │
  │  4   │ Storm   │ bow    │  70  │
  └──────┴─────────┴────────┴──────┘`,
          animation: "slide-left",
        },
        {
          title: "CRUD: The Four Powers",
          content:
            "There are only **4 things** you can do with data. Just four!\n\n**C**reate — add new items\n**R**ead — look at items\n**U**pdate — change items\n**D**elete — remove items\n\nEvery app you use — games, social media, everything — is just CRUD operations on a database.",
          visual: `
  ┌─────────────────────────────┐
  │  C.R.U.D.                   │
  │                             │
  │  C → ✨ Create (add new)   │
  │  R → 👀 Read   (look up)   │
  │  U → ✏️  Update (change)   │
  │  D → 🗑️  Delete (remove)   │
  │                             │
  │  That's it. That's all.     │
  └─────────────────────────────┘`,
          animation: "pop",
        },
        {
          title: "SQL: Speaking to the Database",
          content:
            "**SQL** (Structured Query Language) is the language you use to talk to databases.\n\nIt's like casting spells — each command does something specific.\n\nYou write a SQL **query**, and the database does what you asked.",
          visual: `
  ┌─────────────────────────────────────┐
  │  🧙 SPELL CAST:                    │
  │                                     │
  │  SELECT * FROM inventory            │
  │    WHERE type = 'sword'             │
  │                                     │
  │  ✨ Result: all your swords!        │
  └─────────────────────────────────────┘`,
          animation: "swoosh",
        },
        {
          title: "SELECT — The Read Spell",
          content:
            'The most common SQL command is **SELECT**.\n\n`SELECT columns FROM table WHERE condition`\n\nIt\'s like asking: *"Show me all swords that deal more than 50 damage."*\n\n`SELECT name, power FROM inventory WHERE type = \'sword\' AND power > 50`',
          visual: `
  ┌──────────────────────────────────┐
  │  SELECT name, power              │
  │  FROM   inventory                │
  │  WHERE  type = 'sword'           │
  │  AND    power > 50               │
  │                                  │
  │  ┌─────────┬───────┐            │
  │  │ name    │ power │            │
  │  ├─────────┼───────┤            │
  │  │ Flame   │  85   │            │
  │  │ Thunder │  92   │            │
  │  └─────────┴───────┘            │
  └──────────────────────────────────┘`,
          animation: "slide-up",
        },
        {
          title: "INSERT, UPDATE, DELETE",
          content:
            "The other three spells:\n\n**INSERT INTO** = add a new row\n`INSERT INTO inventory (name, type, power) VALUES ('Ice Staff', 'staff', 88)`\n\n**UPDATE SET WHERE** = change existing data\n`UPDATE inventory SET power = 95 WHERE name = 'Flame'`\n\n**DELETE FROM WHERE** = remove data\n`DELETE FROM inventory WHERE name = 'Broken Stick'`",
          visual: `
  ┌──────────────────────────────────┐
  │  INSERT → ✨ New row appears     │
  │  UPDATE → ✏️  Row changes        │
  │  DELETE → 💨 Row vanishes        │
  │                                  │
  │  ⚠️  Always use WHERE with       │
  │  DELETE and UPDATE!              │
  │  Without it = affects ALL rows!  │
  └──────────────────────────────────┘`,
          animation: "page-flip",
        },
      ],
    },

    // ========== READING ==========
    {
      type: "reading",
      estimatedMinutes: 5,
      content: `## Database Cheat Sheet

### CRUD to SQL Mapping

| CRUD Operation | SQL Command | Example |
|---|---|---|
| **Create** | \`INSERT INTO\` | \`INSERT INTO inventory (name, type, power) VALUES ('Mega Potion', 'potion', 75)\` |
| **Read** | \`SELECT\` | \`SELECT * FROM inventory WHERE type = 'sword'\` |
| **Update** | \`UPDATE\` | \`UPDATE inventory SET power = 100 WHERE name = 'Flame'\` |
| **Delete** | \`DELETE\` | \`DELETE FROM inventory WHERE name = 'Broken Stick'\` |

### Query Examples (Inventory Theme)

**Find all healing potions with power above 50:**
\`\`\`sql
SELECT * FROM potions WHERE healing > 50
\`\`\`

**Add a legendary sword:**
\`\`\`sql
INSERT INTO inventory (name, type, power, rarity)
VALUES ('Excalibur', 'sword', 999, 'legendary')
\`\`\`

**Upgrade a weapon's power:**
\`\`\`sql
UPDATE inventory SET power = 150
WHERE name = 'Storm Bow'
\`\`\`

**Remove all broken items:**
\`\`\`sql
DELETE FROM inventory WHERE condition = 'broken'
\`\`\`

### SQL vs NoSQL

| SQL Databases | NoSQL Databases |
|---|---|
| Organized shelves with labels | Flexible bags you can toss anything in |
| Data in rows and columns | Data as documents, key-value pairs, etc. |
| Strict structure (schema) | Flexible structure |
| Great for: user accounts, inventory, orders | Great for: chat messages, game state, real-time data |
| Examples: PostgreSQL, MySQL | Examples: MongoDB, Firebase |

### Golden Rules

1. **Always use WHERE with DELETE and UPDATE** — without it, you affect EVERY row in the table. \`DELETE FROM inventory\` with no WHERE? You just deleted your entire inventory!

2. **Back up before big changes** — before running a big UPDATE or DELETE, make sure you have a backup. In game terms: save before the boss fight.

3. **Use descriptive column names** — \`power\` is better than \`p\`. \`player_name\` is better than \`pn\`. Future-you will thank present-you.

4. **Start with SELECT** — before you UPDATE or DELETE, run a SELECT with the same WHERE clause first. See what you're about to change before you change it.`,
    },

    // ========== INTERACTIVE ==========
    {
      type: "interactive",
      title: "SQL Spellcasting",
      description: "Write SQL queries to manage your RPG inventory!",
      steps: [
        {
          instruction:
            "Write a SELECT query to find all swords from the inventory table!",
          type: "fill-blank",
          data: {
            template:
              "___  *  ___  inventory  ___  type = 'sword'",
            blanks: [
              { id: "select", placeholder: "keyword", width: 6 },
              { id: "from", placeholder: "keyword", width: 4 },
              { id: "where", placeholder: "keyword", width: 5 },
            ],
          },
          solution: {
            select: ["SELECT", "select"],
            from: ["FROM", "from"],
            where: ["WHERE", "where"],
          },
          hint: "The three SQL keywords are: SELECT (choose), FROM (source), WHERE (filter)",
        },
        {
          instruction: "Insert a new healing potion into the inventory!",
          type: "fill-blank",
          data: {
            template:
              "___  ___  inventory (name, type, power)  ___  ('Mega Potion', 'potion', 75)",
            blanks: [
              { id: "insert", placeholder: "keyword", width: 6 },
              { id: "into", placeholder: "keyword", width: 4 },
              { id: "values", placeholder: "keyword", width: 6 },
            ],
          },
          solution: {
            insert: ["INSERT", "insert"],
            into: ["INTO", "into"],
            values: ["VALUES", "values"],
          },
          hint: "INSERT INTO table (columns) VALUES (data)",
        },
        {
          instruction:
            "Put the CRUD operations in the order of a typical data lifecycle!",
          type: "sequence",
          data: {
            items: [
              {
                id: "create",
                text: "CREATE \u2014 Add new data",
                description: "First, data must be born",
              },
              {
                id: "read",
                text: "READ \u2014 View the data",
                description: "Then we look at what we have",
              },
              {
                id: "update",
                text: "UPDATE \u2014 Modify the data",
                description: "Change it as needed",
              },
              {
                id: "delete",
                text: "DELETE \u2014 Remove the data",
                description:
                  "Finally, clean up what's no longer needed",
              },
            ],
            correctOrder: ["create", "read", "update", "delete"],
          },
          hint: "The acronym spells CRUD \u2014 in that exact order!",
        },
      ],
    },

    // ========== QUIZ ==========
    {
      type: "quiz",
      passingScore: 60,
      questions: [
        {
          question: "What does CRUD stand for?",
          type: "multiple-choice",
          options: [
            "Create, Read, Update, Delete",
            "Copy, Run, Undo, Debug",
            "Connect, Retrieve, Upload, Download",
            "Compile, Render, Use, Deploy",
          ],
          correctAnswer: 0,
          explanation:
            "CRUD stands for Create, Read, Update, Delete \u2014 the four fundamental operations you can perform on data in a database.",
        },
        {
          question: "Which SQL keyword is used to retrieve data?",
          type: "multiple-choice",
          options: ["INSERT", "SELECT", "UPDATE", "DELETE"],
          correctAnswer: 1,
          explanation:
            "SELECT is the SQL command used to read/retrieve data from a database. It's like asking the database to show you specific information.",
        },
        {
          question:
            "What's the difference between a row and a column in a database table?",
          type: "multiple-choice",
          options: [
            "They are the same thing",
            "A column defines a type of data; a row is one record/entry",
            "A row defines a type of data; a column is one record/entry",
            "Rows are for numbers, columns are for text",
          ],
          correctAnswer: 1,
          explanation:
            "A column defines what kind of data is stored (like 'name' or 'power'), while a row is one complete record \u2014 one item in your inventory.",
        },
        {
          question: "Why should you ALWAYS use WHERE with DELETE?",
          type: "multiple-choice",
          options: [
            "It makes the query run faster",
            "The database won't work without it",
            "Without WHERE, it deletes ALL rows in the table",
            "WHERE is required by law",
          ],
          correctAnswer: 2,
          explanation:
            "Without a WHERE clause, DELETE FROM inventory would delete EVERY single row in the table. WHERE lets you target only specific rows.",
        },
        {
          question: "What is NoSQL?",
          type: "multiple-choice",
          options: [
            "A programming language for games",
            "A type of database that doesn't use traditional table structure",
            "A command to delete SQL databases",
            "A newer version of SQL",
          ],
          correctAnswer: 1,
          explanation:
            "NoSQL databases store data in flexible formats like documents or key-value pairs instead of rigid tables with rows and columns.",
        },
      ],
    },
  ],
};

export default lesson;
