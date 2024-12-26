import { EXCEL_ENDPOINT, apiV1 } from "@/libs/axios";

type FormattedActivities = {
  activity: string;
  category: string;
  start_time: string;
  start_minutes: number;
  minutes_duration: number;
  duration: string;
  percent_of_day: number;
};

export const createExcel = async (excel: FormData) => {
  const { data } = await apiV1.post<FormattedActivities[]>(
    EXCEL_ENDPOINT,
    excel,
  );

  return data;
};
