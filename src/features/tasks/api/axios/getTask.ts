import { QueryFunctionContext } from "@tanstack/react-query";
import { TaskAPI } from "../../types/task";
import { apiV1 } from "@/libs/axios";
import { taskKeys } from "../queryKeys";

export const getTask = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof taskKeys)["detail"]>>) => {
  const [{ endpoint, taskId }] = queryKey;
  const URL = `${endpoint}/${taskId}`;

  const response = await apiV1.get<TaskAPI>(URL, { signal });
  return response.data;
};
