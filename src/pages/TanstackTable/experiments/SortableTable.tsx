import {
  SortDirection,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { DeleteActivity } from "@/features/activities/components";
import { LinkButton } from "@/components/core";
import { activities } from "../helpers/activityData";
import { clsx } from "clsx";
import { convertSecondsToHHMMSS } from "@/utils";

const formatDuration = (avg_time: number | null) => {
  if (avg_time === null) return "N/A";
  return convertSecondsToHHMMSS(avg_time);
};

const displaySortIcon = (column: SortDirection | false, canSort: boolean) => {
  if (!canSort) return null;
  if (column === false)
    return <ChevronUpDownIcon aria-hidden className="size-5 text-gray-400" />;
  if (column === "asc")
    return <ChevronUpIcon aria-hidden className="size-5 text-gray-400" />;
  return <ChevronDownIcon aria-hidden className="size-5 text-gray-400" />;
};

const columnHelper = createColumnHelper<ActivityAPI>();

export const SortableTable = () => {
  const data = useMemo(() => activities, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        sortingFn: "text",
      }),
      columnHelper.accessor((row) => formatDuration(row.avg_time), {
        id: "avg_time",
        header: "Avg. Duration",
      }),
      columnHelper.accessor((row) => formatDuration(row.max_time), {
        id: "max_time",
        header: "Max. Duration",
      }),
      columnHelper.accessor("category.name", {
        header: "Category",
        sortingFn: "text",
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (props) => <DeleteActivity activityId={props.row.original.id} />,
      }),
      columnHelper.display({
        id: "edit",
        header: "Edit",
        cell: (props) => (
          <LinkButton
            variant="secondary"
            to={`/activities/edit/${props.row.original.id}`}>
            <PencilIcon aria-hidden className="size-5" />
          </LinkButton>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable<ActivityAPI>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    maxMultiSortColCount: 3,
  });

  return (
    <div>
      <p className="text-xs font-light text-gray-500">
        Hold <mark>Shift</mark> to apply multi-sort
      </p>
      <table className="w-full border text-center">
        <thead>
          <tr>
            {table.getFlatHeaders().map((header) => (
              <th key={header.id} className="font-semibold">
                <div
                  className={clsx(
                    header.column.getCanSort() &&
                      "flex cursor-pointer items-center justify-center select-none",
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
        </tbody>
      </table>
    </div>
  );
};
