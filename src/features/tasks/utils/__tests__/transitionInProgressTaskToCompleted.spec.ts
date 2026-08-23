import { inProgressTasks } from "@/test/store/tasks";
import { transitionInProgressTaskToCompleted } from "../transitionInProgressTaskToCompleted";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

describe("transitionInProgressTaskToCompleted", () => {
  it("preserves task identity and applies the completed state", () => {
    const task = {
      ...inProgressTasks[0],
      start_time: "2025-05-02T21:16:31.000Z",
    };

    const completedTask = transitionInProgressTaskToCompleted({
      task,
      endTime: "2025-05-02T21:22:29.000Z",
    });

    expect(completedTask).toEqual({
      ...task,
      status: TASK_STATUS.COMPLETED,
      start_time: "2025-05-02T21:17:00.000Z",
      end_time: "2025-05-02T21:22:00.000Z",
    });
  });
});
