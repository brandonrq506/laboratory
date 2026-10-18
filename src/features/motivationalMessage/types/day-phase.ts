import type { ObjectValues } from "@/types/core";

export const DAY_PHASE = {
  MORNING: "morning",
  AFTERNOON: "afternoon",
  EVENING: "evening",
  NIGHT: "night",
} as const;

export type DayPhase = ObjectValues<typeof DAY_PHASE>;

/** Day Phases while there is still time to change how the day goes. */
export type DaytimePhase = Exclude<DayPhase, typeof DAY_PHASE.NIGHT>;
