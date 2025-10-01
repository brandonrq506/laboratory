import { ActivityAPI } from "../../types/activityAPI";
import { QueryFunctionContext } from "@tanstack/react-query";
import { activityKeys } from "../queries";
import { apiV1 } from "@/libs/axios";

export const getActivities = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof activityKeys.lists>>) => {
  const [{ feature }] = queryKey;

  const response = await apiV1.get<ActivityAPI[]>(feature, { signal });
  return response.data;
};
