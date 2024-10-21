import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACTIVITIES_ENDPOINT } from "@/libs/axios";
import { deleteActivity } from "../axios/deleteActivity";

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteActivity,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [ACTIVITIES_ENDPOINT],
      });
    },
  });
};
