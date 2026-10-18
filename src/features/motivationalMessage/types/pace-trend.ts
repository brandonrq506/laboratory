import type { ObjectValues } from "@/types/core";

export const PACE_TREND = {
  SPEEDING_UP: "speedingUp",
  SLOWING_DOWN: "slowingDown",
} as const;

export type PaceTrend = ObjectValues<typeof PACE_TREND>;
