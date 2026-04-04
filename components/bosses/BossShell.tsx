"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface BossSpriteProps {
  state: "idle" | "attacking" | "damaged" | "dead";
}

interface BossShellProps extends BossSpriteProps {
  children: ReactNode;
}

export default function BossShell({ state, children }: BossShellProps) {
  const stateClass =
    state === "idle"
      ? "boss-idle"
      : state === "damaged"
      ? "boss-damaged"
      : state === "attacking"
      ? "boss-attacking"
      : "";

  return (
    <motion.div
      className={`relative ${stateClass}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={
        state === "dead"
          ? { scale: 0, opacity: 0, filter: "brightness(3)" }
          : { scale: 1, opacity: 1, filter: "brightness(1)" }
      }
      transition={
        state === "dead"
          ? { duration: 1, ease: "easeIn" }
          : { type: "spring", stiffness: 150, damping: 15 }
      }
    >
      {children}
    </motion.div>
  );
}
