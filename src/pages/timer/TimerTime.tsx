import { useEffect, useMemo, useState } from "react";

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
  const elapsedSeconds = useMemo(() => elapsedTime(start_time), [start_time]);
  const [time, setTime] = useState(elapsedSeconds);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((c) => c + 1);
    }, DELAY);
    return () => clearInterval(id);
  }, []);

  return <div>{convertSecondsToHHMMSS(time)}</div>;
};
