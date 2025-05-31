import { FolderIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router";
import clsx from "clsx";
import { useUserPreference } from "@/features/userPreferences/hooks";

type Props = {
  name: string;
  href: string;
  icon: typeof FolderIcon;
  onClose?: () => void;
};

export const DesktopSidebarItem = ({
  name,
  href,
  icon: Icon,
  onClose,
}: Props) => {
  const sidebarPreference = useUserPreference("sidebar_open");
  const isOpen = sidebarPreference?.value === "true";

  return (
    <li>
      <NavLink
        to={href}
        onClick={onClose}
        title={name}
        className={({ isActive }) =>
          clsx(
            isActive
              ? "bg-gray-50 text-indigo-600 *:text-indigo-600"
              : "text-gray-700 *:text-gray-400 hover:bg-gray-50 hover:text-indigo-600",
            "group rounded-md p-2 font-semibold transition-all",
            isOpen
              ? "flex gap-x-3 text-sm leading-6"
              : "flex items-center justify-center",
          )
        }>
        <Icon
          className={clsx(
            "shrink-0 transition-all group-hover:text-indigo-600",
            isOpen ? "size-6" : "size-5",
          )}
          aria-hidden="true"
        />
        {isOpen ? (
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </span>
        ) : (
          <span className="sr-only">{name}</span>
        )}
      </NavLink>
    </li>
  );
};
