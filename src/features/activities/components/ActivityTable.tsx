import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTable } from "@tanstack/react-table";

import { EmptyState, Loading, SortIcon } from "@/components/core";
import {
  activityTableColumnHelper,
  activityTableFeatures,
} from "../utils/activity-table-features";
import { ActivityActionMenu } from "./ActivityActionMenu";
import { CategoryBadge } from "@/features/categories/components";
import { StateInputText } from "@/components/form";
import { activityListQueryOptions } from "../api/queries";
import { clsx } from "clsx";
import { secondsToHHmm } from "@/utils";

export const ActivityTable = () => {
  const { data, isPending, isSuccess } = useQuery(activityListQueryOptions());

  const activities = useMemo(() => data ?? [], [data]);

  const isEmpty = isSuccess && activities.length === 0;

  const columns = useMemo(
    () =>
      activityTableColumnHelper.columns([
        activityTableColumnHelper.accessor("display_name", {
          header: "Display Name",
          sortFn: "text",
        }),
        activityTableColumnHelper.accessor(
          (row) => secondsToHHmm(row.exp_seconds),
          {
            id: "exp_time",
            header: "Exp. Duration",
            meta: { className: "hidden sm:table-cell" },
            sortFn: "alphanumeric",
          },
        ),
        activityTableColumnHelper.accessor(
          (row) => secondsToHHmm(row.max_seconds),
          {
            id: "max_time",
            header: "Max. Duration",
            meta: { className: "hidden sm:table-cell" },
            sortFn: "alphanumeric",
          },
        ),
        activityTableColumnHelper.accessor("category.name", {
          header: "Category",
          sortFn: "text",
          cell: (props) => (
            <CategoryBadge category={props.row.original.category} />
          ),
        }),
        activityTableColumnHelper.display({
          id: "actions",
          cell: (props) => (
            <div className="flex items-center justify-center">
              <ActivityActionMenu activity={props.row.original} />
            </div>
          ),
        }),
      ]),
    [],
  );

  const table = useTable({
    features: activityTableFeatures,
    columns,
    data: activities,
    globalFilterFn: "includesString",
    enableSortingRemoval: false,
    maxMultiSortColCount: 3,
    initialState: { sorting: [{ id: "display_name", desc: false }] },
  });

  return (
    <div>
      <div className="w-1/2 p-0.5 pb-2">
        <StateInputText
          role="search"
          placeholder="Search..."
          value={table.state.globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
        />
      </div>
      <div className="flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full p-0.5 align-middle">
            <div className="ring-surface-edge overflow-hidden rounded-lg shadow-sm ring-1">
              <table className="divide-input-border min-w-full divide-y">
                <thead className="bg-surface-subtle">
                  <tr>
                    {table.getFlatHeaders().map((header, index) => (
                      <th
                        scope="col"
                        key={header.id}
                        className={clsx(
                          "text-foreground text-left text-sm font-semibold whitespace-nowrap",
                          index === 0 ? "pr-3 pl-4" : "px-2 py-3",
                          header.column.columnDef.meta?.className,
                        )}>
                        <div
                          className={clsx(
                            header.column.getCanSort() &&
                              "flex cursor-pointer items-center select-none",
                          )}
                          onClick={header.column.getToggleSortingHandler()}>
                          <table.FlexRender header={header} />

                          <SortIcon
                            sortDirection={header.column.getIsSorted()}
                            canSort={header.column.getCanSort()}
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-border bg-surface divide-y tabular-nums">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell, index) => (
                        <td
                          key={cell.id}
                          className={clsx(
                            "text-foreground-subtle text-sm whitespace-nowrap",
                            index === 0 ? "pr-3 pl-4" : "px-3 py-2",
                            cell.column.columnDef.meta?.className,
                          )}>
                          <table.FlexRender cell={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                  {isEmpty && (
                    <tr>
                      <th colSpan={columns.length}>
                        <EmptyState />
                      </th>
                    </tr>
                  )}
                  {isPending && (
                    <tr>
                      <th colSpan={columns.length}>
                        <div className="py-10">
                          <Loading sizeStyles="size-10" className="mx-auto" />
                        </div>
                      </th>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
