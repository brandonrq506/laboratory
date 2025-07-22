import { floorSeconds } from "@/utils";

import { endOfDay, min, roundToNearestMinutes } from "date-fns";

export const calculateTimesOnCompletion = (start_time: string) => {
  const startTime = new Date(start_time);

  /*
    endOfDay would return '23:59:59', if roundToNearestMinutes, it would go over to the next day at '00:00:00'.
    So we floor the seconds to ensure it stays within the same day. New Date() does not have this problem since it must be less than '23:59:00' to be selected. Also, at completion we want to round both start and end times.
  */
  const endTime = min([new Date(), floorSeconds(endOfDay(startTime))]);

  return {
    start_time: roundToNearestMinutes(startTime).toISOString(),
    end_time: roundToNearestMinutes(endTime).toISOString(),
  };
};
