import { useNavigateBack } from "@/hooks";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import { CompletedTaskAPI } from "../types/completedTask";
import { CompletedTaskForm } from "./CompletedTaskForm";
import { CompletedTaskFormType } from "../types/completedTaskFormType";
import { NavigateOptions } from "@tanstack/react-router";

type Props = {
  task: CompletedTaskAPI;
  fallbackNavigation: NavigateOptions["to"];
};

export const EditCompletedTaskForm = ({ task, fallbackNavigation }: Props) => {
  const { mutate } = useUpdateTask();
  const navigateBack = useNavigateBack({ fallback: fallbackNavigation });

  const handleSubmit = (data: CompletedTaskFormType) => {
    mutate({
      taskId: task.id,
      task: {
        activity_id: data.activity.value,
        start_time: data.start_time,
        end_time: data.end_time,
        note: data.note,
      },
    });

    navigateBack();
  };

  return (
    <CompletedTaskForm
      task={task}
      onSubmit={handleSubmit}
      initialValues={{
        end_time: task.end_time,
        start_time: task.start_time,
        activity: {
          label: task.activity.display_name,
          value: task.activity.id,
        },
        note: task.note,
      }}
    />
  );
};
