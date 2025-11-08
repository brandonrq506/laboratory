import type { BaseEntity } from "@/types/core";
import type { RoutineEditableColumns } from "./routine-editable-columns";

export interface RoutineModel extends BaseEntity, RoutineEditableColumns {
  hidden_at: string | null;
  user_id: number;
}
