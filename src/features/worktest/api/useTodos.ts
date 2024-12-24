import { useQuery } from "@tanstack/react-query";

import { getTodos } from "./getTodos";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};
