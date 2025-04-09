import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";

import {
  ClockIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  FolderIcon,
  RectangleStackIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { LinkedInProfile } from "@/components/core";
import { LogoutButton } from "@/features/auth/components";
import { SidebarItem } from "./SidebarItem";
import appLogo from "@/assets/app_logo.jpeg";

const experiments = [
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Modal Testing", href: "/modal-testing", icon: UsersIcon },
  { name: "Form Projects", href: "/form-projects", icon: DocumentTextIcon },
  { name: "Table Projects", href: "/table-projects", icon: RectangleStackIcon },
];

const items = [
  { name: "Activities", href: "/activities", icon: UsersIcon },
  { name: "Timer", href: "/timer", icon: ClockIcon },
  { name: "History", href: "/history", icon: RectangleStackIcon },
  { name: "Routines", href: "/routines", icon: DocumentTextIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Sidebar */}
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {items.map((item) => (
                        <SidebarItem
                          key={item.name}
                          {...item}
                          onClose={onClose}
                        />
                      ))}
                    </ul>
                  </li>
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
                  <li className="mt-auto mb-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      <LinkedInProfile />
                      <span aria-hidden="true">Brandon Ramirez</span>
                    </div>
                    <LogoutButton />
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 shrink-0 items-center">
            <img
              alt="App Logo"
              src={appLogo}
              className="h-8 w-auto rounded-md"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {items.map((item) => (
                    <SidebarItem key={item.name} {...item} onClose={onClose} />
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs/6 font-semibold text-gray-400">
                  Your experiments
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
              <li className="mt-auto mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <LinkedInProfile />
                  <span aria-hidden="true">Brandon Ramirez</span>
                </div>
                <LogoutButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
