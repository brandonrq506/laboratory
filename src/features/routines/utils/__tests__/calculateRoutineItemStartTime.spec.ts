import { calculateRoutineItemStartTime } from "../calculateRoutineItemStartTime";

import { routines } from "@/test/store/routines";

describe("calculateRoutineItemStartTime", () => {
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
    const routineItems = routines[0].routine_items.slice(0, 3);
    const result = calculateRoutineItemStartTime(routineItems, "06:30");

    expect(result).toHaveLength(3);

    const expectedFirstStart = new Date(FIXED_TEST_DATE);
    expectedFirstStart.setMilliseconds(0);
    expectedFirstStart.setHours(6, 30, 0, 0);

    const expectedSecondStart = new Date(expectedFirstStart);
    expectedSecondStart.setSeconds(
      expectedSecondStart.getSeconds() + routineItems[0].item_exp_seconds,
    );

    const expectedThirdStart = new Date(expectedSecondStart);
    expectedThirdStart.setSeconds(
      expectedThirdStart.getSeconds() + routineItems[1].item_exp_seconds,
    );

    expect(result[0].expected_start_time).toEqual(expectedFirstStart);
    expect(result[1].expected_start_time).toEqual(expectedSecondStart);
    expect(result[2].expected_start_time).toEqual(expectedThirdStart);
  });

  it("falls back to the current time when no start time is provided", () => {
    const routineItems = routines[0].routine_items.slice(0, 2);
    const result = calculateRoutineItemStartTime(routineItems, null);

    expect(result).toHaveLength(2);

    const expectedFirstStart = new Date(FIXED_TEST_DATE);
    expectedFirstStart.setMilliseconds(0);

    const expectedSecondStart = new Date(expectedFirstStart);
    expectedSecondStart.setSeconds(
      expectedSecondStart.getSeconds() + routineItems[0].item_exp_seconds,
    );

    expect(result[0].expected_start_time).toEqual(expectedFirstStart);
    expect(result[1].expected_start_time).toEqual(expectedSecondStart);
  });

  it("includes routine items when building expected times", () => {
    const routineItems = routines[0].routine_items.slice(3, 6);
    const result = calculateRoutineItemStartTime(routineItems, "05:15");

    expect(result).toHaveLength(3);
    expect(result[1].type).toBe("routine");

    const expectedFirstStart = new Date(FIXED_TEST_DATE);
    expectedFirstStart.setMilliseconds(0);
    expectedFirstStart.setHours(5, 15, 0, 0);

    const expectedSecondStart = new Date(expectedFirstStart);
    expectedSecondStart.setSeconds(
      expectedSecondStart.getSeconds() + routineItems[0].item_exp_seconds,
    );

    const expectedThirdStart = new Date(expectedSecondStart);
    expectedThirdStart.setSeconds(
      expectedThirdStart.getSeconds() + routineItems[1].item_exp_seconds,
    );

    expect(result[0].expected_start_time).toEqual(expectedFirstStart);
    expect(result[1].expected_start_time).toEqual(expectedSecondStart);
    expect(result[2].expected_start_time).toEqual(expectedThirdStart);
  });

  it("returns an empty array when no routine items exist", () => {
    const result = calculateRoutineItemStartTime([], "05:00");
    expect(result).toEqual([]);
  });
});
