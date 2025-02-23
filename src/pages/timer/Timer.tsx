import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { Card } from "@/components/layout";
import { IdleTimer } from "./IdleTimer";
import { InProgressTaskAPI } from "@/features/tasks/types/inProgressTast";
import { RunningTimer } from "./RunningTimer";

export const Timer = () => {
  const { data } = useTasks({
    filter: { status: "in_progress" },
  });

  const status = data === undefined || data.length === 0 ? "idle" : "active";
  const isIdle = status === "idle";
  const isActive = status === "active";

  const task = data?.[0] as InProgressTaskAPI;

  return (
    <Card>
      {isIdle && <IdleTimer />}
      {isActive && <RunningTimer task={task} />}
    </Card>
  );
};
