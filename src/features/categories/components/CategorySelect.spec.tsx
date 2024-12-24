import { render, screen } from "@testing-library/react";
import { CategorySelect } from "./CategorySelect";
import userEvent from "@testing-library/user-event";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

describe("CategorySelect", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  it("should render with options", async () => {
    const user = userEvent.setup();

    function Test() {
      const { control } = useForm({
        defaultValues: { category: { value: 1, label: "Productive" } },
      });
      return <CategorySelect control={control} name="category" />;
    }

    render(
      <QueryClientProvider client={queryClient}>
        <Test />
      </QueryClientProvider>,
    );

    await user.click(screen.getByRole("button"));

    await user.click(screen.getByRole("option", { name: /productive/i }));

    expect(
      screen.getByRole("option", { name: /productive/i }),
    ).toBeInTheDocument();
  });
});
