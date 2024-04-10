import { Button } from "@/components/core";

export const WhyReactRerendersOne = () => {
  let count = 0;

  const handleIncrement = () => {
    count++;
  };

  return (
    <div className="min-h-screen content-center text-center">
      <h1>Count: {count}</h1>
      <Button onClick={handleIncrement}>Increment</Button>
    </div>
  );
};
