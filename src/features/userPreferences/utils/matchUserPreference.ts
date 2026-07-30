import type { UserPreference } from "../types/userPreference";
import type { UserPreferenceKeys } from "../types/userPreferenceKeys";

export function matchUserPreference(
  userPreferences: UserPreference[],
  key: UserPreferenceKeys,
) {
  const match = userPreferences.find((preference) => preference.key === key);

  if (!match)
    console.error(`No match found for: ${key} but should always have a match`);

  return match;
}
