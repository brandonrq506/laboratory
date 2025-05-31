import { FolderIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router";
import clsx from "clsx";

type Props = {
  name: string;
  href: string;
  icon: typeof FolderIcon;
  onClose?: () => void;
};

export const MobileSidebarItem = ({
  name,
  href,
  icon: Icon,
  onClose,
}: Props) => {
  return (
    <li>
      <NavLink
        to={href}
        onClick={onClose}
        className={({ isActive }) =>
          clsx(
            isActive
              ? "bg-gray-50 text-indigo-600 group-hover:text-indigo-600"
              : "text-gray-700 group-hover:text-gray-400 hover:bg-gray-50 hover:text-indigo-600",
            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
          )
        }>
        <Icon
          className="size-6 shrink-0 group-hover:text-indigo-600"
          aria-hidden="true"
        />
        {name}
      </NavLink>
    </li>
  );
};
