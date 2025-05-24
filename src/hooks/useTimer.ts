import { useEffect, useState } from "react";

import {
  addSeconds,
  differenceInSeconds,
  parseISO,
  setMilliseconds,
} from "date-fns";
import { millisecondsInSecond } from "date-fns/constants";

interface Props {
  start_time: string;
  exp_seconds: number;
}

export const useTimer = ({ start_time, exp_seconds }: Props) => {
  const [seconds, setSeconds] = useState(() => {
    const start = parseISO(start_time);
    const expectedEnd = addSeconds(start, exp_seconds);
    return differenceInSeconds(expectedEnd, new Date());
  });

  useEffect(() => {
    const tick = () => {
      const start = parseISO(start_time);
      const expectedEnd = addSeconds(start, exp_seconds);
      const now = setMilliseconds(new Date(), 0);
      const diff = differenceInSeconds(expectedEnd, now);
      setSeconds(diff);
    };

    tick();
    const id = setInterval(tick, millisecondsInSecond);
    return () => clearInterval(id);
  }, [start_time, exp_seconds]);

  return seconds;
};
