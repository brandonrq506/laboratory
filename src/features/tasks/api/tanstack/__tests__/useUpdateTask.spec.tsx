import { HttpResponse, http } from "msw";
import { renderHook, waitFor } from "@/test/test-utils";

import { SCHEDULED_LIST_DATE, scheduledTasks } from "@/test/store/tasks";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils/query-client";
import {
  futureTasksQueryOptions,
  scheduledTasksQueryOptions,
  taskByIdQueryOptions,
} from "../../queries";
import { apiRoutes } from "@/test/handlers/api-routes";
import { createDeferred } from "@/test/utils/create-deferred";
import { server } from "@/test/server";
import { useUpdateTask } from "../useUpdateTask";

describe("useUpdateTask", () => {
  const listKey = scheduledTasksQueryOptions().queryKey;

  const [task, ...otherScheduled] = scheduledTasks;
  const detailKey = taskByIdQueryOptions(task.id).queryKey;

  const edit = { note: "Edited note" };
  const payload = { taskId: task.id, task: edit };

  const seedClient = () => {
    const queryClient = createTestQueryClient();
    queryClient.setQueryData(listKey, scheduledTasks);
    queryClient.setQueryData(detailKey, task);
    return queryClient;
  };

  // Records PATCH bodies and holds the response so the optimistic state can be observed.
  const interceptPatch = (status: number) => {
    const bodies: unknown[] = [];
    const response = createDeferred<void>();

    server.use(
      http.patch(apiRoutes.task, async ({ request }) => {
        bodies.push(await request.json());
        await response.promise;
        return status === 200
          ? HttpResponse.json({ ...task, ...edit })
          : HttpResponse.json({ errors: [] }, { status });
      }),
    );

    return { bodies, release: response.resolve };
  };

  // Catches: edit not sent as a partial body, or list/detail not showing the edit before the server answers.
  it("sends the edit and patches the list and detail caches optimistically", async () => {
    const { bodies, release } = interceptPatch(200);
    const queryClient = seedClient();

    const { result } = renderHook(() => useUpdateTask(), {
      wrapper: createQueryWrapper(queryClient),
    });

    const mutation = result.current.mutateAsync(payload);

    await waitFor(() => {
      expect(queryClient.getQueryData(detailKey)).toEqual({ ...task, ...edit });
    });
    expect(queryClient.getQueryData(listKey)).toEqual([
      { ...task, ...edit },
      ...otherScheduled,
    ]);

    release();
    await mutation;

    expect(bodies).toEqual([edit]);
  });

  /* Catches: a rejected edit leaving the task detail showing text the server never saved.
     The list is not asserted: its snapshot is taken on the `lists()` prefix key, which has no
     cache entry, so rollback never restores it (it only heals through the onSettled refetch). */
  it("restores the detail cache on 422", async () => {
    const { release } = interceptPatch(422);
    const queryClient = seedClient();

    const { result } = renderHook(() => useUpdateTask(), {
      wrapper: createQueryWrapper(queryClient),
    });

    const mutation = result.current.mutateAsync(payload).catch(() => undefined);

    // Proves the optimistic write happened, so the rollback has something to undo.
    await waitFor(() => {
      expect(queryClient.getQueryData(detailKey)).toEqual({ ...task, ...edit });
    });

    release();
    await mutation;

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(queryClient.getQueryData(detailKey)).toEqual(task);
  });

  /* Known bug, deferred (follow-up to #1212): onMutate maps every `lists()` cache entry,
     so a list query in error state (data undefined) throws and the PATCH is never sent.
     Remove `.fails` once fixed. */
  it.fails(
    "still sends the edit when a future-date list failed to load",
    async () => {
      server.use(
        http.get(apiRoutes.tasks, () =>
          HttpResponse.json({ errors: [] }, { status: 500 }),
        ),
      );
      const { bodies, release } = interceptPatch(200);
      release();

      const queryClient = seedClient();
      await queryClient.prefetchQuery(
        futureTasksQueryOptions(SCHEDULED_LIST_DATE),
      );

      const { result } = renderHook(() => useUpdateTask(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await result.current.mutateAsync(payload).catch(() => undefined);

      expect(bodies).toEqual([edit]);
    },
  );
});
