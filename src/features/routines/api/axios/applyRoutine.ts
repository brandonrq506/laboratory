import type { InsertMode } from "@/features/tasks/types/insert-mode";
import type { RoutineWithItems } from "../../types/routine-with-items";

import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";

type ApplyRoutineInput = {
  insertMode: InsertMode;
  routineId: number;
  scheduledAt?: string;
};

export const applyRoutine = async ({
  insertMode,
  routineId,
  scheduledAt,
}: ApplyRoutineInput) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}/apply`;
  const response = await apiV1.post<RoutineWithItems>(URL, {
    insert_mode: insertMode,
    scheduled_at: scheduledAt,
  });
  return response.data;
};
