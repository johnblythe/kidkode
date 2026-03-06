// Shared layout computation for git branch tree visualization
// Used by both GitBranchTree (SVG rendering) and DragDropStep (drop zone positioning)

import type { GitTreeState, GitBranchDef, GitCommitNode } from "@/lib/git-branch-types";

// ── Layout Constants ──
export const NODE_RADIUS = 10;
export const NODE_SPACING_Y = 56;
export const BRANCH_SPACING_X = 140;
export const PADDING_TOP = 40;
export const PADDING_LEFT = 30;
export const LABEL_OFFSET_X = 20;

// ── Color map: tailwind token → hex ──
export const COLOR_MAP: Record<string, string> = {
  gold: "#fbbf24",
  "mana-blue": "#60a5fa",
  "hp-green": "#22c55e",
  "fire-red": "#ef4444",
  "xp-purple": "#a855f7",
};

export function resolveColor(token: string): string {
  return COLOR_MAP[token] ?? token;
}

// ── Layout types ──

export interface LayoutNode {
  commit: GitCommitNode;
  x: number;
  y: number;
  color: string;
  isPhantom?: boolean;
}

export interface LayoutBranch {
  branch: GitBranchDef;
  x: number;
  color: string;
  nodes: LayoutNode[];
}

export interface TreeLayout {
  layoutBranches: LayoutBranch[];
  forkLines: Array<{ x1: number; y1: number; x2: number; y2: number; color: string }>;
  mergeLines: Array<{ x1: number; y1: number; x2: number; y2: number; color: string }>;
  totalWidth: number;
  totalHeight: number;
}

// ── Layout computation ──

export function computeLayout(tree: GitTreeState): TreeLayout {
  const branchOrder = tree.branches.map((b) => b.id);
  const branchXMap = new Map<string, number>();
  branchOrder.forEach((id, i) => {
    branchXMap.set(id, PADDING_LEFT + i * BRANCH_SPACING_X);
  });

  const commitsByBranch = new Map<string, GitCommitNode[]>();
  for (const c of tree.commits) {
    const list = commitsByBranch.get(c.branch) ?? [];
    list.push(c);
    commitsByBranch.set(c.branch, list);
  }
  for (const list of commitsByBranch.values()) {
    list.sort((a, b) => a.position - b.position);
  }

  const commitYMap = new Map<string, number>();
  let globalY = 0;

  // First pass: lay out main branch
  const mainBranch = tree.branches[0];
  const mainCommits = commitsByBranch.get(mainBranch.id) ?? [];
  for (const c of mainCommits) {
    commitYMap.set(c.id, globalY);
    globalY++;
  }

  // Second pass: lay out feature branches starting after their fork commit
  for (let i = 1; i < tree.branches.length; i++) {
    const branch = tree.branches[i];
    const commits = commitsByBranch.get(branch.id) ?? [];
    const forkCommit = branch.forkFromCommit;
    let startY = forkCommit && commitYMap.has(forkCommit)
      ? commitYMap.get(forkCommit)! + 1
      : 0;

    for (const c of commits) {
      commitYMap.set(c.id, startY);
      startY++;
      if (startY > globalY) globalY = startY;
    }
  }

  // Build layout branches
  const layoutBranches: LayoutBranch[] = tree.branches.map((branch) => {
    const bx = branchXMap.get(branch.id) ?? 0;
    const color = resolveColor(branch.color);
    const commits = commitsByBranch.get(branch.id) ?? [];
    const nodes: LayoutNode[] = commits.map((c) => ({
      commit: c,
      x: bx,
      y: PADDING_TOP + (commitYMap.get(c.id) ?? 0) * NODE_SPACING_Y,
      color,
    }));
    return { branch, x: bx, color, nodes };
  });

  // Add phantom tip node for branches with 0 commits but a forkFromCommit
  for (let i = 1; i < layoutBranches.length; i++) {
    const branch = tree.branches[i];
    const lb = layoutBranches[i];
    if (lb.nodes.length === 0 && branch.forkFromCommit) {
      const forkY = commitYMap.get(branch.forkFromCommit);
      if (forkY !== undefined) {
        const tipY = forkY + 1;
        lb.nodes.push({
          commit: { id: branch.id, message: "", branch: branch.id, position: 0 },
          x: lb.x,
          y: PADDING_TOP + tipY * NODE_SPACING_Y,
          color: lb.color,
          isPhantom: true,
        });
        if (tipY + 1 > globalY) globalY = tipY + 1;
      }
    }
  }

  const totalHeight = PADDING_TOP + globalY * NODE_SPACING_Y + 40;
  const totalWidth = PADDING_LEFT + tree.branches.length * BRANCH_SPACING_X + 60;

  // Compute fork lines
  const forkLines: Array<{ x1: number; y1: number; x2: number; y2: number; color: string }> = [];
  for (let i = 1; i < tree.branches.length; i++) {
    const branch = tree.branches[i];
    const firstNode = layoutBranches[i].nodes[0];
    if (branch.forkFromCommit && firstNode) {
      const parentNode = layoutBranches.flatMap((lb) => lb.nodes).find(
        (n) => n.commit.id === branch.forkFromCommit
      );
      if (parentNode) {
        forkLines.push({
          x1: parentNode.x,
          y1: parentNode.y,
          x2: firstNode.x,
          y2: firstNode.y,
          color: resolveColor(branch.color),
        });
      }
    }
  }

  // Compute merge lines
  const mergeLines: Array<{ x1: number; y1: number; x2: number; y2: number; color: string }> = [];
  for (const lb of layoutBranches) {
    for (const node of lb.nodes) {
      if (node.commit.id.startsWith("merge-")) {
        const sourceId = node.commit.id.replace("merge-", "");
        for (let i = 1; i < layoutBranches.length; i++) {
          const srcBranch = layoutBranches[i];
          if (srcBranch.branch.id === sourceId || srcBranch.branch.name === sourceId) {
            const lastSrcNode = srcBranch.nodes[srcBranch.nodes.length - 1];
            if (lastSrcNode) {
              mergeLines.push({
                x1: lastSrcNode.x,
                y1: lastSrcNode.y,
                x2: node.x,
                y2: node.y,
                color: srcBranch.color,
              });
            }
          }
        }
      }
    }
  }

  return { layoutBranches, forkLines, mergeLines, totalWidth, totalHeight };
}
