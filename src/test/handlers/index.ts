import { activityHandlers } from "./activity";
import { activityRoutineHandlers } from "./activityRoutine";
import { categoryHandlers } from "./category";
import { routineHandlers } from "./routine";
import { taskHandlers } from "./task";

export const handlers = [
  ...activityHandlers,
  ...activityRoutineHandlers,
  ...categoryHandlers,
  ...routineHandlers,
  ...taskHandlers,
];
