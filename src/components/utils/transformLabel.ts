export const transformLabel = (label: string) => {
  return label.toLowerCase().replace(/\s+/g, "_");
};
