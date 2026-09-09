import { parseThemePreference, resolveTheme } from "../utils/theme";
import { USER_PREFERENCE_KEY } from "../types/userPreferenceKeys";
import { useQuery } from "@tanstack/react-query";
import { useSystemPrefersDark } from "./useSystemPrefersDark";
import { userPreferencesOptions } from "../api/queries";

/**
 * Derives the theme from the preferences cache and the device appearance.
 * The query is not enabled here so unauthenticated screens still read the
 * cached value without requesting preferences.
 */
export const useThemePreference = () => {
  const { data } = useQuery({ ...userPreferencesOptions(), enabled: false });
  const systemPrefersDark = useSystemPrefersDark();

  const preference = parseThemePreference(
    data?.find((pref) => pref.key === USER_PREFERENCE_KEY.THEME)?.value,
  );

  return { preference, resolved: resolveTheme(preference, systemPrefersDark) };
};
