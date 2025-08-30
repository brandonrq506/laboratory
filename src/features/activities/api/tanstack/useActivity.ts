import { useQuery } from "@tanstack/react-query";

import { activityKeys } from "../queryKeys";
import { getActivity } from "../axios/getActivity";

export const useActivity = (activityId: number) => {
  return useQuery({
    queryKey: activityKeys.detail(activityId),
    queryFn: getActivity,
    enabled: Boolean(activityId),
  });
};
