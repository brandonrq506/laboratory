import { RoutineActivity } from "../types/routineActivity";

export const calculateTotalAvgTime = (routineActivities: RoutineActivity[]) => {
  return routineActivities.reduce((total, activity) => {
    return total + activity.activity_avg_time;
  }, 0);
};
