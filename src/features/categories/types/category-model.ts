import type { BaseEntity } from "@/types/core";
import type { CategoryEditableColumns } from "./category-editable-columns";

export interface CategoryModel extends BaseEntity, CategoryEditableColumns {
  user_id: number;
}
