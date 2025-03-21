import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";

export const moveTaskBottom = async (taskId: number) => {
  const URL = `${TASKS_ENDPOINT}/${taskId}/move_bottom`;
  await apiV1.patch(URL);
};
