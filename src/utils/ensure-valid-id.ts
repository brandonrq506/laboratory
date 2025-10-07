export const ensureValidId = (id: string): number => {
  const idNumber = Number(id);
  if (!Number.isInteger(idNumber) || idNumber <= 0) {
    throw new Error(`Invalid ID: ${String(id)}`);
  }
  return idNumber;
};
