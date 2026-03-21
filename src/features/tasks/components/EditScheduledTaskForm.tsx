import { useNavigate } from "@tanstack/react-router";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import { ScheduledTaskForm } from "./ScheduledTaskForm";

import { localDateToUtc, utcToLocalDate } from "@/utils";

import type { DirtyFields } from "@/types/core";
import type { ScheduleForm } from "../types/schedule-form";
import type { ScheduledTaskAPI } from "../types/scheduledTask";

interface Props {
  task: ScheduledTaskAPI;
}

export const EditScheduledTaskForm = ({ task }: Props) => {
  const navigate = useNavigate();
  const { mutate } = useUpdateTask();

  const handleSubmit = (
    data: ScheduleForm,
    dirtyFields: DirtyFields<ScheduleForm>,
  ) => {
    mutate({
      taskId: task.id,
      task: {
        note: data.note,
        scheduled_at: dirtyFields.scheduled_at
          ? localDateToUtc(data.scheduled_at)
          : task.scheduled_at,
      },
    });

    navigate({ to: "/timer" });
  };

  return (
    <ScheduledTaskForm
      task={task}
      onSubmit={handleSubmit}
      initialValues={{
        note: task.note,
        scheduled_at: utcToLocalDate(task.scheduled_at),
      }}
    />
  );
};
