import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activityByIdQueryOptions, activityListQueryOptions } from "../queries";
import { deleteActivity } from "../axios/deleteActivity";

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: (_, activityId) => {
      queryClient.invalidateQueries(activityListQueryOptions());
      queryClient.removeQueries(activityByIdQueryOptions(activityId));
    },
  });
};
