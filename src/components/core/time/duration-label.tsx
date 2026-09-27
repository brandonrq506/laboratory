import { ClockIcon } from "@heroicons/react/24/outline";

import { secondsToTime } from "@/utils";

interface Props {
  seconds: number;
}

export const DurationLabel = ({ seconds }: Props) => (
  <div className="flex gap-1">
    <ClockIcon className="size-4" />
    <p className="tabular-nums">{secondsToTime(seconds)}</p>
  </div>
);
