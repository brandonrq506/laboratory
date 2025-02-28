import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

type Props = {
  children: React.ReactNode;
};

export const ThreeDotsMenu = ({ children }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex h-full">
        <MenuButton className="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 focus-visible:outline-hidden">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        anchor={{ to: "bottom", padding: "1.5rem" }}
        className="absolute right-0 z-10 mt-2 w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
        {children}
      </MenuItems>
    </Menu>
  );
};
