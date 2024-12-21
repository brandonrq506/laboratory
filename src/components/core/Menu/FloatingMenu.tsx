import { Menu, MenuButton, MenuItems } from "@headlessui/react";

type Props = {
  children: React.ReactNode;
  iconBtn: React.ReactNode;
  srBtnText: string;
};

export const FloatingMenu = ({ children, iconBtn, srBtnText }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
        <span className="sr-only">{srBtnText}</span>
        {iconBtn}
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="absolute right-0 z-10 mt-2 w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
        {children}
      </MenuItems>
    </Menu>
  );
};
