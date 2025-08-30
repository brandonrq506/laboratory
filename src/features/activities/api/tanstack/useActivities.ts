import { useQuery } from "@tanstack/react-query";

import { activityKeys } from "../queryKeys";
import { getActivities } from "../axios/getActivities";

export const useActivities = () => {
  return useQuery({
    queryKey: activityKeys.lists(),
    queryFn: getActivities,
  });
};
