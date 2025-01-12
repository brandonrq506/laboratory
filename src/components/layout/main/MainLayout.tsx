import { useDisclosure } from "@/hooks/useDisclosure";

import { IconButton, LinkedInProfile } from "../../core";
import { AuthGuard } from "./AuthGuard";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Header } from "./Header";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <AuthGuard>
      <Sidebar isOpen={isOpen} onClose={onClose} />

      <Header>
        <IconButton
          onClick={onOpen}
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </IconButton>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          Laboratory
        </div>
        <LinkedInProfile />
      </Header>

      <main className="py-6 lg:pl-72">
        <div className="px-4 sm:px-6">{<Outlet />}</div>
      </main>
    </AuthGuard>
  );
};
