import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { RoutineApiOptions } from "../types/routine-api-options";
import { queryOptions } from "@tanstack/react-query";

import { getNestableCandidateRoutines } from "./axios/get-nestable-candidate-routines";
import { getRoutine } from "./axios/getRoutine";
import { getRoutines } from "./axios/getRoutines";
import { getVisibleRoutines } from "./axios/get-visible-routines";

export const routineKeys = {
  all: [{ feature: ROUTINES_ENDPOINT }] as const,
  lists: () => [{ ...routineKeys.all[0], entity: "list" }] as const,
  list: ({ filter = {} }: RoutineApiOptions) =>
    [{ ...routineKeys.lists()[0], filter }] as const,
  details: () => [{ ...routineKeys.all[0], entity: "details" }] as const,
  detail: (routineId: number) =>
    [{ ...routineKeys.details()[0], routineId }] as const,
  member_list: (routineId: number) =>
    [{ ...routineKeys.lists()[0], routineId }] as const,
};

export const routineByIdQueryOptions = (routineId: number) => {
  return queryOptions({
    queryKey: routineKeys.detail(routineId),
    queryFn: getRoutine,
  });
};

export const routineListQueryOptions = () => {
  return queryOptions({
    queryKey: routineKeys.list({ filter: { endpoint: "all" } }),
    queryFn: getRoutines,
  });
};

export const routineVisibleListQueryOptions = () => {
  return queryOptions({
    queryKey: routineKeys.list({ filter: { endpoint: "visible" } }),
    queryFn: getVisibleRoutines,
  });
};

export const routineNestableCandidateListQueryOptions = (routineId: number) => {
  return queryOptions({
    queryKey: routineKeys.member_list(routineId),
    queryFn: getNestableCandidateRoutines,
  });
};
