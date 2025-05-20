export const formatDatetimeTo24hTime = (datetime: string) => {
  return new Date(datetime).toLocaleTimeString(navigator.languages, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};
