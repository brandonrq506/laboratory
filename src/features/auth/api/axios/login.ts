import { SESSION_ENDPOINT, apiV1 } from "@/libs/axios";
import { LoginFormType } from "../../types/loginForm";

type Response = {
  access_token: string;
};

export const login = async (formValues: LoginFormType) => {
  const response = await apiV1.post<Response>(SESSION_ENDPOINT, formValues);
  return response.data;
};
