import { useQueryClient } from "@tanstack/react-query";

import { getTask } from "../axios/getTask";
import { taskKeys } from "../queryKeys";

import { MINUTE } from "@/utils/time";

export const usePrefetchTask = () => {
  const queryClient = useQueryClient();

  const prefetch = (taskId: number) => {
    queryClient.prefetchQuery({
      queryKey: taskKeys.detail(taskId),
      queryFn: getTask,
      staleTime: MINUTE,
    });
  };

  return prefetch;
};
