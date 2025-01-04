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
  const { mutateAsync } = useUpdateTask();

  const handleSubmit = async (data: EditForm) => {
    await mutateAsync({
      taskId: task.id,
      task: data,
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
      }}
    />
  );
};
