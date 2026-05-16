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
} from "@/features/tasks/api/queries";
import { TASKS_ENDPOINT } from "@/libs/axios";
import { scheduledTasks } from "@/test/store/tasks";
import { server } from "@/test/server";
import { useDeleteTasks } from "../use-delete-tasks";

import type { ReactNode } from "react";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const API_URL = import.meta.env.VITE_API_URL;
const SPAN_DELETE_URL = `${API_URL}/v1${TASKS_ENDPOINT}/span_deletions`;

const makeWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const buildQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe("useDeleteTasks", () => {
  const scheduledKey = scheduledTasksQueryOptions().queryKey;
  const inProgressKey = inProgressTasksQueryOptions().queryKey;

  const initialOrder: ScheduledTaskAPI[] = [
    scheduledTasks[0],
    scheduledTasks[1],
    scheduledTasks[2],
    scheduledTasks[3],
  ];
  const deletedIds = [scheduledTasks[1].id, scheduledTasks[2].id];
  const expectedAfterDelete = initialOrder.filter(
    (t) => !deletedIds.includes(t.id),
  );

  it("filters deleted ids out of the scheduled cache and invalidates only that key on settle", async () => {
    server.use(
      http.post(SPAN_DELETE_URL, () => new HttpResponse(null, { status: 204 })),
    );

    const queryClient = buildQueryClient();
    queryClient.setQueryData(scheduledKey, initialOrder);
    queryClient.setQueryData(inProgressKey, []);

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useDeleteTasks(), {
      wrapper: makeWrapper(queryClient),
    });

    result.current.mutate({ task_ids: deletedIds });

    await waitFor(() => {
      expect(queryClient.getQueryData(scheduledKey)).toEqual(
        expectedAfterDelete,
      );
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
      http.post(SPAN_DELETE_URL, () =>
        HttpResponse.json({ errors: [] }, { status: 422 }),
      ),
    );

    const queryClient = buildQueryClient();
    queryClient.setQueryData(scheduledKey, initialOrder);

    const { result } = renderHook(() => useDeleteTasks(), {
      wrapper: makeWrapper(queryClient),
    });

    await result.current
      .mutateAsync({ task_ids: deletedIds })
      .catch(() => undefined);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(queryClient.getQueryData(scheduledKey)).toEqual(initialOrder);
  });

  it("calls cancelQueries on the scheduled key in onMutate", async () => {
    server.use(
      http.post(SPAN_DELETE_URL, () => new HttpResponse(null, { status: 204 })),
    );

    const queryClient = buildQueryClient();
    queryClient.setQueryData(scheduledKey, initialOrder);

    const cancelSpy = vi.spyOn(queryClient, "cancelQueries");

    const { result } = renderHook(() => useDeleteTasks(), {
      wrapper: makeWrapper(queryClient),
    });

    await result.current.mutateAsync({ task_ids: deletedIds });

    expect(cancelSpy).toHaveBeenCalledWith({ queryKey: scheduledKey });
  });
});
