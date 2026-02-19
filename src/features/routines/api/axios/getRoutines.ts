import type { RoutineWithItems } from "../../types/routine-with-items";

import { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";

import { routineKeys } from "../queries";

export const getRoutines = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof routineKeys.list>>) => {
  const [{ feature, filter, sort }] = queryKey;

  const response = await apiV1.get<RoutineWithItems[]>(feature, {
    signal,
    params: {
      filter,
      sort,
    },
  });
  return response.data;
};
