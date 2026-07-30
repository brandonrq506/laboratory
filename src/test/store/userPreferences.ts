import type { UserPreference } from "@/features/userPreferences/types/userPreference";

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
