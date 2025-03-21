import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";

export const moveTaskDown = async (taskId: number) => {
  const URL = `${TASKS_ENDPOINT}/${taskId}/move_down`;
  await apiV1.patch(URL);
};
