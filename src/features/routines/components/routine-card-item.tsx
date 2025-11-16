import { Badge, RainbowBadge } from "@/components/core";
import type { RoutineItem } from "../types/routine-activity";
import { secondsToTime } from "@/utils";

interface Props {
  item: RoutineItem;
}

// Todo: I don't really like this. What is the cleanest way to handle both routine and activity cases?
export const RoutineCardItem = ({ item }: Props) => {
  return (
    <div className="my-1 flex justify-between">
      <div className="flex items-center gap-x-2">
        {item.type === "activity" ? (
          <>
            <Badge color={item.category_color}>{item.item_name}</Badge>
            <span className="text-xs text-gray-500">{item.category_name}</span>
          </>
        ) : (
          <RainbowBadge>{item.item_name}</RainbowBadge>
        )}
      </div>
      <div>
        <span className="text-xs">{secondsToTime(item.item_exp_seconds)}</span>
      </div>
    </div>
  );
};
