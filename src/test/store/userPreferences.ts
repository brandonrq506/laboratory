import type { UserPreference } from "@/features/userPreferences/types/userPreference";
import type { UserPreferenceModel } from "@/features/userPreferences/types/userPreferenceModel";

import { USER_PREFERENCE_KEY } from "@/features/userPreferences/types/userPreferenceKeys";

export const userPreferences: UserPreference[] = [
  {
    preference_id: 1,
    key: USER_PREFERENCE_KEY.SHOW_REMAINING_TIME,
    value: "false",
  },
  {
    preference_id: 2,
    key: USER_PREFERENCE_KEY.THEME,
    value: "light",
  },
  {
    preference_id: 3,
    key: USER_PREFERENCE_KEY.SIDEBAR_OPEN,
    value: "true",
  },
];

export const savedThemePreference: UserPreferenceModel = {
  id: 1,
  user_id: 1,
  preference_id: 2,
  value: "light",
  created_at: "2026-09-01T00:00:00Z",
  updated_at: "2026-09-01T00:00:00Z",
};

export const darkUserPreferences: UserPreference[] = userPreferences.map(
  (pref) =>
    pref.key === USER_PREFERENCE_KEY.THEME ? { ...pref, value: "dark" } : pref,
);

export const systemUserPreferences: UserPreference[] = userPreferences.map(
  (pref) =>
    pref.key === USER_PREFERENCE_KEY.THEME
      ? { ...pref, value: "system" }
      : pref,
);
