import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { DeleteActivityRoutine } from "../DeleteActivityRoutine";

describe("DeleteActivityRoutine", () => {
  it("renders trash icon when not pending", () => {
    render(<DeleteActivityRoutine activityId={1} routineId={1} />);

    const trashIcon = screen.getByRole("button", {
      name: /delete activity routine/i,
    });
    expect(trashIcon).toBeInTheDocument();
  });

  it("renders loading icon when pending", async () => {
    const user = userEvent.setup();
    render(<DeleteActivityRoutine activityId={1} routineId={1} />);

    const trashIcon = screen.getByRole("button", {
      name: /delete activity routine/i,
    });

    await user.click(trashIcon);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
