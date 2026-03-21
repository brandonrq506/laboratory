import { useNavigate } from "@tanstack/react-router";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import { localDateToUtc, utcToLocalDate } from "@/utils";

import { ScheduleForm } from "../types/schedule-form";
import { ScheduledTaskAPI } from "../types/scheduledTask";
import { ScheduledTaskForm } from "./ScheduledTaskForm";

interface Props {
  task: ScheduledTaskAPI;
}

export const EditScheduledTaskForm = ({ task }: Props) => {
  const navigate = useNavigate();
  const { mutate } = useUpdateTask();

  const handleSubmit = (data: ScheduleForm) => {
    mutate({
      taskId: task.id,
      task: {
        note: data.note,
        scheduled_at: localDateToUtc(data.scheduled_at),
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
