import { HttpResponse, http } from "msw";
import { renderHook, waitFor } from "@/test/test-utils";

import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils/query-client";
import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
  taskByIdQueryOptions,
} from "../../queries";
import { apiRoutes } from "@/test/handlers/api-routes";
import { createDeferred } from "@/test/utils/create-deferred";
import { scheduledTasks } from "@/test/store/tasks";
import { server } from "@/test/server";
import { useStartTask } from "../useStartTask";

import type { InProgressTaskAPI } from "@/features/tasks/types/inProgressTask";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

describe("useStartTask", () => {
  const inProgressKey = inProgressTasksQueryOptions().queryKey;
  const scheduledKey = scheduledTasksQueryOptions().queryKey;

  const [task, ...otherScheduled] = scheduledTasks;
  const detailKey = taskByIdQueryOptions(task.id).queryKey;

  const started: InProgressTaskAPI = {
    ...task,
    status: TASK_STATUS.IN_PROGRESS,
    start_time: "2025-05-03T09:00:00.000Z",
    position: null,
  };

  it("restores the scheduled, in-progress and detail caches on 422", async () => {
    const response = createDeferred<void>();
    server.use(
      http.patch(apiRoutes.task, async () => {
        await response.promise;
        return HttpResponse.json({ errors: [] }, { status: 422 });
      }),
    );

    const queryClient = createTestQueryClient();
    queryClient.setQueryData(inProgressKey, []);
    queryClient.setQueryData(scheduledKey, scheduledTasks);
    queryClient.setQueryData(detailKey, task);

    const { result } = renderHook(() => useStartTask(), {
      wrapper: createQueryWrapper(queryClient),
    });

    const mutation = result.current.mutateAsync(started).catch(() => undefined);

    // Proves the optimistic write happened, so the rollback has something to undo.
    await waitFor(() => {
      expect(queryClient.getQueryData(scheduledKey)).toEqual(otherScheduled);
    });
    expect(queryClient.getQueryData(inProgressKey)).toEqual([started]);

    response.resolve();
    await mutation;

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(queryClient.getQueryData(inProgressKey)).toEqual([]);
    expect(queryClient.getQueryData(scheduledKey)).toEqual(scheduledTasks);
    expect(queryClient.getQueryData(detailKey)).toEqual(task);
  });
});
