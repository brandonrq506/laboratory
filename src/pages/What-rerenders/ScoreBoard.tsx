import { useState } from "react";
import { Counter } from "./Counter";
import { Button } from "@/components/core";

export const Scoreboard = () => {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div className="mt-10 text-center align-middle">
      {isPlayerA ? <Counter person="Taylor" /> : <Counter person="Sarah" />}
      <Button
        className="mt-10"
        variant="secondary"
        onClick={() => {
          setIsPlayerA(!isPlayerA);
        }}>
        Next player!
      </Button>
    </div>
  );
};
