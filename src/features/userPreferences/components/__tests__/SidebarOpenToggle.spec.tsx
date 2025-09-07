import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { SidebarOpenToggle } from "../SidebarOpenToggle";

// Mock the hooks
vi.mock("../../hooks", () => ({
  useUserPreference: vi.fn(),
}));

vi.mock("../../api/tanstack/useUpdateUserPreference", () => ({
  useUpdateUserPreference: vi.fn(),
}));

import { useUpdateUserPreference } from "../../api/tanstack/useUpdateUserPreference";
import { useUserPreference } from "../../hooks";

const mockUseUserPreference = vi.mocked(useUserPreference);
const mockUseUpdateUserPreference = vi.mocked(useUpdateUserPreference);

describe("SidebarOpenToggle", () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error - Partial mock for testing
    mockUseUpdateUserPreference.mockReturnValue({
      mutate: mockMutate,
    });
  });

  it("renders toggle with correct initial state (true)", () => {
    mockUseUserPreference.mockReturnValue({
      preference_id: 3,
      key: "sidebar_open",
      value: "true",
    });

    render(<SidebarOpenToggle />);

    const toggle = screen.getByRole("switch");
    expect(toggle).toBeChecked();
    expect(screen.getByText("Sidebar Open")).toBeInTheDocument();
    expect(
      screen.getByText("Display sidebar icons and text labels"),
    ).toBeInTheDocument();
  });

  it("renders toggle with correct initial state (false)", () => {
    mockUseUserPreference.mockReturnValue({
      preference_id: 3,
      key: "sidebar_open",
      value: "false",
    });

    render(<SidebarOpenToggle />);

    const toggle = screen.getByRole("switch");
    expect(toggle).not.toBeChecked();
  });

  it("calls mutate with correct parameters when toggled from true to false", async () => {
    const user = userEvent.setup();
    mockUseUserPreference.mockReturnValue({
      preference_id: 3,
      key: "sidebar_open",
      value: "true",
    });

    render(<SidebarOpenToggle />);

    const toggle = screen.getByRole("switch");
    await user.click(toggle);

    expect(mockMutate).toHaveBeenCalledWith({
      key: "sidebar_open",
      value: "false",
    });
  });

  it("calls mutate with correct parameters when toggled from false to true", async () => {
    const user = userEvent.setup();
    mockUseUserPreference.mockReturnValue({
      preference_id: 3,
      key: "sidebar_open",
      value: "false",
    });

    render(<SidebarOpenToggle />);

    const toggle = screen.getByRole("switch");
    await user.click(toggle);

    expect(mockMutate).toHaveBeenCalledWith({
      key: "sidebar_open",
      value: "true",
    });
  });

  it("returns null when user preference is undefined", () => {
    mockUseUserPreference.mockReturnValue(undefined);

    render(<SidebarOpenToggle />);

    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
  });
});
