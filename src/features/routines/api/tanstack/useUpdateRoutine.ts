import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { updateRoutine } from "../axios/updateRoutine";

export const useUpdateRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROUTINES_ENDPOINT] });
    },
  });
};
