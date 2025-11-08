import { set } from "date-fns";

import { floorMilliseconds, splitHHMM } from "@/utils";
import { RoutineActivity } from "../types/routine-activity";
import { RoutineActivityWithExpectedStartTime } from "../types/routine-with-expected-time";

const MS_PER_SECOND = 1000;

const deriveInitialStartTime = (startTime: string | null) => {
  const now = floorMilliseconds(new Date());

  if (!startTime) return now;

  const [hours, minutes] = splitHHMM(startTime);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return now;

  return set(now, {
    hours,
    minutes,
    seconds: 0,
    milliseconds: 0,
  });
};

export const calculateRoutineActivityStartTime = (
  activities: RoutineActivity[],
  start_time: string | null,
): RoutineActivityWithExpectedStartTime[] => {
  if (!activities || activities.length === 0) return [];

  let nextStartTime = deriveInitialStartTime(start_time);

  return activities.map((activity) => {
    const expected_start_time = new Date(nextStartTime);
    const incrementMs =
      activity.activity_exp_seconds > 0
        ? activity.activity_exp_seconds * MS_PER_SECOND
        : 0;

    nextStartTime = new Date(nextStartTime.getTime() + incrementMs);

    return {
      ...activity,
      expected_start_time,
    };
  });
};
