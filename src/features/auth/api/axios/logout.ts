import { SESSION_ENDPOINT, apiV1 } from "@/libs/axios";

export const logout = async () => {
  await apiV1.delete(SESSION_ENDPOINT);
};
