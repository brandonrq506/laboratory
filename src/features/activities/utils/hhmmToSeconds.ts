import { secondsInHour, secondsInMinute } from "date-fns/constants";

type Props = {
  hours: number;
  minutes: number;
};

export const hhmmToSeconds = ({ hours, minutes }: Props) => {
  if (hours < 0 || minutes < 0) {
    throw new Error(`Invalid time: ${hours} hours and ${minutes} minutes`);
  }

  if (hours === 0 && minutes === 0) return 0;

  if (hours === 0) return minutes * secondsInMinute;

  if (minutes === 0) return hours * secondsInHour;

  return hours * secondsInHour + minutes * secondsInMinute;
};
