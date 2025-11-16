import { getRouteApi } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EmptyList } from "@/components/core";
import { SortableRoutineItemList } from "./sortable-routine-item-list";
import { routineByIdQueryOptions } from "../api/queries";

import { calculateRoutineItemStartTime } from "../utils/calculateRoutineItemStartTime";

const routeApi = getRouteApi("/__protected/routines/$routineId/edit");

export const RoutineItemList = () => {
  const { routineId } = routeApi.useParams();
  const { data } = useSuspenseQuery(routineByIdQueryOptions(routineId));

  if (!data.routine_items || data.routine_items.length === 0) {
    return <EmptyList title="No routine items found" />;
  }

  const itemsWithExpectedStartTime = calculateRoutineItemStartTime(
    data.routine_items,
    data.start_time,
  );

  return (
    <SortableRoutineItemList
      routineId={routineId}
      items={itemsWithExpectedStartTime}
    />
  );
};
