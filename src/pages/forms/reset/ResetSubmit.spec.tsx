import { render, screen } from "@testing-library/react";
import { ResetSubmit } from "./ResetSubmit";
import userEvent from "@testing-library/user-event";

describe("ResetSubmit", () => {
  it("shows errors when form is submitted with empty fields", async () => {
    const user = userEvent.setup();
    render(<ResetSubmit />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText("First Name is required")).toBeInTheDocument();
    expect(screen.getByText("Last Name is required")).toBeInTheDocument();
  });

  it("resets form after successful submission", async () => {
    const user = userEvent.setup();
    render(<ResetSubmit />);

    await user.type(screen.getByLabelText("First Name"), "John");
    await user.type(screen.getByLabelText("Last Name"), "Doe");
    await user.type(screen.getByLabelText("Age"), "30");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByLabelText("First Name")).toHaveValue("");
    expect(screen.getByLabelText("Last Name")).toHaveValue("");
    expect(screen.getByLabelText("Age")).toHaveValue(0);
  });
});
