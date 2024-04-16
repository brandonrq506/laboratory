import { useState } from "react";
import { useInterval } from "./useInterval";

export const useCounter = (delay: number) => {
  const [count, setCount] = useState(0);

  useInterval(() => setCount(count + 1), delay);

  return count;
};
