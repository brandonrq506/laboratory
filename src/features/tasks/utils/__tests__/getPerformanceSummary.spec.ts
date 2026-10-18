import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

import { PERFORMANCE_TIER } from "../../types/performance-tier";
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
  it("returns zero on time for empty array", () => {
    expect(getPerformanceSummary([])).toEqual({
      total: 0,
      netMinutes: 0,
      tier: PERFORMANCE_TIER.ON_TIME,
    });
  });

  it("sums minutes won as ahead", () => {
    // +10m, -4m, -3m
    const tasks = [
      makeTask(1800, 2700, 1200),
      makeTask(1800, 2700, 2040),
      makeTask(1800, 2700, 1980),
    ];
    expect(getPerformanceSummary(tasks)).toEqual({
      total: 3,
      netMinutes: 3,
      tier: PERFORMANCE_TIER.AHEAD,
    });
  });

  it("treats any net loss as over, even if tasks were only late", () => {
    // +2m, -5m (late, within max)
    const tasks = [makeTask(1800, 2700, 1680), makeTask(1800, 2700, 2100)];
    expect(getPerformanceSummary(tasks)).toEqual({
      total: 2,
      netMinutes: -3,
      tier: PERFORMANCE_TIER.OVER,
    });
  });

  it("returns on time when wins and losses cancel out", () => {
    const tasks = [makeTask(1800, 2700, 1500), makeTask(1800, 2700, 2100)];
    expect(getPerformanceSummary(tasks)).toEqual({
      total: 2,
      netMinutes: 0,
      tier: PERFORMANCE_TIER.ON_TIME,
    });
  });
});
