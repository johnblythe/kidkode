"use client";

import Link from "next/link";
import GitBranchTree from "@/components/GitBranchTree";
import type { GitTreeState } from "@/lib/git-branch-types";

const demoTree: GitTreeState = {
  branches: [
    { id: "main", name: "main", color: "gold", pattern: "solid" },
    {
      id: "feature",
      name: "feature",
      color: "mana-blue",
      pattern: "dashed",
      parentBranch: "main",
      forkFromCommit: "c2",
    },
  ],
  commits: [
    { id: "c1", message: "Initial commit", branch: "main", position: 0 },
    { id: "c2", message: "Add homepage", branch: "main", position: 1 },
    { id: "c3", message: "Fix header bug", branch: "main", position: 2 },
    { id: "f1", message: "Add search bar", branch: "feature", position: 0 },
    { id: "f2", message: "Style search", branch: "feature", position: 1 },
  ],
};

const mergedTree: GitTreeState = {
  branches: [
    { id: "main", name: "main", color: "gold", pattern: "solid" },
    {
      id: "feature",
      name: "feature",
      color: "mana-blue",
      pattern: "dashed",
      parentBranch: "main",
      forkFromCommit: "c2",
    },
  ],
  commits: [
    { id: "c1", message: "Initial commit", branch: "main", position: 0 },
    { id: "c2", message: "Add homepage", branch: "main", position: 1 },
    { id: "c3", message: "Fix header bug", branch: "main", position: 2 },
    { id: "f1", message: "Add search bar", branch: "feature", position: 0 },
    { id: "f2", message: "Style search", branch: "feature", position: 1 },
    { id: "merge-feature", message: "Merge feature", branch: "main", position: 3 },
  ],
};

export default function BranchTreePlayground() {
  return (
    <div className="min-h-screen bg-dungeon px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/playground"
            className="text-sm text-gold-dim hover:text-gold transition-colors"
          >
            &larr; Playground
          </Link>
          <h1 className="text-xl font-bold text-slate-200">
            Branch Tree Renderer
          </h1>
        </div>

        <div className="rpg-card p-6 mb-6">
          <h2 className="text-sm font-bold text-gold uppercase tracking-wider mb-4">
            Branched Tree
          </h2>
          <GitBranchTree tree={demoTree} />
        </div>

        <div className="rpg-card p-6">
          <h2 className="text-sm font-bold text-gold uppercase tracking-wider mb-4">
            Merged Tree
          </h2>
          <GitBranchTree tree={mergedTree} />
        </div>
      </div>
    </div>
  );
}
