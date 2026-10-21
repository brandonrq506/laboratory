import { useNavigate } from "@tanstack/react-router";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import type { DirtyFields } from "@/types/core";
import type { InProgressFormType } from "../types/inProgressFormType";
import type { InProgressTaskAPI } from "../types/inProgressTask";
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

    navigate({ to: "/timer" });
  };

  return (
    <InProgressTaskForm
      initialValues={{
        // Normalize to the "Z" format instantOnTransform emits so dirty-checking compares like with like.
        start_time: new Date(task.start_time).toISOString(),
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
