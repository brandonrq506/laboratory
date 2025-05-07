import { useQuery } from "@tanstack/react-query";

import { TaskAPI } from "../../types/task";
import { TaskOptions } from "../../types/taskOptions";
import { getTasks } from "../axios/getTasks";
import { taskKeys } from "../queryKeys";

export const useTasks = ({ filter, sort }: TaskOptions = {}) => {
  return useQuery({
    queryKey: taskKeys.list({ filter, sort }),
    queryFn: getTasks<TaskAPI[]>,
  });
};
