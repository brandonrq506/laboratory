import { useStopwatch } from "@/hooks";

import { secondsToHHmmss } from "@/utils";

interface Props {
  start_at: string;
}

export const Stopwatch = ({ start_at }: Props) => {
  const stopWatchSeconds = useStopwatch({ start_at });

  return (
    <div>
      <span>{secondsToHHmmss(stopWatchSeconds)}</span>
    </div>
  );
};
