import { useQuery } from "@tanstack/react-query";

import { TASKS_ENDPOINT } from "@/libs/axios";
import { getExcel } from "../axios/getExcel";

type Props = {
  date: string;
};

export const useExcel = ({ date }: Props) => {
  return useQuery({
    queryKey: [TASKS_ENDPOINT, { date }],
    queryFn: getExcel,
  });
};
