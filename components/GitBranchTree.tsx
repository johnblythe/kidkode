"use client";

import { motion } from "framer-motion";
import type { GitTreeState, GitBranchDef, GitCommitNode } from "@/lib/git-branch-types";

// ── Layout Constants ──
const NODE_RADIUS = 16;
const NODE_SPACING_Y = 70;
const BRANCH_SPACING_X = 160;
const PADDING_TOP = 40;
const PADDING_LEFT = 30;
const LABEL_OFFSET_X = 28;

// ── Color map: tailwind token → hex ──
const COLOR_MAP: Record<string, string> = {
  gold: "#fbbf24",
  "mana-blue": "#60a5fa",
  "hp-green": "#22c55e",
  "fire-red": "#ef4444",
  "xp-purple": "#a855f7",
};

function resolveColor(token: string): string {
  return COLOR_MAP[token] ?? token;
}

// ── Layout helpers ──

interface LayoutNode {
  commit: GitCommitNode;
  x: number;
  y: number;
  color: string;
}

interface LayoutBranch {
  branch: GitBranchDef;
  x: number;
  color: string;
  nodes: LayoutNode[];
}

function computeLayout(tree: GitTreeState) {
  // Assign x position per branch (main = 0, others stacked right)
  const branchOrder = tree.branches.map((b) => b.id);
  const branchXMap = new Map<string, number>();
  branchOrder.forEach((id, i) => {
    branchXMap.set(id, PADDING_LEFT + i * BRANCH_SPACING_X);
  });

  // Group commits by branch, sorted by position
  const commitsByBranch = new Map<string, GitCommitNode[]>();
  for (const c of tree.commits) {
    const list = commitsByBranch.get(c.branch) ?? [];
    list.push(c);
    commitsByBranch.set(c.branch, list);
  }
  for (const list of commitsByBranch.values()) {
    list.sort((a, b) => a.position - b.position);
  }

  // Compute global y position for each commit
  // Main branch commits get sequential y. Feature branch commits start at fork point.
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
      // If this y slot is already occupied on main, push down
      while ([...commitYMap.values()].includes(startY) && commitsByBranch.get(mainBranch.id)?.some(mc => commitYMap.get(mc.id) === startY)) {
        // Check if there's a main commit at this y — if so, it's fine to share the row
        break;
      }
      commitYMap.set(c.id, startY);
      startY++;
      if (startY > globalY) globalY = startY;
    }
  }

  // Build layout nodes
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

  const totalHeight = PADDING_TOP + globalY * NODE_SPACING_Y + 40;
  const totalWidth = PADDING_LEFT + tree.branches.length * BRANCH_SPACING_X + 60;

  // Compute fork lines (from parent branch commit to first child branch commit)
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
  // Look for merge commits (commits on main that have a branch merging into them)
  // We detect these by commits whose id starts with "merge-"
  for (const lb of layoutBranches) {
    for (const node of lb.nodes) {
      if (node.commit.id.startsWith("merge-")) {
        // Find the last commit of the source branch
        const sourceId = node.commit.id.replace("merge-", "");
        // Find the branch that was merged
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

// ── Components ──

function BranchLine({
  nodes,
  color,
  pattern,
}: {
  nodes: LayoutNode[];
  color: string;
  pattern: "solid" | "dashed";
}) {
  if (nodes.length < 2) return null;
  const d = nodes
    .map((n, i) => `${i === 0 ? "M" : "L"} ${n.x} ${n.y}`)
    .join(" ");

  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={3}
      strokeDasharray={pattern === "dashed" ? "8 4" : undefined}
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
}

function CommitNode({
  node,
  delay,
  highlightAsDropZone,
  dropZoneRef,
}: {
  node: LayoutNode;
  delay: number;
  highlightAsDropZone?: boolean;
  dropZoneRef?: (el: HTMLElement | SVGElement | null) => void;
}) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Drop zone highlight */}
      {highlightAsDropZone && (
        <circle
          cx={node.x}
          cy={node.y}
          r={NODE_RADIUS + 6}
          fill="none"
          stroke={node.color}
          strokeWidth={2}
          strokeDasharray="4 3"
          opacity={0.5}
          className="animate-pulse"
        />
      )}
      {/* Node circle */}
      <circle
        ref={dropZoneRef as React.Ref<SVGCircleElement>}
        cx={node.x}
        cy={node.y}
        r={NODE_RADIUS}
        fill="#0a0a1a"
        stroke={node.color}
        strokeWidth={3}
        data-commit-id={node.commit.id}
        data-branch-id={node.commit.branch}
      />
      {/* Message label */}
      <text
        x={node.x + LABEL_OFFSET_X}
        y={node.y + 5}
        fill="#e2e8f0"
        fontSize={12}
        fontFamily="monospace"
      >
        {node.commit.message}
      </text>
    </motion.g>
  );
}

function ForkLine({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  // Curved path from parent commit to first child commit
  const midY = (y1 + y2) / 2;
  const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={2}
      strokeDasharray="6 3"
      fill="none"
      opacity={0.6}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.6 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    />
  );
}

function BranchLabel({
  branch,
  x,
  y,
  color,
}: {
  branch: GitBranchDef;
  x: number;
  y: number;
  color: string;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <rect
        x={x - 30}
        y={y - 30}
        width={60}
        height={18}
        rx={4}
        fill={color}
        opacity={0.15}
        stroke={color}
        strokeWidth={1}
      />
      <text
        x={x}
        y={y - 17}
        fill={color}
        fontSize={11}
        fontWeight="bold"
        fontFamily="monospace"
        textAnchor="middle"
      >
        {branch.name}
      </text>
    </motion.g>
  );
}

// ── Main Component ──

export interface GitBranchTreeProps {
  tree: GitTreeState;
  /** IDs of commits that should show as drop zones */
  dropZoneCommitIds?: string[];
  /** IDs of branches that should show as drop zones */
  dropZoneBranchIds?: string[];
  /** Ref callback for registering drop zone elements */
  onDropZoneRef?: (id: string, el: HTMLElement | SVGElement | null) => void;
}

export default function GitBranchTree({
  tree,
  dropZoneCommitIds = [],
  dropZoneBranchIds = [],
  onDropZoneRef,
}: GitBranchTreeProps) {
  const { layoutBranches, forkLines, mergeLines, totalWidth, totalHeight } =
    computeLayout(tree);

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="w-full min-w-[400px]"
        style={{ maxHeight: "500px" }}
      >
        {/* Fork lines */}
        {forkLines.map((fl, i) => (
          <ForkLine key={`fork-${i}`} {...fl} />
        ))}

        {/* Merge lines */}
        {mergeLines.map((ml, i) => (
          <ForkLine key={`merge-${i}`} {...ml} />
        ))}

        {/* Branch lines */}
        {layoutBranches.map((lb) => (
          <BranchLine
            key={lb.branch.id}
            nodes={lb.nodes}
            color={lb.color}
            pattern={lb.branch.pattern}
          />
        ))}

        {/* Commit nodes */}
        {layoutBranches.map((lb) =>
          lb.nodes.map((node, ni) => (
            <CommitNode
              key={node.commit.id}
              node={node}
              delay={0.1 + ni * 0.08}
              highlightAsDropZone={dropZoneCommitIds.includes(node.commit.id)}
              dropZoneRef={
                onDropZoneRef
                  ? (el) => onDropZoneRef(node.commit.id, el)
                  : undefined
              }
            />
          ))
        )}

        {/* Branch labels */}
        {layoutBranches.map((lb) => {
          const firstNode = lb.nodes[0];
          if (!firstNode) return null;
          return (
            <BranchLabel
              key={`label-${lb.branch.id}`}
              branch={lb.branch}
              x={firstNode.x}
              y={firstNode.y}
              color={lb.color}
            />
          );
        })}
      </svg>
    </div>
  );
}
