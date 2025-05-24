import { useTimer } from "@/hooks";

import { clsx } from "clsx";
import { secondsToHHmmss } from "@/utils";

interface Props {
  start_time: string;
  exp_seconds: number;
}

export const TimerTime = ({ start_time, exp_seconds }: Props) => {
  const seconds = useTimer({ start_time, exp_seconds });

  return (
    <div className="flex gap-x-1.5 text-sm">
      <span className={clsx(seconds < 0 && "text-red-800")}>
        {secondsToHHmmss(seconds)}
      </span>
      <p className="font-light text-gray-700">/</p>
      {secondsToHHmmss(exp_seconds)}
    </div>
  );
};
