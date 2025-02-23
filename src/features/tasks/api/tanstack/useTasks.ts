import { useQuery } from "@tanstack/react-query";

import { TaskApiFilters } from "../../types/taskApiFilters";
import { getTasks } from "../axios/getTasks";
import { taskKeys } from "../queryKeys";

type Props = Partial<TaskApiFilters>;

export const useTasks = ({ status, category_id, created_at }: Props = {}) => {
  return useQuery({
    queryKey: taskKeys.list(status, category_id, created_at),
    queryFn: getTasks,
  });
};
