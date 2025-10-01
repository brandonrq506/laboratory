import { QueryFunctionContext } from "@tanstack/react-query";
import { TaskAPI } from "../../types/task";
import { apiV1 } from "@/libs/axios";
import { taskKeys } from "../queries";

export const getTask = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof taskKeys)["detail"]>>) => {
  const [{ feature, taskId }] = queryKey;
  const URL = `${feature}/${taskId}`;

  const response = await apiV1.get<TaskAPI>(URL, { signal });
  return response.data;
};
