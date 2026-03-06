"use client";

interface DragItemPreviewProps {
  item: { type: "commit" | "branch"; label: string };
}

export default function DragItemPreview({ item }: DragItemPreviewProps) {
  return (
    <div className="rpg-card px-5 py-3 shadow-lg shadow-gold/20 pointer-events-none">
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
