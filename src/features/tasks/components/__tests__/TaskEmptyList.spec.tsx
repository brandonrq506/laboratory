import { render, screen } from "@testing-library/react";
import { TaskEmptyList } from "../TaskEmptyList";

describe("TaskEmptyList", () => {
  it("displays properly", () => {
    render(<TaskEmptyList />);

    const title = "No Tasks";
    const description = "Get started by creating a new task.";

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
