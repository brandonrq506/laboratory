import { ACTIVITIES_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { GetActivity } from "../../types/getActivity";

// TODO: Remove hardcoded user id
const URL = `${USERS_ENDPOINT}/1${ACTIVITIES_ENDPOINT}`;

type Props = { signal: AbortSignal };

export const getActivities = async ({ signal }: Props) => {
  const { data } = await apiV1.get<GetActivity[]>(URL, { signal });
  return data;
};
