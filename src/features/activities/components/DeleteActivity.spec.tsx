import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { DeleteActivity } from "./DeleteActivity";
import { activities } from "@/test/store/activities";

describe("DeleteActivity", () => {
  const activity = activities[0];

  it("shows delete icon button", () => {
    render(<DeleteActivity activity={activity} />);

    expect(
      screen.getByRole("button", { name: "Delete Activity" }),
    ).toBeInTheDocument();
  });

  it("shows delete activity dialog when delete icon button is clicked", async () => {
    const user = userEvent.setup();
    render(<DeleteActivity activity={activity} />);

    await user.click(screen.getByRole("button", { name: "Delete Activity" }));

    expect(
      screen.getByRole("dialog", { name: "Delete Activity" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
});
