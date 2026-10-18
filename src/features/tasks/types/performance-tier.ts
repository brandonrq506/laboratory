import type { ObjectValues } from "@/types/core";

export const PERFORMANCE_TIER = {
  AHEAD: "ahead",
  ON_TIME: "onTime",
  LATE: "late",
  OVER: "over",
} as const;

export type PerformanceTier = ObjectValues<typeof PERFORMANCE_TIER>;
