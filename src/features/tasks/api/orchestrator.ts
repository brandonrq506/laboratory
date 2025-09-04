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
