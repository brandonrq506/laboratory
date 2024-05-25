type User = {
  id: number;
  name: string;
  phone: string;
};

const fakeUsers: User[] = [
  { id: 1, name: "Michael Jackson", phone: "1234567890" },
  { id: 2, name: "Michael Jordan", phone: "0987654321" },
  { id: 3, name: "Kevin Durant", phone: "1112223333" },
  { id: 4, name: "Lionel Messi", phone: "4445556666" },
  { id: 5, name: "Roberto Carlos", phone: "7778889999" },
  { id: 6, name: "Julio Cesar", phone: "0001112222" },
  { id: 7, name: "Caligula Hernandez", phone: "3334445555" },
  { id: 8, name: "Comodo Asturias", phone: "6667778888" },
];

const DELAY = 200;
export const getUserByPhone = async (phone: string) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  const user = fakeUsers.find((user) => user.phone === phone);
  if (user) return [user];
  return [];
};
