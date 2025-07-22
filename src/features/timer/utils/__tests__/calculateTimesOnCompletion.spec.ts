import { calculateTimesOnCompletion } from "../calculateTimesOnCompletion";
import { endOfDay } from "date-fns";

describe("calculateTimesOnCompletion", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should round start_time to nearest minute", () => {
    const currentDate = new Date("2023-06-15T14:30:00.000Z");
    vi.setSystemTime(currentDate);

    const startTime = "2023-06-15T10:25:30.000Z";

    const result = calculateTimesOnCompletion(startTime);

    expect(result.start_time).toBe("2023-06-15T10:26:00.000Z");
  });

  it("should use current time as end_time when before end of day", () => {
    const currentDate = new Date("2023-06-15T14:30:45.000Z");
    vi.setSystemTime(currentDate);

    const startTime = "2023-06-15T10:00:00.000Z";

    const result = calculateTimesOnCompletion(startTime);

    expect(result.end_time).toBe("2023-06-15T14:31:00.000Z");
  });

  it("uses end of day if current time is after it", () => {
    const start = "2023-06-14T10:00:00.000Z";
    const current = new Date("2023-06-15T12:00:00.000Z");
    vi.setSystemTime(current);

    const result = calculateTimesOnCompletion(start);

    const expectedEnd = new Date(endOfDay(new Date(start)));
    expectedEnd.setSeconds(0, 0);
    expectedEnd.setMilliseconds(0);

    expect(new Date(result.end_time)).toEqual(expectedEnd);
  });

  it("should handle edge case when start time is near end of day", () => {
    const currentDate = new Date("2023-06-15T23:58:30.000Z");
    vi.setSystemTime(currentDate);

    const startTime = "2023-06-15T23:55:00.000Z";

    const result = calculateTimesOnCompletion(startTime);

    expect(result.start_time).toBe("2023-06-15T23:55:00.000Z");
    expect(result.end_time).toBe("2023-06-15T23:59:00.000Z");
  });
});
