import { TASKS_ENDPOINT } from "@/libs/axios";
import { TaskOptions } from "../types/taskOptions";

export const taskKeys = {
  all: [{ scope: TASKS_ENDPOINT }] as const,
  lists: () => [{ ...taskKeys.all[0], entity: "list" }] as const,
  list: ({ filter = {}, sort = {} }: TaskOptions) =>
    [{ ...taskKeys.lists()[0], filter, sort }] as const,
  details: () => [{ ...taskKeys.all[0], entity: "details" }] as const,
  detail: (taskId: number) => [{ ...taskKeys.details()[0], taskId }] as const,
};
