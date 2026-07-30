import { useUpdateUserPreference } from "@/features/userPreferences/api/tanstack/useUpdateUserPreference";
import { useUserPreference } from "@/features/userPreferences/hooks";

import type { PropsWithChildren } from "react";

import { USER_PREFERENCE_KEY } from "@/features/userPreferences/types/userPreferenceKeys";

export const TimerTimeTab = ({ children }: PropsWithChildren) => {
  const preference = useUserPreference(USER_PREFERENCE_KEY.SHOW_REMAINING_TIME);
  const { mutate } = useUpdateUserPreference();

  const showRemainingTime = preference?.value === "true";

  const handleToggle = () => {
    if (!preference) return;
    mutate({
      key: USER_PREFERENCE_KEY.SHOW_REMAINING_TIME,
      value: String(!showRemainingTime),
    });
  };

  return (
    <button
      className="flex cursor-pointer gap-x-1.5 text-sm select-none"
      onClick={handleToggle}
      title="Click to toggle between remaining and elapsed time">
      {children}
    </button>
  );
};
