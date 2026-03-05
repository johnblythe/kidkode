"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GitBranchTree from "@/components/GitBranchTree";
import type { DragDropScenarioStep, GitTreeState } from "@/lib/git-branch-types";
import { useAudio } from "@/lib/audio/AudioContext";

interface DragDropStepProps {
  scenario: DragDropScenarioStep;
  onStepComplete: () => void;
}

export default function DragDropStep({
  scenario,
  onStepComplete,
}: DragDropStepProps) {
  const { sfx } = useAudio();
  const [tree, setTree] = useState<GitTreeState>(scenario.initialTree);
  const [completed, setCompleted] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showConflict, setShowConflict] = useState(false);
  const [conflictResolved, setConflictResolved] = useState(false);
  const [keyboardMode, setKeyboardMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [activeDropTarget, setActiveDropTarget] = useState<string | null>(null);

  const dropZoneRefs = useRef<Map<string, HTMLElement | SVGElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  const registerDropZone = useCallback(
    (id: string, el: HTMLElement | SVGElement | null) => {
      if (el) {
        dropZoneRefs.current.set(id, el);
      } else {
        dropZoneRefs.current.delete(id);
      }
    },
    []
  );

  // ── Hit detection ──
  const findDropTarget = useCallback(
    (pointerX: number, pointerY: number): string | null => {
      for (const [id, el] of dropZoneRefs.current.entries()) {
        const rect = el.getBoundingClientRect();
        const threshold = 30; // generous hit area
        if (
          pointerX >= rect.left - threshold &&
          pointerX <= rect.right + threshold &&
          pointerY >= rect.top - threshold &&
          pointerY <= rect.bottom + threshold
        ) {
          return id;
        }
      }
      return null;
    },
    []
  );

  // ── Validate and apply action ──
  const validateAction = useCallback(
    (itemIndex: number, targetId: string) => {
      const item = scenario.availableItems[itemIndex];
      if (!item) return;

      const expected = scenario.expectedAction;
      let isValid = false;

      if (item.type === "branch" && expected.type === "create-branch") {
        // For create-branch, target should be the forkFromCommit
        isValid = targetId === expected.target;
      } else if (item.type === "commit" && expected.type === "place-commit") {
        // For place-commit, target should be the branch tip
        isValid = targetId === expected.target;
      } else if (expected.type === "merge") {
        isValid = targetId === expected.target;
      }

      if (isValid) {
        sfx("correct-ding");

        // Check if this triggers a conflict
        if (scenario.triggerConflict && !conflictResolved) {
          setShowConflict(true);
          return;
        }

        // Apply result tree and mark complete
        setTree(scenario.resultTree);
        setCompleted(true);
        setHint(null);
        setTimeout(onStepComplete, 1500);
      } else {
        sfx("wrong-buzz");
        setHint(
          scenario.hint ?? "That's not quite right. Try a different target!"
        );
        setTimeout(() => setHint(null), 3000);
      }
    },
    [scenario, sfx, onStepComplete, conflictResolved]
  );

  // ── Drag move handler (highlight active target) ──
  const handleDrag = useCallback(
    (_: unknown, info: { point: { x: number; y: number } }) => {
      setActiveDropTarget(findDropTarget(info.point.x, info.point.y));
    },
    [findDropTarget]
  );

  // ── Drag end handler ──
  const handleDragEnd = useCallback(
    (itemIndex: number, info: { point: { x: number; y: number } }) => {
      setActiveDropTarget(null);
      const targetId = findDropTarget(info.point.x, info.point.y);
      if (!targetId) return;
      validateAction(itemIndex, targetId);
    },
    [findDropTarget, validateAction]
  );

  // ── Keyboard interaction ──
  const handleKeyboardSelect = useCallback(
    (itemIndex: number) => {
      if (completed) return;
      setKeyboardMode(true);
      setSelectedItem(itemIndex);
    },
    [completed]
  );

  const handleKeyboardPlace = useCallback(
    (targetId: string) => {
      if (selectedItem === null) return;
      validateAction(selectedItem, targetId);
      setSelectedItem(null);
    },
    [selectedItem, validateAction]
  );

  // ── Conflict resolution ──
  const resolveConflict = useCallback(() => {
    setShowConflict(false);
    setConflictResolved(true);
    setTree(scenario.resultTree);
    setCompleted(true);
    sfx("correct-ding");
    setTimeout(onStepComplete, 1500);
  }, [scenario.resultTree, sfx, onStepComplete]);

  // Compute which commit IDs are valid drop targets
  const dropZoneCommitIds = (() => {
    const expected = scenario.expectedAction;
    if (expected.type === "create-branch" || expected.type === "place-commit") {
      return [expected.target];
    }
    return [];
  })();

  const dropZoneBranchIds = (() => {
    if (scenario.expectedAction.type === "merge") {
      return [scenario.expectedAction.target];
    }
    return [];
  })();

  return (
    <div ref={containerRef}>
      {/* Instruction */}
      <p className="text-lg text-slate-200 mb-4">{scenario.instruction}</p>

      {/* Branch Tree */}
      <div className="mb-6 rpg-card p-4 bg-void/50" style={{ touchAction: "none" }}>
        <GitBranchTree
          tree={tree}
          dropZoneCommitIds={dropZoneCommitIds}
          dropZoneBranchIds={dropZoneBranchIds}
          onDropZoneRef={registerDropZone}
          activeDropTarget={activeDropTarget}
        />

        {/* Keyboard mode: target buttons overlaid */}
        {keyboardMode && selectedItem !== null && (
          <div className="mt-3 flex gap-2 flex-wrap">
            <span className="text-xs text-slate-400">Place on:</span>
            {dropZoneCommitIds.map((id) => (
              <button
                key={id}
                onClick={() => handleKeyboardPlace(id)}
                className="px-3 py-1 text-xs rounded-lg border border-gold-dim/40 text-gold-dim hover:text-gold hover:border-gold/60 transition-colors"
              >
                {id}
              </button>
            ))}
            {dropZoneBranchIds.map((id) => (
              <button
                key={id}
                onClick={() => handleKeyboardPlace(id)}
                className="px-3 py-1 text-xs rounded-lg border border-gold-dim/40 text-gold-dim hover:text-gold hover:border-gold/60 transition-colors"
              >
                {id}
              </button>
            ))}
            <button
              onClick={() => {
                setSelectedItem(null);
                setKeyboardMode(false);
              }}
              className="px-3 py-1 text-xs text-slate-500 hover:text-slate-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Palette - draggable items */}
      {!completed && scenario.availableItems.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gold-dim mb-2 uppercase tracking-wider font-bold">
            Drag to the tree:
          </p>
          <div className="flex flex-wrap gap-3">
            {scenario.availableItems.map((item, idx) => (
              <motion.div
                key={idx}
                drag
                dragSnapToOrigin
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
                onDrag={handleDrag}
                onDragEnd={(_, info) => handleDragEnd(idx, info)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rpg-card px-5 py-3 cursor-grab active:cursor-grabbing select-none touch-none"
                style={{ minWidth: 44, minHeight: 44 }}
                tabIndex={0}
                role="button"
                aria-label={`Drag ${item.label} to the tree`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleKeyboardSelect(idx);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {item.type === "branch" ? "🌿" : "📦"}
                  </span>
                  <span className="text-sm font-medium text-slate-200">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Observation-only step — no items to drag, just a Continue button */}
      {!completed && scenario.availableItems.length === 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCompleted(true);
            onStepComplete();
          }}
          className="mb-4 px-6 py-2.5 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-shadow"
        >
          Continue
        </motion.button>
      )}

      {/* Hint toast */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 rounded-lg bg-fire-red/10 border border-fire-red/40 text-fire-red text-sm text-center"
          >
            {hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scenario hint button */}
      {!completed && !showHint && scenario.hint && (
        <button
          onClick={() => setShowHint(true)}
          className="mb-4 px-4 py-2 text-sm text-mana-blue hover:text-mana-blue-bright transition-colors"
        >
          Need a hint?
        </button>
      )}
      {showHint && scenario.hint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 rounded-lg bg-mana-blue/10 border border-mana-blue/30 text-mana-blue-bright text-sm"
        >
          Hint: {scenario.hint}
        </motion.div>
      )}

      {/* Completion feedback */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-hp-green/10 border border-hp-green/40 text-hp-green-bright text-center font-bold"
          >
            Correct! Nice work!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conflict modal */}
      <AnimatePresence>
        {showConflict && scenario.triggerConflict && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rpg-card p-8 max-w-lg w-full glow-purple"
            >
              <h3 className="text-xl font-black text-fire-red mb-2">
                Merge Conflict!
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                Both branches changed the same thing. Which version do you want
                to keep?
              </p>

              <div className="space-y-3 mb-6">
                <button
                  onClick={resolveConflict}
                  className="rpg-card w-full p-4 text-left hover:border-gold/60 transition-colors cursor-pointer"
                >
                  <p className="text-sm font-mono text-gold-dim mb-1">
                    Option A:
                  </p>
                  <p className="text-slate-200 text-sm">
                    {scenario.triggerConflict.optionA}
                  </p>
                </button>
                <button
                  onClick={resolveConflict}
                  className="rpg-card w-full p-4 text-left hover:border-gold/60 transition-colors cursor-pointer"
                >
                  <p className="text-sm font-mono text-mana-blue mb-1">
                    Option B:
                  </p>
                  <p className="text-slate-200 text-sm">
                    {scenario.triggerConflict.optionB}
                  </p>
                </button>
              </div>

              <p className="text-xs text-slate-400 italic">
                {scenario.triggerConflict.explanation}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
