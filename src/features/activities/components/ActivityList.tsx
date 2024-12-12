import { useActivities } from "../api/tanstack/useActivities";

import { Card } from "@/components/layout";
import { DeleteActivity } from "./DeleteActivity";
import { LinkButton } from "@/components/core";
import { PencilIcon } from "@heroicons/react/24/outline";
import { convertSecondsToHHMMSS } from "@/utils";

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
            <p className="flex-1 tabular-nums">
              {activity.avg_time === null
                ? "N/A"
                : convertSecondsToHHMMSS(activity.avg_time)}
            </p>
            <p className="flex-1 tabular-nums">
              {activity.max_time === null
                ? "N/A"
                : convertSecondsToHHMMSS(activity.max_time)}
            </p>
            <p className="flex-1">{activity.category.name}</p>
            <DeleteActivity activityId={activity.id} />
            <LinkButton
              variant="secondary"
              to={`/activities/edit/${activity.id}`}>
              <PencilIcon aria-hidden className="size-5" />
            </LinkButton>
          </li>
        ))}
      </ul>
    </Card>
  );
};
