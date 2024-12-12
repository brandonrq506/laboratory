import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ACTIVITIES_ENDPOINT } from "@/libs/axios";
import { updateActivity } from "../axios/updateActivity";

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ACTIVITIES_ENDPOINT] });
    },
  });
};
