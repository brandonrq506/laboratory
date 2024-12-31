import { useQuery } from "@tanstack/react-query";

import { getTask } from "../axios/getTask";
import { taskKeys } from "../queryKeys";

export const useTask = (taskId: number) => {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: getTask,
  });
};
