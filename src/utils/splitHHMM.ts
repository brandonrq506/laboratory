const EXPECTED_PARTS = 2;

// HHMM refers to string "14:40" (HH:mm format).
export const splitHHMM = (hhmm: string): [number, number] => {
  const parts = hhmm.split(":").map(Number);
  if (parts.length !== EXPECTED_PARTS) console.error(`Invalid format: ${hhmm}`);

  return [parts[0], parts[1]];
};
