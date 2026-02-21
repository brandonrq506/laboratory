import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

import { completedTasks } from "@/test/store/tasks";
import { getPerformanceSummary } from "../getPerformanceSummary";

const makeTask = (
  expSeconds: number,
  maxSeconds: number,
  durationSeconds: number,
): CompletedTaskAPI => {
  const base = completedTasks[0];
  const start = "2025-05-02T21:00:00.000Z";
  const end = new Date(
    new Date(start).getTime() + durationSeconds * 1000,
  ).toISOString();

  return {
    ...base,
    activity: {
      ...base.activity,
      exp_seconds: expSeconds,
      max_seconds: maxSeconds,
    },
    start_time: start,
    end_time: end,
  };
};

describe("getPerformanceSummary", () => {
  it("returns all zeros for empty array", () => {
    const result = getPerformanceSummary([]);
    expect(result).toEqual({
      rocket: 0,
      turtle: 0,
      snail: 0,
      total: 0,
      rocketPct: 0,
      turtlePct: 0,
      snailPct: 0,
    });
  });

  it("counts all rockets when all tasks <= exp", () => {
    const tasks = [makeTask(300, 600, 200), makeTask(300, 600, 300)];
    const result = getPerformanceSummary(tasks);
    expect(result).toEqual({
      rocket: 2,
      turtle: 0,
      snail: 0,
      total: 2,
      rocketPct: 100,
      turtlePct: 0,
      snailPct: 0,
    });
  });

  it("counts all snails when all tasks > max", () => {
    const tasks = [makeTask(300, 600, 601), makeTask(300, 600, 700)];
    const result = getPerformanceSummary(tasks);
    expect(result).toEqual({
      rocket: 0,
      turtle: 0,
      snail: 2,
      total: 2,
      rocketPct: 0,
      turtlePct: 0,
      snailPct: 100,
    });
  });

  it("classifies mixed tasks and rounds percentages", () => {
    const tasks = [
      // rocket
      makeTask(300, 600, 200),
      // turtle
      makeTask(300, 600, 400),
      // snail
      makeTask(300, 600, 700),
    ];
    const result = getPerformanceSummary(tasks);
    expect(result).toEqual({
      rocket: 1,
      turtle: 1,
      snail: 1,
      total: 3,
      rocketPct: 33,
      turtlePct: 33,
      snailPct: 33,
    });
  });
});
