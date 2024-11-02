import { TASKS_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import { TaskAPI } from "../../types/taskAPI";
import { taskKeys } from "../queryKeys";

const URL = `${USERS_ENDPOINT}/1${TASKS_ENDPOINT}`;

export const getTasks = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof taskKeys)["list"]>>) => {
  const [{ status, category_id, created_at }] = queryKey;

  const { data } = await apiV1.get<TaskAPI[]>(URL, {
    signal,
    params: {
      status,
      category_id,
      created_at,
    },
  });
  return data;
};
