import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { createRoutine } from "../axios/createRoutine";

export const useCreateRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROUTINES_ENDPOINT] });
    },
  });
};
