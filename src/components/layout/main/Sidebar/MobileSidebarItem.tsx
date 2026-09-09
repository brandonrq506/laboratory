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
    "text-foreground-secondary group-hover:text-foreground-faint hover:bg-surface-subtle hover:text-accent";
  const activeClasses = "bg-surface-subtle text-accent group-hover:text-accent";

  return (
    <li>
      <Link
        onClick={onClose}
        activeProps={{ className: clsx(baseClasses, activeClasses) }}
        inactiveProps={{ className: clsx(baseClasses, inactiveClasses) }}
        {...linkProps}>
        <Icon
          className="group-hover:text-accent size-6 shrink-0"
          aria-hidden="true"
        />
        {label}
      </Link>
    </li>
  );
};
