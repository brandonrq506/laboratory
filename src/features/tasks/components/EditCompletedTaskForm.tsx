import { useNavigate } from "react-router";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import { CompletedTaskAPI } from "../types/completedTask";
import { CompletedTaskForm } from "./CompletedTaskForm";
import { CompletedTaskFormType } from "../types/completedTaskFormType";

type Props = {
  task: CompletedTaskAPI;
};

export const EditCompletedTaskForm = ({ task }: Props) => {
  const navigate = useNavigate();
  const { mutate } = useUpdateTask();

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

    navigate(-1);
  };

  return (
    <CompletedTaskForm
      task={task}
      onSubmit={handleSubmit}
      initialValues={{
        end_time: task.end_time,
        start_time: task.start_time,
        activity: { label: task.activity.name, value: task.activity.id },
        note: task.note,
      }}
    />
  );
};
