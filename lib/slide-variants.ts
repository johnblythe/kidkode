// Shared animation variants for slide transitions
// Used by SlideViewer and playground/transitions

export const ANIMATION_NAMES = [
  "fade", "slide-left", "slide-up", "typewriter", "pop", "swoosh", "page-flip",
] as const;

export type AnimationName = (typeof ANIMATION_NAMES)[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const animationVariants: Record<AnimationName, { initial: any; animate: any; exit: any }> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "slide-left": {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
  },
  typewriter: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  pop: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  swoosh: {
    initial: { opacity: 0, x: 120, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -120, scale: 0.95 },
  },
  "page-flip": {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 },
  },
};

export const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
