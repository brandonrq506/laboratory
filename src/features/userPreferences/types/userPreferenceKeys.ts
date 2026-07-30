import type { ObjectValues } from "@/types/core";

export const USER_PREFERENCE_KEY = {
  SHOW_REMAINING_TIME: "show_remaining_time",
  SIDEBAR_OPEN: "sidebar_open",
  THEME: "theme",
} as const;

export type UserPreferenceKeys = ObjectValues<typeof USER_PREFERENCE_KEY>;
