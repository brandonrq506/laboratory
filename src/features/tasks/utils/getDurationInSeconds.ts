const MILLIS_IN_SECOND = 1000;

export const getDurationInSeconds = (start: string, end: string) => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  return (endTime - startTime) / MILLIS_IN_SECOND;
};
