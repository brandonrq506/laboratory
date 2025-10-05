import { useUserPreference } from "@/features/userPreferences/hooks";

import { Link } from "@tanstack/react-router";
import clsx from "clsx";

import type { SidebarLink } from "./links";

type SidebarItemProps = SidebarLink & {
  onClose: () => void;
};

export const DesktopSidebarItem = ({
  label,
  to,
  icon: Icon,
  onClose,
}: SidebarItemProps) => {
  const sidebarPreference = useUserPreference("sidebar_open");
  const isOpen = sidebarPreference?.value === "true";

  const baseClasses = clsx(
    "group rounded-md p-2 font-semibold transition-all",
    isOpen
      ? "flex gap-x-3 text-sm leading-6"
      : "flex items-center justify-center",
  );

  const inactiveClasses = clsx(
    "text-gray-700 *:text-gray-400 hover:bg-gray-50 hover:text-indigo-600",
  );
  const activeClasses = clsx("bg-gray-50 text-indigo-600 *:text-indigo-600");

  return (
    <li>
      <Link
        to={to}
        onClick={onClose}
        title={label}
        activeProps={{ className: clsx(baseClasses, activeClasses) }}
        inactiveProps={{ className: clsx(baseClasses, inactiveClasses) }}>
        <Icon
          className={clsx(
            "shrink-0 transition-all group-hover:text-indigo-600",
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
