import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { DeleteActivity } from "@/features/activities/components";
import { LinkButton } from "@/components/core";
import { PencilIcon } from "@heroicons/react/24/outline";
import { activities } from "../helpers/activityData";
import { convertSecondsToHHMMSS } from "@/utils";

const formatDuration = (avg_time: number | null) => {
  if (avg_time === null) return "N/A";
  return convertSecondsToHHMMSS(avg_time);
};

const columnHelper = createColumnHelper<ActivityAPI>();

export const SortableTable = () => {
  const data = useMemo(() => activities, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
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
  });

  return (
    <div>
      <table className="w-full border text-center">
        <thead>
          <tr>
            {table.getFlatHeaders().map((header) => (
              <th key={header.id} className="font-semibold">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
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
