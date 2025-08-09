import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/layout";
import { IdleTimer } from "./IdleTimer";
import { InProgressTaskAPI } from "@/features/tasks/types/inProgressTask";
import { RunningTimer } from "./RunningTimer";
import { inProgressTaskOptions } from "@/features/tasks/api/queryOptions";

export const TimerPanel = () => {
  const { data } = useQuery(inProgressTaskOptions());

  const status = data === undefined || data.length === 0 ? "idle" : "active";
  const isIdle = status === "idle";
  const isActive = status === "active";

  const task = data?.[0] as InProgressTaskAPI;

  return (
    <Card className="sticky top-16 z-[1] lg:top-4">
      {isIdle && <IdleTimer />}
      {isActive && <RunningTimer task={task} />}
    </Card>
  );
};
