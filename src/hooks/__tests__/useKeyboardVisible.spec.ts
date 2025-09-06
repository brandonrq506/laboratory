import { act, renderHook } from "@testing-library/react";
import { useKeyboardVisible } from "../useKeyboardVisible";

type Writable<T> = { -readonly [P in keyof T]: T[P] };

describe("useKeyboardVisible", () => {
  const originalInnerHeight = window.innerHeight;
  let listeners: Record<string, EventListener[]>;
  let viewport: Partial<Writable<VisualViewport>>;

  beforeEach(() => {
    listeners = {};
    viewport = {
      height: 700,
      addEventListener: (type: string, cb: EventListener) => {
        listeners[type] ||= [];
        listeners[type].push(cb);
      },
      removeEventListener: (type: string, cb: EventListener) => {
        listeners[type] = (listeners[type] || []).filter((x) => x !== cb);
      },
    };

    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      writable: true,
      value: viewport,
    });

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      writable: true,
      value: 800,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: originalInnerHeight,
    });
  });

  it("reports visibility when viewport height shrink exceeds threshold", () => {
    const { result } = renderHook(() => useKeyboardVisible());

    expect(result.current).toBe(false);

    // Shrink visualViewport by >100px to simulate keyboard shown
    viewport.height = 680;
    act(() => {
      listeners.resize.forEach((cb) => cb(new Event("resize")));
    });
    expect(result.current).toBe(true);

    // Restore height difference to <=100px to simulate keyboard hidden
    viewport.height = 710;
    act(() => {
      listeners.resize.forEach((cb) => cb(new Event("resize")));
    });
    expect(result.current).toBe(false);
  });
});
