import { EXCEL_ENDPOINT, apiV1 } from "@/libs/axios";
import { ExcelTableRow } from "../../types/excelTableRow";

type Props = {
  signal: AbortSignal;
  date: string;
};

export const getExcel = async ({ signal, date }: Props) => {
  const { data } = await apiV1.get<ExcelTableRow[]>(EXCEL_ENDPOINT, {
    signal,
    params: {
      date,
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  return data;
};
