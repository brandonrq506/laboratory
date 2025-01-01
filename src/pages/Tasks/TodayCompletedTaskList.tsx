import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { CompletedTask, TaskList } from "@/features/tasks/components";
import { CompletedTaskAPI } from "@/features/tasks/types/completedTask";
import { IconButton } from "@/components/core";
import { Link } from "react-router";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

const today = new Date().toISOString().split("T")[0];

export const TodayCompletedTaskList = () => {
  const { data, isPending, isError, refetch } = useTasks({
    status: "completed",
    created_at: today,
  });

  if (isPending) return <div>Loading...</div>;

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
