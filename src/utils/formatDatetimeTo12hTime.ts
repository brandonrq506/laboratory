export const formatDatetimeTo12hTime = (datetime: Date | string) => {
  return new Date(datetime).toLocaleTimeString(navigator.languages, {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
};
