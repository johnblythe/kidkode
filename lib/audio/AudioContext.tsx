"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { audioManager, type BgmTrack } from "./AudioManager";
import type { SfxName } from "./sfx";

interface AudioContextValue {
  sfx: (name: SfxName) => void;
  playBGM: (track: BgmTrack) => void;
  stopBGM: () => void;
  volume: number;
  setVolume: (v: number) => void;
  muted: boolean;
  toggleMute: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(() => audioManager?.muted ?? false);
  const [volume, setVolumeState] = useState(() => audioManager?.volume ?? 0.5);

  const sfx = useCallback((name: SfxName) => {
    audioManager?.sfx(name);
  }, []);

  const playBGM = useCallback((track: BgmTrack) => {
    audioManager?.playBGM(track);
  }, []);

  const stopBGM = useCallback(() => {
    audioManager?.stopBGM();
  }, []);

  const setVolume = useCallback((v: number) => {
    audioManager?.setVolume(v);
    setVolumeState(v);
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = audioManager?.toggleMute() ?? false;
    setMuted(newMuted);
  }, []);

  const value = useMemo(
    () => ({ sfx, playBGM, stopBGM, volume, setVolume, muted, toggleMute }),
    [sfx, playBGM, stopBGM, volume, setVolume, muted, toggleMute]
  );

  return (
    <AudioCtx.Provider value={value}>
      {children}
    </AudioCtx.Provider>
  );
}

// Stable fallback — module-level constant so refs never change between renders
const NOOP_AUDIO: AudioContextValue = {
  sfx: () => {},
  playBGM: () => {},
  stopBGM: () => {},
  volume: 0.5,
  setVolume: () => {},
  muted: false,
  toggleMute: () => {},
};

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx && process.env.NODE_ENV === "development") {
    console.warn("[useAudio] No AudioProvider found — using no-op fallback");
  }
  return ctx ?? NOOP_AUDIO;
}
