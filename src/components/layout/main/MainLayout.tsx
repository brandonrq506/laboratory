import { useDisclosure } from "@/hooks/useDisclosure";
import { useUserPreference } from "@/features/userPreferences/hooks";

import { IconButton, NetworkBadge } from "../../core";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Fragment } from "react/jsx-runtime";
import { Header } from "./Header";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar/Sidebar";
import clsx from "clsx";

export const MainLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sidebarPreference = useUserPreference("sidebar_open");
  const isDesktopSidebarOpen = sidebarPreference?.value === "true";

  return (
    <Fragment>
      <Sidebar isOpen={isOpen} onClose={onClose} />

      <Header>
        <IconButton
          onClick={onOpen}
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </IconButton>
        <div className="flex-1 text-sm leading-6 font-semibold text-gray-900">
          Laboratory
        </div>
      </Header>

      <main
        className={clsx(
          "py-6 transition-all",
          isDesktopSidebarOpen ? "lg:pl-72" : "lg:pl-20",
        )}>
        <div className="px-4 sm:px-6">{<Outlet />}</div>
        <NetworkBadge />
      </main>
    </Fragment>
  );
};
