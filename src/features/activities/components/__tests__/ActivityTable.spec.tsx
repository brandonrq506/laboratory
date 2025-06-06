import { render, screen } from "@/test/test-utils";
import { ActivityTable } from "../ActivityTable";
import userEvent from "@testing-library/user-event";

import { HttpResponse, http } from "msw";
import { ACTIVITIES_ENDPOINT } from "@/libs/axios";
import { server } from "@/test/server";

const API_URL = import.meta.env.VITE_API_URL;

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

  it("renders empty state", async () => {
    const message = "No Records";
    const description = "Get started by creating a new Record";

    server.use(
      http.get(
        `${API_URL}/v1${ACTIVITIES_ENDPOINT}`,
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
