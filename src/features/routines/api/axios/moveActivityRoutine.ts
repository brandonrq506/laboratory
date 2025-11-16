import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { RoutineItem } from "../../types/routine-activity";

interface Props {
  routine_id: number;
  routine_item_id: number;
  new_position: number;
  // This is not used, it is just for optimistic UI update.
  routine_items: RoutineItem[];
}

export const moveActivityRoutine = async ({
  routine_item_id,
  new_position,
  routine_id,
}: Props) => {
  const URL = `${ROUTINES_ENDPOINT}/${routine_id}/items/move_drag`;
  const response = await apiV1.patch(URL, {
    routine_item_id,
    new_position,
  });
  return response.data;
};
