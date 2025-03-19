import { usePrefetchTask } from "@/features/tasks/api/tanstack/usePrefetchTask";
import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { CompletedTask, TaskList } from "@/features/tasks/components";
import { CompletedTaskAPI } from "@/features/tasks/types/completedTask";
import { Link } from "react-router";
import { Loading } from "@/components/core";
import { SectionHeader } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

export const TodayCompletedTaskList = () => {
  const prefetchTask = usePrefetchTask();
  const { data, isPending, isError, refetch } = useTasks({
    filter: { status: "completed", start_time: "today" },
    sort: { sort_by: "start_time", sort_order: "desc" },
  });

  if (isPending)
    return (
      <div>
        <SectionHeader title="Today's Completed Tasks" className="pr-2.5" />
        <Loading className="mx-auto my-10" sizeStyles="size-10" />
      </div>
    );

  if (isError) return <TaskErrorList refetch={refetch} />;

  return (
    <div>
      <SectionHeader title="Today's Completed Tasks" className="pr-2.5" />
      <TaskList
        tasks={data}
        renderItem={(task) => (
          <Link
            key={task.id}
            to={`edit/${task.id}`}
            onFocus={() => prefetchTask(task.id)}
            onMouseEnter={() => prefetchTask(task.id)}>
            <CompletedTask task={task as CompletedTaskAPI} />
          </Link>
        )}
      />
    </div>
  );
};
