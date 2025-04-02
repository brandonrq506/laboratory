import { useExcel } from "@/features/excel/api/tanstack/useExcel";
import { useSearchParams } from "react-router";

import { ExcelCategoryHeaders } from "./ExcelCategoryHeaders";
import { ExcelTable } from "@/features/excel/components/ExcelTable";
import { Loading } from "@/components/core";

const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
const today = now.toISOString().split("T")[0];

export const ExcelPageContent = () => {
  const [params] = useSearchParams();

  const date = params.get("date") ?? today;

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
      <ExcelTable excelData={data} />
    </div>
  );
};
