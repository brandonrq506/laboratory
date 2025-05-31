import {
  DocumentTextIcon,
  FolderIcon,
  RectangleStackIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { DesktopSidebarItem } from "./DesktopSidebarItem";
import { MobileSidebarItem } from "./MobileSidebarItem";

const IS_DEV = import.meta.env.DEV;

const experiments = [
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Modal Testing", href: "/modal-testing", icon: UsersIcon },
  { name: "Form Projects", href: "/form-projects", icon: DocumentTextIcon },
  { name: "Table Projects", href: "/table-projects", icon: RectangleStackIcon },
];

interface Props {
  onClose: () => void;
  isMobile?: boolean;
}

export const Experiments = ({ onClose, isMobile = false }: Props) => {
  if (!IS_DEV) return null;

  const SidebarItemComponent = isMobile
    ? MobileSidebarItem
    : DesktopSidebarItem;

  return (
    <li>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {experiments.map((experiment) => (
          <SidebarItemComponent
            key={experiment.name}
            {...experiment}
            onClose={onClose}
          />
        ))}
      </ul>
    </li>
  );
};
