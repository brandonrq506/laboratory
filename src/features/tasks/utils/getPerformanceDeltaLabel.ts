import { formatDuration } from "date-fns";

import { PERFORMANCE_LABEL } from "../constants/performance";

/** Screen reader text, e.g. "12 minutes ahead", "1 minute late", "On time". */
export const getPerformanceDeltaLabel = (minutes: number) => {
  if (minutes === 0) return PERFORMANCE_LABEL.ON_TIME;

  const duration = formatDuration({ minutes: Math.abs(minutes) });
  const direction =
    minutes > 0 ? PERFORMANCE_LABEL.AHEAD : PERFORMANCE_LABEL.LATE;

  return `${duration} ${direction}`;
};
