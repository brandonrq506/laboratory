import { useUpdateUserPreference } from "../api/tanstack/useUpdateUserPreference";
import { useUserPreference } from "../hooks";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/core/Button/IconButton";

export const DesktopSidebarToggle = () => {
  const sidebar_open = useUserPreference("sidebar_open");
  const { mutate } = useUpdateUserPreference();

  if (sidebar_open === undefined) return null;

  const isOpen = sidebar_open.value === "true";

  const handleToggle = () => {
    mutate({ key: "sidebar_open", value: String(!isOpen) });
  };

  return (
    <IconButton
      onClick={handleToggle}
      variant="blackOutline"
      className="absolute top-4 right-0 z-10 translate-x-1/2 rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:bg-gray-50"
      title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      shape="circle"
      size="sm">
      {isOpen ? (
        <ArrowLeftIcon className="size-4" />
      ) : (
        <ArrowRightIcon className="size-4" />
      )}
    </IconButton>
  );
};
