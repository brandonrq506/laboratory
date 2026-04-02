import { useNavigateBack } from "@/hooks";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import { NavigateOptions } from "@tanstack/react-router";
import { ScheduledTaskForm } from "./ScheduledTaskForm";

import { localDateToUtc, utcToLocalDate } from "@/utils";

import type { DirtyFields } from "@/types/core";
import type { ScheduleForm } from "../types/schedule-form";
import type { ScheduledTaskAPI } from "../types/scheduledTask";

interface Props {
  task: ScheduledTaskAPI;
  fallbackNavigation: NavigateOptions["to"];
}

export const EditScheduledTaskForm = ({ task, fallbackNavigation }: Props) => {
  const { mutate } = useUpdateTask();
  const navigateBack = useNavigateBack({ fallback: fallbackNavigation });

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

    navigateBack();
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
