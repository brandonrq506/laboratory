import { activityHandlers } from "./activity";
import { activityRoutineHandlers } from "./activityRoutine";
import { categoryHandlers } from "./category";
import { routineHandlers } from "./routine";

export const handlers = [
  ...activityHandlers,
  ...activityRoutineHandlers,
  ...categoryHandlers,
  ...routineHandlers,
];
