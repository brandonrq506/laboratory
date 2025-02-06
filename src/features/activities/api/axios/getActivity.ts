import { ACTIVITIES_ENDPOINT, apiV1 } from "@/libs/axios";
import { ActivityAPI } from "../../types/activityAPI";

type Props = {
  activityId: number;
  signal: AbortSignal;
};

export const getActivity = async ({ activityId, signal }: Props) => {
  const URL = `${ACTIVITIES_ENDPOINT}/${activityId}`;
  const response = await apiV1.get<ActivityAPI>(URL, { signal });
  return response.data;
};
