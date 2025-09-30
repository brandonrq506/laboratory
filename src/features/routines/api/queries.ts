import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { queryOptions } from "@tanstack/react-query";

import { getRoutine } from "./axios/getRoutine";
import { getRoutines } from "./axios/getRoutines";

export const routineKeys = {
  all: [{ endpoint: ROUTINES_ENDPOINT }] as const,
  lists: () => [{ ...routineKeys.all[0], entity: "list" }] as const,
  details: () => [{ ...routineKeys.all[0], entity: "details" }] as const,
  detail: (routineId: string | number) =>
    [{ ...routineKeys.details()[0], routineId: String(routineId) }] as const,
};

export const routineByIdQueryOptions = (routineId: string | number) => {
  return queryOptions({
    queryKey: routineKeys.detail(routineId),
    queryFn: getRoutine,
  });
};

export const routineListQueryOptions = () => {
  return queryOptions({
    queryKey: routineKeys.lists(),
    queryFn: getRoutines,
  });
};
