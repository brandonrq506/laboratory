import { ACTIVITIES_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { ActivityAPI } from "../../types/activityAPI";

type Props = {
  activityId: number;
  signal: AbortSignal;
};

// TODO: This needs a signal
export const getActivity = async ({ activityId, signal }: Props) => {
  const URL = `${USERS_ENDPOINT}/1${ACTIVITIES_ENDPOINT}/${activityId}`;
  const response = await apiV1.get<ActivityAPI>(URL, { signal });
  return response.data;
};
