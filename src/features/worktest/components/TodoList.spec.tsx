import { render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("TodoList", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  it("shows how many todos there are", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>,
    );

    await screen.findByText("4");
  });
});
