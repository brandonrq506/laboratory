import { useEffect, useState } from "react";

import { convertSecondsToHHMMSS } from "@/utils";

const DELAY = 1000;
const MILI_TO_SEC = 1000;

const elapsedTime = (start_time: string) => {
  const start = new Date(start_time);
  const now = new Date();
  const elapsed = now.getTime() - start.getTime();
  return elapsed / MILI_TO_SEC;
};

type Props = {
  start_time: string;
};

export const TimerTime = ({ start_time }: Props) => {
  const [, setTime] = useState(0);
  const elapsedSeconds = elapsedTime(start_time);

  let formattedTime;
  try {
    formattedTime = convertSecondsToHHMMSS(elapsedSeconds);
  } catch (error) {
    throw new Error(`
      ElapsedSeconds: ${elapsedSeconds}\n
      StartTime: ${start_time}\n
      Now: ${new Date()}\n
      Error: ${error}`);
  }

  useEffect(() => {
    const id = setInterval(() => {
      setTime((c) => c + 1);
    }, DELAY);
    return () => clearInterval(id);
  }, []);

  return <div>{formattedTime}</div>;
};
