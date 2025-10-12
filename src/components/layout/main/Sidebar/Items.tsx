import { DesktopSidebarItem } from "./DesktopSidebarItem";
import { MobileSidebarItem } from "./MobileSidebarItem";
import { sidebarLinks } from "./links";

interface Props {
  onClose: () => void;
  isMobile?: boolean;
}

export const Items = ({ onClose, isMobile = false }: Props) => {
  const SidebarItemComponent = isMobile
    ? MobileSidebarItem
    : DesktopSidebarItem;

  return (
    <li>
      <ul role="list" className="-mx-2 space-y-1">
        {sidebarLinks.map((item) => (
          <SidebarItemComponent key={item.label} {...item} onClose={onClose} />
        ))}
      </ul>
    </li>
  );
};
