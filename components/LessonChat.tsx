"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatWithTutor, type ChatMessage } from "@/app/actions/chat";

interface LessonChatProps {
  slug: string;
}

/** Minimal markdown renderer: **bold**, `code`, ```code blocks```, and numbered lists */
function renderMarkdown(text: string) {
  // Split on code blocks first
  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts.map((part, i) => {
    // Fenced code block
    if (part.startsWith("```")) {
      const code = part.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
      return (
        <pre key={i} className="bg-void/60 border border-gold-dim/10 rounded-md px-3 py-2 my-2 text-xs font-mono text-gold overflow-x-auto">
          <code>{code}</code>
        </pre>
      );
    }

    // Group lines into paragraphs (split on blank lines)
    const paragraphs = part.split(/\n\s*\n/);
    const elements: React.ReactNode[] = [];

    for (let p = 0; p < paragraphs.length; p++) {
      const lines = paragraphs[p].split("\n").filter((l) => l.trim());
      const paraElements: React.ReactNode[] = [];

      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];

        // Numbered list item
        const listMatch = line.match(/^(\d+)\.\s+(.+)/);
        if (listMatch) {
          paraElements.push(
            <span key={`${i}-${p}-${j}`} className="flex gap-2 ml-1 my-1">
              <span className="text-gold/60 shrink-0">{listMatch[1]}.</span>
              <span>{renderInline(listMatch[2])}</span>
            </span>
          );
          continue;
        }

        // Regular line
        paraElements.push(
          <span key={`${i}-${p}-${j}`}>
            {j > 0 && " "}
            {renderInline(line)}
          </span>
        );
      }

      elements.push(
        <p key={`${i}-p-${p}`} className={p > 0 ? "mt-3" : ""}>
          {paraElements}
        </p>
      );
    }

    return <span key={i}>{elements}</span>;
  });
}

/** Render **bold** and `inline code` */
function renderInline(text: string) {
  // Split on bold and inline code patterns
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-gold font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="bg-void/60 text-mana-blue px-1 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export default function LessonChat({ slug }: LessonChatProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const reply = await chatWithTutor(slug, updated);
      setMessages([...updated, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...updated,
        { role: "assistant", content: "Hmm, something went wrong. Try asking again!" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={() => setOpen(true)}
        className="mt-4 px-6 py-3 rounded-xl border border-mana-blue/30 bg-mana-blue/10 text-mana-blue hover:bg-mana-blue/20 transition-colors text-sm font-semibold"
      >
        Got questions? Ask your tutor
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      className="mt-6 w-full max-w-md mx-auto"
    >
      <div className="rpg-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gold-dim/10">
          <span className="text-xs font-bold text-mana-blue uppercase tracking-wider">
            Lesson Tutor
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-500 hover:text-slate-300 text-xs"
          >
            minimize
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="h-72 overflow-y-auto p-4 space-y-4 scrollbar-thin"
        >
          {messages.length === 0 && (
            <p className="text-slate-500 text-sm text-center mt-12">
              Ask anything about what you just learned!
            </p>
          )}
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2.5 rounded-lg text-sm leading-relaxed text-left ${
                    msg.role === "user"
                      ? "bg-xp-purple/20 text-xp-purple-bright border border-xp-purple/20"
                      : "bg-void-lighter text-slate-200 border border-gold-dim/10"
                  }`}
                >
                  {msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-void-lighter border border-gold-dim/10 px-3 py-2.5 rounded-lg text-sm text-slate-400 flex items-center gap-1.5">
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  Thinking...
                </motion.span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gold-dim/10 p-3 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            disabled={loading}
            className="flex-1 bg-void-lighter border border-gold-dim/20 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-mana-blue/50 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 bg-mana-blue/20 border border-mana-blue/30 text-mana-blue rounded-lg text-sm font-semibold hover:bg-mana-blue/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
}
