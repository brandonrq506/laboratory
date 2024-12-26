import { render, screen } from "@/test/test-utils";
import { DeleteActivity } from "./DeleteActivity";
import userEvent from "@testing-library/user-event";

describe("DeleteActivity", () => {
  it("shows delete icon button", () => {
    render(<DeleteActivity activityId={1} />);

    expect(
      screen.getByRole("button", { name: "Delete Activity" }),
    ).toBeInTheDocument();
  });

  it("shows delete activity dialog when delete icon button is clicked", async () => {
    const user = userEvent.setup();
    render(<DeleteActivity activityId={1} />);

    await user.click(screen.getByRole("button", { name: "Delete Activity" }));

    expect(
      screen.getByRole("dialog", { name: "Delete Activity" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
});
