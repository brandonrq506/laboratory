import { useTimer } from "@/hooks";

import clsx from "clsx";
import { secondsToHHmmss } from "@/utils";

interface Props {
  start_time: string;
  exp_seconds: number;
}

export const Timer = ({ start_time, exp_seconds }: Props) => {
  const seconds = useTimer({ start_time, exp_seconds });

  return (
    <span className={clsx(seconds < 0 && "text-red-800")}>
      {secondsToHHmmss(seconds)}
    </span>
  );
};
