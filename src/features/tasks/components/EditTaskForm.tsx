import { useNavigate } from "react-router";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import { CompletedTaskAPI } from "../types/completedTask";
import { EditForm } from "../types/editForm";
import { InProgressTaskAPI } from "../types/inProgressTask";
import { TaskForm } from "./TaskForm";
import { floorSeconds } from "@/utils";

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
        start_time: floorSeconds(data.start_time).toISOString(),
        end_time: data.end_time,
      },
    });

    navigate(-1);
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
