import { inProgressTasks, scheduledTasks } from "@/test/store/tasks";
import { calculateExpectedStartTimes } from "../calculateExpectedStartTimes";

describe("calculateExpectedStartTimes", () => {
  const FIXED_TEST_DATE = new Date("2025-05-03T04:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_TEST_DATE);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("handles when scheduled tasks go beyond the end of the day", () => {
    // Using large avg_time values to ensure tasks extend past midnight
    const longTasks = [
      {
        ...scheduledTasks[0],
        activity: {
          ...scheduledTasks[0].activity,
          // 3 hours
          avg_time: 3600 * 3,
        },
      },
      {
        ...scheduledTasks[1],
        activity: {
          ...scheduledTasks[1].activity,
          // 4 hours
          avg_time: 3600 * 4,
        },
      },
    ];

    const result = calculateExpectedStartTimes(longTasks, undefined);

    expect(result.length).toBe(2);
    expect(result[0].expected_start_time).toEqual(
      new Date("2025-05-03T04:00:00.000Z"),
    );
    expect(result[1].expected_start_time).toEqual(
      new Date("2025-05-03T07:00:00.000Z"),
    );
  });

  it("takes in consideration the in-progress task", () => {
    const inProgressTask = inProgressTasks[0];
    const result = calculateExpectedStartTimes(scheduledTasks, inProgressTask);

    expect(result.length).toBe(scheduledTasks.length);
    // First task should start when in-progress task ends
    expect(result[0].expected_start_time).toEqual(
      new Date("2025-05-03T04:35:00.000Z"),
    );
    // Second task should start 5 minutes after first (300 seconds)
    expect(result[1].expected_start_time).toEqual(
      new Date("2025-05-03T04:40:00.000Z"),
    );
  });

  it("works with no in-progress task", () => {
    const result = calculateExpectedStartTimes(scheduledTasks, undefined);

    expect(result.length).toBe(scheduledTasks.length);
    // First task should start at current time
    expect(result[0].expected_start_time).toEqual(
      new Date("2025-05-03T04:00:00.000Z"),
    );
    // Second task should start 5 minutes after first (300 seconds)
    expect(result[1].expected_start_time).toEqual(
      new Date("2025-05-03T04:05:00.000Z"),
    );
    // Check a few more to verify the sequence
    expect(result[2].expected_start_time).toEqual(
      new Date("2025-05-03T04:10:00.000Z"),
    );
  });

  it("works with no scheduled tasks", () => {
    const result = calculateExpectedStartTimes(undefined, undefined);
    expect(result).toEqual([]);
  });

  it("works with scheduled tasks and no in-progress task", () => {
    const filteredTasks = scheduledTasks.slice(0, 3);
    const result = calculateExpectedStartTimes(filteredTasks, undefined);

    expect(result.length).toBe(3);
    // First task should start at current time
    expect(result[0].expected_start_time).toEqual(
      new Date("2025-05-03T04:00:00.000Z"),
    );
    // Task 1: starts at 04:00, runs for 300 seconds
    expect(result[1].expected_start_time).toEqual(
      new Date("2025-05-03T04:05:00.000Z"),
    );
    // Task 2: starts at 04:05, runs for 300 seconds
    expect(result[2].expected_start_time).toEqual(
      new Date("2025-05-03T04:10:00.000Z"),
    );
  });
});
