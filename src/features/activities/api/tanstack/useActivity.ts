import { useQuery } from "@tanstack/react-query";

import { ACTIVITIES_ENDPOINT } from "@/libs/axios";
import { getActivity } from "../axios/getActivity";

export const useActivity = (activityId: number) => {
  return useQuery({
    queryKey: [ACTIVITIES_ENDPOINT, activityId],
    queryFn: () => getActivity(activityId),
    enabled: Boolean(activityId),
  });
};
