import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";

export const moveTaskTop = async (taskId: number) => {
  const URL = `${TASKS_ENDPOINT}/${taskId}/move_top`;
  await apiV1.patch(URL);
};
