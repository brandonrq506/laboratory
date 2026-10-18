import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

import { addHours, subMinutes } from "date-fns";
import { completedTasks } from "@/test/store/tasks";
import { secondsInMinute } from "date-fns/constants";

const EXP_MINUTES = 30;
const MAX_MINUTES = 60;
const FIRST_END = new Date("2026-10-18T08:00:00");

/** Completed Task ending at `end` with the given Performance Delta. */
export const makeCompletedTask = (
  deltaMinutes: number,
  end: Date,
): CompletedTaskAPI => {
  const base = completedTasks[0];
  const start = subMinutes(end, EXP_MINUTES - deltaMinutes);

  return {
    ...base,
    activity: {
      ...base.activity,
      exp_seconds: EXP_MINUTES * secondsInMinute,
      max_seconds: MAX_MINUTES * secondsInMinute,
    },
    start_time: start.toISOString(),
    end_time: end.toISOString(),
  };
};

/** Completed Tasks in completion order, one per hour, with the given deltas. */
export const makeCompletedDay = (deltas: number[]) =>
  deltas.map((delta, index) =>
    makeCompletedTask(delta, addHours(FIRST_END, index)),
  );
