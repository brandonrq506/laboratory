import { act, renderHook } from "@testing-library/react";
import { useTimeout } from "../useTimeout";

describe("useTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts with default delay and calls callback once", () => {
    const cb = vi.fn();
    const { result } = renderHook(() => useTimeout(cb));

    // default 1000ms
    act(() => result.current.start());
    expect(result.current.isActive).toBe(true);

    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(cb).not.toHaveBeenCalled();
    expect(result.current.isActive).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(cb).toHaveBeenCalledTimes(1);
    expect(result.current.isActive).toBe(false);
  });

  it("clears a running timeout", () => {
    const cb = vi.fn();
    const { result } = renderHook(() => useTimeout(cb));

    act(() => result.current.start(200));
    expect(result.current.isActive).toBe(true);

    act(() => result.current.clear());
    expect(result.current.isActive).toBe(false);

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(cb).not.toHaveBeenCalled();
  });

  it("restarts when start is called again", () => {
    const cb = vi.fn();
    const { result } = renderHook(() => useTimeout(cb));

    act(() => result.current.start(200));
    act(() => {
      vi.advanceTimersByTime(150);
    });
    act(() => result.current.start(200));

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(cb).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("ignores invalid delays", () => {
    const cb = vi.fn();
    const { result } = renderHook(() => useTimeout(cb));

    // Negative
    act(() => result.current.start(-5 as unknown as number));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(cb).not.toHaveBeenCalled();

    // Non-finite
    act(() => result.current.start(Infinity));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(cb).not.toHaveBeenCalled();
  });

  it("uses the latest callback on execution", () => {
    const first = vi.fn();
    const second = vi.fn();

    const { result, rerender } = renderHook(
      ({ cb }: { cb: () => void }) => useTimeout(cb),
      { initialProps: { cb: first } },
    );

    act(() => result.current.start(200));
    rerender({ cb: second });

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
