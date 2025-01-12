import { useAuth } from "../../stores";
import { useMutation } from "@tanstack/react-query";

import { login as loginFn } from "../axios/login";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => login(data.token),
  });
};
