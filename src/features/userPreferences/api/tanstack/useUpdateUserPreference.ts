import { useMutation, useQueryClient } from "@tanstack/react-query";

import { USER_PREFERENCES_ENDPOINT } from "@/libs/axios";
import { updateUserPreference } from "../axios/updateUserPreference";

export const useUpdateUserPreference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserPreference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_PREFERENCES_ENDPOINT] });
    },
  });
};
