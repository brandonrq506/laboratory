import {
  getThemePreference,
  setThemePreference,
  setThemeSaving,
} from "../../stores/theme-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_PREFERENCE_KEY } from "../../types/userPreferenceKeys";
import { savePreferencesToLocalStorage } from "../../utils/localStorage";
import { updateUserPreference } from "../axios/updateUserPreference";
import { userPreferencesOptions } from "../queryOptions/userPreferencesOptions";

const preferencesKey = userPreferencesOptions().queryKey;

export const useUpdateUserPreference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: preferencesKey,
    mutationFn: updateUserPreference,
    onMutate: async ({ key, value }) => {
      const previousTheme = getThemePreference();
      if (key === USER_PREFERENCE_KEY.THEME) {
        setThemeSaving(true);
        setThemePreference(value);
      }
      await queryClient.cancelQueries({ queryKey: preferencesKey });
      const previous = queryClient
        .getQueryData(preferencesKey)
        ?.find((pref) => pref.key === key);

      queryClient.setQueryData(preferencesKey, (old) => {
        if (!old) return old;
        return old.map((pref) =>
          pref.key === key ? { ...pref, value } : pref,
        );
      });
      const optimistic = queryClient.getQueryData(preferencesKey);
      if (optimistic) savePreferencesToLocalStorage(optimistic);

      return { previous, previousTheme };
    },
    onError: (_, { key }, context) => {
      // Restore only this preference so another setting's save is preserved.
      queryClient.setQueryData(preferencesKey, (old) =>
        old?.map((pref) =>
          pref.key === key && context?.previous ? context.previous : pref,
        ),
      );
      const restored = queryClient.getQueryData(preferencesKey);
      if (restored) savePreferencesToLocalStorage(restored);
      if (key === USER_PREFERENCE_KEY.THEME && context) {
        setThemePreference(context.previousTheme);
      }
    },
    onSettled: (_, __, { key }) => {
      if (key === USER_PREFERENCE_KEY.THEME) setThemeSaving(false);
      // The last concurrent preference save refreshes the account snapshot.
      if (queryClient.isMutating({ mutationKey: preferencesKey }) === 1) {
        return queryClient.invalidateQueries({ queryKey: preferencesKey });
      }
    },
  });
};
