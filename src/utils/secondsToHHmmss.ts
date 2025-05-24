import { secondsInHour, secondsInMinute } from "date-fns/constants";

const PADDING = 2;

export const secondsToHHmmss = (totalSeconds: number) => {
  const sign = totalSeconds < 0 ? "-" : "";
  const secs = Math.abs(totalSeconds);

  const hours = Math.floor(secs / secondsInHour);
  const minutes = Math.floor((secs % secondsInHour) / secondsInMinute);
  const seconds = Math.floor(secs % secondsInMinute);

  const hh = String(hours).padStart(PADDING, "0");
  const mm = String(minutes).padStart(PADDING, "0");
  const ss = String(seconds).padStart(PADDING, "0");

  return `${sign}${hh}:${mm}:${ss}`;
};
