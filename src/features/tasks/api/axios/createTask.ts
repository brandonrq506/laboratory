import { TASKS_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { PostTask } from "../../types/postTask";

//TODO: Revoved hardcored user id
const URL = `${USERS_ENDPOINT}/1${TASKS_ENDPOINT}`;

export const createTask = async (task: PostTask) => {
  const { data } = await apiV1.post<PostTask>(URL, task);
  return data;
};
