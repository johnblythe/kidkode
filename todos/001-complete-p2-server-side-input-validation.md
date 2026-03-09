---
status: complete
priority: p2
issue_id: "001"
tags: [security, validation, code-review]
dependencies: []
---

# Server-side input validation missing

## Problem Statement

`createUser()` and `createChild()` rely on client-side `maxLength={20}` for hero name validation. Any caller bypassing the UI can supply arbitrary-length strings, Unicode control characters, or RTL overrides. Email format is validated by the DB `UNIQUE` constraint but not format-checked server-side — `lookupUser` accepts `"not-an-email"` strings without error.

## Findings

- `app/actions/users.ts:54` — `createUser` has no hero name length/format validation
- `app/actions/users.ts:116` — `createChild` no hero name validation
- `app/actions/users.ts:19` — `lookupUser` normalizes email but doesn't validate format
- `supabase/migrations/001_init.sql` — `users.hero_name` has no CHECK constraint

## Proposed Solutions

### Option A: Add server-side guards in Server Actions (Recommended)
```ts
// In createUser() and createChild():
const heroName = input.heroName.trim();
if (!heroName || heroName.length > 20) throw new Error("INVALID_HERO_NAME");

// In lookupUser() and createUser():
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) throw new Error("INVALID_EMAIL");
```
Pros: Immediate fix, no migration needed
Cons: Validation split between TS and DB

### Option B: Add DB CHECK constraints too
```sql
ALTER TABLE users ADD CONSTRAINT chk_hero_name_length CHECK (char_length(hero_name) BETWEEN 1 AND 20);
```
Pros: Defense in depth
Cons: Requires a new migration

**Recommendation:** Option A now, Option B as follow-up.

## Acceptance Criteria
- [ ] `createUser` rejects hero names > 20 chars or empty
- [ ] `createChild` same validation
- [ ] `lookupUser` rejects non-email strings
- [ ] Error messages surfaced to user in UI

## Work Log
- 2026-03-09: Identified during security review of PR #32
