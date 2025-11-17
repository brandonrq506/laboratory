import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { DeleteRoutineItem } from "../delete-routine-item";

describe("DeleteRoutineItem", () => {
  it("renders trash icon when not pending", () => {
    render(<DeleteRoutineItem itemId={1} routineId={1} />);

    const trashIcon = screen.getByRole("button", {
      name: /delete routine item/i,
    });
    expect(trashIcon).toBeInTheDocument();
  });

  it("renders loading icon when pending", async () => {
    const user = userEvent.setup();
    render(<DeleteRoutineItem itemId={1} routineId={1} />);

    const trashIcon = screen.getByRole("button", {
      name: /delete routine item/i,
    });

    await user.click(trashIcon);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
