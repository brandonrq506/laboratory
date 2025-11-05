import { ACTIVITIES_ENDPOINT, ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";
import { RoutineActivity } from "../../types/routine-activity";

interface Props {
  routine_id: number;
  activity_routine_id: number;
  new_position: number;
  // This is not used, it is just for optimistic UI update.
  activities: RoutineActivity[];
}

export const MoveActivityRoutine = async ({
  activity_routine_id,
  new_position,
  routine_id,
}: Props) => {
  const URL = `${ROUTINES_ENDPOINT}/${routine_id}${ACTIVITIES_ENDPOINT}/move_drag`;
  const response = await apiV1.patch(URL, {
    activity_routine_id,
    new_position,
  });
  return response.data;
};
