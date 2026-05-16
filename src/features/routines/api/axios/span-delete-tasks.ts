import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";

interface Props {
  task_ids: number[];
}

const URL = `${TASKS_ENDPOINT}/span_deletions`;

export const spanDeleteTasks = async ({ task_ids }: Props) => {
  const response = await apiV1.post(URL, { task_ids });
  return response.data;
};
