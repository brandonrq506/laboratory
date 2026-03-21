const localDateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/**
 * Converts a UTC ISO datetime string into a local calendar date string.
 *
 * @param isoString UTC ISO datetime string.
 * @returns Local date formatted as `YYYY-MM-DD`.
 */
export const utcToLocalDate = (isoString: string): string => {
  return localDateFormatter.format(new Date(isoString));
};

/**
 * Converts a local calendar date string into a UTC ISO datetime string.
 *
 * @param dateString Local date formatted as `YYYY-MM-DD`.
 * @returns UTC ISO datetime string for the local date at midnight.
 */
export const localDateToUtc = (dateString: string): string => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).toISOString();
};
