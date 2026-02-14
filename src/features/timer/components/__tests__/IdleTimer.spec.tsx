import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { IdleTimer } from "../IdleTimer";

describe("IdleTimer", () => {
  it("should be focused on the activity input when the component is mounted", async () => {
    const user = userEvent.setup();
    render(<IdleTimer />);

    const input = screen.getByRole("combobox", { name: "Activities" });

    await waitFor(() => {
      expect(input).toHaveFocus();
    });

    await user.type(input, "Test");

    expect(input).toHaveValue("Test");
  });

  it("should display error status when activity is not selected", async () => {
    const user = userEvent.setup();
    render(<IdleTimer />);

    const input = screen.getByRole("combobox", { name: "Activities" });
    const playBtn = screen.getByRole("button", { name: "Start Button" });

    await user.click(playBtn);

    expect(input).toHaveAttribute("aria-invalid");
    expect(input).toHaveClass("ring-red-300");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  // it("should be disabled when the form is submitting", async () => {});

  // it("must not allow to submit when the form is submitting", async () => {});

  // it("displays a loading state when the form is submitting", async () => {});

  // it("displays a retry button when the form is submitting", async () => {});

  // it("should call the onSubmit function when the form is submitted", async () => {});

  // it("should be disabled when the user is offline", async () => {});
});
