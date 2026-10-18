import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

import { getDurationInSeconds } from "./getDurationInSeconds";
import { getPerformanceDelta } from "./getPerformanceDelta";

/** Performance Delta of a Completed Task against its Activity. */
export function getCompletedTaskDelta(task: CompletedTaskAPI) {
  return getPerformanceDelta({
    activity: task.activity,
    duration_seconds: getDurationInSeconds(task.start_time, task.end_time),
  });
}
