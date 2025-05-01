import { render, screen } from "@/test/test-utils";

import { AddActivityRoutineCombobox } from "./AddActivityRoutineCombobox";
import userEvent from "@testing-library/user-event";

describe("AddActivityRoutineCombobox", () => {
  it("should render the component", () => {
    render(<AddActivityRoutineCombobox routineId={1} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("submits the form when activity is clicked", async () => {
    const user = userEvent.setup();
    render(<AddActivityRoutineCombobox routineId={1} />);

    const input = screen.getByRole("button", { name: /combobox button/i });

    await user.click(input);

    const option = screen.getByRole("option", { name: "Breakfast" });

    await user.click(option);

    expect(screen.getByRole("combobox")).toHaveValue("");
  });
});
