import type { QueryFunctionContext } from "@tanstack/react-query";
import type { TaskAPI } from "../../types/task";
import { apiV1 } from "@/libs/axios";
import type { taskKeys } from "../queries";

export async function getTasks<T = TaskAPI[]>({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof taskKeys.list>>): Promise<T> {
  const [{ feature, filter, sort }] = queryKey;
  const response = await apiV1.get<T>(feature, {
    signal,
    params: {
      filter,
      sort,
    },
  });
  return response.data;
}
