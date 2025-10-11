import { AdminProtectedContent } from "@/features/user/components";
import { DateFilter } from "@/components/core/Date";
import { HistoryLink } from "@/pages/Excel/HistoryLink";
import { PageHeaderWithActions } from "@/components/layout";

import { Outlet, createFileRoute } from "@tanstack/react-router";
import { excelByDateQueryOptions } from "@/features/excel/api/queries";
import { validateDateSearch } from "@/utils/search";

type ExcelSearch = {
  date: string;
};

export const Route = createFileRoute("/__protected/excel")({
  validateSearch: (search): ExcelSearch => {
    return validateDateSearch(search.date as string | undefined);
  },
  loaderDeps: ({ search: { date } }) => ({ date }),
  beforeLoad: ({ context: { queryClient }, search: { date } }) =>
    queryClient.ensureQueryData(excelByDateQueryOptions(date)),
  component: RouteComponent,
});

function RouteComponent() {
  const { date } = Route.useSearch();

  return (
    <div>
      <PageHeaderWithActions
        title="Excel Exporter"
        actions={
          <AdminProtectedContent>
            <HistoryLink />
          </AdminProtectedContent>
        }
      />
      <div className="mb-2 flex w-full items-center justify-between">
        <DateFilter label="Date" hideLabel className="w-full" value={date} />
      </div>
      <Outlet />
    </div>
  );
}
