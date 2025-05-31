import { useUserPreferences } from "../api/tanstack/useUserPreferences";

import { UserPreferenceKeys } from "../types/userPreferenceKeys";
import { matchUserPreference } from "../utils/matchUserPreference";

export function useUserPreference(preferenceKey: UserPreferenceKeys) {
  const { data, isPending } = useUserPreferences();

  if (!data) return undefined;

  return matchUserPreference(data, preferenceKey);
}
