import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import { TaskAPI } from "../../types/task";
import { taskKeys } from "../queryKeys";

export const getTasks = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof taskKeys)["list"]>>) => {
  const [{ status, category_id, created_at }] = queryKey;

  const { data } = await apiV1.get<TaskAPI[]>(TASKS_ENDPOINT, {
    signal,
    params: {
      status,
      category_id,
      created_at,
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });
  return data;
};
