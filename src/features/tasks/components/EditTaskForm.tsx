import { useNavigate } from "react-router";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import { CompletedTaskAPI } from "../types/completedTask";
import { EditForm } from "../types/editForm";
import { InProgressTaskAPI } from "../types/inProgressTast";
import { TaskForm } from "./TaskForm";

type Props = {
  task: CompletedTaskAPI | InProgressTaskAPI;
};

// TODO: Make this a standalone function with tests and better naming.
const transformISO = (datetime: string) => {
  return datetime.split("T")[1].split(".")[0];
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
        end_time: task.end_time ? transformISO(task.end_time) : null,
        start_time: transformISO(task.start_time),
      }}
    />
  );
};
