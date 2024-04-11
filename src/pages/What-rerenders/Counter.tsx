import { useState } from "react";
import { Button } from "@/components/core";

type CounterProps = { person: string };

export const Counter = ({ person }: CounterProps) => {
  const [score, setScore] = useState(0);

  return (
    <div>
      <h1>
        {person}'s score: {score}
      </h1>
      <Button size="md" onClick={() => setScore(score + 1)}>
        Add one
      </Button>
    </div>
  );
};
