import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import { TaskAPI } from "../../types/task";
import { taskKeys } from "../queryKeys";

export const getTasks = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof taskKeys.list>>) => {
  const [{ filter, sort }] = queryKey;
  const { data } = await apiV1.get<TaskAPI[]>(TASKS_ENDPOINT, {
    signal,
    params: {
      filter,
      sort,
      misc: { time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    },
  });
  return data;
};
