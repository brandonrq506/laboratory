import { render, screen, waitFor } from "@/test/test-utils";
import { LogoutButton } from "../LogoutButton";
import { apiV1 } from "@/libs/axios";
import userEvent from "@testing-library/user-event";

const authLogout = vi.fn();
const invalidate = vi.fn();
const navigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigate,
  useRouter: () => ({ invalidate }),
}));

vi.mock("@/features/auth/stores", () => ({
  useAuth: () => ({ logout: authLogout }),
}));

describe("LogoutButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    invalidate.mockResolvedValue(undefined);
    navigate.mockResolvedValue(undefined);
  });

  it("navigates to login even when logout request fails", async () => {
    const user = userEvent.setup();
    vi.spyOn(apiV1, "delete").mockRejectedValueOnce(new Error("offline"));

    render(<LogoutButton />);

    const button = screen.getByRole("button", { name: /logout button/i });

    await user.click(button);

    await waitFor(() => {
      expect(authLogout).toHaveBeenCalledOnce();
      expect(invalidate).toHaveBeenCalledOnce();
      expect(navigate).toHaveBeenCalledWith({ to: "/login" });
    });
  });
});
