import { useCounter } from "@/hooks";

const ONE_SECOND = 1000;

export const Counter = () => {
  const count = useCounter(ONE_SECOND);

  return <div className="mt-16 text-center text-4xl">{count}</div>;
};
