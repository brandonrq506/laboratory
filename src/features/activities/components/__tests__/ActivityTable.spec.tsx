import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render, screen, waitFor, within } from "@/test/test-utils";
import { ActivityTable } from "../ActivityTable";
import userEvent from "@testing-library/user-event";

import { HttpResponse, http } from "msw";
import { activities } from "@/test/store/activities";
import { activityKeys } from "../../api/queries";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";

describe("ActivityTable", () => {
  it("renders component", async () => {
    render(<ActivityTable />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await screen.findByText("Brush Teeth");

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getByText("Brush Teeth")).toBeInTheDocument();
  });

  it("filters globally", async () => {
    const user = userEvent.setup();

    render(<ActivityTable />);

    await screen.findByText("Brush Teeth");
    await user.type(screen.getByRole("search"), "Produc");

    expect(screen.getByText("Angular")).toBeInTheDocument();
    expect(screen.getByText("Chess")).toBeInTheDocument();

    expect(screen.queryByText("Brush Teeth")).not.toBeInTheDocument();
    expect(screen.queryByText("Cooking")).not.toBeInTheDocument();
    expect(screen.queryByText("Procrastinate")).not.toBeInTheDocument();
  });

  it("clears the global filter", async () => {
    const user = userEvent.setup();

    render(<ActivityTable />);

    await screen.findByText("Brush Teeth");
    await user.type(screen.getByRole("search"), "Produc");
    await user.clear(screen.getByRole("search"));

    expect(screen.getByText("Brush Teeth")).toBeInTheDocument();
    expect(screen.getByText("Procrastinate")).toBeInTheDocument();
  });

  it("applies the current filter to replacement query data", async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <ActivityTable />
      </QueryClientProvider>,
    );

    await screen.findByText("Brush Teeth");
    await user.type(screen.getByRole("search"), "Produc");

    const replacementActivities = activities.filter(
      ({ display_name }) => display_name === "Chess",
    );

    act(() => {
      queryClient.setQueryData(activityKeys.lists(), replacementActivities);
    });

    expect(screen.getByRole("search")).toHaveValue("Produc");
    expect(screen.getByText("Chess")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("Angular")).not.toBeInTheDocument();
    });
  });

  it("keeps responsive columns and row action menus", async () => {
    render(<ActivityTable />);

    await screen.findByText("Brush Teeth");
    const activityRow = screen.getByRole("row", { name: /Brush Teeth/ });

    expect(
      screen.getByRole("columnheader", { name: "Exp. Duration" }),
    ).toHaveClass("hidden", "sm:table-cell");
    expect(
      screen.getByRole("columnheader", { name: "Max. Duration" }),
    ).toHaveClass("hidden", "sm:table-cell");

    const activityCells = within(activityRow).getAllByRole("cell");

    expect(activityCells[1]).toHaveClass("hidden", "sm:table-cell");
    expect(activityCells[2]).toHaveClass("hidden", "sm:table-cell");
    expect(
      within(activityRow).getByRole("button", { name: "Open options" }),
    ).toBeInTheDocument();
  });

  it("renders empty state", async () => {
    const message = "No Records";
    const description = "Get started by creating a new Record";

    server.use(
      http.get(
        apiRoutes.activities,
        () => {
          return HttpResponse.json([], { status: 200 });
        },
        { once: true },
      ),
    );

    render(<ActivityTable />);

    await screen.findByText(message);

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
