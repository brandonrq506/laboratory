import { startOfToday } from "date-fns";
import { useNavigate } from "@tanstack/react-router";

import { getNewTaskDefaultTimes } from "@/utils";
import { instantOnTransform } from "@/components/form";

import type { NewTaskForm as FormType } from "@/features/tasks/types/newTaskForm";
import { NewTaskForm } from "@/features/tasks/components/NewTaskForm";
import { useCreateCompletedTodayTask } from "@/features/tasks/api/tanstack/useCreateCompletedTodayTask";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

export const NewTodayCompletedTaskForm = () => {
  const navigate = useNavigate();
  const { mutate } = useCreateCompletedTodayTask();

  const today = startOfToday();
  const defaultTime = instantOnTransform(today).output(
    getNewTaskDefaultTimes(),
  );

  const handleSubmit = (data: FormType) => {
    mutate({
      activity_id: data.activity!.value,
      start_time: data.start_time,
      end_time: data.end_time,
      status: data.status,
      note: data.note,
    });

    navigate({ to: "/timer" });
  };

  return (
    <NewTaskForm
      date={today}
      onSubmit={handleSubmit}
      initialValues={{
        activity: null,
        end_time: defaultTime,
        start_time: defaultTime,
        status: TASK_STATUS.COMPLETED,
        note: "",
      }}
    />
  );
};
