import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activityKeys } from "../queryKeys";
import { updateActivity } from "../axios/updateActivity";

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateActivity,
    onSuccess: (_, { activityId }) => {
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: activityKeys.detail(activityId),
      });
    },
  });
};
