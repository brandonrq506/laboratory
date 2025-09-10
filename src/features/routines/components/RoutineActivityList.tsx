import { useParams } from "react-router";
import { useRoutine } from "../api/tanstack/useRoutine";

import { EmptyList, Loading } from "@/components/core";
import { SortableRoutineActivityList } from "./SortableRoutineActivityList";

export const RoutineActivityList = () => {
  const { routineId } = useParams();
  const routineNumber = Number(routineId);
  const { data, isPending, isError } = useRoutine(routineNumber);
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
    <div>
      <h2 className="text-lg font-semibold">Routine:</h2>
      <SortableRoutineActivityList
        routineId={routineNumber}
        activities={routine_activities}
      />
    </div>
  );
};
