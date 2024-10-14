import { DefaultOptions, QueryClient } from "@tanstack/react-query";

const options: DefaultOptions = {
  queries: {
    staleTime: 10000,
  },
};

export const queryClient = new QueryClient({ defaultOptions: options });
