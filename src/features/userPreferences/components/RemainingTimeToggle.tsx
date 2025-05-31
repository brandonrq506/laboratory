import { useUpdateUserPreference } from "../api/tanstack/useUpdateUserPreference";
import { useUserPreference } from "../hooks";

import { Toggle } from "@/components/core";

export const RemainingTimeToggle = () => {
  const remaining_time = useUserPreference("show_remaining_time");
  const { mutate } = useUpdateUserPreference();

  if (remaining_time === undefined) return null;

  const value = remaining_time.value === "true";

  return (
    <Toggle
      checked={value}
      onChange={(value) =>
        mutate({ key: "show_remaining_time", value: String(value) })
      }
      label="Show Remaining Time"
      description="Show time left instead of time elapsed for in-progress tasks."
    />
  );
};
