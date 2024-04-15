import { useEffect, useState } from "react";
import { Dot } from "@/components/core";

const tenthOfSecond = 1000;

export const Mouse = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [delayedValueOne, setDelayedValueOne] = useState(position);

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDelayedValueOne(position);
    }, tenthOfSecond);
  }, [position]);

  return (
    <div>
      <Dot opacity={1} position={position} />
      <Dot opacity={0.8} position={delayedValueOne} />
    </div>
  );
};
