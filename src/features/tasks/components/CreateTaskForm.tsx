import { useCreateTask } from "../api/tanstack/useCreateTask";

import { NewTaskForm as FormType } from "../types/newTaskForm";
import { NewTaskForm } from "./NewTaskForm";

import { parse, set } from "date-fns";
import { getRouteApi } from "@tanstack/react-router";
import { splitHHMM } from "@/utils";

const routeApi = getRouteApi("/__protected/history/new");

export const CreateTaskForm = () => {
  const navigate = routeApi.useNavigate();
  const { date: dateParam } = routeApi.useSearch();
  const { mutateAsync } = useCreateTask();

  const date = parse(dateParam, "yyyy-MM-dd", new Date());

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

    navigate({ from: "/history", search: { date: dateParam } });
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
