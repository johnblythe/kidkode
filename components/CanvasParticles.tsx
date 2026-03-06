"use client";

import { useRef, useEffect, useCallback } from "react";
import { useCanvas } from "@/lib/hooks/useCanvas";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type Effect = "confetti" | "sparkle" | "stars";

interface CanvasParticlesProps {
  effect: Effect;
  count: number;
  loop?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
}

const CONFETTI_COLORS = ["#fbbf24", "#a855f7", "#22c55e", "#3b82f6", "#ef4444", "#f97316"];
const SPARKLE_COLORS = ["#fbbf24", "#fde68a", "#ffffff"];
const STAR_COLORS = ["#fbbf24", "#a855f7", "#c084fc", "#fde68a"];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function createParticle(
  effect: Effect,
  w: number,
  h: number,
  rand: () => number,
  fromCenter: boolean
): Particle {
  const cx = w / 2;
  const cy = h / 2;

  switch (effect) {
    case "confetti": {
      const angle = rand() * Math.PI * 2;
      const speed = 60 + rand() * 200;
      return {
        x: fromCenter ? cx : rand() * w,
        y: fromCenter ? cy : rand() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 80,
        size: 3 + rand() * 4,
        color: CONFETTI_COLORS[Math.floor(rand() * CONFETTI_COLORS.length)],
        alpha: 1,
        life: 0,
        maxLife: 1.5 + rand() * 1.5,
        rotation: rand() * Math.PI * 2,
        rotationSpeed: (rand() - 0.5) * 10,
      };
    }
    case "sparkle": {
      return {
        x: rand() * w,
        y: rand() * h,
        vx: (rand() - 0.5) * 20,
        vy: -10 - rand() * 30,
        size: 1 + rand() * 3,
        color: SPARKLE_COLORS[Math.floor(rand() * SPARKLE_COLORS.length)],
        alpha: 0,
        life: 0,
        maxLife: 0.8 + rand() * 1.2,
        rotation: 0,
        rotationSpeed: 0,
      };
    }
    case "stars": {
      return {
        x: rand() * w,
        y: rand() * h,
        vx: 0,
        vy: 0,
        size: 1 + rand() * 2.5,
        color: STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)],
        alpha: 0,
        life: rand() * 4, // stagger initial phase
        maxLife: 2 + rand() * 3,
        rotation: 0,
        rotationSpeed: 0,
      };
    }
  }
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle, effect: Effect) {
  ctx.globalAlpha = p.alpha;

  switch (effect) {
    case "confetti": {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size * 0.6, p.size, p.size * 1.2);
      ctx.restore();
      break;
    }
    case "sparkle":
    case "stars": {
      const blur = effect === "stars" ? p.size * 3 : p.size * 2;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = blur;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      break;
    }
  }

  ctx.globalAlpha = 1;
}

function updateParticle(p: Particle, dt: number, effect: Effect, loop: boolean): boolean {
  p.life += dt;

  switch (effect) {
    case "confetti": {
      p.vy += 180 * dt; // gravity
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rotation += p.rotationSpeed * dt;
      const progress = p.life / p.maxLife;
      p.alpha = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
      return p.life < p.maxLife;
    }
    case "sparkle": {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      const progress = p.life / p.maxLife;
      p.alpha = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;
      return p.life < p.maxLife;
    }
    case "stars": {
      // Pulsing twinkle
      const phase = (p.life / p.maxLife) % 1;
      p.alpha = 0.3 + 0.7 * Math.sin(phase * Math.PI);
      if (p.life >= p.maxLife) {
        if (loop) {
          p.life = 0;
          return true;
        }
        return false;
      }
      return true;
    }
  }
}

export default function CanvasParticles({
  effect,
  count,
  loop = false,
  className = "",
}: CanvasParticlesProps) {
  const reducedMotion = useReducedMotion();
  const particlesRef = useRef<Particle[]>([]);

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const w = canvas.width;
    const h = canvas.height;
    const rand = seededRandom(42);
    const fromCenter = effect === "confetti";
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(effect, w, h, rand, fromCenter)
    );
  }, [effect, count]);

  const onFrame = useCallback((ctx: CanvasRenderingContext2D, dt: number): boolean | void => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const alive = updateParticle(particles[i], dt, effect, loop);
      if (!alive) {
        particles.splice(i, 1);
        continue;
      }
      drawParticle(ctx, particles[i], effect);
    }

    // Stop the animation loop when all particles are dead (one-shot effects)
    if (!loop && particles.length === 0) return false;
  }, [effect, loop]);

  const canvasRef = useCanvas(onFrame);

  // Size the canvas to match container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initParticles(canvas);
    };

    resize();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [canvasRef, initParticles]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
