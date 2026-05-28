import { HttpResponse, http } from "msw";
import {
  QueryClient,
  QueryClientProvider,
  type QueryKey,
} from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
} from "../../queries";
import { TASKS_ENDPOINT } from "@/libs/axios";
import { scheduledTasks } from "@/test/store/tasks";
import { server } from "@/test/server";
import { useMoveTask } from "../useMoveTask";

import type { ReactNode } from "react";
import type { ScheduledTaskWithEST } from "@/features/tasks/types/scheduledTaskWithEST";

const API_URL = import.meta.env.VITE_API_URL;
const MOVE_URL = `${API_URL}/v1${TASKS_ENDPOINT}/move_drag`;

const makeWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const buildQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const enrich = (
  task: (typeof scheduledTasks)[number],
): ScheduledTaskWithEST => ({
  ...task,
  expected_start_time: new Date(task.scheduled_at),
});

describe("useMoveTask", () => {
  const scheduledKey = scheduledTasksQueryOptions().queryKey;
  const inProgressKey = inProgressTasksQueryOptions().queryKey;

  const initialOrder: ScheduledTaskWithEST[] = [
    enrich(scheduledTasks[0]),
    enrich(scheduledTasks[1]),
    enrich(scheduledTasks[2]),
  ];
  const optimisticOrder: ScheduledTaskWithEST[] = [
    initialOrder[1],
    initialOrder[0],
    initialOrder[2],
  ];

  it("writes optimistic value to the scheduled key and invalidates only that key on settle", async () => {
    server.use(http.patch(MOVE_URL, () => HttpResponse.json({ ok: true })));

    const queryClient = buildQueryClient();
    queryClient.setQueryData(scheduledKey, initialOrder);
    queryClient.setQueryData(inProgressKey, []);

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useMoveTask(), {
      wrapper: makeWrapper(queryClient),
    });

    result.current.mutate({
      taskId: scheduledTasks[1].id,
      prevTaskId: null,
      nextTaskId: scheduledTasks[0].id,
      tasks: optimisticOrder,
    });

    await waitFor(() => {
      expect(queryClient.getQueryData(scheduledKey)).toEqual(optimisticOrder);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const invalidatedKeys = invalidateSpy.mock.calls.map(
      ([arg]) => (arg as { queryKey: QueryKey }).queryKey,
    );
    expect(invalidatedKeys).toContainEqual(scheduledKey);
    expect(invalidatedKeys).not.toContainEqual(inProgressKey);
  });

  it("rolls back to snapshot on 422", async () => {
    server.use(
      http.patch(MOVE_URL, () =>
        HttpResponse.json({ errors: [] }, { status: 422 }),
      ),
    );

    const queryClient = buildQueryClient();
    queryClient.setQueryData(scheduledKey, initialOrder);

    const { result } = renderHook(() => useMoveTask(), {
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
    expect(queryClient.getQueryData(scheduledKey)).toEqual(initialOrder);
  });

  it("calls cancelQueries on the scheduled key in onMutate", async () => {
    server.use(http.patch(MOVE_URL, () => HttpResponse.json({ ok: true })));

    const queryClient = buildQueryClient();
    queryClient.setQueryData(scheduledKey, initialOrder);

    const cancelSpy = vi.spyOn(queryClient, "cancelQueries");

    const { result } = renderHook(() => useMoveTask(), {
      wrapper: makeWrapper(queryClient),
    });

    await result.current.mutateAsync({
      taskId: scheduledTasks[1].id,
      prevTaskId: null,
      nextTaskId: scheduledTasks[0].id,
      tasks: optimisticOrder,
    });

    expect(cancelSpy).toHaveBeenCalledWith({ queryKey: scheduledKey });
  });
});
