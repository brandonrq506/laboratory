import {
  PERFORMANCE_TIER,
  type PerformanceTier,
} from "../types/performance-tier";
import type { ActivityWithCategory } from "@/features/activities/types/activity-with-category";
import { secondsInMinute } from "date-fns/constants";

interface Props {
  activity: ActivityWithCategory;
  duration_seconds: number;
}

export interface PerformanceDelta {
  minutes: number;
  tier: PerformanceTier;
}

function getTier(minutes: number, isOverMax: boolean): PerformanceTier {
  if (minutes > 0) return PERFORMANCE_TIER.AHEAD;
  if (minutes === 0) return PERFORMANCE_TIER.ON_TIME;
  if (isOverMax) return PERFORMANCE_TIER.OVER;
  return PERFORMANCE_TIER.LATE;
}

/**
 * Compares a task's duration against its activity's expected time.
 *
 * @param props.activity - Activity holding `exp_seconds` and `max_seconds`.
 * @param props.duration_seconds - How long the task took.
 * @returns Minutes won (positive) or lost (negative), rounded to the nearest
 * minute and never `-0`, plus its {@link PerformanceTier}.
 */
export function getPerformanceDelta({
  activity,
  duration_seconds,
}: Props): PerformanceDelta {
  const { exp_seconds, max_seconds } = activity;
  const minutes =
    Math.round((exp_seconds - duration_seconds) / secondsInMinute) || 0;

  return { minutes, tier: getTier(minutes, duration_seconds > max_seconds) };
}
