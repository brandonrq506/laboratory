import type { ObjectValues } from "@/types/core";

export const DAY_PHASE = {
  MORNING: "morning",
  AFTERNOON: "afternoon",
  EVENING: "evening",
  NIGHT: "night",
} as const;

export type DayPhase = ObjectValues<typeof DAY_PHASE>;
