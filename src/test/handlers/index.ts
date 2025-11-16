import { activityHandlers } from "./activity";
import { authHandlers } from "./auth";
import { categoryHandlers } from "./category";
import { routineHandlers } from "./routine";
import { routineItemHandlers } from "./routineItem";
import { taskHandlers } from "./task";
import { userHandlers } from "./user";
import { userPreferenceHandlers } from "./userPreference";

export const handlers = [
  ...activityHandlers,
  ...routineItemHandlers,
  ...categoryHandlers,
  ...authHandlers,
  ...routineHandlers,
  ...userHandlers,
  ...taskHandlers,
  ...userPreferenceHandlers,
];
