import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";

interface Props {
  task_ids: number[];
}

const URL = `${TASKS_ENDPOINT}/span_deletions`;

export const deleteTasks = async ({ task_ids }: Props) => {
  await apiV1.post(URL, { task_ids });
};
