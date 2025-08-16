import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { TaskActivateResponse } from "../../types/taskActivateResponse";

export interface ActivateTaskInput {
  taskId: number;
  /** ISO8601 timestamp */
  timestamp: string;
}

export const activateTask = async ({
  taskId,
  timestamp,
}: ActivateTaskInput) => {
  const URL = `${TASKS_ENDPOINT}/${taskId}/activate`;
  const { data } = await apiV1.post<TaskActivateResponse>(URL, { timestamp });
  return data;
};
