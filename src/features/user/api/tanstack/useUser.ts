import { useQuery } from "@tanstack/react-query";

import { ME_ENDPOINT } from "@/libs/axios";
import { getUser } from "../axios/getUser";

export const useUser = () => {
  return useQuery({
    queryKey: [ME_ENDPOINT],
    queryFn: getUser,
  });
};
