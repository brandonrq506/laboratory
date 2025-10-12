import { useNavigate, useRouter } from "@tanstack/react-router";
import { useLogout } from "../api/tanstack/useLogout";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/core";

export const LogoutButton = () => {
  const { mutateAsync } = useLogout();
  const router = useRouter();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await mutateAsync();
    await router.invalidate();
    await navigate({ to: "/login" });
  };

  return (
    <IconButton onClick={handleLogout} shape="circle">
      <span className="sr-only">Logout Button</span>
      <ArrowRightStartOnRectangleIcon
        className="size-5 text-gray-400 hover:text-indigo-600"
        aria-hidden
      />
    </IconButton>
  );
};
