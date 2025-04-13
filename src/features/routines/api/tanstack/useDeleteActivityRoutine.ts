import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { deleteActivityRoutine } from "../axios/deleteActivityRoutine";

export const useDeleteActivityRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteActivityRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROUTINES_ENDPOINT] });
    },
  });
};
