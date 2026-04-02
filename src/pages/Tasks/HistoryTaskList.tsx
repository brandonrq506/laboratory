import { useSuspenseQuery } from "@tanstack/react-query";

import { CompletedTask, TaskList } from "@/features/tasks/components";
import { getRouteApi } from "@tanstack/react-router";
import { historyTasksQueryOptions } from "@/features/tasks/api/queries";

const routeApi = getRouteApi("/__protected/history");

export const HistoryTaskList = () => {
  const { date } = routeApi.useSearch();
  const { data } = useSuspenseQuery(historyTasksQueryOptions(date));

  return (
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
  );
};
