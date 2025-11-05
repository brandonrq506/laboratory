import { QueryFunctionContext } from "@tanstack/react-query";
import { activityKeys } from "../queries";
import { apiV1 } from "@/libs/axios";

import type { ActivityWithCategory } from "../../types/activity-with-category";

export const getActivity = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof activityKeys)["detail"]>>) => {
  const [{ feature, activityId }] = queryKey;
  const URL = `${feature}/${activityId}`;

  const response = await apiV1.get<ActivityWithCategory>(URL, { signal });
  return response.data;
};
