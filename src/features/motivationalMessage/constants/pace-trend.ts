/** How many of the latest Completed Tasks are compared against the earlier ones. */
export const PACE_TREND_WINDOW = 3;

/** Fewest Completed Tasks needed to call a Pace Trend: a full window plus one earlier task. */
export const PACE_TREND_MIN_TASKS = PACE_TREND_WINDOW + 1;

/** Smallest average-delta gap per task, in minutes, that counts as a trend. */
export const PACE_TREND_MIN_GAP_MINUTES = 3;
