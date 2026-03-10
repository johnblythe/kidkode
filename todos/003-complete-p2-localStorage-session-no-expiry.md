---
status: complete
priority: p2
issue_id: "003"
tags: [security, auth, code-review]
dependencies: []
---

# localStorage session has no expiry or invalidation

## Problem Statement

The `userId` stored in localStorage persists indefinitely — no TTL, no server-side invalidation. If a userId is deleted from the DB (child account removed) or a parent/child relationship changes, the stale session silently produces null returns from `getProfile`. The dashboard already handles null profiles by signing out; but other edge cases (e.g., role change) aren't handled.

## Findings

- `lib/hooks/useActiveUser.ts` — no TTL logic
- `lib/progress-client.ts` — no TTL on `setActiveUser`
- `app/page.tsx:61` — handles null profile by signing out ✓ (partially fixed)
- `app/parent/page.tsx` — handles role mismatch by redirecting ✓ (fixed in PR #32 security commit)

## Proposed Solutions

### Option A: Add session timestamp + 7-day expiry
```ts
// In signIn():
localStorage.setItem(STORAGE_KEYS.sessionExpiry, String(Date.now() + 7 * 24 * 60 * 60 * 1000));

// In useActiveUser useEffect:
const expiry = localStorage.getItem(STORAGE_KEYS.sessionExpiry);
if (expiry && Date.now() > Number(expiry)) {
  // Session expired — clear and redirect to login
  signOut();
  return;
}
```

### Option B: Verify session on every page load (server-side)
The `loadDashboard` Server Action already calls `getProfile` which returns null if userId doesn't exist in DB. The null case triggers `signOut()` + redirect. This is an implicit expiry — no additional code needed for the common case.

**Recommendation:** Option B is already mostly handled. Add Option A as a UX polish (prevents a round-trip to DB just to discover stale session).

## Acceptance Criteria
- [ ] Stale localStorage session (userId not in DB) triggers auto-signout
- [ ] Session older than 7 days prompts re-login
- [ ] No impact on active sessions

## Work Log
- 2026-03-09: Identified during security/architecture review of PR #32
