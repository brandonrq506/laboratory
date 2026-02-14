import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { LogoutButton } from "../LogoutButton";

const mutate = vi.fn();

vi.mock("@/features/auth/api/tanstack/useLogout", () => ({
  useLogout: () => ({ mutate, isPending: false }),
}));

describe("LogoutButton", () => {
  it("calls logout mutation on click", async () => {
    const user = userEvent.setup();
    render(<LogoutButton />);
    const button = screen.getByRole("button", { name: /logout button/i });
    await user.click(button);
    expect(mutate).toHaveBeenCalledTimes(1);
  });
});
