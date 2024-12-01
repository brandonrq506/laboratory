const SECONDS_IN_HOUR = 3600;
const MINUTES_IN_MINUTE = 60;
const SECONDS_IN_DAY = 86400;

const padNumber = (number: number) => {
  const PADDING = 2;
  return number.toString().padStart(PADDING, "0");
};

const displayHours = (hours: number, minutes: number, seconds: number) => {
  if (minutes === 0 && seconds === 0) return `${hours}h`;
  if (minutes !== 0 && seconds === 0) return `${hours}:${padNumber(minutes)}h`;
  return `${hours}:${padNumber(minutes)}:${padNumber(seconds)}h`;
};

const displayMinutes = (minutes: number, seconds: number) => {
  if (seconds === 0) return `${minutes}m`;
  return `${minutes}:${padNumber(seconds)}m`;
};

export const convertSecondsToTime = (seconds: number) => {
  if (seconds < 0) throw new Error("Seconds must be a positive number");
  if (seconds > SECONDS_IN_DAY)
    throw new Error("Seconds must be less than a day");

  const hours = Math.floor(seconds / SECONDS_IN_HOUR);
  const minutes = Math.floor((seconds % SECONDS_IN_HOUR) / MINUTES_IN_MINUTE);
  const remainingSeconds = seconds % MINUTES_IN_MINUTE;

  if (hours >= 1) return displayHours(hours, minutes, remainingSeconds);

  if (minutes >= 1) return displayMinutes(minutes, remainingSeconds);

  return `${remainingSeconds}s`;
};
