import { useLogout } from "../api/tanstack/useLogout";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/core";

export const LogoutButton = () => {
  const { mutate } = useLogout();

  return (
    <IconButton onClick={() => mutate()} shape="circle">
      <span className="sr-only">Logout Button</span>
      <ArrowRightStartOnRectangleIcon
        className="size-5 text-gray-400 hover:text-indigo-600"
        aria-hidden
      />
    </IconButton>
  );
};
