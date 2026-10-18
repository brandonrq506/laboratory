import { PACE_TREND, type PaceTrend } from "../types/pace-trend";
import {
  PACE_TREND_MIN_GAP_MINUTES,
  PACE_TREND_MIN_TASKS,
  PACE_TREND_WINDOW,
} from "../constants/pace-trend";
import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

import { compareAsc } from "date-fns";
import { getCompletedTaskDelta } from "@/features/tasks/utils/getCompletedTaskDelta";

const sum = (values: number[]) =>
  values.reduce((total, value) => total + value, 0);

/**
 * Compares the latest Completed Tasks' average Performance Delta against the
 * earlier ones'.
 *
 * @param tasks - Completed Tasks in any order.
 * @returns {@link PaceTrend}, or `null` with too few tasks or too small a gap.
 */
export function getPaceTrend(tasks: CompletedTaskAPI[]): PaceTrend | null {
  if (tasks.length < PACE_TREND_MIN_TASKS) return null;

  const deltas = tasks
    .toSorted((a, b) => compareAsc(a.end_time, b.end_time))
    .map((task) => getCompletedTaskDelta(task).minutes);

  const recent = deltas.slice(-PACE_TREND_WINDOW);
  const earlier = deltas.slice(0, -PACE_TREND_WINDOW);

  const scale = recent.length * earlier.length;
  const gap = sum(recent) * earlier.length - sum(earlier) * recent.length;
  const minGap = PACE_TREND_MIN_GAP_MINUTES * scale;

  if (gap >= minGap) return PACE_TREND.SPEEDING_UP;

  if (gap <= -minGap) return PACE_TREND.SLOWING_DOWN;

  return null;
}
