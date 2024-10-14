import { useQuery } from "@tanstack/react-query";

import { ACTIVITIES_ENDPOINT } from "@/libs/axios";
import { getActivities } from "../axios/getActivities";

export const useActivities = () => {
  return useQuery({
    queryKey: [ACTIVITIES_ENDPOINT],
    queryFn: ({ signal }) => getActivities({ signal }),
  });
};
