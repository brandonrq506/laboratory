import { BaseEntity } from "@/types/core";
import { RoutineActivity } from "./routineActivity";

export interface Routine extends BaseEntity {
  name: string;
  activities: RoutineActivity[];
}
