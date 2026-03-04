// Synthesized 8-bit SFX using Web Audio API oscillators.
// Each function takes an AudioContext and plays immediately — fire-and-forget.

type Ctx = AudioContext;

function osc(
  ctx: Ctx,
  type: OscillatorType,
  freq: number,
  duration: number,
  gainVal = 0.3,
  freqEnd?: number
) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, ctx.currentTime);
  if (freqEnd !== undefined) {
    o.frequency.linearRampToValueAtTime(freqEnd, ctx.currentTime + duration);
  }
  g.gain.setValueAtTime(gainVal, ctx.currentTime);
  g.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
  o.connect(g).connect(ctx.destination);
  o.start(ctx.currentTime);
  o.stop(ctx.currentTime + duration);
}

/** Quick ascending chime — correct answer */
export function correctDing(ctx: Ctx) {
  osc(ctx, "triangle", 880, 0.15, 0.25, 1320);
}

/** Low buzz — wrong answer */
export function wrongBuzz(ctx: Ctx) {
  osc(ctx, "sawtooth", 200, 0.2, 0.2);
}

/** 4-note ascending arpeggio — level up */
export function levelUpJingle(ctx: Ctx) {
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = freq;
    const start = ctx.currentTime + i * 0.1;
    g.gain.setValueAtTime(0.25, start);
    g.gain.linearRampToValueAtTime(0, start + 0.12);
    o.connect(g).connect(ctx.destination);
    o.start(start);
    o.stop(start + 0.12);
  });
}

/** Short blip — button click */
export function buttonClick(ctx: Ctx) {
  osc(ctx, "square", 660, 0.05, 0.15);
}

/** White noise with bandpass sweep — slide transition */
export function slideWhoosh(ctx: Ctx) {
  const bufferSize = ctx.sampleRate * 0.2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(500, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(4000, ctx.currentTime + 0.2);
  filter.Q.value = 2;

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.15, ctx.currentTime);
  g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);

  src.connect(filter).connect(g).connect(ctx.destination);
  src.start(ctx.currentTime);
  src.stop(ctx.currentTime + 0.2);
}

/** Two-tone fanfare — quiz start */
export function quizStartHorn(ctx: Ctx) {
  osc(ctx, "square", 440, 0.15, 0.2);
  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type = "square";
  o2.frequency.value = 660;
  const start = ctx.currentTime + 0.15;
  g2.gain.setValueAtTime(0.2, start);
  g2.gain.linearRampToValueAtTime(0, start + 0.15);
  o2.connect(g2).connect(ctx.destination);
  o2.start(start);
  o2.stop(start + 0.15);
}

/** Double beep pulse — timer warning */
export function timerWarning(ctx: Ctx) {
  [0, 0.12].forEach((delay) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = 440;
    const start = ctx.currentTime + delay;
    g.gain.setValueAtTime(0.2, start);
    g.gain.linearRampToValueAtTime(0, start + 0.08);
    o.connect(g).connect(ctx.destination);
    o.start(start);
    o.stop(start + 0.08);
  });
}

/** Multi-voice celebration — unlock/achievement */
export function unlockCelebration(ctx: Ctx) {
  // Arpeggio
  const notes = [523, 659, 784, 1047, 1319];
  notes.forEach((freq, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = freq;
    const start = ctx.currentTime + i * 0.08;
    g.gain.setValueAtTime(0.2, start);
    g.gain.linearRampToValueAtTime(0, start + 0.15);
    o.connect(g).connect(ctx.destination);
    o.start(start);
    o.stop(start + 0.15);
  });

  // Noise burst at the end
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const g = ctx.createGain();
  const start = ctx.currentTime + 0.4;
  g.gain.setValueAtTime(0.1, start);
  g.gain.linearRampToValueAtTime(0, start + 0.15);
  src.connect(g).connect(ctx.destination);
  src.start(start);
  src.stop(start + 0.15);
}

export type SfxName =
  | "correct-ding"
  | "wrong-buzz"
  | "level-up"
  | "button-click"
  | "slide-whoosh"
  | "quiz-start-horn"
  | "timer-warning"
  | "unlock-celebration";

const SFX_MAP: Record<SfxName, (ctx: Ctx) => void> = {
  "correct-ding": correctDing,
  "wrong-buzz": wrongBuzz,
  "level-up": levelUpJingle,
  "button-click": buttonClick,
  "slide-whoosh": slideWhoosh,
  "quiz-start-horn": quizStartHorn,
  "timer-warning": timerWarning,
  "unlock-celebration": unlockCelebration,
};

export function playSfx(ctx: Ctx, name: SfxName) {
  SFX_MAP[name]?.(ctx);
}
