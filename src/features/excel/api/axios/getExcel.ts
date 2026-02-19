import { EXCEL_ENDPOINT, apiV1 } from "@/libs/axios";
import { ExcelTableRow } from "../../types/excelTableRow";
import { QueryFunctionContext } from "@tanstack/react-query";
import { excelKeys } from "../queries";

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
