import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  metaHelper,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";

import type { ActivityTableColumnMeta } from "../types/activity-table-column-meta";
import type { ActivityWithCategory } from "../types/activity-with-category";

export const activityTableFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  columnVisibilityFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { text: sortFn_text, alphanumeric: sortFn_alphanumeric },
  columnMeta: metaHelper<ActivityTableColumnMeta>(),
});

export const activityTableColumnHelper = createColumnHelper<
  typeof activityTableFeatures,
  ActivityWithCategory
>();
