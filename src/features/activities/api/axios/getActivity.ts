import { ActivityAPI } from "../../types/activityAPI";
import { QueryFunctionContext } from "@tanstack/react-query";
import { activityKeys } from "../queries";
import { apiV1 } from "@/libs/axios";

export const getActivity = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof activityKeys)["detail"]>>) => {
  const [{ feature, activityId }] = queryKey;
  const URL = `${feature}/${activityId}`;

  const response = await apiV1.get<ActivityAPI>(URL, { signal });
  return response.data;
};
