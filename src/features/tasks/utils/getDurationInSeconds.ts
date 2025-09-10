import { millisecondsInSecond } from "date-fns/constants";

export const getDurationInSeconds = (start: string, end: string) => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  return (endTime - startTime) / millisecondsInSecond;
};
