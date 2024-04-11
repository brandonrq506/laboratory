import { useDisclosure } from "@/hooks/useDisclosure";
import { IconButton, LinkButton } from "@/components/core";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const MainLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Sidebar isOpen={isOpen} onClose={onClose} />

      <Header>
        <IconButton
          onClick={onOpen}
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </IconButton>
        <LinkButton to="/home" className="text-lg font-semibold">
          Home
        </LinkButton>
      </Header>

      <main className="py-6 lg:pl-72">
        <div className="px-4 sm:px-6">{<Outlet />}</div>
      </main>
    </>
  );
};
