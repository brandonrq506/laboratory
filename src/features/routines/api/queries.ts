import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { queryOptions } from "@tanstack/react-query";

import {
  DateFilterOperators,
  StringFilterOperators,
} from "@/types/core/filters";
import { ApiQueryOptions } from "@/types/core";
import { getNestableCandidateRoutines } from "./axios/get-nestable-candidate-routines";
import { getRoutine } from "./axios/getRoutine";
import { getRoutines } from "./axios/getRoutines";

type RoutineFilters = {
  hidden_at?: DateFilterOperators;
  created_at?: DateFilterOperators;
  updated_at?: DateFilterOperators;
  name?: StringFilterOperators;
};

export const routineKeys = {
  all: [{ feature: ROUTINES_ENDPOINT }] as const,
  lists: () => [{ ...routineKeys.all[0], entity: "list" }] as const,
  list: ({ filter = {}, sort = {} }: ApiQueryOptions<RoutineFilters>) =>
    [{ ...routineKeys.lists()[0], filter, sort }] as const,
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
    queryKey: routineKeys.list({}),
    queryFn: getRoutines,
  });
};

export const routineVisibleListQueryOptions = () => {
  return queryOptions({
    queryKey: routineKeys.list({ filter: { hidden_at: { is_null: true } } }),
    queryFn: getRoutines,
  });
};

export const routineHiddenListQueryOptions = () => {
  return queryOptions({
    queryKey: routineKeys.list({ filter: { hidden_at: { is_null: false } } }),
    queryFn: getRoutines,
  });
};

export const routineNestableCandidateListQueryOptions = (routineId: number) => {
  return queryOptions({
    queryKey: routineKeys.member_list(routineId),
    queryFn: getNestableCandidateRoutines,
  });
};
