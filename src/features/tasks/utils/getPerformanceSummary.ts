import {
  PERFORMANCE_TIER,
  type PerformanceTier,
} from "../types/performance-tier";
import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

import { getDurationInSeconds } from "./getDurationInSeconds";
import { getPerformanceDelta } from "./getPerformanceDelta";

export interface PerformanceSummary {
  total: number;
  /** Sum of each task's rounded minutes won (+) or lost (-). */
  netMinutes: number;
  tier: PerformanceTier;
}

// Net has no `late` tier: any net loss reads as over (red).
const getNetTier = (netMinutes: number): PerformanceTier => {
  if (netMinutes > 0) return PERFORMANCE_TIER.AHEAD;
  if (netMinutes < 0) return PERFORMANCE_TIER.OVER;
  return PERFORMANCE_TIER.ON_TIME;
};

export function getPerformanceSummary(
  tasks: CompletedTaskAPI[],
): PerformanceSummary {
  const netMinutes = tasks.reduce((sum, task) => {
    const { minutes } = getPerformanceDelta({
      activity: task.activity,
      duration_seconds: getDurationInSeconds(task.start_time, task.end_time),
    });
    return sum + minutes;
  }, 0);

  return { total: tasks.length, netMinutes, tier: getNetTier(netMinutes) };
}
