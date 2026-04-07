# KidKode

## ⚠️ DATABASE — READ BEFORE ANY DB OPERATION

KidKode DB is at **port 55122**, not 54322.

- Correct: `psql postgresql://postgres:postgres@localhost:55122/postgres`
- Wrong: port 54322 = `supabase_db_travel` (a different project — do not touch)
- `supabase status` and `config.toml` both lie — they show 54322. Ignore them.
- Never use `supabase migration up`, `supabase db push`, or `supabase db reset` — they read the wrong port
- Apply migrations directly: `psql postgresql://postgres:postgres@localhost:55122/postgres -f supabase/migrations/NNN_name.sql`
- Use `npm run db` to open a psql shell against the correct DB

Background: twice now (2026-03-20, 2026-04-06) operations ran against the travel project's DB at 54322. On 2026-04-06 rows were inserted into its migration tracking table before being caught and reversed.

## Documented Solutions

`docs/solutions/` — solutions to past problems (bugs, best practices, patterns), organized by category with YAML frontmatter (`module`, `tags`, `problem_type`). Relevant when implementing or debugging in documented areas.
