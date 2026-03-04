import { playSfx, type SfxName } from "./sfx";

export type BgmTrack = "dashboard" | "lesson-ambient" | "battle" | "victory";

const STORAGE_MUTED = "kidkode:audio:muted";
const STORAGE_VOLUME = "kidkode:audio:volume";

const CROSSFADE_DURATION = 0.4; // match framer-motion transitions

// Add track names here once MP3 files are placed in public/audio/bgm/
const AVAILABLE_BGM_TRACKS: Set<BgmTrack> = new Set([
  // "dashboard",
  // "lesson-ambient",
  // "battle",
  // "victory",
]);

class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  // BGM: two audio elements for crossfade
  private bgmCurrent: HTMLAudioElement | null = null;
  private bgmNext: HTMLAudioElement | null = null;
  private bgmGainCurrent: GainNode | null = null;
  private bgmGainNext: GainNode | null = null;
  private currentTrack: BgmTrack | null = null;

  private _muted = false;
  private _volume = 0.5;

  constructor() {
    if (typeof window === "undefined") return;
    this._muted = localStorage.getItem(STORAGE_MUTED) === "true";
    const savedVol = localStorage.getItem(STORAGE_VOLUME);
    if (savedVol !== null) this._volume = parseFloat(savedVol);
  }

  /** Lazily create AudioContext on first user interaction */
  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this._muted ? 0 : this._volume;
      this.masterGain.connect(this.ctx.destination);
    }
    // Resume for mobile Safari autoplay policy
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // --- SFX ---

  sfx(name: SfxName) {
    try {
      const ctx = this.ensureContext();
      if (this._muted) return;
      playSfx(ctx, name);
    } catch {
      // Silently ignore audio failures
    }
  }

  // --- BGM ---

  private bgmPath(track: BgmTrack): string {
    return `/audio/bgm/${track}.mp3`;
  }

  playBGM(track: BgmTrack) {
    if (typeof window === "undefined") return;
    if (track === this.currentTrack) return;
    if (!AVAILABLE_BGM_TRACKS.has(track)) return; // track not yet sourced

    try {
      const ctx = this.ensureContext();
      const masterGain = this.masterGain!;

      // Create new audio element
      const nextAudio = new Audio(this.bgmPath(track));
      nextAudio.loop = track !== "victory";
      nextAudio.preload = "auto";

      // Connect through Web Audio for gain control
      const source = ctx.createMediaElementSource(nextAudio);
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      source.connect(gainNode).connect(masterGain);

      // Fade in new track
      gainNode.gain.linearRampToValueAtTime(1, ctx.currentTime + CROSSFADE_DURATION);

      // Fade out old track
      if (this.bgmGainCurrent && this.bgmCurrent) {
        const oldGain = this.bgmGainCurrent;
        const oldAudio = this.bgmCurrent;
        oldGain.gain.linearRampToValueAtTime(0, ctx.currentTime + CROSSFADE_DURATION);
        setTimeout(() => {
          oldAudio.pause();
          oldAudio.src = "";
        }, CROSSFADE_DURATION * 1000 + 100);
      }

      nextAudio.play().catch(() => {
        // Autoplay blocked — will retry on next user interaction
      });

      this.bgmCurrent = nextAudio;
      this.bgmGainCurrent = gainNode;
      this.currentTrack = track;
    } catch {
      // Silently ignore BGM failures
    }
  }

  stopBGM() {
    if (this.bgmCurrent) {
      if (this.bgmGainCurrent && this.ctx) {
        this.bgmGainCurrent.gain.linearRampToValueAtTime(0, this.ctx.currentTime + CROSSFADE_DURATION);
        const audio = this.bgmCurrent;
        setTimeout(() => {
          audio.pause();
          audio.src = "";
        }, CROSSFADE_DURATION * 1000 + 100);
      } else {
        this.bgmCurrent.pause();
        this.bgmCurrent.src = "";
      }
      this.bgmCurrent = null;
      this.bgmGainCurrent = null;
      this.currentTrack = null;
    }
  }

  // --- Volume / Mute ---

  get volume() {
    return this._volume;
  }

  setVolume(v: number) {
    this._volume = Math.max(0, Math.min(1, v));
    localStorage.setItem(STORAGE_VOLUME, String(this._volume));
    if (this.masterGain && !this._muted) {
      this.masterGain.gain.setValueAtTime(this._volume, this.ctx!.currentTime);
    }
  }

  get muted() {
    return this._muted;
  }

  mute() {
    this._muted = true;
    localStorage.setItem(STORAGE_MUTED, "true");
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(0, this.ctx!.currentTime);
    }
  }

  unmute() {
    this._muted = false;
    localStorage.setItem(STORAGE_MUTED, "false");
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this._volume, this.ctx!.currentTime);
    }
  }

  toggleMute() {
    if (this._muted) {
      this.unmute();
    } else {
      this.mute();
    }
    return this._muted;
  }
}

// Singleton
export const audioManager = typeof window !== "undefined" ? new AudioManager() : (null as unknown as AudioManager);
