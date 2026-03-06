---
title: "Replace flatMap().find() in loop with pre-built Map for O(1) lookups"
category: performance-issues
tags: [javascript, typescript, performance, big-o, map-lookup, rendering]
module: lib/git-branch-layout
symptoms:
  - "flatMap().find() called inside loop over branches"
  - "Redundant array creation on every iteration"
  - "Scales poorly with tree size"
severity: P2
date_solved: "2026-03-05"
related_prs: ["#12"]
---

# Replace flatMap().find() in loop with pre-built Map for O(1) lookups

## Problem

In `lib/git-branch-layout.ts`, `computeLayout` computed fork lines by calling `flatMap().find()` inside a loop over branches:

```typescript
// BEFORE — O(n × m) where n=branches, m=total nodes
for (let i = 1; i < tree.branches.length; i++) {
  const branch = tree.branches[i];
  const firstNode = layoutBranches[i].nodes[0];
  if (branch.forkFromCommit && firstNode) {
    // flatMap rebuilds array and find scans it — EVERY iteration
    const parentNode = layoutBranches.flatMap((lb) => lb.nodes).find(
      (n) => n.commit.id === branch.forkFromCommit
    );
    // ...
  }
}
```

`flatMap` creates a new array of ALL nodes on every loop iteration, then `find` scans it linearly. For B branches and N total nodes this is O(B x N). Small now, but scales poorly.

## Solution

Pre-build a `Map<string, LayoutNode>` once, then do O(1) lookups:

```typescript
// AFTER — O(n + m) total
const nodeByCommitId = new Map<string, LayoutNode>();
for (const lb of layoutBranches) {
  for (const node of lb.nodes) {
    nodeByCommitId.set(node.commit.id, node);
  }
}

// Fork lines — O(1) lookup per branch
for (let i = 1; i < tree.branches.length; i++) {
  const branch = tree.branches[i];
  const firstNode = layoutBranches[i].nodes[0];
  if (branch.forkFromCommit && firstNode) {
    const parentNode = nodeByCommitId.get(branch.forkFromCommit);
    if (parentNode) {
      forkLines.push({
        x1: parentNode.x, y1: parentNode.y,
        x2: firstNode.x, y2: firstNode.y,
        color: resolveColor(branch.color),
      });
    }
  }
}
```

Same pattern applied to merge line computation.

## Key Insight

`array.flatMap().find()` inside a loop is a code smell. If you're searching the same collection repeatedly, build an index first. The Map takes O(n) to build but amortizes to O(1) per lookup.

## Prevention

- When you see `.find()` or `.filter()` inside a loop, consider a Map/Set index.
- Review rendering hot paths -- layout computation runs on every tree state change.
- ESLint rule `no-loop-func` catches some cases but not this pattern.
