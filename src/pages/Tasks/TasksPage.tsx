import { CategorySelectFilter } from "@/features/categories/components";
import { FilterableTaskList } from "./FilterableTaskList";
import { PageHeader } from "@/components/layout";
import { TaskStatusSelectFilter } from "@/features/tasks/components";

export const TasksPage = () => {
  return (
    <div>
      <PageHeader title="Tasks" />
      <CategorySelectFilter />
      <TaskStatusSelectFilter />
      <FilterableTaskList />
    </div>
  );
};
