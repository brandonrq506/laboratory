import type { UserPreference } from "../../types/userPreference";
import { queryOptions } from "@tanstack/react-query";

import {
  getPreferencesFromLocalStorage,
  savePreferencesToLocalStorage,
} from "../../utils/localStorage";
import { USER_PREFERENCES_ENDPOINT } from "@/libs/axios";
import { getUserPreferences } from "../axios/getUserPreferences";

import { millisecondsInMinute } from "date-fns/constants";

import {
  isThemeSaving,
  reconcileThemePreference,
} from "../../stores/theme-store";
import { USER_PREFERENCE_KEY } from "../../types/userPreferenceKeys";

const MINUTES = 20;

export const userPreferencesOptions = () => {
  return queryOptions<UserPreference[]>({
    queryKey: [USER_PREFERENCES_ENDPOINT],
    queryFn: async ({ signal }) => {
      const data = await getUserPreferences(signal);

      // Save to localStorage whenever we get fresh data from API
      if (!isThemeSaving()) savePreferencesToLocalStorage(data);
      reconcileThemePreference(
        data.find((pref) => pref.key === USER_PREFERENCE_KEY.THEME)?.value,
      );
      return data;
    },
    staleTime: MINUTES * millisecondsInMinute,
    placeholderData: getPreferencesFromLocalStorage,
  });
};
