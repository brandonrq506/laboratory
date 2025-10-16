import { TASKS_ENDPOINT } from "@/libs/axios";
import { TaskOptions } from "../types/taskOptions";
import { queryOptions } from "@tanstack/react-query";

import { getTask } from "./axios/getTask";
import { getTasks } from "./axios/getTasks";

import { CompletedTaskAPI } from "../types/completedTask";
import { InProgressTaskAPI } from "../types/inProgressTask";
import { ScheduledTaskAPI } from "../types/scheduledTask";

export const taskKeys = {
  all: [{ feature: TASKS_ENDPOINT }] as const,
  lists: () => [{ ...taskKeys.all[0], entity: "list" }] as const,
  list: ({ filter = {}, sort = {} }: TaskOptions) =>
    [{ ...taskKeys.lists()[0], filter, sort }] as const,
  details: () => [{ ...taskKeys.all[0], entity: "details" }] as const,
  detail: (taskId: number) => [{ ...taskKeys.details()[0], taskId }] as const,
};

export const scheduledTasksQueryOptions = () => {
  return queryOptions({
    queryKey: taskKeys.list({
      filter: { status: "scheduled" },
      sort: { sort_by: "position", sort_order: "asc" },
    }),
    queryFn: getTasks<ScheduledTaskAPI[]>,
  });
};

export const inProgressTasksQueryOptions = () => {
  return queryOptions({
    queryKey: taskKeys.list({ filter: { status: "in_progress" } }),
    queryFn: getTasks<InProgressTaskAPI[]>,
  });
};

export const todayCompletedTasksQueryOptions = () => {
  return queryOptions({
    queryKey: taskKeys.list({
      filter: { status: "completed", start_time: "today" },
      sort: { sort_by: "start_time", sort_order: "desc" },
    }),
    queryFn: getTasks<CompletedTaskAPI[]>,
  });
};

export const taskByIdQueryOptions = (taskId: number) => {
  return queryOptions({
    queryKey: taskKeys.detail(taskId),
    queryFn: getTask,
  });
};

export const historyTasksQueryOptions = (date: string) => {
  return queryOptions({
    queryKey: taskKeys.list({
      filter: { status: "completed", start_time: date },
      sort: { sort_by: "start_time", sort_order: "asc" },
    }),
    queryFn: getTasks<CompletedTaskAPI[]>,
  });
};
