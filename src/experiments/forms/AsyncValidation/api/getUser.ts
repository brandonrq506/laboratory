const existingUsernames = [
  "michael",
  "jordan",
  "kevin",
  "durant",
  "lionel",
  "messi",
  "roberto",
  "carlos",
  "julio",
  "cesar",
  "caligula",
  "hernandez",
  "comodo",
  "asturias",
];

const DELAY = 200;
export const getUser = async (username: string) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  const user = existingUsernames.find((user) => user === username);

  if (user) return [user];
  return [];
};
