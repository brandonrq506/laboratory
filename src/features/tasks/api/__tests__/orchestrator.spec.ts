import { QueryClient } from "@tanstack/react-query";

import { inProgressTasks, scheduledTasks } from "@/test/store/tasks";
import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
  taskByIdQueryOptions,
  todayCompletedTasksQueryOptions,
} from "../queries";
import { activateScheduledTask } from "../orchestrator";

describe("activateScheduledTask", () => {
  it("preserves the completed task real id", () => {
    const queryClient = new QueryClient();
    const inProgressTask = inProgressTasks[0];
    const scheduledTask = scheduledTasks[0];

    queryClient.setQueryData(inProgressTasksQueryOptions().queryKey, [
      inProgressTask,
    ]);
    queryClient.setQueryData(scheduledTasksQueryOptions().queryKey, [
      scheduledTask,
    ]);

    activateScheduledTask({
      qc: queryClient,
      taskIdToActivate: scheduledTask.id,
      timestamp: "2025-05-02T22:00:00.000Z",
    });

    const completedTasks = queryClient.getQueryData(
      todayCompletedTasksQueryOptions().queryKey,
    );

    expect(completedTasks?.[0].id).toBe(inProgressTask.id);
    expect(
      queryClient.getQueryData(
        taskByIdQueryOptions(inProgressTask.id).queryKey,
      ),
    ).toMatchObject({ id: inProgressTask.id });
  });
});
