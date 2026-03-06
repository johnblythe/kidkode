"use client";

import { useDraggable } from "@dnd-kit/core";
import type { DragDropScenarioStep } from "@/lib/git-branch-types";

interface DraggableItemProps {
  id: string;
  index: number;
  item: DragDropScenarioStep["availableItems"][number];
}

export default function DraggableItem({ id, index, item }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { index, item },
    });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.4 : 1,
    minWidth: 44,
    minHeight: 44,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rpg-card px-5 py-3 cursor-grab active:cursor-grabbing select-none touch-none"
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">
          {item.type === "branch" ? "\u{1F33F}" : "\u{1F4E6}"}
        </span>
        <span className="text-sm font-medium text-slate-200">
          {item.label}
        </span>
      </div>
    </div>
  );
}
