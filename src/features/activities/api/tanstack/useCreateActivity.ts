import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activityListQueryOptions } from "../queries";
import { createActivity } from "../axios/createActivity";

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(activityListQueryOptions());
    },
  });
};
