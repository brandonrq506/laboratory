import {
  DocumentTextIcon,
  FolderIcon,
  RectangleStackIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { SidebarItem } from "./SidebarItem";

const IS_DEV = import.meta.env.DEV;

const experiments = [
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Modal Testing", href: "/modal-testing", icon: UsersIcon },
  { name: "Form Projects", href: "/form-projects", icon: DocumentTextIcon },
  { name: "Table Projects", href: "/table-projects", icon: RectangleStackIcon },
];

interface Props {
  onClose: () => void;
}

export const Experiments = ({ onClose }: Props) => {
  if (!IS_DEV) return null;

  return (
    <li>
      <div className="text-xs/6 font-semibold text-gray-400">
        My experiments
      </div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {experiments.map((experiment) => (
          <SidebarItem
            key={experiment.name}
            {...experiment}
            onClose={onClose}
          />
        ))}
      </ul>
    </li>
  );
};
