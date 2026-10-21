import {
  futureTasksQueryOptions,
  timerScheduledTasksQueryOptions,
} from "../queries";
import { DATE_TOKEN_TODAY } from "@/constants/date-tokens";

describe("timerScheduledTasksQueryOptions", () => {
  it("builds a clock-independent key with the server 'today' token", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T10:00:00Z"));
    const before = timerScheduledTasksQueryOptions().queryKey;
    vi.setSystemTime(new Date("2026-01-02T10:00:00Z"));
    const after = timerScheduledTasksQueryOptions().queryKey;
    vi.useRealTimers();

    expect(after).toEqual(before);
    expect(before[0].filter?.scheduled_at).toEqual({
      is_on_or_before: DATE_TOKEN_TODAY,
    });
  });

  it("uses the literal 'today' token", () => {
    expect(DATE_TOKEN_TODAY).toBe("today");
  });

  it("differs from a future date list key", () => {
    expect(timerScheduledTasksQueryOptions().queryKey).not.toEqual(
      futureTasksQueryOptions("2030-01-01").queryKey,
    );
  });
});
