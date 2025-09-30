import { usePrefetchTask } from "@/features/tasks/api/tanstack/usePrefetchTask";
import { useQuery } from "@tanstack/react-query";

import { CompletedTask, TaskList } from "@/features/tasks/components";
import { AddTaskButton } from "./AddTaskButton";
import { Link } from "react-router";
import { Loading } from "@/components/core";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";
import { todayCompletedTasksQueryOptions } from "@/features/tasks/api/queries";

export const TodayCompletedTaskList = () => {
  const prefetchTask = usePrefetchTask();
  const { data, isPending, isError, refetch } = useQuery(
    todayCompletedTasksQueryOptions(),
  );

  if (isPending)
    return (
      <div>
        <SectionHeaderWithAction
          title="Today's Completed Tasks"
          className="pr-2.5"
          action={<AddTaskButton />}
        />
        <Loading className="mx-auto my-10" sizeStyles="size-10" />
      </div>
    );

  if (isError) return <TaskErrorList refetch={refetch} />;

  return (
    <div>
      <SectionHeaderWithAction
        title="Today's Completed Tasks"
        className="pr-2.5"
        action={<AddTaskButton />}
      />
      <TaskList
        tasks={data}
        renderItem={(task) => (
          <Link
            key={task.id}
            to={`edit/${task.id}`}
            onFocus={() => prefetchTask(task.id)}
            onMouseEnter={() => prefetchTask(task.id)}>
            <CompletedTask task={task} />
          </Link>
        )}
      />
    </div>
  );
};
