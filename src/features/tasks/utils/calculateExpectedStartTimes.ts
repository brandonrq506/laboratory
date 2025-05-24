/* eslint-disable no-magic-numbers */
import { InProgressTaskAPI } from "../types/inProgressTast";
import { ScheduledTaskAPI } from "../types/scheduledTask";
import { ScheduledTaskWithExpectedStartTime } from "../types/scheduledTaskWithExpectedStartTime";
import { floorMilliseconds } from "@/utils";

/**
 * Calculates the expected start times for scheduled tasks
 * Takes into account any in-progress task and calculates a cumulative timeline
 */
type FnDef = (
  scheduledTasks: ScheduledTaskAPI[] | undefined,
  inProgressTask: InProgressTaskAPI | undefined,
) => ScheduledTaskWithExpectedStartTime[];

export const calculateExpectedStartTimes: FnDef = (
  scheduledTasks,
  inProgressTask,
) => {
  if (!scheduledTasks || scheduledTasks.length === 0) return [];

  // Base time starts from now
  let nextStartTime = floorMilliseconds(new Date());

  // If there's an in-progress task, calculate its expected end time
  if (inProgressTask) {
    const startTime = new Date(inProgressTask.start_time);
    const expectedTimeSeconds = inProgressTask.activity.exp_seconds;

    // Calculate elapsed time from start to now
    const elapsedMilliseconds = nextStartTime.getTime() - startTime.getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    // If the exp_time exists and the task is still in progress according to exp_time
    if (expectedTimeSeconds > 0 && elapsedSeconds < expectedTimeSeconds) {
      // Task still has time left, add the remaining time to the current time
      const remainingSeconds = (expectedTimeSeconds - elapsedSeconds) * 1000;
      nextStartTime = new Date(nextStartTime.getTime() + remainingSeconds);
    }
    // Otherwise, use the current time as next start time
  }

  // Calculate expected start times for each scheduled task
  return scheduledTasks.reduce<ScheduledTaskWithExpectedStartTime[]>(
    (acc, task) => {
      // capture the current start
      const expectedStart = new Date(nextStartTime);

      // push a new object that includes the expected start time
      acc.push({
        ...task,
        expected_start_time: expectedStart,
      });

      // bump nextStartTime by this task’s duration (or default 30m)
      const expSecs = task.activity.exp_seconds;
      const incrementMs = expSecs > 0 ? expSecs * 1000 : 30 * 60 * 1000;
      nextStartTime = new Date(nextStartTime.getTime() + incrementMs);

      return acc;
    },
    [],
  );
};
