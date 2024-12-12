const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

export const convertTimeToSeconds = (time: string) => {
  if (time === "") throw new Error("Time cannot be empty");

  if (time === "00:00") throw new Error("Time cannot be 00:00");

  if (!time.includes(":")) throw new Error("Time must be in the format HH:MM");

  if (/[a-zA-Z]/.test(time)) throw new Error("Time cannot contain letters");

  const [hours, minutes] = time.split(":");

  const hoursInSeconds = parseInt(hours) * SECONDS_IN_HOUR;
  const minutesInSeconds = parseInt(minutes) * SECONDS_IN_MINUTE;

  return hoursInSeconds + minutesInSeconds;
};
