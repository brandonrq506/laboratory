import { secondsToHHmmss } from "@/utils";
import { useUserPreference } from "@/features/userPreferences/hooks";

import { Stopwatch } from "./Stopwatch";
import { Timer } from "./Timer";
import { TimerTimeTab } from "./TimerTimeTab";

import { USER_PREFERENCE_KEY } from "@/features/userPreferences/types/userPreferenceKeys";

interface Props {
  start_time: string;
  exp_seconds: number;
}

export const TimerTime = ({ start_time, exp_seconds }: Props) => {
  const preference = useUserPreference(USER_PREFERENCE_KEY.SHOW_REMAINING_TIME);
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
