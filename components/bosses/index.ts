import type { ComponentType } from "react";
import type { BossSpriteProps } from "./MergeConflictHydra";
import MergeConflictHydra from "./MergeConflictHydra";
import PermissionDeniedGolem from "./PermissionDeniedGolem";
import The404Phantom from "./The404Phantom";
import TheNullPointer from "./TheNullPointer";
import CallbackSerpent from "./CallbackSerpent";
import HallucinationPhantom from "./HallucinationPhantom";

export type { BossSpriteProps };
export type BossSpriteState = BossSpriteProps["state"];

export const bossSprites: Record<string, ComponentType<BossSpriteProps>> = {
  hydra: MergeConflictHydra,
  golem: PermissionDeniedGolem,
  phantom404: The404Phantom,
  nullPointer: TheNullPointer,
  callbackSerpent: CallbackSerpent,
  hallucinationPhantom: HallucinationPhantom,
};
