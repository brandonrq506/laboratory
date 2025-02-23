import { SortParams } from "@/types/core";
import { TaskApiFilters } from "./taskApiFilters";

// useTasks options like filters and sorting.
export type TaskOptions = {
  filter?: Partial<TaskApiFilters>;
  sort?: Partial<SortParams>;
};
