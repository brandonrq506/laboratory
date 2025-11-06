import { RoutineActivity } from "../types/routine-activity";

export const calculateTotalExpTime = (routineActivities: RoutineActivity[]) => {
  return routineActivities.reduce((total, activity) => {
    return total + activity.activity_exp_seconds;
  }, 0);
};
