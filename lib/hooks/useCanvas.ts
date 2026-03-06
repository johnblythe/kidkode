"use client";

import { useRef, useEffect, useCallback, type RefObject } from "react";

/**
 * Drives a canvas animation loop with delta-time, visibility pausing, and cleanup.
 * `onFrame` returning `false` stops the loop (for one-shot effects).
 */
export function useCanvas(
  onFrame: (ctx: CanvasRenderingContext2D, dt: number) => boolean | void,
): RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const pausedRef = useRef(false);

  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;

  const tick = useCallback((time: number) => {
    if (pausedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.warn("[kidkode] Canvas 2D context unavailable. Particles will not render.");
      return;
    }

    const dt = lastTimeRef.current
      ? Math.min((time - lastTimeRef.current) / 1000, 0.1)
      : 0.016;
    lastTimeRef.current = time;

    const shouldContinue = onFrameRef.current(ctx, dt);
    if (shouldContinue !== false) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);

    const handleVisibility = () => {
      if (document.hidden) {
        pausedRef.current = true;
        cancelAnimationFrame(rafRef.current);
      } else {
        pausedRef.current = false;
        lastTimeRef.current = 0;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [tick]);

  return canvasRef;
}
