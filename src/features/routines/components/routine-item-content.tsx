import {
  Badge,
  DurationLabel,
  RainbowBadge,
  StartTimeLabel,
} from "@/components/core";
import { DeleteRoutineItem } from "./delete-routine-item";
import { Fragment } from "react/jsx-runtime";

import type { RoutineItemWithExpectedStartTime } from "../types/routine-with-expected-time";

import { ROUTINE_ITEM_TYPE } from "@/features/routines/types/routine-item";

type Props = {
  routineId: number;
  item: RoutineItemWithExpectedStartTime;
};

export const RoutineItemContent = ({ routineId, item }: Props) => {
  return (
    <Fragment>
      <div className="flex grow items-center gap-2">
        {/* I need to find a better way to do this */}
        {item.type === ROUTINE_ITEM_TYPE.ACTIVITY ? (
          <Badge color={item.category_color}>{item.item_name}</Badge>
        ) : (
          <RainbowBadge>{item.item_name}</RainbowBadge>
        )}

        <div className="text-foreground-muted flex gap-2 text-xs">
          <StartTimeLabel date={item.expected_start_time} />
          <DurationLabel seconds={item.item_exp_seconds} />
        </div>
      </div>
      <DeleteRoutineItem itemId={item.id} routineId={routineId} />
    </Fragment>
  );
};
