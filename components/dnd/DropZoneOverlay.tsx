"use client";

import { useDroppable } from "@dnd-kit/core";

interface DropZoneOverlayProps {
  id: string;
  // Position in pixels relative to the container
  left: number;
  top: number;
  size: number;
  color: string;
  label?: string;
}

export default function DropZoneOverlay({
  id,
  left,
  top,
  size,
  color,
  label,
}: DropZoneOverlayProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="absolute rounded-full transition-all duration-150 pointer-events-auto"
      style={{
        left: left - size / 2,
        top: top - size / 2,
        width: size,
        height: size,
        border: `2px dashed ${color}`,
        backgroundColor: isOver ? `${color}33` : "transparent",
        boxShadow: isOver ? `0 0 24px ${color}66` : "none",
        transform: isOver ? "scale(1.3)" : "scale(1)",
        opacity: isOver ? 1 : 0.6,
      }}
      aria-label={`Drop target: ${label ?? id}`}
    >
      {label && (
        <span
          className="absolute whitespace-nowrap text-[10px] font-mono pointer-events-none"
          style={{
            color,
            opacity: isOver ? 1 : 0.7,
            top: "50%",
            left: "calc(100% + 8px)",
            transform: "translateY(-50%)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
