import type { ObjectValues } from "@/types/core";

export const DAY_OUTCOME = {
  ON_TRACK: "onTrack",
  OFF_TRACK: "offTrack",
} as const;

export type DayOutcome = ObjectValues<typeof DAY_OUTCOME>;
