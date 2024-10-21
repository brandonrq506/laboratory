import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACTIVITIES_ENDPOINT } from "@/libs/axios";
import { createActivity } from "../axios/createActivity";

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ACTIVITIES_ENDPOINT] });
    },
  });
};
