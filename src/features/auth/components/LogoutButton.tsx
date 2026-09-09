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
        className="text-foreground-faint hover:text-accent size-5"
        aria-hidden
      />
    </IconButton>
  );
};
