import { useParams } from "react-router";
import { useRoutine } from "../api/tanstack/useRoutine";

import { Badge, EmptyList, Loading } from "@/components/core";
import { Card } from "@/components/layout";

import { convertSecondsToTime } from "@/utils";

export const RoutineActivityList = () => {
  const { routineId } = useParams();
  const { data, isPending, isError } = useRoutine(Number(routineId));
  const activities = data?.activities;

  if (isPending) {
    return <Loading className="mx-auto" />;
  }

  if (isError) {
    return <div>Error loading routine activities</div>;
  }

  if (!activities || activities.length === 0) {
    return <EmptyList title="No activities found" />;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="my-1">
            <Card className="flex items-center gap-2">
              <Badge color={activity.category_color}>{activity.name}</Badge>
              <span className="text-xs">
                {convertSecondsToTime(activity.avg_time)}
              </span>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};
