import { act, render, screen } from "@testing-library/react";

import { NOTIFICATION_DURATION } from "@/constants/durations";
import { NetworkBadge } from "./NetworkBadge";

const EXIT_ANIMATION_DURATION = 300;

describe("NetworkBadge", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("dismisses a restored badge when reconnecting before the offline animation", () => {
    const animationFrames = new Map<number, FrameRequestCallback>();
    let nextAnimationFrameId = 0;

    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      nextAnimationFrameId += 1;
      animationFrames.set(nextAnimationFrameId, callback);
      return nextAnimationFrameId;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
      animationFrames.delete(id);
    });

    render(<NetworkBadge />);

    act(() => window.dispatchEvent(new Event("offline")));
    act(() => window.dispatchEvent(new Event("online")));

    act(() => {
      animationFrames.forEach((callback) => callback(performance.now()));
    });

    expect(screen.getByText("Connection Restored")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(NOTIFICATION_DURATION + EXIT_ANIMATION_DURATION);
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
