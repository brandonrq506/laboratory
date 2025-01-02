export const formatDatetimeTo12hTime = (datetime: string) => {
  return new Date(datetime).toLocaleTimeString(navigator.languages, {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    // Decide if you want to allow seconds to be displayed.
  });
};
