const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

type Props = {
  hours: number;
  minutes: number;
};

export const convertHHandMMtoSeconds = ({ hours, minutes }: Props) => {
  if (hours < 0 || minutes < 0) {
    throw new Error(`Invalid time: ${hours} hours and ${minutes} minutes`);
  }

  if (hours === 0 && minutes === 0) return 0;

  if (hours === 0) return minutes * SECONDS_IN_MINUTE;

  if (minutes === 0) return hours * SECONDS_IN_HOUR;

  return hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE;
};
