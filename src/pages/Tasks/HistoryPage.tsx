import { AddTaskButton } from "./AddTaskButton";
import { AdminProtectedContent } from "@/features/user/components";
import { DateFilter } from "@/components/core/Date";
import { ExcelLink } from "./ExcelLink";
import { FilterableTaskList } from "./FilterableTaskList";
import { Outlet } from "@tanstack/react-router";
import { PageHeaderWithActions } from "@/components/layout";

export const HistoryPage = () => {
  return (
    <div>
      <PageHeaderWithActions
        title="Tasks"
        actions={
          <AdminProtectedContent>
            <ExcelLink />
          </AdminProtectedContent>
        }
      />
      <div className="mb-2 flex w-full items-center justify-between">
        <DateFilter label="Date Filter" hideLabel className="w-full" />
        <AddTaskButton />
      </div>
      <FilterableTaskList />
      <Outlet />
    </div>
  );
};
