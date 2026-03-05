// Synthesized 8-bit SFX using Web Audio API oscillators.
// Each function takes an AudioContext + destination node and plays immediately.

type Ctx = AudioContext;
type Dest = AudioNode;

function osc(
  ctx: Ctx,
  dest: Dest,
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
  o.connect(g).connect(dest);
  o.start(ctx.currentTime);
  o.stop(ctx.currentTime + duration);
}

/** Create a white noise buffer source */
function noiseSource(ctx: Ctx, seconds: number) {
  const bufferSize = ctx.sampleRate * seconds;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  return src;
}

/** Quick ascending chime — correct answer */
export function correctDing(ctx: Ctx, dest: Dest) {
  osc(ctx, dest, "triangle", 880, 0.15, 0.25, 1320);
}

/** Low buzz — wrong answer */
export function wrongBuzz(ctx: Ctx, dest: Dest) {
  osc(ctx, dest, "sawtooth", 200, 0.2, 0.2);
}

/** 4-note ascending arpeggio — level up */
export function levelUpJingle(ctx: Ctx, dest: Dest) {
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = freq;
    const start = ctx.currentTime + i * 0.1;
    g.gain.setValueAtTime(0.25, start);
    g.gain.linearRampToValueAtTime(0, start + 0.12);
    o.connect(g).connect(dest);
    o.start(start);
    o.stop(start + 0.12);
  });
}

/** Short blip — button click */
export function buttonClick(ctx: Ctx, dest: Dest) {
  osc(ctx, dest, "square", 660, 0.05, 0.15);
}

/** White noise with bandpass sweep — slide transition */
export function slideWhoosh(ctx: Ctx, dest: Dest) {
  const src = noiseSource(ctx, 0.2);

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(500, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(4000, ctx.currentTime + 0.2);
  filter.Q.value = 2;

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.15, ctx.currentTime);
  g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);

  src.connect(filter).connect(g).connect(dest);
  src.start(ctx.currentTime);
  src.stop(ctx.currentTime + 0.2);
}

/** Two-tone fanfare — quiz start */
export function quizStartHorn(ctx: Ctx, dest: Dest) {
  osc(ctx, dest, "square", 440, 0.15, 0.2);
  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type = "square";
  o2.frequency.value = 660;
  const start = ctx.currentTime + 0.15;
  g2.gain.setValueAtTime(0.2, start);
  g2.gain.linearRampToValueAtTime(0, start + 0.15);
  o2.connect(g2).connect(dest);
  o2.start(start);
  o2.stop(start + 0.15);
}

/** Double beep pulse — timer warning */
export function timerWarning(ctx: Ctx, dest: Dest) {
  [0, 0.12].forEach((delay) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = 440;
    const start = ctx.currentTime + delay;
    g.gain.setValueAtTime(0.2, start);
    g.gain.linearRampToValueAtTime(0, start + 0.08);
    o.connect(g).connect(dest);
    o.start(start);
    o.stop(start + 0.08);
  });
}

/** Punchy 8-bit impact — boss takes a hit */
export function bossHit(ctx: Ctx, dest: Dest) {
  // Noise burst (60ms, highpass 800Hz)
  const src = noiseSource(ctx, 0.06);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 800;
  const gNoise = ctx.createGain();
  gNoise.gain.setValueAtTime(0.35, ctx.currentTime);
  gNoise.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.06);
  src.connect(hp).connect(gNoise).connect(dest);
  src.start(ctx.currentTime);
  src.stop(ctx.currentTime + 0.06);

  // Square-wave pitch drop (400→100Hz, 80ms)
  osc(ctx, dest, "square", 400, 0.08, 0.3, 100);
}

/** Multi-voice celebration — unlock/achievement */
export function unlockCelebration(ctx: Ctx, dest: Dest) {
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
    o.connect(g).connect(dest);
    o.start(start);
    o.stop(start + 0.15);
  });

  // Noise burst at the end
  const src = noiseSource(ctx, 0.15);
  const g = ctx.createGain();
  const start = ctx.currentTime + 0.4;
  g.gain.setValueAtTime(0.1, start);
  g.gain.linearRampToValueAtTime(0, start + 0.15);
  src.connect(g).connect(dest);
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
  | "unlock-celebration"
  | "boss-hit";

const SFX_MAP: Record<SfxName, (ctx: Ctx, dest: Dest) => void> = {
  "correct-ding": correctDing,
  "wrong-buzz": wrongBuzz,
  "level-up": levelUpJingle,
  "button-click": buttonClick,
  "slide-whoosh": slideWhoosh,
  "quiz-start-horn": quizStartHorn,
  "timer-warning": timerWarning,
  "unlock-celebration": unlockCelebration,
  "boss-hit": bossHit,
};

export function playSfx(ctx: Ctx, name: SfxName, dest?: AudioNode) {
  SFX_MAP[name]?.(ctx, dest ?? ctx.destination);
}
