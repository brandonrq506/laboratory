import { useParams } from "react-router";
import { useRoutine } from "../api/tanstack/useRoutine";

import { Badge, EmptyList, Loading } from "@/components/core";
import { Card } from "@/components/layout";
import { DeleteActivityRoutine } from "./DeleteActivityRoutine";

import { convertSecondsToTime } from "@/utils";

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
      <h2 className="text-lg font-semibold">Activities</h2>
      <ul>
        {routine_activities.map((routine_activity) => (
          <li key={routine_activity.id} className="my-1">
            <Card className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge color={routine_activity.category_color}>
                  {routine_activity.activity_name}
                </Badge>
                <span className="text-xs">
                  {convertSecondsToTime(routine_activity.activity_avg_time)}
                </span>
              </div>

              <DeleteActivityRoutine
                activityId={routine_activity.id}
                routineId={routineNumber}
              />
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};
