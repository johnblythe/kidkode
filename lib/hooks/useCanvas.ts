"use client";

import { useRef, useEffect, useCallback } from "react";

interface UseCanvasOptions {
  onFrame: (ctx: CanvasRenderingContext2D, dt: number) => void;
  loop?: boolean;
}

export function useCanvas({ onFrame, loop = true }: UseCanvasOptions) {
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
    if (!ctx) return;

    const dt = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0.016;
    lastTimeRef.current = time;

    onFrameRef.current(ctx, dt);

    if (loop) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [loop]);

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
