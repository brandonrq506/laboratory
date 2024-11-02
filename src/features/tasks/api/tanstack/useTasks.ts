import { useQuery } from "@tanstack/react-query";

import { TaskStatus } from "../../types/TaskStatus";
import { getTasks } from "../axios/getTasks";
import { taskKeys } from "../queryKeys";

type Props = {
  status?: TaskStatus;
  category_id?: number;
  created_at?: string;
};

export const useTasks = ({ status, category_id, created_at }: Props = {}) => {
  return useQuery({
    queryKey: taskKeys.list(status, category_id, created_at),
    queryFn: getTasks,
  });
};
