import type { RoutineWithItems } from "../types/routine-with-items";

import { Card, SectionHeaderWithAction } from "@/components/layout";

import { RoutineCardItem } from "./routine-card-item";
import { calculateTotalExpTime } from "../utils/calculateTotalExpTime";
import { secondsToTime } from "@/utils";

const MAX_VISIBLE_ITEMS = 5;

interface Props {
  routine: RoutineWithItems;
}

export const RoutineCard = ({ routine }: Props) => {
  const totalExpTime = calculateTotalExpTime(routine.routine_items);
  const totalTime = secondsToTime(totalExpTime);

  return (
    <Card className="relative h-full w-full overflow-hidden">
      <SectionHeaderWithAction
        title={routine.name}
        className="gap-x-2"
        action={<div className="text-sm tabular-nums">{totalTime}</div>}
      />

      {routine.routine_items.map((item) => (
        <RoutineCardItem key={item.id} item={item} />
      ))}

      {routine.routine_items.length === 0 && (
        <div className="flex h-20 items-center justify-center">
          <span className="text-sm text-gray-500">No routine items</span>
        </div>
      )}
      {routine.routine_items.length > MAX_VISIBLE_ITEMS && (
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-linear-to-t from-white to-transparent">
          <span className="sr-only">Blurred section</span>
        </div>
      )}
    </Card>
  );
};
