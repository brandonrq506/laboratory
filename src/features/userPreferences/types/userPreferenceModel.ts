import { BaseEntity } from "@/types/core";

export interface UserPreferenceModel extends BaseEntity {
  user_id: number;
  value: string;
  preference_id: number;
}
