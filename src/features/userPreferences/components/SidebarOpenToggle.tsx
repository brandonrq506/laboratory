import { useUpdateUserPreference } from "../api/tanstack/useUpdateUserPreference";
import { useUserPreference } from "../hooks";

import { Toggle } from "@/components/core";

export const SidebarOpenToggle = () => {
  const sidebar_open = useUserPreference("sidebar_open");
  const { mutate } = useUpdateUserPreference();

  if (sidebar_open === undefined) return null;

  const value = sidebar_open.value === "true";

  return (
    <Toggle
      checked={value}
      onChange={(value) =>
        mutate({ key: "sidebar_open", value: String(value) })
      }
      label="Sidebar Open"
      description="Display sidebar icons and text labels"
    />
  );
};
