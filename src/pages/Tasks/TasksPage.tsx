import { DateFilter } from "@/components/core/Date";
import { FilterableTaskList } from "./FilterableTaskList";
import { Outlet } from "react-router";
import { PageHeader } from "@/components/layout";

export const TasksPage = () => {
  return (
    <div>
      <PageHeader title="Tasks" />
      <div className="mb-2 w-2/3 md:w-1/3">
        <DateFilter label="Date Filter" hideLabel className="w-full" />
      </div>
      <FilterableTaskList />
      <Outlet />
    </div>
  );
};
