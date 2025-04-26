const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

export const convertSecondsToHHandMM = (seconds: number) => {
  if (seconds < 0)
    throw new Error(`Seconds must be a positive number. Received: ${seconds}`);

  const hours = Math.floor(seconds / SECONDS_IN_HOUR);
  const minutes = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);

  return { hours, minutes };
};
