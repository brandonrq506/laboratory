export const formatUsername = (firstName: string, lastName: string | null) => {
  if (!firstName && !lastName) {
    return "Unknown User";
  }

  if (!lastName) {
    return firstName;
  }

  return `${firstName} ${lastName}`;
};
