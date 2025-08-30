import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activityKeys } from "../queryKeys";
import { updateActivity } from "../axios/updateActivity";

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
    },
  });
};
