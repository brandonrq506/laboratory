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
  /** Minutes won (+) or lost (-) against the activity's expected time. */
  minutes: number;
  tier: PerformanceTier;
}

function getTier(minutes: number, isOverMax: boolean): PerformanceTier {
  if (minutes > 0) return PERFORMANCE_TIER.AHEAD;
  if (minutes === 0) return PERFORMANCE_TIER.ON_TIME;
  if (isOverMax) return PERFORMANCE_TIER.OVER;
  return PERFORMANCE_TIER.LATE;
}

export function getPerformanceDelta({
  activity,
  duration_seconds,
}: Props): PerformanceDelta {
  const { exp_seconds, max_seconds } = activity;
  // Rounds legacy tasks saved with seconds; `|| 0` normalizes -0.
  const minutes =
    Math.round((exp_seconds - duration_seconds) / secondsInMinute) || 0;

  return { minutes, tier: getTier(minutes, duration_seconds > max_seconds) };
}
