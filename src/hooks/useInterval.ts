import { useEffect } from "react";

type UseInterval = (callback: () => void, delay: number) => void;

export const useInterval: UseInterval = (callback, delay) => {
  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
};
