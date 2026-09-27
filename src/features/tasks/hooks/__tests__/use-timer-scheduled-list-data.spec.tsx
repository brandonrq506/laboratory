import { act, renderHook, waitFor } from "@/test/test-utils";
import { addSeconds } from "date-fns";

import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils/query-client";
import { inProgressTasks, scheduledTasks } from "@/test/store/tasks";
import { useTimerScheduledListData } from "../use-timer-scheduled-list-data";

// Halfway through the in-progress fixture (starts 03:35, expects 1h).
const NOW = new Date("2025-05-03T04:05:00.000Z");

describe("useTimerScheduledListData", () => {
  const [inProgress] = inProgressTasks;
  // The in-progress task still has time left, so the list starts when it is expected to end.
  const firstStart = addSeconds(
    new Date(inProgress.start_time),
    inProgress.activity.exp_seconds,
  );

  beforeEach(() => {
    // Only Date: faking timers breaks waitFor and MSW.
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderTimerListData = async () => {
    const { result } = renderHook(() => useTimerScheduledListData(), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });
    await waitFor(() => {
      expect(result.current.displayTasks[0]?.expected_start_time).toEqual(
        firstStart,
      );
    });
    return { result };
  };

  it("displayTasks carry expected_start_time chained after the in-progress task; rawItems stay server-shaped", async () => {
    const { result } = await renderTimerListData();

    expect(result.current.displayTasks[1].expected_start_time).toEqual(
      addSeconds(firstStart, scheduledTasks[0].activity.exp_seconds),
    );
    expect(result.current.rawItems).toEqual(scheduledTasks);
    result.current.rawItems.forEach((task) => {
      expect(task).not.toHaveProperty("expected_start_time");
    });
  });

  it("the pinned order flows into the EST order", async () => {
    const { result } = await renderTimerListData();
    const [first, second, third, ...rest] = scheduledTasks;
    const pinned = [third, first, second, ...rest];

    act(() => {
      result.current.setTempItems(pinned);
    });

    const [pinnedFirst, pinnedSecond] = result.current.displayTasks;
    expect(result.current.displayTasks.map((t) => t.id)).toEqual(
      pinned.map((t) => t.id),
    );
    expect(pinnedFirst.expected_start_time).toEqual(firstStart);
    expect(pinnedSecond.expected_start_time).toEqual(
      addSeconds(firstStart, third.activity.exp_seconds),
    );
    expect(result.current.rawItems).toEqual(pinned);
  });
});
