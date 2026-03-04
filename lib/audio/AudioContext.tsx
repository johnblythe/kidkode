"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
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

  return (
    <AudioCtx.Provider value={{ sfx, playBGM, stopBGM, volume, setVolume, muted, toggleMute }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) {
    // Fallback for SSR / outside provider — no-op
    return {
      sfx: () => {},
      playBGM: () => {},
      stopBGM: () => {},
      volume: 0.5,
      setVolume: () => {},
      muted: false,
      toggleMute: () => {},
    };
  }
  return ctx;
}
