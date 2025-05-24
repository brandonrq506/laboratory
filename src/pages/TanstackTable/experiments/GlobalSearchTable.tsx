import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { DeleteActivity } from "@/features/activities/components";
import { LinkButton } from "@/components/core";
import { PencilIcon } from "@heroicons/react/24/outline";
import { activities } from "../helpers/activityData";
import { secondsToHHmm } from "@/utils";

const columnHelper = createColumnHelper<ActivityAPI>();

export const GlobalSearchTable = () => {
  const data = useMemo(() => activities, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor((row) => secondsToHHmm(row.exp_seconds), {
        id: "exp_time",
        header: "Exp. Duration",
      }),
      columnHelper.accessor((row) => secondsToHHmm(row.max_seconds), {
        id: "max_time",
        header: "Max. Duration",
      }),
      columnHelper.accessor("category.name", {
        header: "Category",
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (props) => <DeleteActivity activity={props.row.original} />,
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
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    initialState: {
      globalFilter: "prod",
    },
  });

  return (
    <div>
      <input
        value={table.getState().globalFilter}
        onChange={(e) => table.setGlobalFilter(String(e.target.value))}
        placeholder="Search..."
        className="block w-1/3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
      <br />
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
