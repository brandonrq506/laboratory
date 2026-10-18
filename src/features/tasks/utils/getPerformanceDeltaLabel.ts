import { formatDuration } from "date-fns";

import { PERFORMANCE_LABEL } from "../constants/performance";

/**
 * Describes minutes won or lost for screen readers.
 *
 * @param minutes - Minutes won (positive) or lost (negative).
 * @returns A spoken description of the minutes and their direction.
 *
 * @example
 * getPerformanceDeltaLabel(12); // "12 minutes ahead"
 * getPerformanceDeltaLabel(-1); // "1 minute late"
 * getPerformanceDeltaLabel(0); // "On time"
 */
export const getPerformanceDeltaLabel = (minutes: number) => {
  if (minutes === 0) return PERFORMANCE_LABEL.ON_TIME;

  const duration = formatDuration({ minutes: Math.abs(minutes) });
  const direction =
    minutes > 0 ? PERFORMANCE_LABEL.AHEAD : PERFORMANCE_LABEL.LATE;

  return `${duration} ${direction}`;
};
