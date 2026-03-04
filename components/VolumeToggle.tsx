"use client";

import { useAudio } from "@/lib/audio/AudioContext";

export default function VolumeToggle() {
  const { muted, toggleMute } = useAudio();

  return (
    <button
      onClick={toggleMute}
      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors duration-300 text-sm select-none ${
        muted
          ? "bg-fire-red/10 border-fire-red/20 text-fire-red"
          : "bg-hp-green/10 border-hp-green/20 text-hp-green"
      }`}
      title={muted ? "Unmute" : "Mute"}
      aria-label={muted ? "Unmute audio" : "Mute audio"}
    >
      <span aria-hidden>{muted ? "\u{1F507}" : "\u{1F50A}"}</span>
    </button>
  );
}
