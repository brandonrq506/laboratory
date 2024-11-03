import { CategorySelectFilter } from "@/features/categories/components";
import { FilterableTaskList } from "./FilterableTaskList";

export const TasksPage = () => {
  return (
    <div>
      <h1>Tasks</h1>
      <CategorySelectFilter />
      <FilterableTaskList />
    </div>
  );
};
