import type { ComponentType } from "react";
import type { BossSpriteProps } from "./BossShell";
import MergeConflictHydra from "./MergeConflictHydra";
import PermissionDeniedGolem from "./PermissionDeniedGolem";
import The404Phantom from "./The404Phantom";
import TheNullPointer from "./TheNullPointer";
import CallbackSerpent from "./CallbackSerpent";
import HallucinationPhantom from "./HallucinationPhantom";
import GenericBoss from "./GenericBoss";

export type { BossSpriteProps };
export type BossSpriteState = BossSpriteProps["state"];

const bossSprites: Record<string, ComponentType<BossSpriteProps>> = {
  hydra: MergeConflictHydra,
  golem: PermissionDeniedGolem,
  phantom404: The404Phantom,
  nullPointer: TheNullPointer,
  callbackSerpent: CallbackSerpent,
  hallucinationPhantom: HallucinationPhantom,
};

export function getBossSprite(key: string): ComponentType<BossSpriteProps> {
  return bossSprites[key] ?? GenericBoss;
}

// Keep direct map export for backwards compat with BossBattleSection
export { bossSprites };
