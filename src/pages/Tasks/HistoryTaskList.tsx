import { useSuspenseQuery } from "@tanstack/react-query";

import { CompletedTask, TaskList } from "@/features/tasks/components";
import { Link, getRouteApi } from "@tanstack/react-router";
import { CompletedTaskAPI } from "@/features/tasks/types/completedTask";
import { historyTasksQueryOptions } from "@/features/tasks/api/queries";

const routeApi = getRouteApi("/__protected/history");

export const HistoryTaskList = () => {
  const { date } = routeApi.useSearch();
  const { data } = useSuspenseQuery(historyTasksQueryOptions(date));

  return (
    <TaskList
      tasks={data}
      renderItem={(task) => (
        <Link
          key={task.id}
          to="/history/$taskId"
          params={{ taskId: String(task.id) }}
          search={{ date }}>
          <CompletedTask task={task as CompletedTaskAPI} />
        </Link>
      )}
    />
  );
};
