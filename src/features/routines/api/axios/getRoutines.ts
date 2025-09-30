import { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";

import { Routine } from "../../types/routine";
import { routineKeys } from "../queries";

export const getRoutines = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof routineKeys.lists>>) => {
  const [{ endpoint }] = queryKey;

  const response = await apiV1.get<Routine[]>(endpoint, { signal });
  return response.data;
};
