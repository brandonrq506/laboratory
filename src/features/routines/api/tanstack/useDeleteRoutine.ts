import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { deleteRoutine } from "../axios/deleteRoutine";

export const useDeleteRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROUTINES_ENDPOINT] });
    },
  });
};