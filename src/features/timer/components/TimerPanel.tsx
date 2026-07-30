import { useSuspenseQuery } from "@tanstack/react-query";

import { Card } from "@/components/layout";
import { IdleTimer } from "./IdleTimer";
import type { InProgressTaskAPI } from "@/features/tasks/types/inProgressTask";
import { RunningTimer } from "./RunningTimer";
import { inProgressTasksQueryOptions } from "@/features/tasks/api/queries";

export const TimerPanel = () => {
  const { data } = useSuspenseQuery(inProgressTasksQueryOptions());

  const isIdle = data === undefined || data.length === 0;

  const task = data[0] as InProgressTaskAPI;

  return (
    <Card className="sticky top-16 z-[1] lg:top-4">
      {isIdle && <IdleTimer />}
      {!isIdle && <RunningTimer task={task} />}
    </Card>
  );
};
