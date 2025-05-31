import { secondsToHHmmss } from "@/utils";
import { useUserPreference } from "@/features/userPreferences/hooks";

import { Stopwatch } from "./Stopwatch";
import { Timer } from "./Timer";
import { TimerTimeTab } from "./TimerTimeTab";

interface Props {
  start_time: string;
  exp_seconds: number;
}

export const TimerTime = ({ start_time, exp_seconds }: Props) => {
  const preference = useUserPreference("show_remaining_time");
  const showRemainingTime = preference?.value === "true";

  return (
    <TimerTimeTab>
      {showRemainingTime ? (
        <Timer start_time={start_time} exp_seconds={exp_seconds} />
      ) : (
        <Stopwatch start_at={start_time} />
      )}
      <span className="font-light text-gray-700">/</span>
      <span className="tabular-nums">{secondsToHHmmss(exp_seconds)}</span>
    </TimerTimeTab>
  );
};
