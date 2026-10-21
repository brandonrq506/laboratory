import { HttpResponse, http } from "msw";
import { renderHook, waitFor } from "@/test/test-utils";

import { SCHEDULED_LIST_DATE, scheduledTasks } from "@/test/store/tasks";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils/query-client";
import {
  futureTasksQueryOptions,
  timerScheduledTasksQueryOptions,
} from "../../queries";
import { INSERT_MODE } from "@/features/tasks/types/insert-mode";
import { activities } from "@/test/store/activities";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";
import { useCreateScheduledTask } from "../useCreateScheduledTask";

describe("useCreateScheduledTask", () => {
  it("invalidates both the timer list and a future date list on success", async () => {
    server.use(
      http.post(apiRoutes.tasks, () => HttpResponse.json(scheduledTasks[0])),
    );
    const queryClient = createTestQueryClient();
    const timerKey = timerScheduledTasksQueryOptions().queryKey;
    const futureKey = futureTasksQueryOptions(SCHEDULED_LIST_DATE).queryKey;
    queryClient.setQueryData(timerKey, []);
    queryClient.setQueryData(futureKey, []);

    const { result } = renderHook(() => useCreateScheduledTask(), {
      wrapper: createQueryWrapper(queryClient),
    });
    result.current.mutate({
      activity: activities[0],
      insertMode: Object.values(INSERT_MODE)[0],
    });

    await waitFor(() => {
      expect(queryClient.getQueryState(timerKey)?.isInvalidated).toBe(true);
      expect(queryClient.getQueryState(futureKey)?.isInvalidated).toBe(true);
    });
  });
});
