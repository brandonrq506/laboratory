import { HttpResponse, http } from "msw";
import { act, renderHook, waitFor } from "@/test/test-utils";

import { SCHEDULED_LIST_DATE, scheduledTasks } from "@/test/store/tasks";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils/query-client";
import { apiRoutes } from "@/test/handlers/api-routes";
import { futureTasksQueryOptions } from "@/features/tasks/api/queries";
import { server } from "@/test/server";
import { useScheduledListData } from "../use-scheduled-list-data";

import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const stubFreshGet = (data: ScheduledTaskAPI[]) => {
  server.use(
    http.get(apiRoutes.tasks, () => HttpResponse.json(data, { status: 200 })),
  );
};

describe("useScheduledListData", () => {
  const listQueryOptions = futureTasksQueryOptions(SCHEDULED_LIST_DATE);

  const serverOrder: ScheduledTaskAPI[] = [
    scheduledTasks[0],
    scheduledTasks[1],
    scheduledTasks[2],
  ];

  const renderListData = () =>
    renderHook(() => useScheduledListData(listQueryOptions), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

  it("returns the list options it was given and the server tasks as rawItems and displayTasks", async () => {
    stubFreshGet(serverOrder);

    const { result } = renderListData();

    expect(result.current.isPending).toBe(true);
    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(result.current.listQueryOptions).toBe(listQueryOptions);
    expect(result.current.rawItems).toEqual(serverOrder);
    expect(result.current.displayTasks).toBe(result.current.rawItems);
  });

  it("a pin overrides the server data until it is cleared", async () => {
    stubFreshGet(serverOrder);
    const pinned = [serverOrder[1], serverOrder[0], serverOrder[2]];

    const { result } = renderListData();
    await waitFor(() => {
      expect(result.current.rawItems).toEqual(serverOrder);
    });

    act(() => {
      result.current.setTempItems(pinned);
    });
    expect(result.current.rawItems).toEqual(pinned);
    expect(result.current.displayTasks).toEqual(pinned);

    act(() => {
      result.current.setTempItems(null);
    });
    expect(result.current.rawItems).toEqual(serverOrder);
    expect(result.current.displayTasks).toEqual(serverOrder);
  });

  it("isError passes through and the list stays empty when the request fails", async () => {
    server.use(
      http.get(apiRoutes.tasks, () =>
        HttpResponse.json({ message: "boom" }, { status: 500 }),
      ),
    );

    const { result } = renderListData();

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.rawItems).toEqual([]);
    expect(result.current.displayTasks).toEqual([]);
  });
});
