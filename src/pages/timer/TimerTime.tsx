import { useEffect, useState } from "react";

import { secondsToHHmmss } from "@/utils";

const DELAY = 1000;
const MILI_TO_SEC = 1000;

const elapsedTime = (start_time: string) => {
  const start = new Date(start_time);
  const now = new Date();
  const elapsed = (now.getTime() - start.getTime()) / MILI_TO_SEC;
  return Math.max(0, elapsed);
};

type Props = {
  start_time: string;
};

export const TimerTime = ({ start_time }: Props) => {
  const [, setTime] = useState(0);
  const elapsedSeconds = elapsedTime(start_time);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((c) => c + 1);
    }, DELAY);
    return () => clearInterval(id);
  }, []);

  return <div>{secondsToHHmmss(elapsedSeconds)}</div>;
};
