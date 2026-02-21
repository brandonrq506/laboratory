import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

import { getDurationInSeconds } from "./getDurationInSeconds";
import { getPerformanceEmoji } from "./getPerformanceEmoji";

const HUNDRED = 100;

export interface PerformanceSummary {
  rocket: number;
  turtle: number;
  snail: number;
  total: number;
  rocketPct: number;
  turtlePct: number;
  snailPct: number;
}

export function getPerformanceSummary(
  tasks: CompletedTaskAPI[],
): PerformanceSummary {
  const total = tasks.length;

  if (total === 0) {
    return {
      rocket: 0,
      turtle: 0,
      snail: 0,
      total: 0,
      rocketPct: 0,
      turtlePct: 0,
      snailPct: 0,
    };
  }

  let rocket = 0;
  let turtle = 0;
  let snail = 0;

  for (const task of tasks) {
    const duration = getDurationInSeconds(task.start_time, task.end_time);
    const emoji = getPerformanceEmoji({
      activity: task.activity,
      duration_seconds: duration,
    });

    if (emoji === "🚀") rocket++;
    else if (emoji === "🐢") turtle++;
    else snail++;
  }

  return {
    rocket,
    turtle,
    snail,
    total,
    rocketPct: Math.round((rocket / total) * HUNDRED),
    turtlePct: Math.round((turtle / total) * HUNDRED),
    snailPct: Math.round((snail / total) * HUNDRED),
  };
}
