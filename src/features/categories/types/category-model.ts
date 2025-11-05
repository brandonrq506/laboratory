import type { BaseEntity } from "@/types/core";

export interface CategoryModel extends BaseEntity {
  color: string;
  name: string;
  user_id: number;
}
