import { setMilliseconds, setSeconds } from "date-fns";

export const floorSeconds = (date: Date | string) => {
  return setMilliseconds(setSeconds(date, 0), 0);
};
