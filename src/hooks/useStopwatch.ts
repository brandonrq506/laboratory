import { useEffect, useState } from "react";

import { differenceInSeconds, parseISO, setMilliseconds } from "date-fns";
import { millisecondsInSecond } from "date-fns/constants";

interface Props {
  start_at: string;
}

export const useStopwatch = ({ start_at }: Props) => {
  const [seconds, setSeconds] = useState(() => {
    const start = parseISO(start_at);
    const now = setMilliseconds(new Date(), 0);
    return differenceInSeconds(now, start);
  });

  useEffect(() => {
    const tick = () => {
      const start = parseISO(start_at);
      const now = setMilliseconds(new Date(), 0);
      const diff = differenceInSeconds(now, start);
      setSeconds(diff);
    };

    tick();
    const id = setInterval(tick, millisecondsInSecond);
    return () => clearInterval(id);
  }, [start_at]);

  return seconds;
};
