export const isInThePast = (value: string) => {
  const startedTime = new Date(value);
  const now = new Date();

  return now.getTime() > startedTime.getTime();
};
