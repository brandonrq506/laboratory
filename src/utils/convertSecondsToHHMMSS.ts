const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

const padNumber = (number: number) => {
  const PADDING = 2;
  return number.toString().padStart(PADDING, "0");
};

export const convertSecondsToHHMMSS = (seconds: number) => {
  if (seconds < 0)
    throw new Error(`Seconds must be a positive number. Received: ${seconds}`);

  const hours = Math.floor(seconds / SECONDS_IN_HOUR);
  const minutes = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const remainingSeconds = Math.floor(seconds % SECONDS_IN_MINUTE);

  return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
};
