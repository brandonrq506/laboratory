import type { UserPreference } from "../types/userPreference";
import type { UserPreferenceKeys } from "../types/userPreferenceKeys";

/**
 * Returns the list with a single preference's value replaced.
 */
export const setPreferenceValue = (
  preferences: UserPreference[],
  key: UserPreferenceKeys,
  value: string,
): UserPreference[] =>
  preferences.map((preference) =>
    preference.key === key ? { ...preference, value } : preference,
  );

/**
 * Returns the list with a single preference restored to its previous entry.
 * Dropping the row is correct when it did not exist before the change.
 */
export const restorePreference = (
  preferences: UserPreference[],
  key: UserPreferenceKeys,
  previous: UserPreference | undefined,
): UserPreference[] => {
  if (!previous) return preferences.filter((pref) => pref.key !== key);

  return preferences.map((pref) => (pref.key === key ? previous : pref));
};
