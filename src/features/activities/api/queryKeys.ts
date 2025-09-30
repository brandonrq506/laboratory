import { ACTIVITIES_ENDPOINT } from "@/libs/axios";
import { queryOptions } from "@tanstack/react-query";

import { getActivities } from "./axios/getActivities";
import { getActivity } from "./axios/getActivity";

export const activityKeys = {
  all: [{ endpoint: ACTIVITIES_ENDPOINT }] as const,
  lists: () => [{ ...activityKeys.all[0], entity: "list" }] as const,
  details: () => [{ ...activityKeys.all[0], entity: "details" }] as const,
  detail: (activityId: string | number) =>
    [{ ...activityKeys.details()[0], activityId: String(activityId) }] as const,
};

export const activityByIdQueryOptions = (activityId: string | number) => {
  return queryOptions({
    queryKey: activityKeys.detail(activityId),
    queryFn: getActivity,
  });
};

export const activityListQueryOptions = () => {
  return queryOptions({
    queryKey: activityKeys.lists(),
    queryFn: getActivities,
  });
};
