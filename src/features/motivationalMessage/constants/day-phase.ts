import { DAY_PHASE, type DayPhase } from "../types/day-phase";

/**
 * Local hour each Day Phase starts. Night wraps past midnight into Morning.
 * Fixed for now; to be replaced by a per-day start/end setting.
 */
export const DAY_PHASE_START_HOUR = {
  [DAY_PHASE.MORNING]: 5,
  [DAY_PHASE.AFTERNOON]: 12,
  [DAY_PHASE.EVENING]: 17,
  [DAY_PHASE.NIGHT]: 21,
} satisfies Record<DayPhase, number>;
