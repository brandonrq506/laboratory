import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";
import { Routine } from "../../types/routine";

type Props = { signal: AbortSignal };

export const getRoutines = async ({ signal }: Props) => {
  const response = await apiV1.get<Routine[]>(ROUTINES_ENDPOINT, { signal });
  return response.data;
};
