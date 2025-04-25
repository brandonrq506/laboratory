const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;

const minutesToSeconds = (minutes: number) => {
  return minutes * SECONDS_IN_MINUTE;
};

const hoursToSeconds = (hours: number) => {
  return hours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
};

export const convertDurationToSeconds = (hours: number, minutes: number) => {
  if (hours === 0 && minutes === 0) return 0;

  if (hours === 0 && minutes > 0) return minutesToSeconds(minutes);

  if (hours > 0 && minutes === 0) return hoursToSeconds(hours);

  return hoursToSeconds(hours) + minutesToSeconds(minutes);
};
