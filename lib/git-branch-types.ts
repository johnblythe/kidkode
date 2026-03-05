// Types for the interactive git branch tree visualization

export interface GitCommitNode {
  id: string;
  message: string;
  branch: string;
  position: number; // order on branch (0-indexed)
}

export interface GitBranchDef {
  id: string;
  name: string;
  color: string; // tailwind token e.g. "gold", "mana-blue"
  pattern: "solid" | "dashed"; // colorblind-safe secondary indicator
  parentBranch?: string;
  forkFromCommit?: string;
}

export interface GitTreeState {
  branches: GitBranchDef[];
  commits: GitCommitNode[];
}

export interface DragDropScenarioStep {
  instruction: string;
  hint?: string;
  initialTree: GitTreeState;
  availableItems: Array<{
    type: "commit" | "branch";
    label: string;
    /** For commits: which branch to target. For branches: name of new branch */
    targetId?: string;
  }>;
  expectedAction: {
    type: "place-commit" | "create-branch" | "merge";
    target: string;
    source?: string;
  };
  /** Show after expected action completes */
  resultTree: GitTreeState;
  triggerConflict?: {
    optionA: string;
    optionB: string;
    explanation: string;
  };
}
