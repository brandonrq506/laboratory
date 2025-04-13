import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { createActivityRoutine } from "../axios/createActivityRoutine";

export const useCreateActivityRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createActivityRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROUTINES_ENDPOINT] });
    },
  });
};
