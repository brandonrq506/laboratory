import { Outlet } from "react-router";
import { ScheduledTaskList } from "../Tasks/ScheduledTaskList";
import { Timer } from "./Timer";
import { TodayCompletedTaskList } from "../Tasks/TodayCompletedTaskList";

export const TimerPage = () => {
  return (
    <div>
      <Timer />
      <br />
      <div className="grid gap-5 md:grid-cols-2">
        <ScheduledTaskList />
        <TodayCompletedTaskList />
      </div>
      <Outlet />
    </div>
  );
};
