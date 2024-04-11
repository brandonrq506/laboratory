import { Link } from "react-router-dom";
import { FolderIcon } from "@heroicons/react/24/outline";

const items = [
  // { name: "Home", href: "/home", icon: FolderIcon },
  { name: "Derived State One", href: "/derived-state", icon: FolderIcon },
  { name: "Derived State Two", href: "/derived-state-two", icon: FolderIcon },
  { name: "State Structure", href: "/structure-state", icon: FolderIcon },
  { name: "Share State", href: "/share-state", icon: FolderIcon },
  { name: "What Rerenders", href: "/what-rerenders", icon: FolderIcon },
];

export const Home = () => {
  return (
    <div className="content-center text-center">
      <div className="mt-4 flex justify-center">
        <div className="mt-2 grid w-1/2 grid-cols-1 gap-2">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center justify-center rounded-md bg-gray-100 p-2 hover:bg-gray-200">
              <item.icon className="mr-2 h-6 w-6" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
