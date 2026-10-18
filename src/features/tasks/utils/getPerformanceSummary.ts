import {
  PERFORMANCE_TIER,
  type PerformanceTier,
} from "../types/performance-tier";
import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

import { getCompletedTaskDelta } from "./getCompletedTaskDelta";

export interface PerformanceSummary {
  total: number;
  netDelta: number;
  tier: PerformanceTier;
}

const getNetTier = (netDelta: number): PerformanceTier => {
  if (netDelta > 0) return PERFORMANCE_TIER.AHEAD;
  if (netDelta < 0) return PERFORMANCE_TIER.OVER;
  return PERFORMANCE_TIER.ON_TIME;
};

export function getPerformanceSummary(
  tasks: CompletedTaskAPI[],
): PerformanceSummary {
  const netDelta = tasks.reduce(
    (sum, task) => sum + getCompletedTaskDelta(task).minutes,
    0,
  );

  return { total: tasks.length, netDelta, tier: getNetTier(netDelta) };
}
