import { useAuth } from "../../stores";
import { useMutation } from "@tanstack/react-query";

import { logout as logoutFn } from "../axios/logout";

export const useLogout = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: logoutFn,
    onMutate: () => logout("manual"),
  });
};
