import { Link } from "@tanstack/react-router";
import clsx from "clsx";

import type { SidebarLink } from "./links";

type SidebarItemProps = SidebarLink & {
  onClose: () => void;
};

export const MobileSidebarItem = ({
  label,
  icon: Icon,
  onClose,
  ...linkProps
}: SidebarItemProps) => {
  // Base classes shared by active & inactive states
  const baseClasses =
    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors";

  const inactiveClasses =
    "text-gray-700 group-hover:text-gray-400 hover:bg-gray-50 hover:text-indigo-600";
  const activeClasses =
    "bg-gray-50 text-indigo-600 group-hover:text-indigo-600";

  return (
    <li>
      <Link
        onClick={onClose}
        resetScroll={true}
        activeProps={{ className: clsx(baseClasses, activeClasses) }}
        inactiveProps={{ className: clsx(baseClasses, inactiveClasses) }}
        {...linkProps}>
        <Icon
          className="size-6 shrink-0 group-hover:text-indigo-600"
          aria-hidden="true"
        />
        {label}
      </Link>
    </li>
  );
};
