import { useMutation, useQueryClient } from "@tanstack/react-query";

import { snapshotQueries } from "@/utils/tanstack/helpers/snapshotQueries";
import { updateUserPreference } from "../axios/updateUserPreference";
import { userPreferencesOptions } from "../queryOptions/userPreferencesOptions";

const preferencesKey = userPreferencesOptions().queryKey;

export const useUpdateUserPreference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserPreference,
    onMutate: async ({ key, value }) => {
      await queryClient.cancelQueries({ queryKey: preferencesKey });

      const { rollback } = snapshotQueries(queryClient, [preferencesKey]);

      queryClient.setQueryData(preferencesKey, (old) => {
        if (!old) return old;
        return old.map((pref) =>
          pref.key === key ? { ...pref, value } : pref,
        );
      });

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: preferencesKey });
    },
  });
};
