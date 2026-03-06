"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import GitBranchTree from "@/components/GitBranchTree";
import { computeLayout } from "@/lib/git-branch-layout";
import type { DragDropScenarioStep, GitTreeState } from "@/lib/git-branch-types";
import { useAudio } from "@/lib/audio/AudioContext";
import DraggableItem from "@/components/dnd/DraggableItem";
import DropZoneOverlay from "@/components/dnd/DropZoneOverlay";
import DragItemPreview from "@/components/dnd/DragItemPreview";

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
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);
  const [placedItems, setPlacedItems] = useState<Set<number>>(new Set());

  // SVG measurement for positioning overlays
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgScale, setSvgScale] = useState<{ scaleX: number; scaleY: number; offsetX: number; offsetY: number } | null>(null);

  const measureSvg = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const svg = container.querySelector("svg");
    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // The SVG viewBox dimensions
    const viewBox = svg.viewBox.baseVal;
    if (!viewBox || viewBox.width === 0 || viewBox.height === 0) return;

    // SVG with preserveAspectRatio="xMidYMid meet" (default) scales uniformly
    // and centers within its container. Compute the actual scale.
    const scaleX = svgRect.width / viewBox.width;
    const scaleY = svgRect.height / viewBox.height;

    // Offset of SVG within the container
    const offsetX = svgRect.left - containerRect.left;
    const offsetY = svgRect.top - containerRect.top;

    setSvgScale({ scaleX, scaleY, offsetX, offsetY });
  }, []);

  useEffect(() => {
    measureSvg();
    // Re-measure on resize
    const observer = new ResizeObserver(measureSvg);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [measureSvg, tree]);

  // ── Sensors ──
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(pointerSensor, keyboardSensor);

  // ── Compute layout + drop targets ──
  const layout = useMemo(() => computeLayout(tree), [tree]);

  const dropTargets = useMemo(() => {
    const targets: Array<{ id: string; x: number; y: number; color: string; label?: string }> = [];
    const expected = scenario.expectedAction;

    if (expected.type === "create-branch" || expected.type === "place-commit") {
      for (const lb of layout.layoutBranches) {
        for (const node of lb.nodes) {
          if (node.commit.id === expected.target) {
            targets.push({
              id: node.commit.id,
              x: node.x,
              y: node.y,
              color: node.color,
              label: node.isPhantom ? "drop here" : undefined,
            });
          }
        }
      }
    } else if (expected.type === "merge") {
      const branchTarget = layout.layoutBranches.find(
        (lb) => lb.branch.id === expected.target
      );
      if (branchTarget && branchTarget.nodes.length > 0) {
        const lastNode = branchTarget.nodes[branchTarget.nodes.length - 1];
        targets.push({
          id: expected.target,
          x: lastNode.x,
          y: lastNode.y,
          color: lastNode.color,
          label: `merge into ${expected.target}`,
        });
      }
    }

    return targets;
  }, [scenario.expectedAction, layout]);

  // Convert SVG coordinates to pixel positions relative to the container
  const getPixelPos = useCallback(
    (svgX: number, svgY: number) => {
      if (!svgScale) return { px: 0, py: 0 };
      return {
        px: svgScale.offsetX + svgX * svgScale.scaleX,
        py: svgScale.offsetY + svgY * svgScale.scaleY,
      };
    },
    [svgScale]
  );

  // Drop zone size in pixels (scale-aware)
  const dropZoneSizePx = svgScale ? Math.max(48, 56 * Math.min(svgScale.scaleX, svgScale.scaleY)) : 56;

  // ── Validate and apply action ──
  const validateAction = useCallback(
    (itemIndex: number, targetId: string) => {
      const item = scenario.availableItems[itemIndex];
      if (!item) return;

      const expected = scenario.expectedAction;
      let isValid = false;

      if (item.type === "branch" && expected.type === "create-branch") {
        isValid = targetId === expected.target;
      } else if (item.type === "commit" && expected.type === "place-commit") {
        isValid = targetId === expected.target;
      } else if (expected.type === "merge") {
        isValid = targetId === expected.target;
      }

      if (isValid) {
        sfx("correct-ding");

        const newPlaced = new Set(placedItems);
        newPlaced.add(itemIndex);
        setPlacedItems(newPlaced);

        if (scenario.triggerConflict && !conflictResolved) {
          setShowConflict(true);
          return;
        }

        if (newPlaced.size >= scenario.availableItems.length) {
          setTree(scenario.resultTree);
          setCompleted(true);
          setHint(null);
          setTimeout(onStepComplete, 1500);
        }
      } else {
        sfx("wrong-buzz");
        setHint(
          scenario.hint ?? "That's not quite right. Try a different target!"
        );
        setTimeout(() => setHint(null), 3000);
      }
    },
    [scenario, sfx, onStepComplete, conflictResolved, placedItems]
  );

  // ── DnD event handlers ──
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const index = event.active.data.current?.index;
    setActiveDragIndex(typeof index === "number" ? index : null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDragIndex(null);
      const { active, over } = event;
      if (!over) return;

      const itemIndex = active.data.current?.index;
      if (typeof itemIndex !== "number") return;
      validateAction(itemIndex, String(over.id));
    },
    [validateAction]
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

  const activeItem = activeDragIndex !== null
    ? scenario.availableItems[activeDragIndex]
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div>
        <p className="text-lg text-slate-200 mb-4">{scenario.instruction}</p>

        {/* Branch Tree + drop zone overlays */}
        <div
          className="mb-6 rpg-card p-4 bg-void/50"
          style={{ touchAction: "none" }}
        >
          <div ref={containerRef} className="relative overflow-x-auto">
            <GitBranchTree tree={tree} />

            {/* DOM overlay drop zones, positioned via measured SVG coords */}
            {!completed &&
              svgScale &&
              dropTargets.map((target) => {
                const { px, py } = getPixelPos(target.x, target.y);
                return (
                  <DropZoneOverlay
                    key={target.id}
                    id={target.id}
                    left={px}
                    top={py}
                    size={dropZoneSizePx}
                    color={target.color}
                    label={target.label}
                  />
                );
              })}
          </div>
        </div>

        {/* Palette - draggable items */}
        {!completed && scenario.availableItems.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gold-dim mb-2 uppercase tracking-wider font-bold">
              Drag to the tree:
            </p>
            <div className="flex flex-wrap gap-3">
              {scenario.availableItems.map(
                (item, idx) =>
                  !placedItems.has(idx) && (
                    <DraggableItem
                      key={idx}
                      id={`palette-${idx}`}
                      index={idx}
                      item={item}
                    />
                  )
              )}
            </div>
          </div>
        )}

        {/* Observation-only step */}
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

      {/* Drag overlay - follows pointer smoothly */}
      <DragOverlay dropAnimation={{ duration: 200, easing: "ease-out" }}>
        {activeItem && <DragItemPreview item={activeItem} />}
      </DragOverlay>
    </DndContext>
  );
}
