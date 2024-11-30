import { CategorySelectFilter } from "@/features/categories/components";
import { FilterableTaskList } from "./FilterableTaskList";
import { PageHeader } from "@/components/layout";

export const TasksPage = () => {
  return (
    <div>
      <PageHeader title="Tasks" />
      <CategorySelectFilter />
      <FilterableTaskList />
    </div>
  );
};
