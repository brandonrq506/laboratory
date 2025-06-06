import { useUpdateUserPreference } from "@/features/userPreferences/api/tanstack/useUpdateUserPreference";
import { useUserPreference } from "@/features/userPreferences/hooks";

import { PropsWithChildren } from "react";

export const TimerTimeTab = ({ children }: PropsWithChildren) => {
  const preference = useUserPreference("show_remaining_time");
  const { mutate } = useUpdateUserPreference();

  const showRemainingTime = preference?.value === "true";

  const handleToggle = () => {
    if (!preference) return;
    mutate({
      key: "show_remaining_time",
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
