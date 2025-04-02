import { EXCEL_ENDPOINT, apiV1 } from "@/libs/axios";
import { ExcelTable } from "../../types/excelTable";

type Props = {
  signal: AbortSignal;
  date: string;
};

export const getExcel = async ({ signal, date }: Props) => {
  const { data } = await apiV1.get<ExcelTable[]>(EXCEL_ENDPOINT, {
    signal,
    params: {
      date,
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  return data;
};
