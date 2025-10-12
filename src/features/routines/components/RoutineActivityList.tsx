import { getRouteApi } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EmptyList } from "@/components/core";
import { SortableRoutineActivityList } from "./SortableRoutineActivityList";
import { routineByIdQueryOptions } from "../api/queries";

const routeApi = getRouteApi("/__protected/routines/$routineId/edit");

export const RoutineActivityList = () => {
  const { routineId } = routeApi.useParams();
  const { data } = useSuspenseQuery(routineByIdQueryOptions(routineId));

  const routineNumber = Number(routineId);

  const routine_activities = data?.activities;

  if (!routine_activities || routine_activities.length === 0) {
    return <EmptyList title="No activities found" />;
  }

  return (
    <SortableRoutineActivityList
      routineId={routineNumber}
      activities={routine_activities}
    />
  );
};
