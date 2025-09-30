import { EXCEL_ENDPOINT, TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { ExcelTableRow } from "../../types/excelTableRow";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getExcel = async ({
  signal,
  queryKey,
}: QueryFunctionContext<[typeof TASKS_ENDPOINT, { date: string }]>) => {
  const [, { date }] = queryKey;

  const response = await apiV1.get<ExcelTableRow[]>(EXCEL_ENDPOINT, {
    signal,
    params: {
      date,
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  return response.data;
};
