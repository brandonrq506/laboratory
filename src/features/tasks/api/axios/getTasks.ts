import { QueryFunctionContext } from "@tanstack/react-query";
import { TaskAPI } from "../../types/task";
import { apiV1 } from "@/libs/axios";
import { taskKeys } from "../queryKeys";

export async function getTasks<T = TaskAPI[]>({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof taskKeys.list>>): Promise<T> {
  const [{ endpoint, filter, sort }] = queryKey;
  const response = await apiV1.get<T>(endpoint, {
    signal,
    params: {
      filter,
      sort,
      misc: {
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    },
  });
  return response.data;
}
