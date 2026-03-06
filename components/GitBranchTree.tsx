"use client";

import { motion } from "framer-motion";
import type { GitTreeState, GitBranchDef } from "@/lib/git-branch-types";
import {
  NODE_RADIUS,
  LABEL_OFFSET_X,
  computeLayout,
  type LayoutNode,
} from "@/lib/git-branch-layout";

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
}: {
  node: LayoutNode;
  delay: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <circle
        cx={node.x}
        cy={node.y}
        r={NODE_RADIUS}
        fill={node.isPhantom ? "transparent" : "#0a0a1a"}
        stroke={node.color}
        strokeWidth={node.isPhantom ? 2 : 3}
        strokeDasharray={node.isPhantom ? "4 3" : undefined}
        opacity={node.isPhantom ? 0.6 : 1}
      />
      {node.commit.message && (
        <text
          x={node.x + LABEL_OFFSET_X}
          y={node.y + 4}
          fill="#e2e8f0"
          fontSize={12}
          fontFamily="monospace"
        >
          {node.commit.message}
        </text>
      )}
    </motion.g>
  );
}

function ForkLine({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
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
  const labelWidth = branch.name.length * 7.5 + 16;
  return (
    <motion.g
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <rect
        x={x - labelWidth / 2}
        y={y - 30}
        width={labelWidth}
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
}

export default function GitBranchTree({ tree }: GitBranchTreeProps) {
  const { layoutBranches, forkLines, mergeLines, totalWidth, totalHeight } =
    computeLayout(tree);

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="w-full min-w-[300px]"
        style={{ maxHeight: "500px" }}
      >
        {forkLines.map((fl, i) => (
          <ForkLine key={`fork-${i}`} {...fl} />
        ))}

        {mergeLines.map((ml, i) => (
          <ForkLine key={`merge-${i}`} {...ml} />
        ))}

        {layoutBranches.map((lb) => (
          <BranchLine
            key={lb.branch.id}
            nodes={lb.nodes}
            color={lb.color}
            pattern={lb.branch.pattern}
          />
        ))}

        {layoutBranches.map((lb) =>
          lb.nodes.map((node, ni) => (
            <CommitNode
              key={node.commit.id}
              node={node}
              delay={0.1 + ni * 0.08}
            />
          ))
        )}

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
