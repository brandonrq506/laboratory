import { CompletedTaskAPI } from "../../types/completedTask";
import { getTasks } from "../axios/getTasks";
import { queryOptions } from "@tanstack/react-query";
import { taskKeys } from "../queryKeys";

export const historyTasksOptions = (date: string) => {
  return queryOptions({
    queryKey: taskKeys.list({
      filter: { status: "completed", start_time: date },
      sort: { sort_by: "start_time", sort_order: "asc" },
    }),
    queryFn: getTasks<CompletedTaskAPI[]>,
  });
};
