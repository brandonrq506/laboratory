import { AdminProtectedContent } from "@/features/user/components";
import { DateFilter } from "@/components/core/Date";
import { ExcelLink } from "./ExcelLink";
import { FilterableTaskList } from "./FilterableTaskList";
import { Outlet } from "react-router";
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
      <div className="mb-2 w-2/3 md:w-1/3">
        <DateFilter label="Date Filter" hideLabel className="w-full" />
      </div>
      <FilterableTaskList />
      <Outlet />
    </div>
  );
};
