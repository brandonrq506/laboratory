import {
  SortDirection,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useActivities } from "../api/tanstack/useActivities";
import { useMemo } from "react";

import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { ActivityAPI } from "../types/activityAPI";
import { EmptyState } from "@/components/core/Table/EmptyState";
import { Loading } from "@/components/core";
import { StateInputText } from "@/components/form";
import { clsx } from "clsx";
import { displayTableDuration } from "../utils/displayTableDuration";

const displaySortIcon = (column: SortDirection | false, canSort: boolean) => {
  if (!canSort) return null;
  if (column === false)
    return <ChevronUpDownIcon aria-hidden className="size-5 text-gray-400" />;
  if (column === "asc")
    return (
      <ChevronUpIcon
        aria-hidden
        className="m-1 size-3 stroke-2 text-gray-400"
      />
    );
  return (
    <ChevronDownIcon
      aria-hidden
      className="m-1 size-3 stroke-2 text-gray-400"
    />
  );
};

const columnHelper = createColumnHelper<ActivityAPI>();

export const ActivityTable = () => {
  const { data, isPending, isSuccess } = useActivities();

  const activities = useMemo(() => data ?? [], [data]);

  const isEmpty = isSuccess && activities.length === 0;

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        sortingFn: "text",
      }),
      columnHelper.accessor((row) => displayTableDuration(row.avg_time), {
        id: "avg_time",
        header: "Avg. Duration",
      }),
      columnHelper.accessor((row) => displayTableDuration(row.max_time), {
        id: "max_time",
        header: "Max. Duration",
      }),
      columnHelper.accessor("category.name", {
        header: "Category",
        sortingFn: "text",
      }),
    ],
    [],
  );

  const table = useReactTable<ActivityAPI>({
    columns,
    data: activities,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    enableSortingRemoval: false,
    maxMultiSortColCount: 3,
    initialState: {
      sorting: [
        {
          id: "name",
          desc: false,
        },
      ],
    },
  });

  return (
    <div>
      <div className="w-1/2 p-0.5 pb-2">
        <StateInputText
          value={table.getState().globalFilter}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          placeholder="Search..."
        />
      </div>
      <div className="flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full p-0.5 align-middle">
            <div className="overflow-hidden rounded-lg shadow ring-1 ring-black/5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {table.getFlatHeaders().map((header, index) => (
                      <th
                        scope="col"
                        key={header.id}
                        className={clsx(
                          "whitespace-nowrap text-left text-sm font-semibold text-gray-900",
                          index === 0 ? "pl-4 pr-3" : "px-2 py-3",
                        )}>
                        <div
                          className={clsx(
                            header.column.getCanSort() &&
                              "flex cursor-pointer select-none items-center",
                          )}
                          onClick={header.column.getToggleSortingHandler()}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                          {displaySortIcon(
                            header.column.getIsSorted(),
                            header.column.getCanSort(),
                          )}
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
                            "whitespace-nowrap text-sm text-gray-500",
                            index === 0 ? "pl-4 pr-3" : "px-3 py-2",
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
