import {
  restorePreference,
  setPreferenceValue,
} from "../../utils/updatePreferenceList";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserPreference } from "../axios/updateUserPreference";
import { userPreferencesOptions } from "../queries";

/*
  Every preference shares one query key, so `onSettled` runs once per concurrent
  save. In v5 a mutation still counts itself while its own `onSettled` runs, so
  this value means "I am the last one pending" and the refetch happens once.
*/
const LAST_PENDING_MUTATION = 1;

const preferencesKey = userPreferencesOptions().queryKey;

export const useUpdateUserPreference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: preferencesKey,
    mutationFn: updateUserPreference,
    onMutate: async ({ key, value }) => {
      await queryClient.cancelQueries({ queryKey: preferencesKey });

      const previous = queryClient
        .getQueryData(preferencesKey)
        ?.find((pref) => pref.key === key);

      queryClient.setQueryData(preferencesKey, (old) =>
        old ? setPreferenceValue(old, key, value) : old,
      );

      return { previous };
    },
    onError: (_, { key }, context) => {
      /* Restore only this preference so another setting's save is preserved. */
      queryClient.setQueryData(preferencesKey, (old) =>
        old ? restorePreference(old, key, context?.previous) : old,
      );
    },
    onSettled: () => {
      if (
        queryClient.isMutating({ mutationKey: preferencesKey }) !==
        LAST_PENDING_MUTATION
      )
        return;

      return queryClient.invalidateQueries({ queryKey: preferencesKey });
    },
  });
};
