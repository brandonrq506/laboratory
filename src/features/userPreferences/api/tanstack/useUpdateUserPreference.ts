import { useMutation, useQueryClient } from "@tanstack/react-query";

import { USER_PREFERENCES_ENDPOINT } from "@/libs/axios";
import { UserPreference } from "../../types/userPreference";
import { updateUserPreference } from "../axios/updateUserPreference";
import { useToast } from "@/components/core";

export const useUpdateUserPreference = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updateUserPreference,
    onMutate: async ({ key, value }) => {
      await queryClient.cancelQueries({
        queryKey: [USER_PREFERENCES_ENDPOINT],
      });

      const previousPreferences = queryClient.getQueryData<UserPreference[]>([
        USER_PREFERENCES_ENDPOINT,
      ]);

      if (previousPreferences) {
        queryClient.setQueryData<UserPreference[]>(
          [USER_PREFERENCES_ENDPOINT],
          previousPreferences.map((pref) =>
            pref.key === key ? { ...pref, value } : pref,
          ),
        );
      }

      return { previousPreferences };
    },
    onError: (_, __, context) => {
      if (context?.previousPreferences) {
        queryClient.setQueryData(
          [USER_PREFERENCES_ENDPOINT],
          context.previousPreferences,
        );
      }
      
      showToast("error", "Update Failed", "Unable to save your preference. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [USER_PREFERENCES_ENDPOINT] });
    },
  });
};
