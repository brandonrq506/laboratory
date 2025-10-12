import { CopyTableButton, ExcelTable } from "@/features/excel/components";
import { ExcelCategoryHeaders } from "@/pages/Excel/ExcelCategoryHeaders";
import { createFileRoute } from "@tanstack/react-router";
import { excelByDateQueryOptions } from "@/features/excel/api/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/__protected/excel/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { date } = Route.useSearch();
  const { data } = useSuspenseQuery(excelByDateQueryOptions(date));

  if (data.length === 0)
    return (
      <div className="my-20 text-center">
        <p className="font-light">No data found</p>
      </div>
    );

  return (
    <div>
      <ExcelCategoryHeaders excelData={data} />
      <CopyTableButton data={data} />
      <ExcelTable excelData={data} />
    </div>
  );
}
