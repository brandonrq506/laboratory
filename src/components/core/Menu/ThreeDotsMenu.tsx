import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

type Props = {
  children: React.ReactNode;
};

export const ThreeDotsMenu = ({ children }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex h-full">
        <MenuButton className="text-foreground-faint hover:text-foreground-muted focus-visible:ring-focus-ring-soft focus-visible:ring-offset-surface-hover flex items-center rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        anchor={{ to: "bottom", padding: "1.5rem" }}
        className="divide-border-subtle bg-elevated ring-surface-edge absolute right-0 z-10 mt-2 w-fit origin-top-right divide-y rounded-md shadow-lg ring-1 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
        {children}
      </MenuItems>
    </Menu>
  );
};
