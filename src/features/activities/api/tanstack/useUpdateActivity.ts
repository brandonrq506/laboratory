import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activityByIdQueryOptions, activityListQueryOptions } from "../queries";
import { updateActivity } from "../axios/updateActivity";

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateActivity,
    onSuccess: (_, { activityId }) => {
      queryClient.invalidateQueries(activityListQueryOptions());
      queryClient.removeQueries(activityByIdQueryOptions(activityId));
    },
  });
};
