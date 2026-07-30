import { EXCEL_ENDPOINT, apiV1 } from "@/libs/axios";
import type { ExcelTableRow } from "../../types/excelTableRow";
import type { QueryFunctionContext } from "@tanstack/react-query";
import type { excelKeys } from "../queries";

export const getExcel = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof excelKeys)["detail"]>>) => {
  const [{ date }] = queryKey;

  const response = await apiV1.get<ExcelTableRow[]>(EXCEL_ENDPOINT, {
    signal,
    params: {
      date,
    },
  });

  return response.data;
};
