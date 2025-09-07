import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { RemainingTimeToggle } from "../RemainingTimeToggle";

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

describe("RemainingTimeToggle", () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error - Partial mock for testing
    mockUseUpdateUserPreference.mockReturnValue({
      mutate: mockMutate,
    });
  });

  it("renders toggle with correct initial state (false)", () => {
    mockUseUserPreference.mockReturnValue({
      preference_id: 1,
      key: "show_remaining_time",
      value: "false",
    });

    render(<RemainingTimeToggle />);

    const toggle = screen.getByRole("switch");
    expect(toggle).not.toBeChecked();
    expect(screen.getByText("Show Remaining Time")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Show time left instead of time elapsed for in-progress tasks.",
      ),
    ).toBeInTheDocument();
  });

  it("renders toggle with correct initial state (true)", () => {
    mockUseUserPreference.mockReturnValue({
      preference_id: 1,
      key: "show_remaining_time",
      value: "true",
    });

    render(<RemainingTimeToggle />);

    const toggle = screen.getByRole("switch");
    expect(toggle).toBeChecked();
  });

  it("calls mutate with correct parameters when toggled from false to true", async () => {
    const user = userEvent.setup();
    mockUseUserPreference.mockReturnValue({
      preference_id: 1,
      key: "show_remaining_time",
      value: "false",
    });

    render(<RemainingTimeToggle />);

    const toggle = screen.getByRole("switch");
    await user.click(toggle);

    expect(mockMutate).toHaveBeenCalledWith({
      key: "show_remaining_time",
      value: "true",
    });
  });

  it("calls mutate with correct parameters when toggled from true to false", async () => {
    const user = userEvent.setup();
    mockUseUserPreference.mockReturnValue({
      preference_id: 1,
      key: "show_remaining_time",
      value: "true",
    });

    render(<RemainingTimeToggle />);

    const toggle = screen.getByRole("switch");
    await user.click(toggle);

    expect(mockMutate).toHaveBeenCalledWith({
      key: "show_remaining_time",
      value: "false",
    });
  });

  it("returns null when user preference is undefined", () => {
    mockUseUserPreference.mockReturnValue(undefined);

    render(<RemainingTimeToggle />);

    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
  });
});
