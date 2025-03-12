import { useNavigate } from "react-router";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import { CompletedTaskAPI } from "../types/completedTask";
import { EditForm } from "../types/editForm";
import { InProgressTaskAPI } from "../types/inProgressTast";
import { TaskForm } from "./TaskForm";

type Props = {
  task: CompletedTaskAPI | InProgressTaskAPI;
};

export const EditTaskForm = ({ task }: Props) => {
  const navigate = useNavigate();
  const { mutate } = useUpdateTask();

  const handleSubmit = (data: EditForm) => {
    mutate({
      taskId: task.id,
      task: {
        activity_id: data.activity.value,
        start_time: data.start_time,
        end_time: data.end_time,
      },
    });

    navigate("..");
  };

  return (
    <TaskForm
      task={task}
      onSubmit={handleSubmit}
      initialValues={{
        end_time: task.end_time,
        start_time: task.start_time,
        activity: { label: task.activity.name, value: task.activity.id },
      }}
    />
  );
};
