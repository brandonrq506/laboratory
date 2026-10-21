import { HttpResponse, http } from "msw";
import { renderHook, waitFor } from "@/test/test-utils";

import {
  completedTasks,
  inProgressTasks,
  scheduledTasks,
} from "@/test/store/tasks";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils/query-client";
import {
  inProgressTasksQueryOptions,
  taskByIdQueryOptions,
  timerScheduledTasksQueryOptions,
  todayCompletedTasksQueryOptions,
} from "../../queries";
import { apiRoutes } from "@/test/handlers/api-routes";
import { createDeferred } from "@/test/utils/create-deferred";
import { server } from "@/test/server";
import { useActivateTask } from "../useActivateTask";

describe("useActivateTask", () => {
  const inProgressKey = inProgressTasksQueryOptions().queryKey;
  const scheduledKey = timerScheduledTasksQueryOptions().queryKey;
  const completedKey = todayCompletedTasksQueryOptions().queryKey;

  const [current] = inProgressTasks;
  const [target, ...otherScheduled] = scheduledTasks;
  const targetKey = taskByIdQueryOptions(target.id).queryKey;
  const currentKey = taskByIdQueryOptions(current.id).queryKey;

  it("restores every touched cache on 422", async () => {
    const response = createDeferred<void>();
    server.use(
      http.post(apiRoutes.taskActivate, async () => {
        await response.promise;
        return HttpResponse.json({ errors: [] }, { status: 422 });
      }),
    );

    const queryClient = createTestQueryClient();
    queryClient.setQueryData(inProgressKey, inProgressTasks);
    queryClient.setQueryData(scheduledKey, scheduledTasks);
    queryClient.setQueryData(completedKey, completedTasks);
    queryClient.setQueryData(targetKey, target);
    queryClient.setQueryData(currentKey, current);

    const { result } = renderHook(() => useActivateTask(), {
      wrapper: createQueryWrapper(queryClient),
    });

    const mutation = result.current
      .mutateAsync({ taskId: target.id, timestamp: "2025-05-03T09:00:00.000Z" })
      .catch(() => undefined);

    // Proves the optimistic write happened, so the rollback has something to undo.
    await waitFor(() => {
      expect(queryClient.getQueryData(scheduledKey)).toEqual(otherScheduled);
    });
    expect(queryClient.getQueryData(completedKey)).toHaveLength(
      completedTasks.length + 1,
    );

    response.resolve();
    await mutation;

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(queryClient.getQueryData(inProgressKey)).toEqual(inProgressTasks);
    expect(queryClient.getQueryData(scheduledKey)).toEqual(scheduledTasks);
    expect(queryClient.getQueryData(completedKey)).toEqual(completedTasks);
    expect(queryClient.getQueryData(targetKey)).toEqual(target);
    expect(queryClient.getQueryData(currentKey)).toEqual(current);
  });
});
