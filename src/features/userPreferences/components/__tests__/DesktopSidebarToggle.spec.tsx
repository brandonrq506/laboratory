import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { DesktopSidebarToggle } from "../DesktopSidebarToggle";

// Mock the hooks
vi.mock("../../hooks", () => ({
  useUserPreference: vi.fn(),
}));

vi.mock("../../api/tanstack/useUpdateUserPreference", () => ({
  useUpdateUserPreference: vi.fn(),
}));

import { useUpdateUserPreference } from "../../api/tanstack/useUpdateUserPreference";
import { useUserPreference } from "../../hooks";

import { USER_PREFERENCE_KEY } from "@/features/userPreferences/types/userPreferenceKeys";

const mockUseUserPreference = vi.mocked(useUserPreference);
const mockUseUpdateUserPreference = vi.mocked(useUpdateUserPreference);

describe("DesktopSidebarToggle", () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error - Partial mock for testing
    mockUseUpdateUserPreference.mockReturnValue({
      mutate: mockMutate,
    });
  });

  it("renders collapse button when sidebar is open", () => {
    mockUseUserPreference.mockReturnValue({
      preference_id: 3,
      key: USER_PREFERENCE_KEY.SIDEBAR_OPEN,
      value: "true",
    });

    render(<DesktopSidebarToggle />);

    expect(screen.getByTitle("Collapse sidebar")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders expand button when sidebar is closed", () => {
    mockUseUserPreference.mockReturnValue({
      preference_id: 3,
      key: USER_PREFERENCE_KEY.SIDEBAR_OPEN,
      value: "false",
    });

    render(<DesktopSidebarToggle />);

    expect(screen.getByTitle("Expand sidebar")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls mutate with correct parameters when toggling from open to closed", async () => {
    const user = userEvent.setup();
    mockUseUserPreference.mockReturnValue({
      preference_id: 3,
      key: USER_PREFERENCE_KEY.SIDEBAR_OPEN,
      value: "true",
    });

    render(<DesktopSidebarToggle />);

    const button = screen.getByTitle("Collapse sidebar");
    await user.click(button);

    expect(mockMutate).toHaveBeenCalledWith({
      key: USER_PREFERENCE_KEY.SIDEBAR_OPEN,
      value: "false",
    });
  });

  it("calls mutate with correct parameters when toggling from closed to open", async () => {
    const user = userEvent.setup();
    mockUseUserPreference.mockReturnValue({
      preference_id: 3,
      key: USER_PREFERENCE_KEY.SIDEBAR_OPEN,
      value: "false",
    });

    render(<DesktopSidebarToggle />);

    const button = screen.getByTitle("Expand sidebar");
    await user.click(button);

    expect(mockMutate).toHaveBeenCalledWith({
      key: USER_PREFERENCE_KEY.SIDEBAR_OPEN,
      value: "true",
    });
  });

  it("returns null when user preference is undefined", () => {
    mockUseUserPreference.mockReturnValue(undefined);

    render(<DesktopSidebarToggle />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
