import { getRouteApi } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EmptyList } from "@/components/core";
import { SortableRoutineActivityList } from "./SortableRoutineActivityList";
import { routineByIdQueryOptions } from "../api/queries";

import { calculateRoutineActivityStartTime } from "../utils/calculateRoutineActivityStartTime";

const routeApi = getRouteApi("/__protected/routines/$routineId/edit");

export const RoutineActivityList = () => {
  const { routineId } = routeApi.useParams();
  const { data } = useSuspenseQuery(routineByIdQueryOptions(routineId));

  if (!data.routine_items || data.routine_items.length === 0) {
    return <EmptyList title="No activities found" />;
  }

  const activitiesWithExpectedStartTime = calculateRoutineActivityStartTime(
    data.routine_items,
    data.start_time,
  );

  return (
    <SortableRoutineActivityList
      routineId={routineId}
      activities={activitiesWithExpectedStartTime}
    />
  );
};
