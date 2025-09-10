import {
  secondsInDay,
  secondsInHour,
  secondsInMinute,
} from "date-fns/constants";

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

export const secondsToTime = (seconds: number) => {
  if (seconds < 0) throw new Error("Seconds must be a positive number");
  if (seconds > secondsInDay)
    throw new Error("Seconds must be less than a day");

  const hours = Math.floor(seconds / secondsInHour);
  const minutes = Math.floor((seconds % secondsInHour) / secondsInMinute);
  const remainingSeconds = Math.floor(seconds % secondsInMinute);

  if (hours >= 1) return displayHours(hours, minutes, remainingSeconds);

  if (minutes >= 1) return displayMinutes(minutes, remainingSeconds);

  return `${remainingSeconds}s`;
};
