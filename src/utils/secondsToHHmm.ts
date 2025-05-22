import { addSeconds, format, startOfToday } from "date-fns";

export const secondsToHHmm = (seconds: number) => {
  if (seconds < 0)
    throw new Error(`Seconds must be a positive number. Received: ${seconds}`);

  const date = addSeconds(startOfToday(), seconds);
  return format(date, "HH:mm");
};
