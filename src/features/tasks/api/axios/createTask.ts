import { TASKS_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { PostTask } from "../../types/postTask";
import { TaskAPI } from "../../types/task";

//TODO: Revoved hardcored user id
const URL = `${USERS_ENDPOINT}/1${TASKS_ENDPOINT}`;

export const createTask = async (task: PostTask) => {
  const { data } = await apiV1.post<TaskAPI>(URL, task);
  return data;
};
