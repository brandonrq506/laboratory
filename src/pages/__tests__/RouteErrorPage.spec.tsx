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

  it("explains the connection problem without exposing error details", () => {
    render(<RouteErrorPage />);

    expect(
      screen.getByRole("heading", { name: "We couldn't load this page" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/check your internet connection/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/route error/i)).not.toBeInTheDocument();
  });

  it("retries failed route loaders", async () => {
    const user = userEvent.setup();
    render(<RouteErrorPage />);

    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(invalidate).toHaveBeenCalledOnce();
  });
});
