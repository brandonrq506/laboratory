import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { activities } from "../helpers/activityData";
/*
IMPORTANT NOTES:

- TanStack Table is designed to trigger a re-render whenever either the "data" or "columns" passed into table change.
- Data, Columns, Rows and Cells.
- Code Guides > Column Defs > Grouping Columns. This may be what we need to handle both a desktiop and mobile view.
*/

const columnHelper = createColumnHelper<ActivityAPI>();

export const FirstTableAttempt = () => {
  const data = useMemo(() => activities, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("category.name", {
        header: "Category",
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
      <h2>Very basic table</h2>
      <table>
        <thead></thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>{/* ... */}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
