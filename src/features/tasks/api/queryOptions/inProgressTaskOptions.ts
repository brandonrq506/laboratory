import { InProgressTaskAPI } from "../../types/inProgressTask";
import { getTasks } from "../axios/getTasks";
import { queryOptions } from "@tanstack/react-query";
import { taskKeys } from "../queryKeys";

export const inProgressTaskOptions = () => {
  return queryOptions({
    queryKey: taskKeys.list({ filter: { status: "in_progress" } }),
    queryFn: getTasks<InProgressTaskAPI[]>,
  });
};
