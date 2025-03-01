import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";

export const deleteScheduledTasks = async () => {
  await apiV1.delete(`${TASKS_ENDPOINT}/delete_scheduled`);
};
