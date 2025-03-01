import { DateFilter } from "@/components/core/Date";
import { FilterableTaskList } from "./FilterableTaskList";
import { PageHeader } from "@/components/layout";

export const TasksPage = () => {
  return (
    <div>
      <PageHeader title="Tasks" />
      <div className="mb-2 w-1/2 sm:w-1/3 md:w-1/4">
        <DateFilter label="Date Filter" hideLabel />
      </div>
      <FilterableTaskList />
    </div>
  );
};
