import type { RoutineWithActivities } from "../../types/routine-with-activities";

import { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";

import { routineKeys } from "../queries";

export const getRoutine = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof routineKeys)["detail"]>>) => {
  const [{ feature, routineId }] = queryKey;
  const URL = `${feature}/${routineId}`;

  const response = await apiV1.get<RoutineWithActivities>(URL, { signal });
  return response.data;
};
