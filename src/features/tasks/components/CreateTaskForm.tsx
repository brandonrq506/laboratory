import { useCreateTask } from "../api/tanstack/useCreateTask";

import { NewTaskForm as FormType } from "../types/newTaskForm";
import { NewTaskForm } from "./NewTaskForm";

import { parse, set, startOfToday } from "date-fns";
import { splitHHMM } from "@/utils";

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
    const [startHours, startMinutes] = splitHHMM(data.start_time);
    const [endHours, endMinutes] = splitHHMM(data.end_time);

    const startTime = set(date, {
      hours: startHours,
      minutes: startMinutes,
      seconds: 0,
    });

    const endTime = set(date, {
      hours: endHours,
      minutes: endMinutes,
      seconds: 0,
    });

    await mutateAsync({
      activity_id: data.activity!.value,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      status: data.status,
      note: data.note,
    });

    onClose();
  };

  return (
    <NewTaskForm
      onSubmit={handleSubmit}
      initialValues={{
        activity: null,
        end_time: "00:00",
        start_time: "00:00",
        status: "completed",
        note: "",
      }}
    />
  );
};
