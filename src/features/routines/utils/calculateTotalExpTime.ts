import { RoutineActivity } from "../types/routineActivity";

export const calculateTotalExpTime = (routineActivities: RoutineActivity[]) => {
  return routineActivities.reduce((total, activity) => {
    return total + activity.activity_exp_seconds;
  }, 0);
};
