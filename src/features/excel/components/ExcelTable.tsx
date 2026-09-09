import type { ExcelTableRow } from "../types/excelTableRow";

type Props = {
  excelData: ExcelTableRow[];
};

export const ExcelTable = ({ excelData }: Props) => {
  return (
    <div className="mt-4 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-2 lg:-mx-4">
        <div className="inline-block min-w-full py-2 align-middle sm:px-2 lg:px-4">
          <div className="ring-surface-edge overflow-hidden shadow ring-1 sm:rounded-lg">
            <table className="divide-input-border min-w-full divide-y">
              <thead className="bg-surface-subtle">
                <tr>
                  <th
                    scope="col"
                    className="text-foreground py-3.5 pr-3 pl-4 text-left text-sm font-semibold sm:pl-6">
                    Activity
                  </th>
                  <th
                    scope="col"
                    className="text-foreground px-3 py-3.5 text-left text-sm font-semibold">
                    Base Activity
                  </th>
                  <th
                    scope="col"
                    className="text-foreground px-3 py-3.5 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th
                    scope="col"
                    className="text-foreground px-3 py-3.5 text-left text-sm font-semibold">
                    Time
                  </th>
                  <th
                    scope="col"
                    className="text-foreground px-3 py-3.5 text-left text-sm font-semibold">
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="text-foreground px-3 py-3.5 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th
                    scope="col"
                    className="text-foreground px-3 py-3.5 text-left text-sm font-semibold">
                    % of day
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border bg-surface divide-y">
                {excelData.map((row) => (
                  <tr key={row.start_time}>
                    <td className="text-foreground-subtle px-3 py-4 text-sm whitespace-nowrap">
                      {row.activity}
                    </td>
                    <td className="text-foreground-subtle px-3 py-4 text-sm whitespace-nowrap">
                      {row.activity}
                    </td>
                    <td className="text-foreground-subtle px-3 py-4 text-sm whitespace-nowrap">
                      {row.category}
                    </td>
                    <td className="text-foreground-subtle px-3 py-4 text-sm whitespace-nowrap">
                      {row.start_time}
                    </td>
                    <td className="text-foreground-subtle px-3 py-4 text-sm whitespace-nowrap">
                      {row.duration}
                    </td>
                    <td className="text-foreground-subtle px-3 py-4 text-sm whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="text-foreground-subtle px-3 py-4 text-sm whitespace-nowrap">
                      {row.percentage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
