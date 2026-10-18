import type { ObjectValues } from "@/types/core";

export const NET_BAND = {
  OUTSTANDING: "outstanding",
  STEADY: "steady",
  BEHIND: "behind",
  FAR_BEHIND: "farBehind",
} as const;

export type NetBand = ObjectValues<typeof NET_BAND>;
