import type { ActivityEditableColumns } from "./activity-editable-columns";
import type { BaseEntity } from "@/types/core";

export interface ActivityModel extends BaseEntity, ActivityEditableColumns {
  user_id: number;
}
