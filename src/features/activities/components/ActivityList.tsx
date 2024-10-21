import { useActivities } from "../api/tanstack/useActivities";

import { Card } from "@/components/layout";
import { DeleteActivity } from "./DeleteActivity";
import { convertSecondsToTime } from "@/utils";

export const ActivityList = () => {
  const { data, isPending, isError } = useActivities();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Card>
      <ul className="divide-y divide-gray-200">
        {data.map((activity) => (
          <li key={activity.id} className="flex gap-4 px-3 py-2">
            <p className="flex-1">{activity.name}</p>
            <p className="flex-1">
              {activity.avg_time === null
                ? "N/A"
                : convertSecondsToTime(activity.avg_time)}
            </p>
            <p className="flex-1">
              {activity.max_time === null
                ? "N/A"
                : convertSecondsToTime(activity.max_time)}
            </p>
            <p className="flex-1">{activity.category.name}</p>
            <DeleteActivity activityId={activity.id} />
          </li>
        ))}
      </ul>
    </Card>
  );
};
