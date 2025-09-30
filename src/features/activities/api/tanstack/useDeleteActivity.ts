import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activityKeys } from "../queries";
import { deleteActivity } from "../axios/deleteActivity";

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: (_, activityId) => {
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
      queryClient.removeQueries({ queryKey: activityKeys.detail(activityId) });
    },
  });
};
