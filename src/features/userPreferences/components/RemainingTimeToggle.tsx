import { useUpdateUserPreference } from "../api/tanstack/useUpdateUserPreference";
import { useUserPreference } from "../hooks";

import { Toggle } from "@/components/core";

import { USER_PREFERENCE_KEY } from "@/features/userPreferences/types/userPreferenceKeys";

export const RemainingTimeToggle = () => {
  const remaining_time = useUserPreference(
    USER_PREFERENCE_KEY.SHOW_REMAINING_TIME,
  );
  const { mutate } = useUpdateUserPreference();

  if (remaining_time === undefined) return null;

  const value = remaining_time.value === "true";

  return (
    <Toggle
      checked={value}
      onChange={(value) =>
        mutate({
          key: USER_PREFERENCE_KEY.SHOW_REMAINING_TIME,
          value: String(value),
        })
      }
      label="Show Remaining Time"
      description="Show time left instead of time elapsed for in-progress tasks."
    />
  );
};
