import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import { TaskAPI } from "../../types/task";
import { taskKeys } from "../queryKeys";

export const getTask = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof taskKeys)["detail"]>>) => {
  const [{ taskId }] = queryKey;
  const URL = `${TASKS_ENDPOINT}/${taskId}`;

  const { data } = await apiV1.get<TaskAPI>(URL, {
    signal,
  });
  return data;
};
