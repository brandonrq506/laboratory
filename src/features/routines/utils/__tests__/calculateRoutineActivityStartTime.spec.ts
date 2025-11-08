import { calculateRoutineActivityStartTime } from "../calculateRoutineActivityStartTime";

import { routines } from "@/test/store/routines";

describe("calculateRoutineActivityStartTime", () => {
  const FIXED_TEST_DATE = new Date("2025-05-03T04:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_TEST_DATE);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("builds expected start times from the provided HH:mm start time", () => {
    const activities = routines[0].activities.slice(0, 3);
    const result = calculateRoutineActivityStartTime(activities, "06:30");

    expect(result).toHaveLength(3);

    const expectedFirstStart = new Date(FIXED_TEST_DATE);
    expectedFirstStart.setMilliseconds(0);
    expectedFirstStart.setHours(6, 30, 0, 0);

    const expectedSecondStart = new Date(expectedFirstStart);
    expectedSecondStart.setSeconds(
      expectedSecondStart.getSeconds() + activities[0].activity_exp_seconds,
    );

    const expectedThirdStart = new Date(expectedSecondStart);
    expectedThirdStart.setSeconds(
      expectedThirdStart.getSeconds() + activities[1].activity_exp_seconds,
    );

    expect(result[0].expected_start_time).toEqual(expectedFirstStart);
    expect(result[1].expected_start_time).toEqual(expectedSecondStart);
    expect(result[2].expected_start_time).toEqual(expectedThirdStart);
  });

  it("falls back to the current time when no start time is provided", () => {
    const activities = routines[0].activities.slice(0, 2);
    const result = calculateRoutineActivityStartTime(activities, null);

    expect(result).toHaveLength(2);

    const expectedFirstStart = new Date(FIXED_TEST_DATE);
    expectedFirstStart.setMilliseconds(0);

    const expectedSecondStart = new Date(expectedFirstStart);
    expectedSecondStart.setSeconds(
      expectedSecondStart.getSeconds() + activities[0].activity_exp_seconds,
    );

    expect(result[0].expected_start_time).toEqual(expectedFirstStart);
    expect(result[1].expected_start_time).toEqual(expectedSecondStart);
  });

  it("returns an empty array when no activities exist", () => {
    const result = calculateRoutineActivityStartTime([], "05:00");
    expect(result).toEqual([]);
  });
});
