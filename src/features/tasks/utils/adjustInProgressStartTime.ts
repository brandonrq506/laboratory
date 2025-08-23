import { floorSeconds } from "@/utils";

import { getMinutes, getSeconds, roundToNearestMinutes } from "date-fns";

const SECONDS_THRESHOLD = 30;

/**
 * Adjusts start time for in-progress tasks to provide user-friendly time display
 * while ensuring the time never exceeds the current moment.
 *
 * Strategy:
 * - Same minute + <30s: Remove seconds for cleaner display
 * - Same minute + ≥30s: Keep original time to avoid significant change
 * - Different minute: Round to nearest minute for better UX
 * - Future times: Return unchanged (validation should prevent this)
 */
export const adjustInProgressStartTime = (start_time: string): Date => {
  const startTime = new Date(start_time);
  const now = new Date();

  if (startTime > now) {
    return startTime;
  }

  const nowMinutes = getMinutes(now);
  const startTimeMinutes = getMinutes(startTime);
  const startTimeSeconds = getSeconds(startTime);

  if (nowMinutes === startTimeMinutes) {
    return startTimeSeconds < SECONDS_THRESHOLD
      ? floorSeconds(startTime)
      : startTime;
  }

  const roundedTime = roundToNearestMinutes(startTime);
  return roundedTime > now ? startTime : roundedTime;
};
