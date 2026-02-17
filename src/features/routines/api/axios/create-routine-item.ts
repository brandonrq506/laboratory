import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";

interface BaseCreateRoutineItemPayload {
  routineId: number;
}

interface CreateRoutineActivityPayload extends BaseCreateRoutineItemPayload {
  activityId: number;
  nestedRoutineId?: never;
}

interface CreateNestedRoutineItemPayload extends BaseCreateRoutineItemPayload {
  nestedRoutineId: number;
  activityId?: never;
}

type CreateRoutineItemPayload =
  | CreateRoutineActivityPayload
  | CreateNestedRoutineItemPayload;

export const createRoutineItem = async (payload: CreateRoutineItemPayload) => {
  const URL = `${ROUTINES_ENDPOINT}/${payload.routineId}/items`;
  const body =
    "activityId" in payload
      ? { activity_id: payload.activityId }
      : { nested_routine_id: payload.nestedRoutineId };

  const response = await apiV1.post(URL, body);

  return response.data;
};
