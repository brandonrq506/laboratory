import { BaseEntity } from "@/types/core";
import { RoutineActivity } from "./routineActivity";

export interface Routine extends BaseEntity {
  activities: RoutineActivity[];
  hidden_at: string | null;
  name: string;
  user_id: number;
}
