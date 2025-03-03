import { EXCEL_ENDPOINT, apiV1 } from "@/libs/axios";

type ReturnObject = {
  activity: string;
  category: string;
  start_time: string;
  start_minutes: number;
  minutes_duration: number;
  duration: string;
  percentage: number;
  date: string;
};

type Props = {
  signal: AbortSignal;
  date: string;
};

export const getExcel = async ({ signal, date }: Props) => {
  const { data } = await apiV1.get<ReturnObject[]>(EXCEL_ENDPOINT, {
    signal,
    params: {
      date,
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  return data;
};
