import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { EmptyList, Loading } from "@/components/core";
import { SortableRoutineActivityList } from "./SortableRoutineActivityList";
import { routineByIdQueryOptions } from "../api/queries";

export const RoutineActivityList = () => {
  const { routineId } = useParams();
  const routineNumber = Number(routineId);
  const { data, isPending, isError } = useQuery(
    routineByIdQueryOptions(routineNumber),
  );
  const routine_activities = data?.activities;

  if (isPending) {
    return <Loading className="mx-auto" />;
  }

  if (isError) {
    return <div>Error loading routine activities</div>;
  }

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
