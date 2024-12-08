import { Timer } from "./Timer";
import { TodayCompletedTaskList } from "../Tasks/TodayCompletedTaskList";
import { TodayScheduledTaskList } from "../Tasks/TodayScheduledTaskList";

export const TimerPage = () => {
  return (
    <div>
      <Timer />
      <br />
      <div className="grid gap-5 md:grid-cols-2">
        <TodayScheduledTaskList />
        <TodayCompletedTaskList />
      </div>
    </div>
  );
};
