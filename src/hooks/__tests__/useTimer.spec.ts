import { act, renderHook } from "@testing-library/react";
import { useTimer } from "../useTimer";

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T10:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("computes remaining seconds and updates every second", () => {
    const start = "2024-01-01T10:00:00.000Z";
    const expSeconds = 10;

    const { result } = renderHook(() =>
      useTimer({ start_time: start, exp_seconds: expSeconds }),
    );

    // Immediate tick; at start time we have full remaining seconds
    expect(result.current).toBe(10);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(9);

    act(() => {
      vi.advanceTimersByTime(8000);
    });
    expect(result.current).toBe(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(0);
  });

  it("handles past end time (returns negative/zero appropriately)", () => {
    // 60s before now
    const start = "2024-01-01T09:59:00.000Z";
    // already expired by 30s
    const expSeconds = 30;

    const { result } = renderHook(() =>
      useTimer({ start_time: start, exp_seconds: expSeconds }),
    );

    expect(result.current).toBe(-30);
  });
});
