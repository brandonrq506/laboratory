import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { RouteErrorPage } from "../RouteErrorPage";

const { invalidate } = vi.hoisted(() => ({
  invalidate: vi.fn(),
}));

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal()),
  useRouter: () => ({ invalidate }),
}));

describe("RouteErrorPage", () => {
  beforeEach(() => {
    invalidate.mockReset();
  });

  it("shows connection guidance for network failures", () => {
    const error = Object.assign(new Error("Network Error"), {
      isAxiosError: true,
      code: "ERR_NETWORK",
    });

    render(<RouteErrorPage error={error} reset={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: "We couldn't connect" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/check your internet connection/i),
    ).toBeInTheDocument();
  });

  it("shows a neutral message for application errors", () => {
    const error = new Error("Sensitive internal details");

    render(<RouteErrorPage error={error} reset={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(error.message)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/check your internet connection/i),
    ).not.toBeInTheDocument();
  });

  it("retries failed route loaders", async () => {
    const user = userEvent.setup();
    render(
      <RouteErrorPage error={new Error("Render failed")} reset={vi.fn()} />,
    );

    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(invalidate).toHaveBeenCalledOnce();
  });
});
