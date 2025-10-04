import { DefaultOptions, QueryClient } from "@tanstack/react-query";
import { millisecondsInMinute } from "date-fns/constants";

const options: DefaultOptions = {
  queries: {
    staleTime: millisecondsInMinute,
  },
};

export const queryClient = new QueryClient({ defaultOptions: options });
