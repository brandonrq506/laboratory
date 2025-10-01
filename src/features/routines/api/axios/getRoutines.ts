import { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";

import { Routine } from "../../types/routine";
import { routineKeys } from "../queries";

export const getRoutines = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof routineKeys.lists>>) => {
  const [{ feature }] = queryKey;

  const response = await apiV1.get<Routine[]>(feature, { signal });
  return response.data;
};
