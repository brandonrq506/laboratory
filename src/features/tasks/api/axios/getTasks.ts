import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import { TaskAPI } from "../../types/task";
import { taskKeys } from "../queryKeys";

export async function getTasks<T = TaskAPI[]>({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof taskKeys.list>>): Promise<T> {
  const [{ filter, sort }] = queryKey;
  const { data } = await apiV1.get<T>(TASKS_ENDPOINT, {
    signal,
    params: {
      filter,
      sort,
      misc: {
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    },
  });
  return data;
}
