import { useNavigate } from "react-router";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import { InProgressFormType } from "../types/inProgressFormType";
import { InProgressTaskAPI } from "../types/inProgressTask";
import { InProgressTaskForm } from "./InProgressTaskForm";
import { adjustInProgressStartTime } from "../utils/adjustInProgressStartTime";

type Props = {
  task: InProgressTaskAPI;
};

export const EditInProgressTaskForm = ({ task }: Props) => {
  const navigate = useNavigate();
  const { mutate } = useUpdateTask();

  const handleSubmit = (data: InProgressFormType) => {
    mutate({
      taskId: task.id,
      task: {
        activity_id: data.activity.value,
        start_time: adjustInProgressStartTime(data.start_time).toISOString(),
        note: data.note,
      },
    });
    navigate(-1);
  };

  return (
    <InProgressTaskForm
      initialValues={{
        start_time: task.start_time,
        activity: {
          label: task.activity.display_name,
          value: task.activity.id,
        },
        note: task.note,
      }}
      task={task}
      onSubmit={handleSubmit}
    />
  );
};
