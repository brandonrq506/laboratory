export const floorMilliseconds = (date: Date) => {
  date.setMilliseconds(0);
  return date;
};
