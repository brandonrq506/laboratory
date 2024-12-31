import { TASKS_ENDPOINT } from "@/libs/axios";
import { TaskStatus } from "../types/taskStatus";

export const taskKeys = {
  all: [{ scope: TASKS_ENDPOINT }] as const,
  lists: () => [{ ...taskKeys.all[0], entity: "list" }] as const,
  list: (status?: TaskStatus, category_id?: number, created_at?: string) =>
    [{ ...taskKeys.lists()[0], status, category_id, created_at }] as const,
  details: () => [{ ...taskKeys.all[0], entity: "details" }] as const,
  detail: (taskId: number) => [{ ...taskKeys.details()[0], taskId }] as const,
};
