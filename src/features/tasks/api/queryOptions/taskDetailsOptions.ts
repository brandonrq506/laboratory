import { getTask } from "../axios/getTask";
import { queryOptions } from "@tanstack/react-query";
import { taskKeys } from "../queryKeys";

export const taskDetailsOptions = (taskId: number) => {
  return queryOptions({
    queryKey: taskKeys.detail(taskId),
    queryFn: getTask,
  });
};
