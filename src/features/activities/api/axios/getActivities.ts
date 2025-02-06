import { ACTIVITIES_ENDPOINT, apiV1 } from "@/libs/axios";
import { ActivityAPI } from "../../types/activityAPI";

type Props = { signal: AbortSignal };

export const getActivities = async ({ signal }: Props) => {
  const { data } = await apiV1.get<ActivityAPI[]>(ACTIVITIES_ENDPOINT, {
    signal,
  });
  return data;
};
