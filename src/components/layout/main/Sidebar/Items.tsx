import {
  ClockIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { SidebarItem } from "./SidebarItem";

const items = [
  { name: "Activities", href: "/activities", icon: UsersIcon },
  { name: "Timer", href: "/timer", icon: ClockIcon },
  { name: "History", href: "/history", icon: RectangleStackIcon },
  { name: "Routines", href: "/routines", icon: DocumentTextIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

interface Props {
  onClose: () => void;
}

export const Items = ({ onClose }: Props) => {
  return (
    <li>
      <ul role="list" className="-mx-2 space-y-1">
        {items.map((item) => (
          <SidebarItem key={item.name} {...item} onClose={onClose} />
        ))}
      </ul>
    </li>
  );
};
