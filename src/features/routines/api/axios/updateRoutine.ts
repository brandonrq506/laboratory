import type { RoutineWithItems } from "../../types/routine-with-items";

import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";
import { PostRoutineForm } from "../../types/routine-form";

type Props = {
  routine: Partial<PostRoutineForm>;
  routineId: number;
};

export const updateRoutine = async ({ routineId, routine }: Props) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}`;

  const response = await apiV1.patch<RoutineWithItems>(URL, routine);
  return response.data;
};
