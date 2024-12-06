import { CreateTaskForm } from "@/features/tasks/components";
import { TodayCompletedTaskList } from "../Tasks/TodayCompletedTaskList";
import { TodayScheduledTaskList } from "../Tasks/TodayScheduledTaskList";

export const TimerPage = () => {
  return (
    <div>
      <CreateTaskForm />
      <TodayScheduledTaskList />
      <TodayCompletedTaskList />
    </div>
  );
};
