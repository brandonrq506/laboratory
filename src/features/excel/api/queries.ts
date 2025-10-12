import { TASKS_ENDPOINT } from "@/libs/axios";
import { queryOptions } from "@tanstack/react-query";

import { getExcel } from "./axios/getExcel";

export const excelKeys = {
  all: [{ feature: TASKS_ENDPOINT }] as const,
  details: () => [{ ...excelKeys.all[0], entity: "details" }] as const,
  detail: (date: string) => [{ ...excelKeys.details()[0], date }] as const,
};

export const excelByDateQueryOptions = (date: string) => {
  return queryOptions({
    queryKey: excelKeys.detail(date),
    queryFn: getExcel,
  });
};
