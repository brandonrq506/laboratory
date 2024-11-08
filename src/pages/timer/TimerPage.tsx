import { CreateTaskForm } from "@/features/tasks/components";
import { TodayScheduledTaskList } from "../Tasks/TodayScheduledTaskList";

export const TimerPage = () => {
  return (
    <div>
      <CreateTaskForm />
      <TodayScheduledTaskList />
    </div>
  );
};
