import { Badge, RainbowBadge } from "@/components/core";
import { ClockIcon } from "@heroicons/react/24/outline";
import { DeleteRoutineItem } from "./delete-routine-item";
import { Fragment } from "react/jsx-runtime";

import { formatDatetimeTo12hTime, secondsToTime } from "@/utils";

import type { RoutineItemWithExpectedStartTime } from "../types/routine-with-expected-time";

type Props = {
  routineId: number;
  item: RoutineItemWithExpectedStartTime;
};

export const RoutineItemContent = ({ routineId, item }: Props) => {
  return (
    <Fragment>
      <div className="flex grow items-center gap-2">
        {/* I need to find a better way to do this */}
        {item.type === "activity" ? (
          <Badge color={item.category_color}>{item.item_name}</Badge>
        ) : (
          <RainbowBadge>{item.item_name}</RainbowBadge>
        )}

        <div className="flex gap-2 text-gray-600">
          <div className="flex gap-1 text-xs">
            <p className="tabular-nums">
              {formatDatetimeTo12hTime(item.expected_start_time.toISOString())}
            </p>
          </div>
          <div className="flex gap-1 text-xs">
            <ClockIcon className="size-4" />
            <p className="tabular-nums">
              {secondsToTime(item.item_exp_seconds)}
            </p>
          </div>
        </div>
      </div>
      <DeleteRoutineItem itemId={item.id} routineId={routineId} />
    </Fragment>
  );
};
