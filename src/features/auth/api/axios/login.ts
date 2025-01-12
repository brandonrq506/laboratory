import { SESSION_ENDPOINT, apiV1 } from "@/libs/axios";
import { LoginFormType } from "../../types/loginForm";

type Response = {
  token: string;
};

export const login = async (formValues: LoginFormType) => {
  const { data } = await apiV1.post<Response>(SESSION_ENDPOINT, formValues);
  return data;
};
