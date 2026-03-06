---
title: "Stacked PR merge fails with fast-forward error"
category: integration-issues
tags: [github, gh-cli, pull-requests, stacked-prs, deploy]
module: workflow/deploy
symptoms:
  - "gh pr merge fails with 'Not possible to fast-forward'"
  - "PR base branch is another feature branch, not main"
  - "PR shows MERGED on GitHub despite local error"
severity: P2
date_solved: "2026-03-05"
related_prs: ["#11", "#12"]
---

# Stacked PR Merge Fails with Fast-Forward Error

## Problem

During a deploy sequence, `gh pr merge 12 --squash --delete-branch` failed with:

```
fatal: Not possible to fast-forward, aborting.
warning: not possible to fast-forward to: "feat/drag-drop-git-branches"
```

The PR actually merged successfully on GitHub -- the error was a local fast-forward failure, not a remote merge failure.

## Symptoms

- `gh pr merge` reports `fatal: Not possible to fast-forward, aborting`
- PR shows as **MERGED** on GitHub despite the local error
- Changes land on the intermediate branch, not `main`

## Root Cause

PR #12 (`feat/real-animations-audit`) had its base branch set to `feat/drag-drop-git-branches` (PR #11), not `main`. This is the "stacked PR" pattern:

```
main
 └── PR #11 (feat/drag-drop-git-branches)
       └── PR #12 (feat/real-animations-audit)
```

When `gh pr merge 12 --squash` ran:

1. GitHub squash-merged #12 into `feat/drag-drop-git-branches` -- **this succeeded**
2. `gh` then tried to fast-forward the local checkout to match -- **this failed**
3. The local branch state diverged from the remote, so fast-forward was impossible

The error is misleading: the merge worked remotely, but `gh` conflates the local checkout update failure with the merge itself.

## Solution

### 1. Verify the PR actually merged

```bash
gh pr view 12 --json state,baseRefName
# {"state":"MERGED","baseRefName":"feat/drag-drop-git-branches"}
```

If `state` is `MERGED`, the squash-merge into the base branch succeeded. The error was local-only.

### 2. Merge the parent PR to get changes to main

```bash
gh pr merge 11 --squash --delete-branch
```

This brings both PR #11 and #12's changes (now squashed into #11's branch) onto `main`.

### 3. Clean up local branches

```bash
git checkout main && git pull
git branch -d feat/real-animations-audit 2>/dev/null
git branch -d feat/drag-drop-git-branches 2>/dev/null
```

## Prevention

- **Before merging**, check the PR's base branch:
  ```bash
  gh pr view <number> --json baseRefName
  ```
- If base is not `main`, either:
  - Rebase onto main first: `gh pr edit <number> --base main`
  - Or merge the parent PR first, then merge the child
- Avoid unintentional stacking -- when opening PRs, confirm the base branch is `main` unless stacking is deliberate

## Key Insight

`fatal: Not possible to fast-forward` from `gh pr merge` does **not** always mean the merge failed on GitHub. It can mean the local checkout cannot fast-forward to match the remote state. Always verify with `gh pr view --json state` before assuming failure.
