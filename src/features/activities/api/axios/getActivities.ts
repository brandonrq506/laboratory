import { ActivityAPI } from "../../types/activityAPI";
import { QueryFunctionContext } from "@tanstack/react-query";
import { activityKeys } from "../queryKeys";
import { apiV1 } from "@/libs/axios";

export const getActivities = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof activityKeys.lists>>) => {
  const [{ endpoint }] = queryKey;

  const { data } = await apiV1.get<ActivityAPI[]>(endpoint, { signal });
  return data;
};
