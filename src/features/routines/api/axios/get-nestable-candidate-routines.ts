import type { RoutineNestableCandidate } from "../../types/routine-nestable-candidates";

import { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";

import { routineKeys } from "../queries";

export const getNestableCandidateRoutines = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof routineKeys.member_list>>) => {
  const [{ feature, routineId }] = queryKey;
  const URL = `${feature}/${routineId}/nestable_candidates`;

  const response = await apiV1.get<RoutineNestableCandidate[]>(URL, { signal });
  return response.data;
};
