import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";

import { Experiments } from "./Experiments";
import { Items } from "./Items";
import { LinkedInProfile } from "@/components/core";
import { LogoutButton } from "@/features/auth/components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import appLogo from "@/assets/app_logo.png";

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
                  alt="App Logo"
                  src={appLogo}
                  className="h-8 w-auto rounded-md"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <Items onClose={onClose} />
                  <Experiments onClose={onClose} />
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
              <Items onClose={onClose} />
              <Experiments onClose={onClose} />
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
