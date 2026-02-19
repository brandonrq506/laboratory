import { TASKS_ENDPOINT } from "@/libs/axios";
import { queryOptions } from "@tanstack/react-query";

import { endOfDay, formatISO, startOfDay } from "date-fns";
import { getTask } from "./axios/getTask";
import { getTasks } from "./axios/getTasks";

import type {
  DateFilterOperators,
  ExactFilterOperators,
} from "@/types/core/filters";
import type { ApiQueryOptions } from "@/types/core";
import type { CompletedTaskAPI } from "../types/completedTask";
import type { InProgressTaskAPI } from "../types/inProgressTask";
import type { ScheduledTaskAPI } from "../types/scheduledTask";
import type { TaskStatus } from "../types/task-status";

export type TaskApiFilters = {
  status?: ExactFilterOperators<TaskStatus>;
  category_id?: ExactFilterOperators<number>;
  category_name?: ExactFilterOperators<string>;
  created_at?: DateFilterOperators;
  updated_at?: DateFilterOperators;
  end_time?: DateFilterOperators;
  start_time?: DateFilterOperators;
};

export const taskKeys = {
  all: [{ feature: TASKS_ENDPOINT }] as const,
  lists: () => [{ ...taskKeys.all[0], entity: "list" }] as const,
  list: ({ filter = {}, sort = {} }: ApiQueryOptions<TaskApiFilters>) =>
    [{ ...taskKeys.lists()[0], filter, sort }] as const,
  details: () => [{ ...taskKeys.all[0], entity: "details" }] as const,
  detail: (taskId: number) => [{ ...taskKeys.details()[0], taskId }] as const,
};

export const scheduledTasksQueryOptions = () => {
  return queryOptions({
    queryKey: taskKeys.list({
      filter: {
        status: { eq: "scheduled" },
        created_at: {
          is_on_or_before: formatISO(endOfDay(new Date())),
        },
      },
      sort: { sort_by: "position", sort_order: "asc" },
    }),
    queryFn: getTasks<ScheduledTaskAPI[]>,
  });
};

export const inProgressTasksQueryOptions = () => {
  return queryOptions({
    queryKey: taskKeys.list({ filter: { status: { eq: "in_progress" } } }),
    queryFn: getTasks<InProgressTaskAPI[]>,
  });
};

export const todayCompletedTasksQueryOptions = () => {
  return queryOptions({
    queryKey: taskKeys.list({
      filter: {
        status: { eq: "completed" },
        start_time: { is_equal_to: formatISO(startOfDay(new Date())) },
      },
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
      filter: {
        status: { eq: "completed" },
        start_time: { is_equal_to: date },
      },
      sort: { sort_by: "start_time", sort_order: "asc" },
    }),
    queryFn: getTasks<CompletedTaskAPI[]>,
  });
};
