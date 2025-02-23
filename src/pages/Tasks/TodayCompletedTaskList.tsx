import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { CompletedTask, TaskList } from "@/features/tasks/components";
import { IconButton, Loading } from "@/components/core";
import { CompletedTaskAPI } from "@/features/tasks/types/completedTask";
import { Link } from "react-router";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

export const TodayCompletedTaskList = () => {
  const { data, isPending, isError, refetch } = useTasks({
    status: "completed",
    end_time: "today",
  });

  if (isPending)
    return (
      <div>
        <SectionHeaderWithAction
          title="Today's Completed Tasks"
          className="pr-2.5"
          action={
            <IconButton shape="circle">
              <PlusIcon className="size-5" aria-hidden />
            </IconButton>
          }
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
        action={
          <IconButton shape="circle">
            <PlusIcon className="size-5" aria-hidden />
          </IconButton>
        }
      />
      <TaskList
        tasks={data}
        renderItem={(task) => (
          <Link to={`edit/${task.id}`} key={task.id}>
            <CompletedTask task={task as CompletedTaskAPI} />
          </Link>
        )}
      />
    </div>
  );
};
