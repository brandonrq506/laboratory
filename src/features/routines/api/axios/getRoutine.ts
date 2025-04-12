import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";
import { Routine } from "../../types/routine";

type Props = {
  routineId: number;
  signal: AbortSignal;
};

export const getRoutine = async ({ routineId, signal }: Props) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}`;
  const response = await apiV1.get<Routine>(URL, { signal });
  return response.data;
};
