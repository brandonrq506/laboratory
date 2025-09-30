import { useQueryClient } from "@tanstack/react-query";

import { getTask } from "../axios/getTask";
import { taskKeys } from "../queries";

import { millisecondsInMinute } from "date-fns/constants";

export const usePrefetchTask = () => {
  const queryClient = useQueryClient();

  const prefetch = (taskId: number) => {
    queryClient.prefetchQuery({
      queryKey: taskKeys.detail(taskId),
      queryFn: getTask,
      staleTime: millisecondsInMinute,
    });
  };

  return prefetch;
};
