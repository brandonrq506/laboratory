import { ScheduledTaskAPI } from "../../types/scheduledTask";
import { getTasks } from "../axios/getTasks";
import { queryOptions } from "@tanstack/react-query";
import { taskKeys } from "../queryKeys";

export const scheduledTasksOptions = () => {
  return queryOptions({
    queryKey: taskKeys.list({
      filter: { status: "scheduled" },
      sort: { sort_by: "position", sort_order: "asc" },
    }),
    queryFn: getTasks<ScheduledTaskAPI[]>,
  });
};
