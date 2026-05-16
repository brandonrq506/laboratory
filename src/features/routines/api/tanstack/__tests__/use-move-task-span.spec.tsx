import { HttpResponse, http } from "msw";
import {
  QueryClient,
  QueryClientProvider,
  type QueryKey,
} from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

import { TASKS_ENDPOINT } from "@/libs/axios";
import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
} from "@/features/tasks/api/queries";
import { scheduledTasks } from "@/test/store/tasks";
import { server } from "@/test/server";
import { useMoveTaskSpan } from "../use-move-task-span";

import type { ReactNode } from "react";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const API_URL = import.meta.env.VITE_API_URL;
const SPAN_MOVE_URL = `${API_URL}/v1${TASKS_ENDPOINT}/span_moves`;

const makeWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const buildQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe("useMoveTaskSpan", () => {
  const scheduledKey = scheduledTasksQueryOptions().queryKey;
  const inProgressKey = inProgressTasksQueryOptions().queryKey;

  const initialOrder: ScheduledTaskAPI[] = [
    scheduledTasks[0],
    scheduledTasks[1],
    scheduledTasks[2],
    scheduledTasks[3],
    scheduledTasks[4],
  ];
  const optimisticOrder: ScheduledTaskAPI[] = [
    scheduledTasks[0],
    scheduledTasks[3],
    scheduledTasks[1],
    scheduledTasks[2],
    scheduledTasks[4],
  ];

  const payload = {
    task_ids: [scheduledTasks[1].id, scheduledTasks[2].id],
    previous_task_id: scheduledTasks[3].id,
    next_task_id: scheduledTasks[4].id,
    tasks: optimisticOrder,
  };

  it("writes optimistic value to the scheduled key and invalidates only that key on settle", async () => {
    server.use(
      http.post(SPAN_MOVE_URL, () => HttpResponse.json({ success: true })),
    );

    const queryClient = buildQueryClient();
    queryClient.setQueryData(scheduledKey, initialOrder);
    queryClient.setQueryData(inProgressKey, []);

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useMoveTaskSpan(), {
      wrapper: makeWrapper(queryClient),
    });

    result.current.mutate(payload);

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
      http.post(SPAN_MOVE_URL, () =>
        HttpResponse.json({ errors: [] }, { status: 422 }),
      ),
    );

    const queryClient = buildQueryClient();
    queryClient.setQueryData(scheduledKey, initialOrder);

    const { result } = renderHook(() => useMoveTaskSpan(), {
      wrapper: makeWrapper(queryClient),
    });

    await result.current.mutateAsync(payload).catch(() => undefined);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(queryClient.getQueryData(scheduledKey)).toEqual(initialOrder);
  });

  it("calls cancelQueries on the scheduled key in onMutate", async () => {
    server.use(
      http.post(SPAN_MOVE_URL, () => HttpResponse.json({ success: true })),
    );

    const queryClient = buildQueryClient();
    queryClient.setQueryData(scheduledKey, initialOrder);

    const cancelSpy = vi.spyOn(queryClient, "cancelQueries");

    const { result } = renderHook(() => useMoveTaskSpan(), {
      wrapper: makeWrapper(queryClient),
    });

    await result.current.mutateAsync(payload);

    expect(cancelSpy).toHaveBeenCalledWith({ queryKey: scheduledKey });
  });
});
