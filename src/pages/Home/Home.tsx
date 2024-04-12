import { Link } from "react-router-dom";
import { FolderIcon } from "@heroicons/react/24/outline";

const items = [
  { name: "Simple useEffect", href: "/use-effect-one", icon: FolderIcon },
  { name: "Chat Room", href: "/chat-room", icon: FolderIcon },
  { name: "Chat Room Two", href: "/chat-room-two", icon: FolderIcon },
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
