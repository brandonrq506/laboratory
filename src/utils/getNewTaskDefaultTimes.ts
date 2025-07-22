import {
  format,
  setMilliseconds,
  setMinutes,
  setSeconds,
  subHours,
} from "date-fns";

/**
 * Get the default start_time and end_time for new -manually added- tasks.
 * - If current time is 15 minutes or less into the hour, returns the previous hour.
 * - If current time is more than 15 minutes into the hour, returns the current hour.
 * - Time is returned in "HH:00" format with hours padded to 2 digits.
 * @returns The default time string in "HH:00" format
 */
export const getNewTaskDefaultTimes = () => {
  const now = new Date();
  const MINUTES_THRESHOLD = 15;

  // Get a Date object set to the exact hour (00 minutes, 00 seconds, 000 milliseconds)
  let hourDate = setMilliseconds(setSeconds(setMinutes(now, 0), 0), 0);

  // If we're MINUTES_THRESHOLD or less into the current hour, use the previous hour
  if (now.getMinutes() <= MINUTES_THRESHOLD) {
    hourDate = subHours(hourDate, 1);
  }

  // Format to "HH:00"
  return format(hourDate, "HH:00");
};
