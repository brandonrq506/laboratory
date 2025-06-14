import { useCreateCompletedTodayTask } from "../../features/tasks/api/tanstack/useCreateCompletedTodayTask";
import { useNavigate } from "react-router";

import { NewTaskForm as FormType } from "../../features/tasks/types/newTaskForm";
import { NewTaskForm } from "../../features/tasks/components/NewTaskForm";

import { set } from "date-fns";
import { splitHHMM } from "@/utils";

export const NewTodayCompletedTaskForm = () => {
  const navigate = useNavigate();
  const { mutate } = useCreateCompletedTodayTask();

  const handleSubmit = (data: FormType) => {
    const [startHours, startMinutes] = splitHHMM(data.start_time);
    const [endHours, endMinutes] = splitHHMM(data.end_time);
    const today = new Date();

    const startTime = set(today, {
      hours: startHours,
      minutes: startMinutes,
      seconds: 0,
    });

    const endTime = set(today, {
      hours: endHours,
      minutes: endMinutes,
      seconds: 0,
    });

    mutate({
      activity_id: data.activity!.value,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      status: data.status,
    });

    navigate(-1);
  };

  return (
    <NewTaskForm
      onSubmit={handleSubmit}
      initialValues={{
        activity: null,
        end_time: "00:00",
        start_time: "00:00",
        status: "completed",
      }}
    />
  );
};
