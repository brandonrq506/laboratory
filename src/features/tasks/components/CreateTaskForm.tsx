import { useCreateTask } from "../api/tanstack/useCreateTask";

import type { NewTaskForm as FormType } from "../types/newTaskForm";
import { NewTaskForm } from "./NewTaskForm";

import { parse, startOfToday } from "date-fns";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

type CreateTaskFormProps = {
  date: string;
  onClose: () => void;
};

export const CreateTaskForm = ({
  date: dateParam,
  onClose,
}: CreateTaskFormProps) => {
  const { mutateAsync } = useCreateTask();

  const date = parse(dateParam, "yyyy-MM-dd", startOfToday());

  const handleSubmit = async (data: FormType) => {
    await mutateAsync({
      activity_id: data.activity!.value,
      start_time: data.start_time,
      end_time: data.end_time,
      status: data.status,
      note: data.note,
    });

    onClose();
  };

  return (
    <NewTaskForm
      date={date}
      onSubmit={handleSubmit}
      initialValues={{
        activity: null,
        end_time: date.toISOString(),
        start_time: date.toISOString(),
        status: TASK_STATUS.COMPLETED,
        note: "",
      }}
    />
  );
};
