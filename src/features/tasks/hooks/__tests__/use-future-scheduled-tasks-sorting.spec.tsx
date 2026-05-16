import { HttpResponse, delay, http } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";

import { TASKS_ENDPOINT } from "@/libs/axios";
import { futureTasksQueryOptions } from "@/features/tasks/api/queries";
import { scheduledTasks } from "@/test/store/tasks";
import { server } from "@/test/server";

import { useFutureScheduledTasksSorting } from "../use-future-scheduled-tasks-sorting";

import type { ReactNode } from "react";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${TASKS_ENDPOINT}`;
const MOVE_URL = `${BASE_URL}/move_drag`;

const FUTURE_DATE = "2026-05-09";

const makeWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const buildQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const stubFreshGet = (data: ScheduledTaskAPI[]) => {
  server.use(
    http.get(BASE_URL, () => HttpResponse.json(data, { status: 200 })),
  );
};

describe("useFutureScheduledTasksSorting", () => {
  const futureKey = futureTasksQueryOptions(FUTURE_DATE).queryKey;

  const flatOrder: ScheduledTaskAPI[] = [
    scheduledTasks[0],
    scheduledTasks[1],
    scheduledTasks[2],
    scheduledTasks[3],
  ];

  const seedClient = (data: ScheduledTaskAPI[]) => {
    const queryClient = buildQueryClient();
    queryClient.setQueryData(futureKey, data);
    return queryClient;
  };

  it("renderItems contains only kind:task rows (no wrap algorithm)", () => {
    stubFreshGet(flatOrder);
    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(
      () => useFutureScheduledTasksSorting(FUTURE_DATE),
      { wrapper: makeWrapper(queryClient) },
    );

    expect(result.current.renderItems.map((t) => t.id)).toEqual(
      flatOrder.map((t) => t.id),
    );
  });

  it("handleDragStart sets draggingId; handleDragCancel clears it", () => {
    stubFreshGet(flatOrder);
    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(
      () => useFutureScheduledTasksSorting(FUTURE_DATE),
      { wrapper: makeWrapper(queryClient) },
    );

    act(() => {
      result.current.handleDragStart(flatOrder[0].id);
    });
    expect(result.current.draggingId).toBe(flatOrder[0].id);

    act(() => {
      result.current.handleDragCancel();
    });
    expect(result.current.draggingId).toBeNull();
  });

  it("handleDragEnd calls move_drag with the computed neighbors and clears draggingId", async () => {
    const movePayload = vi.fn();
    server.use(
      http.patch(MOVE_URL, async ({ request }) => {
        const body = await request.json();
        movePayload(body);
        return HttpResponse.json({ ok: true });
      }),
    );

    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(
      () => useFutureScheduledTasksSorting(FUTURE_DATE),
      { wrapper: makeWrapper(queryClient) },
    );

    act(() => {
      result.current.handleDragStart(flatOrder[0].id);
    });
    act(() => {
      result.current.handleDragEnd({
        itemId: flatOrder[0].id,
        prevItemId: flatOrder[1].id,
        nextItemId: flatOrder[2].id,
        items: [],
      });
    });

    expect(result.current.draggingId).toBeNull();

    await waitFor(() => {
      expect(movePayload).toHaveBeenCalledTimes(1);
    });
    const body = movePayload.mock.calls[0][0];
    expect(body.task_id).toBe(flatOrder[0].id);
    expect(body.previous_task_id).toBe(flatOrder[1].id);
    expect(body.next_task_id).toBe(flatOrder[2].id);
  });

  it("renderItems reflects the optimistic order while the move mutation is pending", async () => {
    server.use(
      http.patch(MOVE_URL, async () => {
        await delay(100);
        return HttpResponse.json({ ok: true });
      }),
    );

    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(
      () => useFutureScheduledTasksSorting(FUTURE_DATE),
      { wrapper: makeWrapper(queryClient) },
    );

    act(() => {
      result.current.handleDragEnd({
        itemId: flatOrder[0].id,
        prevItemId: flatOrder[1].id,
        nextItemId: flatOrder[2].id,
        items: [],
      });
    });

    await waitFor(() => {
      expect(result.current.renderItems.map((t) => t.id)).toEqual([
        flatOrder[1].id,
        flatOrder[0].id,
        flatOrder[2].id,
        flatOrder[3].id,
      ]);
    });
  });

  it("handleDragEnd bails (no mutate call) when the resulting order matches the existing order", async () => {
    const moveSpy = vi.fn();
    server.use(
      http.patch(MOVE_URL, () => {
        moveSpy();
        return HttpResponse.json({ ok: true });
      }),
    );
    stubFreshGet(flatOrder);

    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(
      () => useFutureScheduledTasksSorting(FUTURE_DATE),
      { wrapper: makeWrapper(queryClient) },
    );

    act(() => {
      result.current.handleDragEnd({
        itemId: flatOrder[0].id,
        prevItemId: null,
        nextItemId: flatOrder[1].id,
        items: [],
      });
    });

    await new Promise((r) => setTimeout(r, 30));
    expect(moveSpy).not.toHaveBeenCalled();
  });
});
