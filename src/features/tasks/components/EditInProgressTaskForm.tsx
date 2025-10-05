import { useNavigate } from "@tanstack/react-router";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import { DirtyFields } from "@/types/core";
import { InProgressFormType } from "../types/inProgressFormType";
import { InProgressTaskAPI } from "../types/inProgressTask";
import { InProgressTaskForm } from "./InProgressTaskForm";
import { adjustInProgressStartTime } from "../utils/adjustInProgressStartTime";
import { floorSeconds } from "@/utils";

type Props = {
  task: InProgressTaskAPI;
};

export const EditInProgressTaskForm = ({ task }: Props) => {
  const navigate = useNavigate();
  const { mutate } = useUpdateTask();

  const handleSubmit = (
    data: InProgressFormType,
    dirtyFields: DirtyFields<InProgressFormType>,
  ) => {
    mutate({
      taskId: task.id,
      task: {
        activity_id: data.activity.value,
        start_time: dirtyFields.start_time
          ? floorSeconds(data.start_time).toISOString()
          : adjustInProgressStartTime(data.start_time).toISOString(),
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
