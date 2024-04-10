import { useState } from "react";
import { Button } from "@/components/core";

export const WhyReactRerendersTwo = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="min-h-screen content-center text-center">
      <h1>Count: {count}</h1>
      <Button onClick={handleIncrement}>Increment</Button>
    </div>
  );
};
