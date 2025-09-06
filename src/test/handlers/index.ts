import { activityHandlers } from "./activity";
import { activityRoutineHandlers } from "./activityRoutine";
import { authHandlers } from "./auth";
import { categoryHandlers } from "./category";
import { routineHandlers } from "./routine";
import { taskHandlers } from "./task";
import { userHandlers } from "./user";

export const handlers = [
  ...activityHandlers,
  ...activityRoutineHandlers,
  ...categoryHandlers,
  ...authHandlers,
  ...routineHandlers,
  ...userHandlers,
  ...taskHandlers,
];
