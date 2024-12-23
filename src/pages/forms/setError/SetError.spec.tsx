import { render, screen } from "@testing-library/react";
import { SetError } from "./SetError";
import userEvent from "@testing-library/user-event";

describe("SetError", () => {
  it("requires age to be 18+", async () => {
    const user = userEvent.setup();
    render(<SetError />);

    await user.clear(screen.getByLabelText("Age"));
    await user.type(screen.getByLabelText("Age"), "17");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText("Minimum age is 18")).toBeInTheDocument();
  });

  it("requires age to be 99 or less", async () => {
    const user = userEvent.setup();
    render(<SetError />);

    await user.type(screen.getByLabelText("Age"), "17");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText("Maximum age is 99")).toBeInTheDocument();
  });

  it("shows 'name error' when name is bad", async () => {
    const user = userEvent.setup();
    render(<SetError />);

    await user.click(screen.getByRole("button", { name: /name is bad/i }));

    expect(screen.getByText("That is a weak ass name")).toBeInTheDocument();
  });

  it("shows multiple erros when 'set multiple errors' is clicked", async () => {
    const firstNameError = "Your first name is terrib....";
    const lastNameError = "bly good!! It is awesome..";
    const ageError = "ly disgusting...";

    const user = userEvent.setup();
    render(<SetError />);

    await user.click(
      screen.getByRole("button", { name: /set multiple errors/i }),
    );

    expect(screen.getByText(firstNameError)).toBeInTheDocument();
    expect(screen.getByText(lastNameError)).toBeInTheDocument();
    expect(screen.getByText(ageError)).toBeInTheDocument();
  });
});
