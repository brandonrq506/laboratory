import { HttpResponse, http } from "msw";
import {
  QueryClient,
  QueryClientProvider,
  type QueryKey,
} from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

import {
  futureTasksQueryOptions,
  scheduledTasksQueryOptions,
} from "../../queries";
import { TASKS_ENDPOINT } from "@/libs/axios";
import { scheduledTasks } from "@/test/store/tasks";
import { server } from "@/test/server";
import { useFutureMoveTask } from "../use-move-future-task";

import type { ReactNode } from "react";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const API_URL = import.meta.env.VITE_API_URL;
const MOVE_URL = `${API_URL}/v1${TASKS_ENDPOINT}/move_drag`;

const FUTURE_DATE = "2026-05-09";

const makeWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const buildQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe("useFutureMoveTask", () => {
  const futureKey = futureTasksQueryOptions(FUTURE_DATE).queryKey;
  const scheduledKey = scheduledTasksQueryOptions().queryKey;

  const initialOrder: ScheduledTaskAPI[] = [
    scheduledTasks[0],
    scheduledTasks[1],
    scheduledTasks[2],
  ];
  const optimisticOrder: ScheduledTaskAPI[] = [
    scheduledTasks[1],
    scheduledTasks[0],
    scheduledTasks[2],
  ];

  it("writes optimistic value to the future key and invalidates only that key on settle", async () => {
    server.use(http.patch(MOVE_URL, () => HttpResponse.json({ ok: true })));

    const queryClient = buildQueryClient();
    queryClient.setQueryData(futureKey, initialOrder);
    queryClient.setQueryData(scheduledKey, []);

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useFutureMoveTask(FUTURE_DATE), {
      wrapper: makeWrapper(queryClient),
    });

    result.current.mutate({
      taskId: scheduledTasks[1].id,
      prevTaskId: null,
      nextTaskId: scheduledTasks[0].id,
      tasks: optimisticOrder,
    });

    await waitFor(() => {
      expect(queryClient.getQueryData(futureKey)).toEqual(optimisticOrder);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const invalidatedKeys = invalidateSpy.mock.calls.map(
      ([arg]) => (arg as { queryKey: QueryKey }).queryKey,
    );
    expect(invalidatedKeys).toContainEqual(futureKey);
    expect(invalidatedKeys).not.toContainEqual(scheduledKey);
  });

  it("rolls back to snapshot on 422", async () => {
    server.use(
      http.patch(MOVE_URL, () =>
        HttpResponse.json({ errors: [] }, { status: 422 }),
      ),
    );

    const queryClient = buildQueryClient();
    queryClient.setQueryData(futureKey, initialOrder);

    const { result } = renderHook(() => useFutureMoveTask(FUTURE_DATE), {
      wrapper: makeWrapper(queryClient),
    });

    await result.current
      .mutateAsync({
        taskId: scheduledTasks[1].id,
        prevTaskId: null,
        nextTaskId: scheduledTasks[0].id,
        tasks: optimisticOrder,
      })
      .catch(() => undefined);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(queryClient.getQueryData(futureKey)).toEqual(initialOrder);
  });

  it("calls cancelQueries on the future key in onMutate", async () => {
    server.use(http.patch(MOVE_URL, () => HttpResponse.json({ ok: true })));

    const queryClient = buildQueryClient();
    queryClient.setQueryData(futureKey, initialOrder);

    const cancelSpy = vi.spyOn(queryClient, "cancelQueries");

    const { result } = renderHook(() => useFutureMoveTask(FUTURE_DATE), {
      wrapper: makeWrapper(queryClient),
    });

    await result.current.mutateAsync({
      taskId: scheduledTasks[1].id,
      prevTaskId: null,
      nextTaskId: scheduledTasks[0].id,
      tasks: optimisticOrder,
    });

    expect(cancelSpy).toHaveBeenCalledWith({ queryKey: futureKey });
  });
});
