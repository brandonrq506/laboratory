import { Menu, MenuButton, MenuItems } from "@headlessui/react";

type Props = {
  children: React.ReactNode;
  iconBtn: React.ReactNode;
  srBtnText: string;
};

export const FloatingMenu = ({ children, iconBtn, srBtnText }: Props) => {
  return (
    <Menu as="div" className="relative m-auto flex">
      <MenuButton className="rounded-full text-blue-600 outline-none ring-2 ring-transparent ring-offset-0 transition focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4">
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
