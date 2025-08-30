import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activityKeys } from "../queryKeys";
import { createActivity } from "../axios/createActivity";

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
    },
  });
};
