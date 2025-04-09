import { useQuery } from "@tanstack/react-query";

import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { getRoutines } from "../axios/getRoutines";

export const useRoutines = () => {
  return useQuery({
    queryKey: [ROUTINES_ENDPOINT],
    queryFn: getRoutines,
  });
};
