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
import { useMoveTasks } from "../use-move-tasks";

import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

describe.each(SCHEDULED_LIST_CASES)(
  "useMoveTasks on the $label list",
  ({ listQueryOptions, bystanderQueryOptions }) => {
    const listKey = listQueryOptions.queryKey;

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

    const seedClient = () => {
      const queryClient = createTestQueryClient();
      queryClient.setQueryData(listKey, initialOrder);
      seedBystander(queryClient, bystanderQueryOptions);
      return queryClient;
    };

    it("writes the optimistic value to its key and invalidates only that key on settle", async () => {
      const queryClient = seedClient();

      const { result } = renderHook(() => useMoveTasks(listQueryOptions), {
        wrapper: createQueryWrapper(queryClient),
      });

      result.current.mutate(payload);

      await waitFor(() => {
        expect(queryClient.getQueryData(listKey)).toEqual(optimisticOrder);
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(queryClient.getQueryState(listKey)?.isInvalidated).toBe(true);
      expectBystanderUntouched(queryClient, bystanderQueryOptions);
    });

    it("rolls back its key to the snapshot on 422", async () => {
      server.use(
        http.post(apiRoutes.taskSpanMoves, () =>
          HttpResponse.json({ errors: [] }, { status: 422 }),
        ),
      );

      const queryClient = seedClient();

      const { result } = renderHook(() => useMoveTasks(listQueryOptions), {
        wrapper: createQueryWrapper(queryClient),
      });

      await result.current.mutateAsync(payload).catch(() => undefined);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
      expect(queryClient.getQueryData(listKey)).toEqual(initialOrder);
      expectBystanderUntouched(queryClient, bystanderQueryOptions);
    });
  },
);
