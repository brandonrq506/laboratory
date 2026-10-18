import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

import {
  PACE_TREND_MIN_GAP_MINUTES,
  PACE_TREND_MIN_TASKS,
} from "../../constants/pace-trend";
import { addHours, subMinutes } from "date-fns";
import { PACE_TREND } from "../../types/pace-trend";
import { completedTasks } from "@/test/store/tasks";
import { getPaceTrend } from "../getPaceTrend";
import { secondsInMinute } from "date-fns/constants";

const FIRST_END = new Date("2026-10-18T08:00:00");
const EXP_MINUTES = 30;
const MAX_MINUTES = 60;

/** Completed Task ending at `end` with the given Performance Delta. */
const makeTask = (deltaMinutes: number, end: Date): CompletedTaskAPI => {
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

/** Tasks in completion order, one per hour. */
const makeDay = (deltas: number[]) =>
  deltas.map((delta, index) => makeTask(delta, addHours(FIRST_END, index)));

describe("getPaceTrend", () => {
  it(`returns null with fewer than ${PACE_TREND_MIN_TASKS} tasks`, () => {
    expect(getPaceTrend(makeDay([-15, 5, 5]))).toBeNull();
  });

  it("detects speeding up even while behind overall", () => {
    expect(getPaceTrend(makeDay([-15, -15, -15, 2, 2, 2]))).toBe(
      PACE_TREND.SPEEDING_UP,
    );
  });

  it("detects slowing down even while ahead overall", () => {
    expect(getPaceTrend(makeDay([20, 20, 5, 5, 5]))).toBe(
      PACE_TREND.SLOWING_DOWN,
    );
  });

  it(`returns null when the gap is under ${PACE_TREND_MIN_GAP_MINUTES}m per task`, () => {
    expect(getPaceTrend(makeDay([0, 2, 2, 2]))).toBeNull();
  });

  it(`counts a gap of exactly ${PACE_TREND_MIN_GAP_MINUTES}m per task`, () => {
    expect(getPaceTrend(makeDay([0, 3, 3, 3]))).toBe(PACE_TREND.SPEEDING_UP);
  });

  it("counts an exact gap whose averages are fractional", () => {
    expect(getPaceTrend(makeDay([7, 0, 0, 16, 0, 0]))).toBe(
      PACE_TREND.SPEEDING_UP,
    );
    expect(getPaceTrend(makeDay([16, 0, 0, 7, 0, 0]))).toBe(
      PACE_TREND.SLOWING_DOWN,
    );
  });

  it("orders tasks by end time, not input order", () => {
    const newestFirst = makeDay([-15, -15, 2, 2, 2]).toReversed();
    expect(getPaceTrend(newestFirst)).toBe(PACE_TREND.SPEEDING_UP);
  });
});
