import { HttpResponse, http } from "msw";
import { renderHook, waitFor } from "@/test/test-utils";

import {
  SCHEDULED_LIST_CASES,
  expectBystanderUntouched,
  seedBystander,
} from "@/test/utils/scheduled-list-isolation";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils/query-client";
import { apiRoutes } from "@/test/handlers/api-routes";
import { scheduledTasks } from "@/test/store/tasks";
import { server } from "@/test/server";
import { useDeleteTasks } from "../use-delete-tasks";

import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

describe.each(SCHEDULED_LIST_CASES)(
  "useDeleteTasks on the $label list",
  ({ listQueryOptions, bystanderQueryOptions }) => {
    const listKey = listQueryOptions.queryKey;

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

    const seedClient = () => {
      const queryClient = createTestQueryClient();
      queryClient.setQueryData(listKey, initialOrder);
      seedBystander(queryClient, bystanderQueryOptions);
      return queryClient;
    };

    it("filters deleted ids out of its key and invalidates only that key on settle", async () => {
      const queryClient = seedClient();

      const { result } = renderHook(() => useDeleteTasks(listQueryOptions), {
        wrapper: createQueryWrapper(queryClient),
      });

      result.current.mutate({ task_ids: deletedIds });

      await waitFor(() => {
        expect(queryClient.getQueryData(listKey)).toEqual(expectedAfterDelete);
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(queryClient.getQueryState(listKey)?.isInvalidated).toBe(true);
      expectBystanderUntouched(queryClient, bystanderQueryOptions);
    });

    it("rolls back its key to the snapshot on 422", async () => {
      server.use(
        http.post(apiRoutes.taskSpanDeletions, () =>
          HttpResponse.json({ errors: [] }, { status: 422 }),
        ),
      );

      const queryClient = seedClient();

      const { result } = renderHook(() => useDeleteTasks(listQueryOptions), {
        wrapper: createQueryWrapper(queryClient),
      });

      await result.current
        .mutateAsync({ task_ids: deletedIds })
        .catch(() => undefined);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
      expect(queryClient.getQueryData(listKey)).toEqual(initialOrder);
      expectBystanderUntouched(queryClient, bystanderQueryOptions);
    });
  },
);
