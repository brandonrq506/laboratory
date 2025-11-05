import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { EmptyState, Loading, SortIcon } from "@/components/core";
import { ActivityActionMenu } from "./ActivityActionMenu";
import { CategoryBadge } from "@/features/categories/components";
import { StateInputText } from "@/components/form";
import { activityListQueryOptions } from "../api/queries";
import { clsx } from "clsx";
import { secondsToHHmm } from "@/utils";

import type { ActivityWithCategory } from "../types/activity-with-category";

const columnHelper = createColumnHelper<ActivityWithCategory>();

export const ActivityTable = () => {
  // eslint-disable-next-line react-compiler/react-compiler
  "use no memo";
  const { data, isPending, isSuccess } = useQuery(activityListQueryOptions());

  const activities = useMemo(() => data ?? [], [data]);

  const isEmpty = isSuccess && activities.length === 0;

  const columns = useMemo(
    () => [
      columnHelper.accessor("display_name", {
        header: "Display Name",
        sortingFn: "text",
      }),
      columnHelper.accessor((row) => secondsToHHmm(row.exp_seconds), {
        id: "exp_time",
        header: "Exp. Duration",
        meta: { className: "hidden sm:table-cell" },
      }),
      columnHelper.accessor((row) => secondsToHHmm(row.max_seconds), {
        id: "max_time",
        header: "Max. Duration",
        meta: { className: "hidden sm:table-cell" },
      }),
      columnHelper.accessor("category.name", {
        header: "Category",
        sortingFn: "text",
        cell: (props) => (
          <CategoryBadge category={props.row.original.category} />
        ),
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <div className="flex items-center justify-center">
            <ActivityActionMenu activity={props.row.original} />
          </div>
        ),
      }),
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable<ActivityWithCategory>({
    columns,
    data: activities,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
        />
      </div>
      <div className="flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full p-0.5 align-middle">
            <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {table.getFlatHeaders().map((header, index) => (
                      <th
                        scope="col"
                        key={header.id}
                        className={clsx(
                          "text-left text-sm font-semibold whitespace-nowrap text-gray-900",
                          index === 0 ? "pr-3 pl-4" : "px-2 py-3",
                          // TODO: Have to do this until this improves: https://tanstack.com/table/latest/docs/api/core/column-def#meta
                          (
                            header.column.columnDef.meta as {
                              className?: string;
                            }
                          )?.className,
                        )}>
                        <div
                          className={clsx(
                            header.column.getCanSort() &&
                              "flex cursor-pointer items-center select-none",
                          )}
                          onClick={header.column.getToggleSortingHandler()}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                          <SortIcon
                            sortDirection={header.column.getIsSorted()}
                            canSort={header.column.getCanSort()}
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white tabular-nums">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell, index) => (
                        <td
                          key={cell.id}
                          className={clsx(
                            "text-sm whitespace-nowrap text-gray-500",
                            index === 0 ? "pr-3 pl-4" : "px-3 py-2",
                            // TODO: Have to do this until this improves: https://tanstack.com/table/latest/docs/api/core/column-def#meta
                            (
                              cell.column.columnDef.meta as {
                                className?: string;
                              }
                            )?.className,
                          )}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
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
