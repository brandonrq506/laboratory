import { act, renderHook } from "@testing-library/react";
import { useStopwatch } from "../useStopwatch";

describe("useStopwatch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T10:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("computes elapsed seconds and updates every second", () => {
    // 5 seconds before
    const startAt = "2024-01-01T09:59:55.000Z";
    const { result } = renderHook(() => useStopwatch({ start_at: startAt }));

    // Initial tick (tick() runs immediately, Date is rounded to seconds)
    expect(result.current).toBe(5);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(6);

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(result.current).toBe(10);
  });
});
