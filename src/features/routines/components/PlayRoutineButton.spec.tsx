import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { PlayRoutineButton } from "./PlayRoutineButton";

describe("PlayRoutineButton", () => {
  it("should render the button with correct text", () => {
    render(<PlayRoutineButton routineId={1} />);

    expect(
      screen.getByRole("button", { name: /upload routine/i }),
    ).toBeInTheDocument();
  });

  it("should call the mutate function when clicked", async () => {
    const user = userEvent.setup();

    render(<PlayRoutineButton routineId={1} />);

    const button = screen.getByRole("button", { name: /upload routine/i });
    const mutate = vi.fn();
    button.onclick = () => {
      mutate(1);
    };

    await user.click(button);

    expect(mutate).toHaveBeenCalledWith(1);
    expect(mutate).toHaveBeenCalledTimes(1);
  });
});
