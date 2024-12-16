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
import { clsx } from "clsx";
import { displayTableDuration } from "../utils/displayTableDuration";

const displaySortIcon = (column: SortDirection | false, canSort: boolean) => {
  if (!canSort) return null;
  if (column === false)
    return <ChevronUpDownIcon aria-hidden className="size-5 text-gray-400" />;
  if (column === "asc")
    return <ChevronUpIcon aria-hidden className="size-5 text-gray-400" />;
  return <ChevronDownIcon aria-hidden className="size-5 text-gray-400" />;
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
      <input
        value={table.getState().globalFilter}
        onChange={(e) => table.setGlobalFilter(String(e.target.value))}
        placeholder="Search..."
        className="block w-1/3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
      <br />
      <table className="w-full border text-center">
        <thead>
          <tr>
            {table.getFlatHeaders().map((header) => (
              <th key={header.id} className="font-semibold">
                <div
                  className={clsx(
                    header.column.getCanSort() &&
                      "flex cursor-pointer select-none items-center justify-center",
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
        <tbody className="border tabular-nums">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border p-2">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="font-light">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};
