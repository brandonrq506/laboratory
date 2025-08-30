import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activityKeys } from "../queryKeys";
import { deleteActivity } from "../axios/deleteActivity";

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
    },
  });
};
