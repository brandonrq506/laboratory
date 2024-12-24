import axios from "axios";

type response = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Props = { signal: AbortSignal };

export const getTodos = async ({ signal }: Props) => {
  const { data } = await axios.get<response[]>(
    "https://jsonplaceholder.typicode.com/todos",
    { signal },
  );

  return data;
};
