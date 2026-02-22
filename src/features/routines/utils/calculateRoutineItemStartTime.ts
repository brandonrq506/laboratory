import { set } from "date-fns";

import { floorMilliseconds, splitHHMM } from "@/utils";
import type { RoutineItem } from "../types/routine-item";
import type { RoutineItemWithExpectedStartTime } from "../types/routine-with-expected-time";

import { millisecondsInSecond } from "date-fns/constants";

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

const getDurationIncrementMs = (item: RoutineItem) => {
  const durationSeconds = Math.max(0, item.item_exp_seconds ?? 0);
  return durationSeconds * millisecondsInSecond;
};

export const calculateRoutineItemStartTime = (
  routineItems: RoutineItem[],
  start_time: string | null,
): RoutineItemWithExpectedStartTime[] => {
  if (!routineItems || routineItems.length === 0) return [];

  let nextStartTime = deriveInitialStartTime(start_time);

  return routineItems.map((item) => {
    const expected_start_time = new Date(nextStartTime);
    const incrementMs = getDurationIncrementMs(item);

    nextStartTime = new Date(nextStartTime.getTime() + incrementMs);

    return {
      ...item,
      expected_start_time,
    };
  });
};
