import { DAY_PHASE, type DayPhase } from "../types/day-phase";
import { DAY_PHASE_START_HOUR } from "../constants/day-phase";
import { getHours } from "date-fns";

/**
 * Resolves the Day Phase for a local time.
 *
 * @param now - Time to classify.
 * @returns Its {@link DayPhase}; hours before Morning count as Night.
 */
export function getDayPhase(now: Date): DayPhase {
  const hour = getHours(now);

  if (hour < DAY_PHASE_START_HOUR[DAY_PHASE.MORNING]) return DAY_PHASE.NIGHT;
  if (hour >= DAY_PHASE_START_HOUR[DAY_PHASE.NIGHT]) return DAY_PHASE.NIGHT;
  if (hour >= DAY_PHASE_START_HOUR[DAY_PHASE.EVENING]) return DAY_PHASE.EVENING;
  if (hour >= DAY_PHASE_START_HOUR[DAY_PHASE.AFTERNOON])
    return DAY_PHASE.AFTERNOON;
  return DAY_PHASE.MORNING;
}
