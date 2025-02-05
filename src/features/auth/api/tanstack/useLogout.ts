import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../stores";

import { logout as logoutFn } from "../axios/logout";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries();
    },
  });
};
