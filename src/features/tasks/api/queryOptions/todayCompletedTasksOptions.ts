import { CompletedTaskAPI } from "../../types/completedTask";
import { getTasks } from "../axios/getTasks";
import { queryOptions } from "@tanstack/react-query";
import { taskKeys } from "../queryKeys";

export const todayCompletedTasksOptions = () => {
  return queryOptions({
    queryKey: taskKeys.list({
      filter: { status: "completed", start_time: "today" },
      sort: { sort_by: "start_time", sort_order: "desc" },
    }),
    queryFn: getTasks<CompletedTaskAPI[]>,
  });
};
