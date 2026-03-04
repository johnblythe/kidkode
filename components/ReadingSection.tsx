"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { ReadingSection as ReadingSectionType } from "@/lib/types";

interface ReadingSectionProps {
  section: ReadingSectionType;
  onComplete: () => void;
}

/**
 * Simple markdown-to-JSX renderer. Handles:
 * ## headers, **bold**, `code`, tables, - lists, numbered lists, blank lines
 */
function renderMarkdown(md: string): React.ReactNode {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Table detection
    if (line.includes("|") && i + 1 < lines.length && lines[i + 1]?.match(/^\|[\s\-|]+\|$/)) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(renderTable(tableLines, elements.length));
      continue;
    }

    // Headers
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={elements.length} className="text-xl font-bold text-gold mt-6 mb-3 text-glow-gold">
          {inlineFormat(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold text-gold mt-8 mb-4 text-glow-gold">
          {inlineFormat(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^\s*[-*]\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\s*[-*]\s/)) {
        items.push(lines[i].replace(/^\s*[-*]\s/, ""));
        i++;
      }
      elements.push(
        <ul key={elements.length} className="list-disc list-inside space-y-1 mb-4 text-slate-200 ml-2">
          {items.map((item, idx) => (
            <li key={idx}>{inlineFormat(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\.\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={elements.length} className="list-decimal list-inside space-y-1 mb-4 text-slate-200 ml-2">
          {items.map((item, idx) => (
            <li key={idx}>{inlineFormat(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={elements.length} className="text-slate-200 leading-relaxed mb-4">
        {inlineFormat(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function inlineFormat(text: string): React.ReactNode {
  // Handle bold, code, and plain text
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-gold-bright font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="bg-void text-xp-purple-bright px-1.5 py-0.5 rounded text-sm font-mono border border-xp-purple-dim/30"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderTable(tableLines: string[], keyBase: number): React.ReactNode {
  const parseRow = (line: string) =>
    line
      .split("|")
      .map((c) => c.trim())
      .filter((c) => c.length > 0 && !c.match(/^[-]+$/));

  const header = parseRow(tableLines[0]);
  const rows = tableLines
    .slice(2)
    .map(parseRow)
    .filter((r) => r.length > 0);

  return (
    <div key={keyBase} className="overflow-x-auto mb-6">
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-void-lighter">
            {header.map((cell, i) => (
              <th
                key={i}
                className="px-4 py-2 text-left text-gold font-bold border border-gold-dim/20"
              >
                {inlineFormat(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-void/50" : "bg-void-light/50"}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-2 border border-gold-dim/10 text-slate-300"
                >
                  {inlineFormat(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ReadingSection({ section, onComplete }: ReadingSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) {
        setScrollProgress(100);
        return;
      }
      setScrollProgress(Math.min(100, Math.round((scrollTop / maxScroll) * 100)));
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto flex flex-col"
    >
      {/* Reading progress bar */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gold-dim font-mono">
          {section.estimatedMinutes} min read
        </span>
        <div className="flex-1 h-1.5 bg-void-lighter rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-dim to-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <span className="text-sm text-gold-dim font-mono">{scrollProgress}%</span>
      </div>

      {/* Parchment-style card */}
      <div
        ref={contentRef}
        className="rpg-card p-8 max-h-[60vh] overflow-y-auto"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
          borderColor: "rgba(251, 191, 36, 0.25)",
          boxShadow:
            "0 0 15px rgba(251, 191, 36, 0.1), inset 0 0 30px rgba(0,0,0,0.3)",
        }}
      >
        {renderMarkdown(section.content)}
      </div>

      {/* Complete button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="mt-6 mx-auto px-8 py-3 bg-gradient-to-r from-gold-dim to-gold text-void font-bold rounded-lg text-lg shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-shadow"
      >
        {"I've read this →"}
      </motion.button>
    </motion.div>
  );
}
