import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";

export const moveTaskUp = async (taskId: number) => {
  const URL = `${TASKS_ENDPOINT}/${taskId}/move_up`;
  await apiV1.patch(URL);
};
