import { useSuspenseQuery } from "@tanstack/react-query";

import {
  CompletedTask,
  PerformanceSummaryCard,
  TaskList,
} from "@/features/tasks/components";
import { getRouteApi } from "@tanstack/react-router";
import { historyTasksQueryOptions } from "@/features/tasks/api/queries";

const routeApi = getRouteApi("/__protected/history");

export const HistoryTaskList = () => {
  const { date } = routeApi.useSearch();
  const { data } = useSuspenseQuery(historyTasksQueryOptions(date));

  return (
    <div className="space-y-3">
      <PerformanceSummaryCard tasks={data} withMessage={false} />
      <TaskList
        tasks={data}
        renderItem={(task) => (
          <CompletedTask
            key={task.id}
            task={task}
            linkProps={{
              to: "/history/$taskId",
              params: { taskId: task.id },
              search: { date },
            }}
          />
        )}
      />
    </div>
  );
};
