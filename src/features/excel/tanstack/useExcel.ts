import { useQuery } from "@tanstack/react-query";

import { EXCEL_ENDPOINT } from "@/libs/axios";
import { getExcel } from "../axios/getExcel";

type Props = {
  date: string;
};

export const useExcel = ({ date }: Props) => {
  return useQuery({
    queryKey: [EXCEL_ENDPOINT, { date }],
    queryFn: ({ signal }) => getExcel({ signal, date }),
  });
};
