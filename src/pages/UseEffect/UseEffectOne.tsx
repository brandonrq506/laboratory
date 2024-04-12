import { useEffect, useState } from "react";
import { Button } from "@/components/core";

export const UseEffectOne = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect Ran");
  });

  return (
    <div className="mt-16 text-center">
      <h1>Count: {count}</h1>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
    </div>
  );
};
