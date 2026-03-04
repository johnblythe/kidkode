import type { ComponentType } from "react";
import type { BossSpriteProps } from "./MergeConflictHydra";
import MergeConflictHydra from "./MergeConflictHydra";

export type { BossSpriteProps };

export const bossSprites: Record<string, ComponentType<BossSpriteProps>> = {
  hydra: MergeConflictHydra,
};
