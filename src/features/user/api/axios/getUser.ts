import { ME_ENDPOINT, apiV1 } from "@/libs/axios";
import { UserSafe } from "../../types/userSafe";

interface Props {
  signal: AbortSignal;
}

export const getUser = async ({ signal }: Props) => {
  const response = await apiV1.get<UserSafe>(ME_ENDPOINT, { signal });
  return response.data;
};
