import { useNavigate } from "@tanstack/react-router";
import { useUpdateTask } from "../api/tanstack/useUpdateTask";

import { EditNoteForm } from "../types/editNoteForm";
import { ScheduledTaskAPI } from "../types/scheduledTask";
import { ScheduledTaskForm } from "./ScheduledTaskForm";

interface Props {
  task: ScheduledTaskAPI;
}

export const EditScheduledTaskForm = ({ task }: Props) => {
  const navigate = useNavigate();
  const { mutate } = useUpdateTask();

  const handleSubmit = (data: EditNoteForm) => {
    mutate({
      taskId: task.id,
      task: { note: data.note },
    });

    navigate({ to: "/timer" });
  };

  return (
    <ScheduledTaskForm
      task={task}
      onSubmit={handleSubmit}
      initialValues={{ note: task.note }}
    />
  );
};
