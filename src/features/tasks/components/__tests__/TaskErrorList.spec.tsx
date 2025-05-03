import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TaskErrorList } from "../TaskErrorList";

describe("TaskErrorList", () => {
  it("displays properly", () => {
    render(<TaskErrorList refetch={vi.fn()} />);

    const title = "Oh no!";
    const description = "There was an error loading your tasks";

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("calls refetch function when clicked", async () => {
    const user = userEvent.setup();
    const refetch = vi.fn();
    render(<TaskErrorList refetch={refetch} />);

    const button = screen.getByRole("button", { name: "Try Again" });
    await user.click(button);

    expect(refetch).toHaveBeenCalled();
  });
});
