import { useQuery } from "@tanstack/react-query";

import { UserPreferenceKeys } from "../types/userPreferenceKeys";
import { matchUserPreference } from "../utils/matchUserPreference";
import { userPreferencesOptions } from "../api/queryOptions/userPreferencesOptions";

export function useUserPreference(preferenceKey: UserPreferenceKeys) {
  const { data } = useQuery(userPreferencesOptions());

  if (!data) return undefined;

  return matchUserPreference(data, preferenceKey);
}
