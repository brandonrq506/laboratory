import { secondsInHour, secondsInMinute } from "date-fns/constants";

export const convertSecondsToHHandMM = (seconds: number) => {
  if (seconds < 0)
    throw new Error(`Seconds must be a positive number. Received: ${seconds}`);

  const hours = Math.floor(seconds / secondsInHour);
  const minutes = Math.floor((seconds % secondsInHour) / secondsInMinute);

  return { hours, minutes };
};
