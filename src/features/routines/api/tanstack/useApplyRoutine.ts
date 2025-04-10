import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applyRoutine } from "../axios/applyRoutine";
import { taskKeys } from "@/features/tasks/api/queryKeys";

export const useApplyRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};
