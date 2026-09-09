import { useUserPreference } from "@/features/userPreferences/hooks";

import { Link } from "@tanstack/react-router";
import clsx from "clsx";

import type { SidebarLink } from "./links";

import { USER_PREFERENCE_KEY } from "@/features/userPreferences/types/userPreferenceKeys";

type SidebarItemProps = SidebarLink & {
  onClose: () => void;
};

export const DesktopSidebarItem = ({
  label,
  icon: Icon,
  onClose,
  ...linkProps
}: SidebarItemProps) => {
  const sidebarPreference = useUserPreference(USER_PREFERENCE_KEY.SIDEBAR_OPEN);
  const isOpen = sidebarPreference?.value === "true";

  const baseClasses = clsx(
    "group rounded-md p-2 font-semibold transition-all",
    isOpen
      ? "flex gap-x-3 text-sm leading-6"
      : "flex items-center justify-center",
  );

  const inactiveClasses = clsx(
    "text-foreground-secondary *:text-foreground-faint hover:bg-surface-subtle hover:text-accent",
  );
  const activeClasses = clsx("bg-surface-subtle text-accent *:text-accent");

  return (
    <li>
      <Link
        onClick={onClose}
        title={label}
        activeProps={{ className: clsx(baseClasses, activeClasses) }}
        inactiveProps={{ className: clsx(baseClasses, inactiveClasses) }}
        {...linkProps}>
        <Icon
          className={clsx(
            "group-hover:text-accent shrink-0 transition-all",
            isOpen ? "size-6" : "size-5",
          )}
          aria-hidden="true"
        />
        {isOpen ? (
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {label}
          </span>
        ) : (
          <span className="sr-only">{label}</span>
        )}
      </Link>
    </li>
  );
};
