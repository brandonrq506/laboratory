import { useSuspenseQuery } from "@tanstack/react-query";

import { CompletedTask, TaskList } from "@/features/tasks/components";
import { Link } from "@tanstack/react-router";
import { PlusIcon } from "@heroicons/react/24/solid";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";
import { todayCompletedTasksQueryOptions } from "@/features/tasks/api/queries";

export const TodayCompletedTaskList = () => {
  const { data, isError, refetch } = useSuspenseQuery(
    todayCompletedTasksQueryOptions(),
  );

  if (isError) return <TaskErrorList refetch={refetch} />;

  return (
    <div>
      <SectionHeaderWithAction
        title="Today's Completed Tasks"
        className="pr-2.5"
        action={
          <Link to="/timer/new">
            <span className="sr-only">Add Task</span>
            <PlusIcon className="size-5 text-blue-600" aria-hidden />
          </Link>
        }
      />
      <TaskList
        tasks={data}
        renderItem={(task) => (
          <Link
            key={task.id}
            to="/timer/$taskId/edit"
            params={{ taskId: task.id }}>
            <CompletedTask task={task} />
          </Link>
        )}
      />
    </div>
  );
};
