import { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";

import { Routine } from "../../types/routine";
import { routineKeys } from "../queries";

export const getVisibleRoutines = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof routineKeys.list>>) => {
  const [{ feature, filter }] = queryKey;
  const URL = `${feature}/${filter.endpoint}`;

  const response = await apiV1.get<Routine[]>(URL, { signal });
  return response.data;
};
