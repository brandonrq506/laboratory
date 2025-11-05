import type { BaseEntity } from "@/types/core";
import type { RoutineEditableColumns } from "./routine-editable-columns";

export interface RoutineModel extends BaseEntity, RoutineEditableColumns {
  user_id: number;
}
