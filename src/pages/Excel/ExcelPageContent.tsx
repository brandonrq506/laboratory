import { useExcel } from "@/features/excel/api/tanstack/useExcel";
import { useSearchParams } from "react-router";

import { CopyTableButton, ExcelTable } from "@/features/excel/components";
import { ExcelCategoryHeaders } from "./ExcelCategoryHeaders";
import { Loading } from "@/components/core";

export const ExcelPageContent = () => {
  const [params] = useSearchParams();

  const date = params.get("date") ?? "today";

  const { data, isPending, isError } = useExcel({ date });

  if (isPending) {
    return <Loading sizeStyles="size-10" className="mx-auto mt-10" />;
  }

  if (isError) return <div>Error</div>;

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
};
