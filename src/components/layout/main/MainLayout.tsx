import { useDisclosure } from "@/hooks/useDisclosure";

import { Link, Outlet } from "react-router";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Header } from "./Header";
import { IconButton } from "../../core";
import { Sidebar } from "./Sidebar";

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
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          Laboratory
        </div>
        <Link
          to="https://www.linkedin.com/in/brandonrq506/"
          target="_blank"
          rel="noopener noreferrer">
          <span className="sr-only">Brandon's LinkedIn Profile</span>
          <img
            className="h-8 w-8 rounded-full bg-gray-50"
            src="https://media.licdn.com/dms/image/C5103AQFaf0t2wKfA4A/profile-displayphoto-shrink_800_800/0/1521536559143?e=1709164800&v=beta&t=uiMNtPa-2jmt6Dk7Zg2RSLymcdqpzlTJZhg7m6PdCcM"
            alt="Photo of Brandon Ramirez"
          />
        </Link>
      </Header>

      <main className="py-6 lg:pl-72">
        <div className="px-4 sm:px-6">{<Outlet />}</div>
      </main>
    </>
  );
};
