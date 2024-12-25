import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = { children: React.ReactNode };

export const CommonProviders = ({ children }: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
