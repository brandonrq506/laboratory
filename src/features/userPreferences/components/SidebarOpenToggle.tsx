import { useUpdateUserPreference } from "../api/tanstack/useUpdateUserPreference";
import { useUserPreference } from "../hooks";

import { Toggle } from "@/components/core";

import { USER_PREFERENCE_KEY } from "@/features/userPreferences/types/userPreferenceKeys";

export const SidebarOpenToggle = () => {
  const sidebar_open = useUserPreference(USER_PREFERENCE_KEY.SIDEBAR_OPEN);
  const { mutate } = useUpdateUserPreference();

  if (sidebar_open === undefined) return null;

  const value = sidebar_open.value === "true";

  return (
    <Toggle
      checked={value}
      onChange={(value) =>
        mutate({ key: USER_PREFERENCE_KEY.SIDEBAR_OPEN, value: String(value) })
      }
      label="Sidebar Open"
      description="Display sidebar icons and text labels"
    />
  );
};
