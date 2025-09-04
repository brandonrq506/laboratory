import { addStart, removeById } from "@/utils/array";
import {
  inProgressTaskOptions,
  scheduledTasksOptions,
  taskDetailsOptions,
  todayCompletedTasksOptions,
} from "./queryOptions";
import { CompletedTaskAPI } from "../types/completedTask";
import { InProgressTaskAPI } from "../types/inProgressTask";
import { QueryClient } from "@tanstack/react-query";
import { buildTemporaryCompletedTask } from "../utils/buildTemporaryCompletedTask";

const inProgressKey = inProgressTaskOptions().queryKey;
const scheduledKey = scheduledTasksOptions().queryKey;
const completedKey = todayCompletedTasksOptions().queryKey;

interface StartParams {
  qc: QueryClient;
  task: InProgressTaskAPI;
}

export const promoteScheduledToInProgress = ({ qc, task }: StartParams) => {
  const detailKey = taskDetailsOptions(task.id).queryKey;

  // Add new in_progress task to in_progress cache
  qc.setQueryData(inProgressKey, [task]);

  // Remove now in_progress task from scheduled tasks cache
  qc.setQueryData(scheduledKey, (prev) => removeById(prev, task.id));

  // Update details cache in case user click on this task
  qc.setQueryData(detailKey, task);
};

interface CompleteParams {
  qc: QueryClient;
  task: CompletedTaskAPI;
}

export const completeInProgressTask = ({ qc, task }: CompleteParams) => {
  const detailKey = taskDetailsOptions(task.id).queryKey;

  // Add new completed task to the start of completed-tasks cache
  qc.setQueryData(completedKey, (tasks) => addStart(tasks, task));

  // Set in_progress to empty array
  qc.setQueryData(inProgressKey, []);

  // Update details cache in case user click on this task
  qc.setQueryData(detailKey, task);
};

interface ActivateParams {
  qc: QueryClient;
  taskIdToActivate: number;
  timestamp: string;
}

export const activateScheduledTask = ({
  qc,
  taskIdToActivate,
  timestamp,
}: ActivateParams) => {
  const inProgressCache = qc.getQueryData(inProgressKey);
  const inProgressTask = inProgressCache?.[0];

  if (inProgressTask) {
    const tempCompleted = buildTemporaryCompletedTask(
      inProgressTask.activity,
      inProgressTask.start_time,
      timestamp,
    );

    // Move current in_progress to the start of completed
    completeInProgressTask({ qc, task: tempCompleted });
  }

  const scheduledCache = qc.getQueryData(scheduledKey);
  const taskToActivate = scheduledCache?.find((t) => t.id === taskIdToActivate);

  if (taskToActivate) {
    const promoted: InProgressTaskAPI = {
      ...taskToActivate,
      status: "in_progress",
      start_time: timestamp,
      end_time: null,
      position: null,
    };

    // Add activated task to in_progress and remove from scheduled
    promoteScheduledToInProgress({ qc, task: promoted });
  }
};
